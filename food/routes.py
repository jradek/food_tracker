from flask import render_template, url_for
import os

from food import model as mdl


# @app.context_processor
# def override_url_for():
#     """Enable live reloading on css changes: https://stackoverflow.com/a/21728116
#     """
#     return dict(url_for=dated_url_for)


# def dated_url_for(endpoint, **values):
#     if endpoint == "static":
#         filename = values.get("filename", None)
#         if filename:
#             file_path = os.path.join(app.root_path, endpoint, filename)
#             values["q"] = int(os.stat(file_path).st_mtime)
#     return url_for(endpoint, **values)


def register(app):
    @app.route("/example")
    def example():
        user = {"username": "Miguel"}
        posts = [
            {"author": {"username": "John"}, "body": "Beautiful day in Portland!"},
            {
                "author": {"username": "Susan"},
                "body": "The Avengers movie was so cool!",
            },
        ]
        return render_template("example.html", title="Home", user=user, posts=posts)

    # return '\n'.join(model.format_servings(model.MEALS))

    @app.route("/servings")
    # @app.route("/index")
    def index():
        meals = [
            mdl.calc_serving_by_product_factor(2.0, mdl.DATABASE["skyr"]),
            mdl.calc_serving_by_product_factor(1.25, mdl.DATABASE["feta"]),
            mdl.calc_serving_by_product_factor(0.05, mdl.DATABASE["leinsamen"]),
            mdl.calc_serving_by_product_factor(1.74, mdl.DATABASE["ei"]),
            mdl.calc_serving_by_product_factor(0.07, mdl.DATABASE["kokosoel"]),
        ]

        main_data = [
            {"serving": srv, "energy_ing": mdl.energy_from_ingredients(srv.macros)}
            for srv in meals
        ]

        summary = mdl.summarize_servings(meals)
        sum_macros = summary["sum_macros"]
        ing = mdl.Ingredients(
            fat=sum_macros["fats"], carb=sum_macros["carbs"], prot=sum_macros["prots"]
        )
        summary_data = {
            "summary": summary,
            "energy_ing": mdl.energy_from_ingredients(ing),
        }

        print(summary_data)

        return render_template(
            "servings.html", main_data=main_data, summary_data=summary_data
        )
