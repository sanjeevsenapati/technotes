#!/bin/bash
# A practical, robust backup script demonstrating Bash best practices.

# Strict mode: fail on errors, unset variables, and pipeline failures
set -euo pipefail

# Configuration
SOURCE_DIR="${1:-/var/log}" # Default to /var/log if no argument is given
BACKUP_DIR="/tmp/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE_NAME="$(basename "$SOURCE_DIR")_$TIMESTAMP.tar.gz"
DESTINATION="$BACKUP_DIR/$ARCHIVE_NAME"

# Logging function
log() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')] $*"
}

# Pre-flight checks
if [[ ! -d "$SOURCE_DIR" ]]; then
  log "ERROR: Source directory '$SOURCE_DIR' does not exist."
  exit 1
fi

mkdir -p "$BACKUP_DIR"

log "Starting backup of '$SOURCE_DIR'..."

# The actual work
if tar -czf "$DESTINATION" "$SOURCE_DIR" > /dev/null 2>&1; then
  log "Backup successful: $DESTINATION"
else
  log "ERROR: Backup failed!"
  exit 1
fi

# Cleanup old backups (keep last 3 for this example)
log "Cleaning up old backups (keeping last 3)..."
# We use ls -1t to list files by time, tail to skip the first 3, and xargs to rm them
ls -1t "$BACKUP_DIR"/*.tar.gz 2>/dev/null | tail -n +4 | xargs -r rm --

log "Backup script finished successfully."
