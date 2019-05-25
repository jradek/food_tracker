from food import model


def read_all():
    return [{"id": p.id, "kcal": p.kcal} for p in model.DATABASE.values()]


def read_one(product_id):
    for p in model.DATABASE.values():
        if p.id == product_id:
            return {"id": p.id, "kcal": p.kcal}

    return f"No such product {product_id}", 404
