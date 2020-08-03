# n8n-clever-cloud

This is a guide to deploy n8n on Clever Cloud. 

## How to deploy

Using clever-tools, this is the commands I have ran:


```
# Deployment
clever create --type node n8n
clever domain add n8n.cleverapps.io
clever addon create fs-bucket --plan s n8n-fs
clever addon create postgresql-addon --plan xs_sml n8n-pg
clever service link-addon n8n-pg
clever service link-addon n8n-fs
# Configuration
clever env set N8N_PORT 8080
clever env set N8N_PROTOCOL https
clever env set N8N_HOST n8n.cleverapps.io
clever env set WEBHOOK_TUNNEL_URL "https://n8n.cleverapps.io/"
clever env set VUE_APP_URL_BASE_APP https://n8n.cleverapps.io/
clever env set N8N_ENCRYPTION_KEY 'YOURSUPERSECRETENCRYPTIONKEY'
clever env set EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS true
clever env set EXECUTIONS_DATA_SAVE_ON_ERROR all
clever env set N8N_BASIC_AUTH_ACTIVE true
clever env set N8N_BASIC_AUTH_USER yourUsername
clever env set N8N_BASIC_AUTH_PASSWORD yourPassword
clever env set EXECUTIONS_DATA_SAVE_ON_SUCCESS all
clever env set DATA_FOLDER /app/data/
clever env set DB_TYPE postgresdb
clever env set DB_POSTGRESDB_DATABASE `clever env | awk -F = '/POSTGRESQL_ADDON_DB/ { print $2}'
clever env set DB_POSTGRESDB_HOST `clever env | awk -F = '/POSTGRESQL_ADDON_HOST/ { print $2}'
clever env set DB_POSTGRESDB_PORT `clever env | awk -F = '/POSTGRESQL_ADDON_PORT/ { print $2}'
clever env set DB_POSTGRESDB_USER `clever env | awk -F = '/POSTGRESQL_ADDON_USER/ { print $2}'
clever env set DB_POSTGRESDB_PASSWORD `clever env | awk -F = '/POSTGRESQL_ADDON_PASSWORD/ { print $2}'
clever env set CC_FS_BUCKET /data:`clever env | awk -F = '/BUCKET_HOST/ { print $2}'`
clever env set CC_PRE_RUN_HOOK "npm install -g n8n n8n-node-dev"
clever env set CC_RUN_COMMAND "./run.sh"
```

This will install n8n and n8n-node-dev, run `n8n-node-dev build` in the current directory and run n8n.