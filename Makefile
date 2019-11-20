IMAGE := roads-state:latest

build:
	docker build . -t $(IMAGE)

run:
	docker run --rm -v $(pwd)/src:/opt/app/src -it roads-state:latest npm start
