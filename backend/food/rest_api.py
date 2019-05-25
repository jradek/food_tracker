from .model import CONVERSION


def calculate_energy(fats, carbs, proteins, multiplier):
    f_g, c_g, p_g = fats * multiplier, carbs * multiplier, proteins * multiplier

    calories = {
        "fats": f_g * CONVERSION["fat_to_kcal"],
        "carbs": c_g * CONVERSION["carb_to_kcal"],
        "proteins": p_g * CONVERSION["protein_to_kcal"],
    }

    serving = {"fats": f_g, "carbs": c_g, "proteins": p_g}

    return {"data": {"calories": calories, "serving": serving}}
