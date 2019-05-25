import connexion
import logging
from flask_cors import CORS


logging.basicConfig(level=logging.INFO)


def create_app(config: str):
    """Application factory
    """
    logging.info("configure app as %s", config)
    app = connexion.App(__name__)
    app.add_api("swagger.yaml")

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
