from food import app

from food import model


@app.route("/")
@app.route("/index")
def index():
    return "Hello, World!"
    # return '\n'.join(model.format_servings(model.MEALS))
