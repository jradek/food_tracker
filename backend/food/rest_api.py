from .model import CONVERSION
from food import db
import copy


def _energy(fats, carbs, proteins, multiplier=1.0):
    f_g, c_g, p_g = fats * multiplier, carbs * multiplier, proteins * multiplier

    calories = {
        "fats": f_g * CONVERSION["fat_to_kcal"],
        "carbs": c_g * CONVERSION["carb_to_kcal"],
        "proteins": p_g * CONVERSION["protein_to_kcal"],
    }

    return calories


def calculate_energy(fats, carbs, proteins, multiplier):
    f_g, c_g, p_g = fats * multiplier, carbs * multiplier, proteins * multiplier

    calories = _energy(fats, carbs, proteins, multiplier)
    serving = {"fats": f_g, "carbs": c_g, "proteins": p_g}

    return {"data": {"calories": calories, "serving": serving}}


def _compose2(f, g):
    # TODO: consider using toolz!
    return lambda x: f(g(x))


def _convert_product(product: dict) -> dict:
    """Remap certain keys since database store things differently
    """
    new_product = copy.deepcopy(product)
    new_product["kcal"] = new_product.pop("kcalProducer")
    return new_product


def _add_energy(product: dict) -> dict:
    """Calculate calories based on macros and add it to product
    """
    product["calories"] = _energy(**product["macros"])
    return product


def get_products():
    products = list(map(_compose2(_add_energy, _convert_product), db.get_products()))
    return {"pagination": {"total": len(products)}, "data": products}
