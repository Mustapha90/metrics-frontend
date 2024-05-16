SHELL := /bin/bash

up:
	docker-compose up

build:
	docker-compose build

down:
	docker-compose down

clean:
	docker-compose down -v

restart: down up

.PHONY: up build down clean restart
