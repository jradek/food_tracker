# Food tracker

## Development within docker

1. Build image

    ```bash
    docker build -t food-backend .
    ```

1. Run container

    ```bash
    docker run -it --rm -v ${PWD}/food/:/home/flask/app/web/food/ -p 8080:8080 food-backend /bin/bash
    ```

1. Attach with vscode to container
1. Install python remote extension in container
1. Run configuration `food tracker server` (which allows debugging)
1. Browse to http://localhost:8080
