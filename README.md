![Clever Cloud logo](/github-assets/clever-cloud-logo.png)

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

### Before You Begin

Before starting the deployment process, you'll need to decide on:

- **Application Name**: Choose a unique name for your n8n application (e.g., `my-n8n-app`)
- **Domain Name**: Optionally, choose a domain name for your application

You'll use these values throughout the deployment process. In the commands below, replace:
- `<APP_NAME>` with your chosen application name
- `<YOUR_DOMAIN_NAME>` with your domain name (if applicable)

### Using Clever Tools CLI

Follow these steps to deploy n8n on Clever Cloud using the command line:

```bash
# Step 1: Create a Node.js application
clever create --type node <APP_NAME>

# Step 2: Add your domain (optional but recommended)
clever domain add <YOUR_DOMAIN_NAME>

# Step 3: Create required add-ons
# - File system bucket for persistent storage
clever addon create fs-bucket --plan s <APP_NAME>-fs
# - PostgreSQL database for workflow storage (minimum XXS plan required, XS or higher recommended)
clever addon create postgresql-addon --plan xs_sml <APP_NAME>-pg

# Step 4: Link add-ons to your application
clever service link-addon <APP_NAME>-pg
clever service link-addon <APP_NAME>-fs

# Step 5: Configure environment variables
# Basic configuration
clever env set N8N_PORT 8080
clever env set N8N_PROTOCOL https
clever env set N8N_HOST <YOUR_DOMAIN_NAME>
clever env set WEBHOOK_URL "https://<YOUR_DOMAIN_NAME>/"
clever env set VUE_APP_URL_BASE_APP https://<YOUR_DOMAIN_NAME>/

clever env set N8N_RUNNERS_ENABLED true

# Security settings (IMPORTANT: use strong, unique values)
clever env set N8N_ENCRYPTION_KEY '<YOUR_SUPER_SECRET_ENCRYPTION_KEY>'

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

# Clever Cloud hooks
clever env set CC_PRE_BUILD_HOOK "clevercloud/pre-build-hook.sh"

# Mount the filesystem bucket
clever env set CC_FS_BUCKET /data:`clever env | awk -F = '/BUCKET_HOST/ { gsub(/"/, "", $2); print $2}'`
```

## Install community nodes

Simply set this environment variable to the list of community nodes you want to install (space-separated). For example:

```bash
clever env set APP_N8N_COMMUNITY_NODES_TO_INSTALL "n8n-nodes-… n8n-nodes-… n8n-nodes-…"
```

## Deployment

After configuring all the environment variables, deploy your application:

```bash
# Push your code to Clever Cloud
clever deploy
```

## Post-Deployment

1. Once deployed, access your n8n instance at `https://<YOUR_DOMAIN_NAME>/`
2. Follow the setup wizard to create your owner account
3. Start creating your workflows!

## Important Notes

- **Database Requirements**: For n8n to function properly on Clever Cloud, your PostgreSQL database must use a minimum of XXS plan. For production environments and better performance, XS plan or larger is strongly recommended.
- **Scaling**: The configuration above is suitable for small to medium workloads. For higher demands, consider upgrading your PostgreSQL plan
- **Backups**: Regular backups of your PostgreSQL database are recommended

### User Authentication

Since n8n version 1.0, basic authentication has been deprecated in favor of the built-in user management system:

1. **First-time setup**:
   - When you first access your n8n instance, you'll be prompted to create an owner account
   - Follow the on-screen instructions to set up your username, email, and password

2. **Managing users**:
   - After initial setup, you can manage additional users through the n8n UI
   - Navigate to Settings > Users to add or modify user accounts



## Troubleshooting

If you encounter issues:

1. Check the application logs: `clever logs`
2. Verify all environment variables are correctly set: `clever env`
3. Ensure the add-ons are properly linked: `clever service status`

## Contributing

Contributions to improve this deployment example are welcome! Please feel free to submit pull requests or open issues for any enhancements or bug fixes.

## License

This example is provided under the terms of the MIT license.
