# 5. Practical Shell Scripting

When moving from one-off terminal commands to reusable scripts, you need to think about structure, error handling, and reliability.

## Functions

Functions allow you to group code logically and avoid repetition. In bash, variables inside a function are global by default unless declared with `local`.

```bash
#!/bin/bash

# Define a function
greet() {
  local NAME=$1
  echo "Hello, $NAME!"
}

# Call the function
greet "Sanjeev"
```

## Defensive Programming (Strict Mode)

Bash scripts keep executing even if a command fails, which can be dangerous (e.g., if a `cd` fails and the script proceeds to `rm -rf *`). You can enforce stricter rules at the top of your script:

```bash
#!/bin/bash
set -euo pipefail
```

- `set -e`: Exit immediately if a command exits with a non-zero status.
- `set -u`: Treat unset variables as an error and exit.
- `set -o pipefail`: Ensure that a pipeline returns a failure if *any* command in the pipeline fails (normally it only returns the exit status of the *last* command).

## Trapping Signals (Cleanup)

If your script creates temporary files and the user aborts it via `Ctrl+C` (SIGINT), those files might be left behind. Use `trap` to execute a cleanup function when the script exits for any reason.

```bash
#!/bin/bash
set -euo pipefail

TEMP_DIR=$(mktemp -d)

cleanup() {
  echo "Cleaning up temporary files..."
  rm -rf "$TEMP_DIR"
}

# Run cleanup on EXIT, INT (Ctrl+C), or TERM signals
trap cleanup EXIT INT TERM

echo "Working in $TEMP_DIR..."
# Do work...
```

## Building a Robust Automation Script

Here is an example of a complete, robust backup script combining the concepts from this series:

```bash
#!/bin/bash
set -euo pipefail

# Configuration
SOURCE_DIR="/var/www/html"
BACKUP_DIR="/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ARCHIVE_NAME="backup_$TIMESTAMP.tar.gz"
DESTINATION="$BACKUP_DIR/$ARCHIVE_NAME"

# Logging function
log() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')] $*"
}

# Pre-flight checks
if [[ ! -d "$SOURCE_DIR" ]]; then
  log "ERROR: Source directory $SOURCE_DIR does not exist."
  exit 1
fi

mkdir -p "$BACKUP_DIR"

log "Starting backup of $SOURCE_DIR..."

# The actual work
if tar -czf "$DESTINATION" "$SOURCE_DIR" > /dev/null 2>&1; then
  log "Backup successful: $DESTINATION"
else
  log "ERROR: Backup failed!"
  exit 1
fi

# Cleanup old backups (keep last 7)
ls -1t "$BACKUP_DIR"/backup_*.tar.gz | tail -n +8 | xargs -r rm --

log "Backup script finished successfully."
```
