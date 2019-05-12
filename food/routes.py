from food import app


@app.context_processor
def override_url_for():
    """Enable live reloading on css changes: https://stackoverflow.com/a/21728116
    """
    return dict(url_for=dated_url_for)


def dated_url_for(endpoint, **values):
    if endpoint == "static":
        filename = values.get("filename", None)
        if filename:
            file_path = os.path.join(app.root_path, endpoint, filename)
            values["q"] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)


@app.route("/example")
def example():
    user = {"username": "Miguel"}
    posts = [
        {"author": {"username": "John"}, "body": "Beautiful day in Portland!"},
        {"author": {"username": "Susan"}, "body": "The Avengers movie was so cool!"},
    ]
    return render_template("example.html", title="Home", user=user, posts=posts)
    # return '\n'.join(model.format_servings(model.MEALS))


@app.route("/")
@app.route("/index")
def index():
    return "Hello, World!"
    # return '\n'.join(model.format_servings(model.MEALS))
