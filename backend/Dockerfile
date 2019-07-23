# FROM python:3.7.4-alpine3.10
FROM python:3.7.4-slim-stretch
MAINTAINER Jaromir

# Create the group and user to be used in this container
RUN groupadd flaskgroup && useradd -m -g flaskgroup -s /bin/bash flask

RUN apt-get update && apt-get install -y \
    curl nano \
    && pip install --no-cache-dir pipenv \
    # Create the working directory (and set it as the working directory)
    && mkdir -p /home/flask/app/web

WORKDIR /home/flask/app/web
COPY Pipfile /home/flask/app/web/

RUN pipenv install \
    && pipenv install --system --deploy --ignore-pipfile


# Copy the source code into the container
COPY food/ /home/flask/app/web/food
COPY data/ /home/flask/app/web/data
COPY .vscode/ /home/flask/app/web/.vscode
COPY .flaskenv food_* /home/flask/app/web/

RUN chown -R flask:flaskgroup /home/flask

USER flask

#############
## MAIN
## uncomment to start automatically

# ENTRYPOINT python
# CMD food_tracker.py
