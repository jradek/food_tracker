import connexion
import logging
import pathlib

from flask_cors import CORS


from food import database


logging.basicConfig(level=logging.INFO)

db = database.Database()


def create_app(config: str):
    """Application factory
    """
    logging.info("configure app as %s", config)
    app = connexion.App(__name__)
    app.add_api("swagger.yaml")

    db_path = pathlib.Path(__file__).parent / ".." / "data" / "db.json"
    logging.info("opening db from path %s", db_path)
    db.init_app(db_path)

    # add CORS support
    CORS(app.app)

    from food import routes

    routes.register(app)

    return app


def create_app_flask(config: str):
    """Wrapper function to get 'python -m flask run' working

    A connexion app interally has a flask app, which is required by flask api
    """
    connexion_app = create_app(config)
    return connexion_app.app


# set the WSGI application callable to allow using uWSGI:
# uwsgi --http :8080 -w app
# application = app.app


#  from theapp import routes
