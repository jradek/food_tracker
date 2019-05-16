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


def format_servings(ls) -> str:
    table_rows = [r for r in map(_format_serving, ls)]

    summary = model.summarize_servings(ls)
    table_rows.append(
        [
            "_SUM",
            summary["kcal"],
            summary["kcal2"],
            summary["macros"].fat,
            summary["macros"].carb,
            summary["macros"].prot,
        ]
    )

    grams = summary["macros"].fat + summary["macros"].carb + summary["macros"].prot
    table_rows.append(
        ["_AMOUNT [%]"]
        + [
            None,
            None,
            summary["macros"].fat / grams * 100.0,
            summary["macros"].carb / grams * 100.0,
            summary["macros"].prot / grams * 100.0,
        ]
    )

    table_rows.append(
        ["_ENERGY [%]"]
        + [
            None,
            100,
            summary["macros_percent"][0],
            summary["macros_percent"][1],
            summary["macros_percent"][2],
        ]
    )

    # print(table_rows)
    headers = ("product", "kcal", "kcal2", "fat [g]", "carb [g]", "prot [g]")
    return tabulate(table_rows, headers=headers, floatfmt=".2f")
