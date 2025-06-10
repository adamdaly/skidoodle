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
	docker compose up -d --build

.PHONY: run-dev
run-dev:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build

.PHONY: run-testing
run-testing:
	docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build --verbose

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
		--var NODE_ENV=development \
		--var POSTGRES_DB=$(POSTGRES_DB) \
		--var POSTGRES_USER=$(POSTGRES_USER) \
		--var POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		--var PGADMIN_DEFAULT_EMAIL=$(PGADMIN_DEFAULT_EMAIL) \
		--var PGADMIN_DEFAULT_PASSWORD=$(PGADMIN_DEFAULT_PASSWORD) \
		--var SERVER_URL=$(SERVER_URL) \
		--var CLIENT_SERVER_URL=$(CLIENT_SERVER_URL) \
		--var FRAMES_RETRIEVE_URL=$(FRAMES_RETRIEVE_URL) \
		--var DATABASE_URL=$(DATABASE_URL) \
		--var PLAYWRIGHT_BASE_URL=$(PLAYWRIGHT_BASE_URL) \
		--var PLAYWRIGHT_USER_USERNAME=$(PLAYWRIGHT_USER_USERNAME) \
		--var PLAYWRIGHT_USER_PASSWORD=$(PLAYWRIGHT_USER_PASSWORD) \
		--var AMPLIFY_APP_ORIGIN=$(AMPLIFY_APP_ORIGIN) \
		--var NEXTAUTH_URL=$(NEXTAUTH_URL) \
		--var COGNITO_CLIENT_ID=$(COGNITO_CLIENT_ID) \
		--var COGNITO_USER_POOL_ID=$(COGNITO_USER_POOL_ID)

.PHONY: act-e2e
act-e2e:
	./bin/act \
		-j "e2e" \
		--var CI=true \
		--var NODE_ENV=development \
		--var POSTGRES_DB=$(POSTGRES_DB) \
		--var POSTGRES_USER=$(POSTGRES_USER) \
		--var POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		--var PGADMIN_DEFAULT_EMAIL=$(PGADMIN_DEFAULT_EMAIL) \
		--var PGADMIN_DEFAULT_PASSWORD=$(PGADMIN_DEFAULT_PASSWORD) \
		--var SERVER_URL=$(SERVER_URL) \
		--var CLIENT_SERVER_URL=$(CLIENT_SERVER_URL) \
		--var FRAMES_RETRIEVE_URL=$(FRAMES_RETRIEVE_URL) \
		--var DATABASE_URL=$(DATABASE_URL) \
		--var PLAYWRIGHT_BASE_URL=$(PLAYWRIGHT_BASE_URL) \
		--var PLAYWRIGHT_USER_USERNAME=$(PLAYWRIGHT_USER_USERNAME) \
		--var PLAYWRIGHT_USER_PASSWORD=$(PLAYWRIGHT_USER_PASSWORD) \
		--var AMPLIFY_APP_ORIGIN=$(AMPLIFY_APP_ORIGIN) \
		--var NEXTAUTH_URL=$(NEXTAUTH_URL) \
		--var COGNITO_CLIENT_ID=$(COGNITO_CLIENT_ID) \
		--var COGNITO_USER_POOL_ID=$(COGNITO_USER_POOL_ID)

.PHONY: e2e
e2e:
	cd testing/e2e && npx playwright test

.PHONY: e2e-dev
e2e-dev:
	cd testing/e2e && npx playwright test --ui

.PHONY: deploy
deploy:
	@echo "Are you sure you want to deploy? [y/N] "; \
	read answer; \
	if [ "$$answer" != "y" ] && [ "$$answer" != "Y" ]; then \
		echo "Aborted by user"; \
		exit 0; \
	else \
		echo "Proceeding with the task..."; \
		npx sst deploy --stage production; \
	fi

help:
	@echo "options:"
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs