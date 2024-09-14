DSN="postgresql://buffer:7xiOfdht7DuCtFEhgDK19A@royal-kudu-9809.7tc.aws-eu-central-1.cockroachlabs.cloud:26257/slack-clone?sslmode=verify-full"
DIR=./internal/infrastructure/postgres/migrations/

migrate_up:
	goose -dir $(DIR) postgres $(DSN) up
migrate_down:
	goose -dir $(DIR) postgres $(DSN) down

migrate_status:
	goose -dir $(DIR) postgres $(DSN) status
