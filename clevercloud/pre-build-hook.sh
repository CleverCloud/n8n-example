#!/bin/bash -l

set -o errexit -o xtrace

mkdir -p ~/.n8n/nodes
cd ~/.n8n/nodes
for node_name in ${APP_N8N_COMMUNITY_NODES_TO_INSTALL//, }; do
  npm install -g $node_name
done
