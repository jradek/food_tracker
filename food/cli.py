import typing

from tabulate import tabulate

from food import model


def shorten_str(s, width):
    l = len(s)
    if len(s) <= width:
        return s

    return s[0 : width - 3] + "..."


def _format_serving(s: model.Serving) -> list:
    macros = s.macros
    eng = model.energy_from_ingredients(macros)

    w_name = 25
    name = shorten_str(s.product_id, w_name)
    return [
        shorten_str(s.product_id, w_name),
        s.kcal,
        eng,
        macros.fat,
        macros.carb,
        macros.prot,
    ]


def format_servings(ls, include_aggregations=True) -> str:
    """Return the list of servings nicely formatted as table

    include_aggregations: add aggregated rows below the table as well
    """
    table_rows = [r for r in map(_format_serving, ls)]

    if include_aggregations:
        summary = model.summarize_servings(ls)
        fats, carbs, prots = summary["sum_macros"]["fats"], summary["sum_macros"]["carbs"], summary["sum_macros"]["prots"]
        table_rows.append(
            [
                "_SUM",
                summary["sum_energy_man"],
                summary["sum_energy_ing"],
                fats,
                carbs,
                prots,
            ]
        )

        grams = fats + carbs + prots
        table_rows.append(
            ["_QUANTITY [g] [%]"]
            + [
                None,
                None,
                fats / grams * 100.0,
                carbs / grams * 100.0,
                prots / grams * 100.0,
            ]
        )

        table_rows.append(
            ["_E_ing [%]"]
            + [
                None,
                100,
                summary["energy_ing_percent"][0],
                summary["energy_ing_percent"][1],
                summary["energy_ing_percent"][2],
            ]
        )

    # print(table_rows)
    headers = ("product", "E_man [kcal]", "E_ing [kcal]", "fat [g]", "carb [g]", "prot [g]")
    return tabulate(table_rows, headers=headers, floatfmt=".2f")
