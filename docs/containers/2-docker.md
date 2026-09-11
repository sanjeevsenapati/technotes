# 2. Docker

Docker popularized the concept of containers by providing an easy-to-use developer interface over complex Linux kernel primitives.

## Docker Architecture

Docker uses a client-server architecture:
- **Docker Client**: The CLI tool (`docker run`, `docker build`).
- **Docker Daemon (`dockerd`)**: The background process that actually builds, runs, and manages your containers.

::: warning
The Docker Daemon traditionally runs as `root`. This means that if a user has access to the docker socket, they essentially have root access to the entire host machine.
:::

## Key Concepts

1. **Image**: A read-only template with instructions for creating a Docker container (like a blueprint).
2. **Container**: A runnable instance of an image.
3. **Dockerfile**: A text document containing all the commands a user could call on the command line to assemble an image.

## Essential Commands

Build an image from a `Dockerfile`:
```bash
docker build -t my-app:v1 .
```

Run a container in the background (`-d`) and map port 8080 on the host to port 80 in the container (`-p`):
```bash
docker run -d -p 8080:80 my-app:v1
```

List running containers:
```bash
docker ps
```

Execute an interactive shell inside a running container:
```bash
docker exec -it <container_id> /bin/bash
```

Stop a container:
```bash
docker stop <container_id>
```
