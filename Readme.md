# n8n on Clever Cloud

[![n8n.io - Workflow Automation](https://img.shields.io/badge/n8n.io-Workflow%20Automation-blue)](https://n8n.io)
[![Clever Cloud - PaaS](https://img.shields.io/badge/Clever%20Cloud-PaaS-orange)](https://clever-cloud.com)

## Overview

This repository provides a complete guide for deploying [n8n](https://n8n.io/) - a powerful workflow automation tool - on [Clever Cloud](https://clever-cloud.com), a European PaaS provider.

n8n allows you to build workflows that connect various services and automate tasks without writing code. By deploying on Clever Cloud, you get a reliable, scalable hosting solution with minimal maintenance overhead.

## Prerequisites

- A [Clever Cloud](https://www.clever-cloud.com/) account
- [Clever Tools CLI](https://github.com/CleverCloud/clever-tools) installed and configured
- Basic familiarity with command line operations
- A domain name (optional, but recommended for production use)

## Deployment Guide

### Using Clever Tools CLI

Follow these steps to deploy n8n on Clever Cloud using the command line:

```bash
# Step 1: Create a Node.js application
clever create --type node n8n

# Step 2: Add your domain (optional but recommended)
clever domain add <YOUR_DOMAIN_NAME>

# Step 3: Create required add-ons
# - File system bucket for persistent storage
clever addon create fs-bucket --plan s n8n-fs
# - PostgreSQL database for workflow storage
clever addon create postgresql-addon --plan xs_sml n8n-pg

# Step 4: Link add-ons to your application
clever service link-addon n8n-pg
clever service link-addon n8n-fs

# Step 5: Configure environment variables
# Basic configuration
clever env set N8N_PORT 8080
clever env set N8N_PROTOCOL https
clever env set N8N_HOST <YOUR_DOMAIN_NAME>
clever env set WEBHOOK_TUNNEL_URL "https://<YOUR_DOMAIN_NAME>/"
clever env set VUE_APP_URL_BASE_APP https://<YOUR_DOMAIN_NAME>/

# Security settings (IMPORTANT: use strong, unique values)
clever env set N8N_ENCRYPTION_KEY '<YOUR_SUPER_SECRET_ENCRYPTION_KEY>'
clever env set N8N_BASIC_AUTH_ACTIVE true
clever env set N8N_BASIC_AUTH_USER <YOUR_USERNAME>
clever env set N8N_BASIC_AUTH_PASSWORD <YOUR_PASSWORD>

# Execution data settings
clever env set EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS true
clever env set EXECUTIONS_DATA_SAVE_ON_ERROR all
clever env set EXECUTIONS_DATA_SAVE_ON_SUCCESS all
clever env set DATA_FOLDER /app/data/

# Database configuration (automatically set from PostgreSQL add-on)
clever env set DB_TYPE postgresdb
clever env set DB_POSTGRESDB_DATABASE `clever env | awk -F = '/POSTGRESQL_ADDON_DB/ { gsub(/"/, "", $2); print $2}'`
clever env set DB_POSTGRESDB_HOST `clever env | awk -F = '/POSTGRESQL_ADDON_HOST/ { gsub(/"/, "", $2); print $2}'`
clever env set DB_POSTGRESDB_PORT `clever env | awk -F = '/POSTGRESQL_ADDON_PORT/ { gsub(/"/, "", $2); print $2}'`
clever env set DB_POSTGRESDB_USER `clever env | awk -F = '/POSTGRESQL_ADDON_USER/ { gsub(/"/, "", $2); print $2}'`
clever env set DB_POSTGRESDB_PASSWORD `clever env | awk -F = '/POSTGRESQL_ADDON_PASSWORD/ { gsub(/"/, "", $2); print $2}'`

# Mount the filesystem bucket
clever env set CC_FS_BUCKET /data:`clever env | awk -F = '/BUCKET_HOST/ { gsub(/"/, "", $2); print $2}'`
```

## Deployment

After configuring all the environment variables, deploy your application:

```bash
# Push your code to Clever Cloud
clever deploy
```

## Post-Deployment

1. Once deployed, access your n8n instance at `https://<YOUR_DOMAIN_NAME>/`
2. Log in using the credentials you set in the environment variables
3. Start creating your workflows!

## Important Notes

- **Security**: Always use strong, unique passwords and encryption keys
- **Scaling**: The configuration above is suitable for small to medium workloads. For higher demands, consider upgrading your PostgreSQL plan
- **Backups**: Regular backups of your PostgreSQL database are recommended

## Troubleshooting

If you encounter issues:

1. Check the application logs: `clever logs`
2. Verify all environment variables are correctly set: `clever env`
3. Ensure the add-ons are properly linked: `clever service status`

## Contributing

Contributions to improve this deployment example are welcome! Please feel free to submit pull requests or open issues for any enhancements or bug fixes.

## License

This example is provided under the terms of the MIT license.