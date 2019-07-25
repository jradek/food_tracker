FROM python:3.7.4-slim-stretch
MAINTAINER Jaromir

ARG USERNAME=flask
ARG GROUPNAME=flaskgroup

# Or your actual UID, GID on Linux if not the default 1000
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# target location of the app
ARG APPPATH=/home/$USERNAME/app/web/

# Create the group and user to be used in this container
# Create the user
RUN groupadd --gid $USER_GID $GROUPNAME \
    && useradd -m --uid $USER_UID --gid $USER_GID -m -s /bin/bash $USERNAME \
    # [Optional] Add sudo support
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

RUN apt-get update \
    # DEBUG PACKAGES
    && apt-get install -y curl nano \
    && pip install --no-cache-dir pipenv \
    # Create the working directory (and set it as the working directory)
    && mkdir -p $APPPATH

# Clean up
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR $APPPATH
COPY Pipfile $APPPATH

RUN pipenv install \
    && pipenv install --system --deploy --ignore-pipfile

# Copy the source code into the container
COPY food/ $APPPATH/food
COPY data/ $APPPATH/data
COPY .vscode/ $APPPATH/.vscode
COPY .flaskenv food_* $APPPATH/

RUN chown -R $USERNAME:$GROUPNAME /home/$USERNAME

# Set the default shell to bash rather than sh
ENV SHELL /bin/bash

USER $USERNAME

#############
## MAIN
## uncomment to start automatically

# ENTRYPOINT python
# CMD food_tracker.py
