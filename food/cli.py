import typing
from food import model

def shorten_str(s, width):
    l = len(s)
    if len(s) <= width:
        return s

    return s[0 : width - 3] + "..."


def format_serving(s: model.Serving) -> str:
    macros = s.macros
    eng = model.energy_from_ingredients(macros)

    w_name = 15
    name = shorten_str(s.product_id, w_name)

    s_fmt = f"{name:<{w_name}}:"
    s_fmt += f" {s.kcal:6.1f}"
    s_fmt += f" ({eng:6.1f}) | "
    s_fmt += f" {macros.fat:5.1f}"
    s_fmt += f" {macros.carb:5.1f}"
    s_fmt += f" {macros.prot:5.1f}"

    return s_fmt

def format_servings(ls) -> typing.List[str]:
    lines = []

    s_fmt = "PRODUCT"
    s_fmt += "            kcal ( kcal2) | "
    s_fmt += "   FAT  CARB  PROT"
    lines.append(s_fmt)

    lines.append("=" * 53)
    lines.extend(map(format_serving, ls))
    lines.append("-" * 53)

    amount = model.summarize_servings(ls)
    macros = amount["macros"]
    percent = amount["macros_percent"]
    energy = model.energy_from_ingredients(macros)

    s_fmt = " " * 15
    s_fmt += f'  {amount["kcal"]:6.1f}'
    s_fmt += f" ({energy:6.1f}) | "
    s_fmt += f" {macros.fat:5.1f}"
    s_fmt += f" {macros.carb:5.1f}"
    s_fmt += f" {macros.prot:5.1f}"

    lines.append(s_fmt)

    s_fmt = " " * 23 + "[% kcal2] | "
    s_fmt += f"  {percent[0]:4.1f}  {percent[1]:4.1f}  {percent[2]:4.1f}"
    lines.append(s_fmt)

    return lines