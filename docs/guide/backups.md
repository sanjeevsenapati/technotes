# Backup Scripts

This section covers scripts related to system and file backups.

## Tar Rotate Backup

**Script**: `backups/tar_rotate_backup.sh`

Creates timestamped `.tar.gz` archives of directories, computes SHA256 verification checksums, and rotates/prunes backups older than a specified number of days.

### Usage

```bash
chmod +x backups/tar_rotate_backup.sh
./backups/tar_rotate_backup.sh -s /path/to/source -d /path/to/backups
```
