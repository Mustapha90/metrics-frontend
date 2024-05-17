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

shell:
	docker exec -it web bash

test:
	docker-compose run --rm web npm test -- --watchAll=false

.PHONY: up build down clean restart shell
