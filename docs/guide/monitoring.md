# Monitoring Scripts

This section covers scripts related to system monitoring.

## System Health Check

**Script**: `monitoring/system_health_check.sh`

A quick system health dashboard script that displays vital system statistics in a readable format.

### Features
- CPU Load averages
- Memory statistics (Used/Available/Total)
- Disk usage (Specifically for root or critical drives)
- Top CPU & Memory consuming processes
- Systemd failed services reporting
- Active listening TCP ports

### Usage

```bash
chmod +x monitoring/system_health_check.sh
./monitoring/system_health_check.sh
```
