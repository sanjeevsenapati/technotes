# Utility Scripts

This section covers various utility scripts for logging, container management, and system administration.

## Nginx Daily Requests

**Script**: `utils/nginx_daily_requests.sh`

Aggregates daily request counts, HTTP status breakdown (2xx, 3xx, 4xx, 5xx), unique visitor IPs, and throughput metrics (Avg/Peak TPS - Requests/sec & Avg/Peak TPM - Requests/min) from plain and `.gz` compressed Nginx logs.

### Usage

```bash
chmod +x utils/nginx_daily_requests.sh
./utils/nginx_daily_requests.sh /path/to/nginx/access.log
```

## Kubernetes Cluster Health

**Script**: `utils/k8s_cluster_health.sh`

A Kubernetes cluster health check & pod troubleshooter that identifies failing pods, node stats, warning events, and resource utilization.

### Usage

```bash
chmod +x utils/k8s_cluster_health.sh
./utils/k8s_cluster_health.sh
```

## Nginx Log Viewer

**Script**: `utils/nginx_log_viewer.sh`

An AWK-powered log highlighter for Nginx standard access logs and Nginx WAF / Firelog security format.

### Usage

```bash
chmod +x utils/nginx_log_viewer.sh
./utils/nginx_log_viewer.sh /path/to/nginx/access.log
```

## Docker Cleanup

**Script**: `utils/docker_cleanup.sh`

A DevOps cleanup utility to safely prune stopped containers, dangling/unused images, build cache, and volume data.

### Usage

```bash
chmod +x utils/docker_cleanup.sh
./utils/docker_cleanup.sh -f
```

## Disk Check Usages

**Script**: `utils/disk_check_usages.sh`

Monitors disk partition usage against warning thresholds with color-coded alert formatting.

### Usage

```bash
chmod +x utils/disk_check_usages.sh
./utils/disk_check_usages.sh
```
