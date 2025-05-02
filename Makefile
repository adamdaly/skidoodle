.DEFAULT_GOAL := help

ifneq (,$(wildcard ./.env))
	include .env
	export
endif


.PHONY: run
run:
	docker compose up -d

.PHONY: run-build
run-build:
	docker compose up -d --build --no-cache

.PHONY: run-dev
run-dev:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up --no-cache --build

.PHONY: build
build:
	docker compose up --build

.PHONY: unbuild
unbuild:
	docker compose down

.PHONY: destroy
destroy:
	docker compose down -v

.PHONY: restart
restart:
	docker compose restart

.PHONY: act
act:
	./bin/act \
		--var CI=true \
		--var POSTGRES_DB=$(POSTGRES_DB) \
		--var POSTGRES_USER=$(POSTGRES_USER) \
		--var POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		--var PGADMIN_DEFAULT_EMAIL=$(PGADMIN_DEFAULT_EMAIL) \
		--var PGADMIN_DEFAULT_PASSWORD=$(PGADMIN_DEFAULT_PASSWORD) \
		--var SERVER_URL=$(SERVER_URL) \
		--var DATABASE_URL=$(DATABASE_URL) \
		--var PLAYWRIGHT_BASE_URL=$(PLAYWRIGHT_BASE_URL) \
		--var PLAYWRIGHT_USER_USERNAME=$(PLAYWRIGHT_USER_USERNAME) \
		--var PLAYWRIGHT_USER_PASSWORD=$(PLAYWRIGHT_USER_PASSWORD)

.PHONY: act-e2e
act-e2e:
	./bin/act \
		-j "e2e" \
		--var CI=true \
		--var POSTGRES_DB=$(POSTGRES_DB) \
		--var POSTGRES_USER=$(POSTGRES_USER) \
		--var POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		--var PGADMIN_DEFAULT_EMAIL=$(PGADMIN_DEFAULT_EMAIL) \
		--var PGADMIN_DEFAULT_PASSWORD=$(PGADMIN_DEFAULT_PASSWORD) \
		--var SERVER_URL=$(SERVER_URL) \
		--var DATABASE_URL=$(DATABASE_URL) \
		--var PLAYWRIGHT_BASE_URL=$(PLAYWRIGHT_BASE_URL) \
		--var PLAYWRIGHT_USER_USERNAME=$(PLAYWRIGHT_USER_USERNAME) \
		--var PLAYWRIGHT_USER_PASSWORD=$(PLAYWRIGHT_USER_PASSWORD)

.PHONY: e2e
e2e:
	cd testing/e2e && npx playwright test

.PHONY: e2e
e2e-dev:
	cd testing/e2e && npx playwright test --ui

help:
	@echo "options:"
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs