# Performance and Caching

Nginx is famously fast out of the box, but tuning its core settings, enabling compression, and implementing aggressive caching strategies can allow a $5/month server to handle millions of requests a day.

## Global Tuning (Worker Connections)

The two most important performance settings live at the top of `/etc/nginx/nginx.conf`.

```nginx
# Automatically spawn exactly as many worker processes as there are CPU cores
worker_processes auto;

events {
    # Increase the maximum number of simultaneous connections a single worker can handle.
    # The default is often 768 or 1024. For high traffic, raise it.
    worker_connections 4096;
    
    # Allow workers to accept all new connections at once
    multi_accept on;
}
```

*Note: The maximum number of total connections your server can handle is roughly `worker_processes * worker_connections`.*

## Gzip Compression

Text files (HTML, CSS, JS, JSON) compress incredibly well. Enabling Gzip in Nginx forces the server to compress these files before sending them over the internet, saving massive amounts of bandwidth and decreasing page load times.

Inside the `http` block in `/etc/nginx/nginx.conf`, configure Gzip:

```nginx
http {
    gzip on;
    # Compress files larger than 1KB
    gzip_min_length 1000;
    
    # Don't compress for archaic browsers
    gzip_disable "msie6";
    
    # Compress these specific file types
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## Microcaching (Reverse Proxy Caching)

If you have a dynamic application (like WordPress, or a Python API) where the data changes slowly but traffic is high, you can configure Nginx to temporarily cache the backend's response.

**Microcaching** is the strategy of caching dynamic content for very short periods of time (e.g., 1 to 10 seconds). This ensures data is mostly fresh, but a sudden spike of 5,000 visitors in one second will result in only 1 hit to your backend database; Nginx will serve the cached result to the other 4,999 users from RAM/Disk instantly.

1. First, define the cache zone in the `http` block:
```nginx
http {
    # Define a cache zone named "microcache" storing metadata in memory (10m) 
    # and actual files on disk at /tmp/nginx_cache
    proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=microcache:10m max_size=1g inactive=60m use_temp_path=off;
}
```

2. Second, apply the cache in your `location` block:
```nginx
server {
    location /api/stats {
        proxy_pass http://backend;
        
        # Enable the cache we defined
        proxy_cache microcache;
        
        # Cache successful responses (200, 302) for 5 seconds
        proxy_cache_valid 200 302 5s;
        
        # If multiple users hit the route simultaneously before the cache is populated, 
        # only send ONE request to the backend and make the others wait for the result
        proxy_cache_lock on;
        
        # Serve stale (expired) cache data if the backend crashes
        proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
    }
}
```
