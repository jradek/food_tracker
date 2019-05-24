import typing


class Ingredients(typing.NamedTuple):
    fat: float  # in grams
    carb: float  # in grams
    prot: float  # in grams


class Product(typing.NamedTuple):
    """
    """

    id: str
    # name: str
    # desc: str
    kcal: float  # energy as provided by manufacturer
    ingredients: Ingredients  # ingredients are described per 100g of product!


class Serving(typing.NamedTuple):
    product_id: str  # reference to product name
    factor: float  # multiplier for product ingredients
    macros: Ingredients  # resulting amount of ingredients _after_ multiplier is applied!
    kcal: float  # resulting amount of kcal _after_ multiplier is applied!


def _ing(f, c, p) -> Ingredients:
    return Ingredients(float(f), float(c), float(p))


PRODUCTS = [
    Product("feta", 256, _ing(20, 1, 18)),
    Product("ei", 153, _ing(11, 0.6, 13)),
    Product("skyr", 64, _ing(0.2, 4, 11)),
    Product("spinat", 22, _ing(0.4, 0.5, 3.1)),
    Product("gorgonzola", 346, _ing(29.2, 0.4, 20.4)),
    Product("leinsamen", 518, _ing(42, 3, 18)),
    Product("harzer", 125, _ing(0.5, 0.1, 30)),
    Product("kokosoel", 886, _ing(99, 0, 0)),
]

del _ing

DATABASE = {p.id: p for p in PRODUCTS}

CONVERSION = {
    "kcal_to_kJ": 4.1841,
    "kJ_to_kcal": 0.239_006,
    "fat_to_kcal": 9.0,
    "carb_to_kcal": 4.1,
    "prot_to_kcal": 4.1,
}


def energy_from_ingredients(igs: Ingredients) -> float:
    """Convert ingredients to energy using individual conversion rates
    """
    fats = CONVERSION["fat_to_kcal"] * igs.fat
    carbs = CONVERSION["carb_to_kcal"] * igs.carb
    prots = CONVERSION["prot_to_kcal"] * igs.prot
    return fats + carbs + prots


def calc_serving_by_product_factor(factor: float, prod: Product) -> Serving:
    """Calculate a serving based on a factor of product

    Since products are stored as 100g, the factor specifies
    the appropriate multiplier, i.e. 1.5 would be 150g
    """
    gram_fats = prod.ingredients.fat * factor
    gram_carbs = prod.ingredients.carb * factor
    gram_prots = prod.ingredients.prot * factor

    return Serving(
        product_id=prod.id,
        factor=factor,
        kcal=prod.kcal * factor,
        macros=Ingredients(gram_fats, gram_carbs, gram_prots),
    )


def calc_serving_for_macro(macro_name: str, grams, prod: Product):
    """Calculate a serving given a target amount of a macro, e.g. fat
    """
    f = float(grams) / getattr(prod.ingredients, macro_name)
    return calc_serving_by_product_factor(f, prod)


def calc_serving_for_kcal(kcal, prod: Product):
    """Calculate a serving given a target amount of calories
    """
    f = float(kcal) / prod.kcal
    return {"grams": 100.0 * f, "serving": calc_serving_by_product_factor(f, prod)}


def summarize_servings(ls) -> dict:
    kcal, kcal2, fats, carbs, prots = 0.0, 0.0, 0.0, 0.0, 0.0

    for s in ls:
        kcal += s.kcal
        m = s.macros
        fats += m.fat
        carbs += m.carb
        prots += m.prot
        kcal2 += energy_from_ingredients(s.macros)

    ing = {"fats": fats, "carbs": carbs, "prots": prots}

    percent_fat = CONVERSION["fat_to_kcal"] * fats / kcal2 * 100.0
    percent_carb = CONVERSION["carb_to_kcal"] * carbs / kcal2 * 100.0
    percent_prot = CONVERSION["prot_to_kcal"] * prots / kcal2 * 100.0

    return {
        "sum_energy_man": kcal,
        "sum_energy_ing": kcal2,
        "sum_macros": ing,
        "energy_ing_percent": [percent_fat, percent_carb, percent_prot],
    }
