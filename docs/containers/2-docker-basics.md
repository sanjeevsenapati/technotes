# Docker Basics

Docker is the engine that popularized containers. It consists of a daemon process (`dockerd`) running as root in the background, and a CLI tool (`docker`) that you interact with.

## The Core Loop

The daily lifecycle of managing containers revolves around running, inspecting, stopping, and removing them.

### 1. Running a Container
The `run` command downloads the image (if it's not cached locally) and starts the container.
```bash
# Run Nginx in the background (-d for detached mode)
docker run -d --name my-nginx nginx:latest
```

### 2. Inspecting State
```bash
# List only running containers
docker ps

# List ALL containers (including stopped ones)
docker ps -a
```

### 3. Stopping and Removing
```bash
# Gracefully stop the container
docker stop my-nginx

# Remove the container (must be stopped first)
docker rm my-nginx

# Force kill and remove in one command
docker rm -f my-nginx
```

## Debugging Containers

When things go wrong, you need to look inside the black box.

### Viewing Logs
Because containers are just processes, their `stdout` and `stderr` streams are captured by the Docker daemon.
```bash
# View the last 100 lines of logs and follow (-f) for new output
docker logs -f --tail 100 my-nginx
```

### Interactive Shells (`exec`)
You can spawn a *new* process inside an already-running container. This is crucial for debugging.
```bash
# Spawn a bash shell inside the Nginx container interactively (-it)
docker exec -it my-nginx /bin/bash

# Execute a single command without entering the shell
docker exec my-nginx ls -la /usr/share/nginx/html
```

## Networking and Ports

By default, containers are isolated on their own internal Docker network (usually `172.17.x.x`). You cannot access an Nginx container from your web browser without explicitly mapping a port from the host machine to the container.

```bash
# Map port 8080 on your host machine to port 80 inside the container
docker run -d -p 8080:80 --name my-nginx nginx:latest
```
*You can now access the container at `http://localhost:8080`.*

## Volumes (Persistent Data)

Containers are **ephemeral**. If you delete a container, everything inside its Read/Write layer is destroyed permanently. 

To persist data (like a Postgres database or Nginx config files), you must mount data from the host machine into the container.

### 1. Bind Mounts
Map an exact directory on your host to a directory in the container. Excellent for local development.
```bash
# Mount your local /home/user/html into Nginx
docker run -d -p 8080:80 \
  -v /home/user/html:/usr/share/nginx/html \
  nginx:latest
```

### 2. Managed Volumes
Let Docker manage the storage location for you. This is the preferred method for databases.
```bash
# Create a volume
docker volume create pgdata

# Mount it into a Postgres container
docker run -d \
  -v pgdata:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  postgres:latest
```
