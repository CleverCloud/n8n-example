FROM n8nio/n8n:latest

# Optional: set timezone (Clever Cloud uses UTC by default)
ENV TZ=Europe/Paris

# Persist data to /data if FS Bucket is mounted
ENV N8N_USER_FOLDER=/data