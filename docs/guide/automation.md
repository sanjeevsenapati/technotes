# Automation Scripts

This section covers scripts related to automating routine system administration tasks.

## SSL Certificate Checker

**Script**: `automation/ssl_cert_checker.sh`

An SSL/TLS certificate expiry checker for domain names or batch domain lists with configurable warning day thresholds.

### Usage

```bash
chmod +x automation/ssl_cert_checker.sh
./automation/ssl_cert_checker.sh -d example.com
```

## Log Cleaner

**Script**: `automation/log_cleaner.sh`

An automated log maintenance tool to compress (`.gz`) or purge old log files beyond retention thresholds. Supports dry-run execution.

### Usage

```bash
chmod +x automation/log_cleaner.sh
./automation/log_cleaner.sh
```
