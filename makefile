build:
	docker compose -f docker-compose.local.yml up --build -d --remove-orphans

up:
	docker compose -f docker-compose.local.yml up -d

down:
	docker compose -f docker-compose.local.yml down

show-logs:
	docker compose -f docker-compose.local.yml logs

show-logs-api:
	docker compose -f docker-compose.local.yml logs api
