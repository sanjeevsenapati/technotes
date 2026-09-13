# Reverse Proxy and Load Balancing

While Nginx is a great static file server, its true power in modern architectures is acting as a **Reverse Proxy**. 

A reverse proxy sits in front of your backend application servers (like a Node.js Express app running on port 3000, or a Python Flask app on port 5000), accepts incoming HTTP traffic from the internet, and forwards it to your application.

## The `proxy_pass` Directive

To turn Nginx into a reverse proxy, you replace the `root` directive with `proxy_pass` inside your `location` block.

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        # Forward all requests to the backend app running on localhost:3000
        proxy_pass http://127.0.0.1:3000;

        # Pass the original client IP to the backend (critical for logging)
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    }
}
```

> [!TIP]
> **Why pass headers?** By default, when an application receives a request from a reverse proxy, it thinks the request came from `127.0.0.1` (Nginx). Setting `X-Forwarded-For` ensures your backend application knows the *actual* IP address of the user who made the request.

## Load Balancing

If your application becomes too popular, a single Node.js or Python server will crash under the load. You need to run multiple copies of your application and distribute the traffic among them.

Nginx handles this natively using the `upstream` block.

```nginx
# Define a pool of backend servers
upstream my_backend {
    server 10.0.0.11:3000;
    server 10.0.0.12:3000;
    server 10.0.0.13:3000;
}

server {
    listen 80;
    server_name app.example.com;

    location / {
        # Forward traffic to the entire pool defined above
        proxy_pass http://my_backend;
    }
}
```

### Load Balancing Algorithms

By default, Nginx uses a **Round Robin** algorithm, meaning it distributes requests sequentially (Server 1, then Server 2, then Server 3, then back to 1). You can change this behavior by specifying an algorithm inside the `upstream` block.

1. **Least Connections (`least_conn`)**
   Routes the request to the server with the fewest active connections. Excellent for applications where some requests take much longer to process than others.
   ```nginx
   upstream my_backend {
       least_conn;
       server 10.0.0.11:3000;
       server 10.0.0.12:3000;
   }
   ```

2. **IP Hash (`ip_hash`)**
   Hashes the client's IP address to determine which server they are sent to. This guarantees that a specific user will *always* hit the same backend server (known as "Session Persistence" or "Sticky Sessions"). This is critical if your backend application stores user login state in memory rather than in a shared database like Redis.
   ```nginx
   upstream my_backend {
       ip_hash;
       server 10.0.0.11:3000;
       server 10.0.0.12:3000;
   }
   ```
