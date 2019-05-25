from food import create_app

def main():
    app = create_app('dev')
    app.run(port=8080)


if __name__ == "__main__":
    main()

