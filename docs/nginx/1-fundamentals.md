# Nginx Fundamentals

Nginx (pronounced "Engine-X") is a high-performance open-source web server. While it started as just a web server to serve static files, it is now primarily used as a **Reverse Proxy** and **Load Balancer** in front of application servers like Node.js, Python, and Java.

## The Architecture

Unlike older web servers like Apache that spawn a new thread or process for every single user request (which consumes massive amounts of RAM), Nginx uses an **asynchronous, event-driven architecture**.

Nginx starts one **Master Process** and several **Worker Processes**. 
- The Master Process reads the configuration file and manages the workers.
- The Worker Processes do the actual work. A single worker process can handle thousands of concurrent connections efficiently.

## Installation and Basic Control

Installing Nginx is straightforward on any Linux distribution.

```bash
# Ubuntu / Debian
sudo apt update
sudo apt install nginx

# RHEL / CentOS / Rocky
sudo dnf install epel-release
sudo dnf install nginx
```

Once installed, Nginx runs as a `systemd` service.

```bash
# Start Nginx
sudo systemctl start nginx

# Enable it to start on boot
sudo systemctl enable nginx

# Check its status
sudo systemctl status nginx
```

## The Configuration Structure

The primary configuration file for Nginx is located at `/etc/nginx/nginx.conf`. The configuration uses a nested block structure.

```nginx
# Global Settings (Master Process)
user www-data;
worker_processes auto;

# The Events Block (Worker process tuning)
events {
    worker_connections 1024;
}

# The HTTP Block (Handles all web traffic)
http {
    include /etc/nginx/mime.types;

    # The Server Block (Defines a specific website/domain)
    server {
        listen 80;
        server_name mywebsite.com;

        # The Location Block (Handles specific URL paths)
        location / {
            root /var/www/html;
            index index.html;
        }
    }
}
```

## Serving Static Content

The most basic use case for Nginx is serving a static HTML website (like this VitePress documentation site).

To serve static files, you define a `server` block with a `root` directive pointing to the folder containing your files on the Linux filesystem.

```nginx
server {
    # Listen on standard HTTP port
    listen 80;
    
    # The domain name to answer for
    server_name docs.example.com;

    location / {
        # The directory on the Linux server containing the files
        root /var/www/docs;
        
        # The default file to serve
        index index.html;

        # Fallback routing (essential for Single Page Applications like React/Vue)
        try_files $uri $uri/ /index.html;
    }
}
```
