from food import cli
from food import model as mdl

MEALS_SATURDAY = [
    mdl.calc_serving_by_product_factor(1.0, mdl.DATABASE["harzer"]),
    mdl.calc_serving_by_product_factor(2.5, mdl.DATABASE["skyr"]),
    mdl.calc_serving_by_product_factor(1.25, mdl.DATABASE["feta"]),
    mdl.calc_serving_by_product_factor(0.05, mdl.DATABASE["leinsamen"]),
    mdl.calc_serving_by_product_factor(1.74, mdl.DATABASE["ei"]),
    mdl.calc_serving_by_product_factor(4.5, mdl.DATABASE["spinat"]),
    mdl.calc_serving_by_product_factor(0.5, mdl.DATABASE["gorgonzola"]),
]

MEALS = [
    mdl.calc_serving_by_product_factor(2.0, mdl.DATABASE["skyr"]),
    mdl.calc_serving_by_product_factor(1.25, mdl.DATABASE["feta"]),
    mdl.calc_serving_by_product_factor(0.05, mdl.DATABASE["leinsamen"]),
    mdl.calc_serving_by_product_factor(1.74, mdl.DATABASE["ei"]),
    mdl.calc_serving_by_product_factor(0.07, mdl.DATABASE["kokosoel"]),
]


def main():
    # print(DATABASE)

    # print(MEALS[0])
    print("\n".join(cli.format_servings(MEALS)))

    if False:
        print("-------------")
        foo = mdl.calc_serving_for_macro("prot", 10, mdl.DATABASE["ei"])
        print(cli.format_serving(foo))
        print("-------------")
        bar = mdl.calc_serving_for_kcal(1000, mdl.DATABASE["ei"])
        print(f'grams: {bar["grams"]:6.2f}')
        print(cli.format_serving(bar["serving"]))
        print("-------------")
        buzz = mdl.calc_serving_by_product_factor(10 * 65 / 100, mdl.DATABASE["ei"])
        # print_serving(buzz)
        print(cli.format_servings([buzz]))

        print(cli.shorten_str("michael rath", 8))
        print("123456789")


if __name__ == "__main__":
    main()
