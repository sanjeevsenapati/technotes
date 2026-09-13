# Production Deployment

Running Nginx in a production environment requires careful testing of configuration changes, robust logging mechanisms, and potentially containerizing the deployment for modern architectures.

## Safe Configuration Reloads

The golden rule of Nginx administration: **Never restart Nginx, always reload it.**

A `restart` command forcefully kills the master and worker processes, dropping all currently active user connections. A `reload` command tells the master process to gracefully spin down the old worker processes *only after* they finish handling their current requests, while spinning up new workers with the new configuration.

Before running a reload, you must **always** test your configuration syntax. If there is a typo in your config and you run `reload`, the reload will safely fail.

```bash
# 1. Test the configuration files for syntax errors
sudo nginx -t

# 2. If the test says "syntax is ok", gracefully reload the configuration
sudo nginx -s reload
```

## Advanced Logging (JSON Format)

By default, Nginx writes access logs in the "combined" format, which is a plain text string. If you use centralized log aggregators (like ELK/Elasticsearch, Splunk, or Datadog), parsing strings requires writing complex Grok/Regex patterns.

The modern best practice is to force Nginx to write `access.log` directly in JSON format.

1. In the `http` block of `/etc/nginx/nginx.conf`, define a custom `log_format`:
```nginx
http {
    log_format json_combined escape=json
      '{'
        '"time_local":"$time_local",'
        '"remote_addr":"$remote_addr",'
        '"request":"$request",'
        '"status":"$status",'
        '"body_bytes_sent":"$body_bytes_sent",'
        '"http_referer":"$http_referer",'
        '"http_user_agent":"$http_user_agent",'
        '"upstream_response_time":"$upstream_response_time"'
      '}';

    # Tell Nginx to use this format for the main access log
    access_log /var/log/nginx/access.log json_combined;
}
```
*Note: We included `$upstream_response_time` which tracks exactly how many milliseconds your backend Node/Python app took to respond to the reverse proxy!*

## Containerizing Nginx (Docker)

If you are running infrastructure on Docker or Kubernetes, you should run Nginx as a container.

The official `nginx` Docker image is highly optimized. The standard pattern is to write your configuration file locally, and mount it into the container using a Docker Volume or a Kubernetes ConfigMap.

### 1. Basic Docker Run
```bash
# Run Nginx on port 80, mounting a local 'my-nginx.conf' file into the container
docker run -d -p 80:80 \
  -v $(pwd)/my-nginx.conf:/etc/nginx/nginx.conf:ro \
  --name web-proxy \
  nginx:latest
```

### 2. Custom Dockerfile
If you want to bundle your static website and custom configuration directly into an immutable container image:

```dockerfile
# Dockerfile
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built static website
COPY ./dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx automatically starts when the container runs
```
