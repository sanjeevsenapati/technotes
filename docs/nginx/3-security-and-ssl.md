# Security and SSL

Securing your infrastructure begins at the edge. Since Nginx is the primary gateway between the wild internet and your internal applications, configuring SSL and access controls correctly is paramount.

## SSL Termination (HTTPS)

Modern web browsers mandate HTTPS. Configuring Nginx to handle SSL encryption (known as SSL Termination) offloads the CPU-intensive encryption work from your backend application servers.

A secure HTTPS block looks like this:

```nginx
server {
    listen 443 ssl;
    server_name secure.example.com;

    # Paths to your certificates
    ssl_certificate /etc/letsencrypt/live/secure.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/secure.example.com/privkey.pem;

    # Hardening SSL Protocols (Disable outdated TLS 1.0 and 1.1)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}

# Redirect all HTTP traffic to HTTPS
server {
    listen 80;
    server_name secure.example.com;
    return 301 https://$host$request_uri;
}
```

### Let's Encrypt and Certbot

You do not need to buy SSL certificates manually anymore. [Certbot](https://certbot.eff.org/) is a free tool that automatically requests certificates from Let's Encrypt and edits your Nginx configuration files for you.

```bash
# Install Certbot for Nginx (Ubuntu/Debian)
sudo apt install certbot python3-certbot-nginx

# Run certbot (it will auto-detect your server_names and configure SSL)
sudo certbot --nginx
```

## Access Controls (Allow / Deny)

Sometimes you have internal dashboards (like a database admin panel) exposed on Nginx, but you only want your company's office IP address or VPN to access them.

You can restrict access using `allow` and `deny` directives. Nginx evaluates these top-down.

```nginx
location /admin/ {
    # Allow the corporate VPN IP address
    allow 192.168.10.50;
    
    # Allow a specific subnet
    allow 10.0.0.0/24;
    
    # Deny everyone else
    deny all;

    proxy_pass http://127.0.0.1:8080;
}
```

## Basic Authentication

If you don't have a static IP address to whitelist, you can put a password prompt directly on the Nginx route.

1. Generate a password file using the `htpasswd` utility (part of `apache2-utils`).
```bash
sudo htpasswd -c /etc/nginx/.htpasswd admin_user
```

2. Add the authentication directives to your location block:
```nginx
location /secret/ {
    auth_basic "Restricted Admin Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    proxy_pass http://127.0.0.1:9090;
}
```

## Rate Limiting

To protect your application from brute-force login attempts or basic DDoS attacks, you can limit how often a single IP address can request a specific route.

This requires defining a zone in the `http` block, and applying it in the `location` block.

```nginx
http {
    # Define a memory zone named "mylimit" tracking IP addresses. 
    # Limit requests to 5 per second per IP.
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=5r/s;

    server {
        location /login/ {
            # Apply the limit, but allow bursts of up to 10 requests without dropping them immediately
            limit_req zone=mylimit burst=10 nodelay;
            proxy_pass http://127.0.0.1:3000;
        }
    }
}
```
