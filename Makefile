SHELL := /bin/sh

PROJECT_NAME := new-malevolentgods-com
IMAGE_NAME := $(PROJECT_NAME)
CONTAINER_PORT := 80
HOST_PORT ?= 8080

.PHONY: help install dev build preview studio clean docker-build docker-run docker-stop

help:
	@echo "Available targets:"
	@echo "  make install       - Install npm dependencies"
	@echo "  make dev           - Run Astro dev server"
	@echo "  make build         - Build the Astro site"
	@echo "  make preview       - Preview the built Astro site"
	@echo "  make studio        - Run Sanity Studio"
	@echo "  make clean         - Remove generated build artifacts"
	@echo "  make docker-build  - Build Docker image"
	@echo "  make docker-run    - Run Docker image on HOST_PORT=$(HOST_PORT)"
	@echo "  make docker-stop   - Stop running Docker container named $(PROJECT_NAME)"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

studio:
	npm run studio

clean:
	rm -rf node_modules dist .astro

docker-build:
	docker build -t $(IMAGE_NAME) .

docker-run:
	docker run --rm --name $(PROJECT_NAME) -p $(HOST_PORT):$(CONTAINER_PORT) $(IMAGE_NAME)

docker-stop:
	-docker stop $(PROJECT_NAME)
