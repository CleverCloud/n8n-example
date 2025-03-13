# n8n-clever-cloud

This is an example of how  to deploy [n8n](https://n8n.io/) on [Clever Cloud](https://clever-cloud.com).

## How to deploy

### Using [Clever Tools](https://github.com/CleverCloud/clever-tools)

```bash
# Deployment
clever create --type node n8n
clever domain add <YOUR_DOMAIN_NAME>
clever addon create fs-bucket --plan s n8n-fs
clever addon create postgresql-addon --plan xs_sml n8n-pg
clever service link-addon n8n-pg
clever service link-addon n8n-fs
# Configuration
clever env set N8N_PORT 8080
clever env set N8N_PROTOCOL https
clever env set N8N_HOST <YOUR_DOMAIN_NAME>
clever env set WEBHOOK_TUNNEL_URL "https://<YOUR_DOMAIN_NAME>/"
clever env set VUE_APP_URL_BASE_APP https://<YOUR_DOMAIN_NAME>/
clever env set N8N_ENCRYPTION_KEY '<YOUR_SUPER_SECRET_ENCRYPTION_KEY>'
clever env set EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS true
clever env set EXECUTIONS_DATA_SAVE_ON_ERROR all
clever env set N8N_BASIC_AUTH_ACTIVE true
clever env set N8N_BASIC_AUTH_USER <YOUR_USERNAME>
clever env set N8N_BASIC_AUTH_PASSWORD <YOUR_PASSWORD>
clever env set EXECUTIONS_DATA_SAVE_ON_SUCCESS all
clever env set DATA_FOLDER /app/data/
clever env set DB_TYPE postgresdb
clever env set DB_POSTGRESDB_DATABASE `clever env | awk -F = '/POSTGRESQL_ADDON_DB/ { gsub(/"/, "", $2); print $2}'`
clever env set DB_POSTGRESDB_HOST `clever env | awk -F = '/POSTGRESQL_ADDON_HOST/ { gsub(/"/, "", $2); print $2}'`
clever env set DB_POSTGRESDB_PORT `clever env | awk -F = '/POSTGRESQL_ADDON_PORT/ { gsub(/"/, "", $2); print $2}'`
clever env set DB_POSTGRESDB_USER `clever env | awk -F = '/POSTGRESQL_ADDON_USER/ { gsub(/"/, "", $2); print $2}'`
clever env set DB_POSTGRESDB_PASSWORD `clever env | awk -F = '/POSTGRESQL_ADDON_PASSWORD/ { gsub(/"/, "", $2); print $2}'`
/data:`clever env | awk -F = '/BUCKET_HOST/ { gsub(/"/, "", $2); print $2}'`
```