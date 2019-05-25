from .model import CONVERSION

def get_energy(fats, carbs, prots):
    def r(value):
        return round(value, 2)

    f = fats * CONVERSION["fat_to_kcal"]
    c = carbs * CONVERSION["carb_to_kcal"]
    p = prots * CONVERSION["prot_to_kcal"]

    total = f + c + p

    if total > 0.0:
        percent_f = 100.0 * f / total
        percent_c = 100.0 * c / total

        # make sure sum is hundred percent
        percent_p = 100.0 - (percent_f + percent_c)
    else:
        percent_f, percent_c, percent_p = 0, 0, 0

    return {
        "kcal": {
            "fats": r(f),
            "carbs": r(c),
            "prots": r(p),
            "total": r(total)
        },
        "kcal_percent": {
            "fats": r(percent_f),
            "carbs": r(percent_c),
            "prots": r(percent_p)
        }
    }
