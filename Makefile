.DEFAULT_GOAL := help

.PHONY: build-dev
build-dev:
	docker compose up --build

.PHONY: build
build:
	docker compose up -d

.PHONY: unbuild
unbuild:
	docker compose down

.PHONY: destroy
destroy:
	docker compose down -v

.PHONY: restart
restart:
	docker compose restart

help:
	@echo "options:"
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs