# Advanced Docker

Running containers locally is simple, but running them securely in production requires understanding advanced network drivers and dropping capabilities.

## Advanced Networking

Docker offers multiple network drivers depending on your needs.

### 1. Bridge Network (Default)
When you run a container without specifying a network, Docker attaches it to the default `bridge` network (`docker0`). The container gets an internal IP address (like `172.17.0.2`), and relies on Docker's internal NAT (Network Address Translation) to talk to the internet.

### 2. Host Network
If you run a container with `--network host`, Docker **removes the network isolation namespace**. The container binds directly to the host machine's physical network interface. 
- **Pros:** Maximum performance (bypasses Docker's NAT overhead).
- **Cons:** If the container listens on port 80, it takes up port 80 on the *host*. You cannot run two containers listening on port 80 using the host network.

```bash
docker run -d --network host nginx:latest
```

### 3. Overlay Network
Used primarily in Docker Swarm (or Kubernetes as an SDN). An overlay network creates a massive virtual network that spans across multiple physical Linux servers, allowing a container on Server A to talk directly to a container on Server B as if they were on the same local switch.

## Container Security

By default, Docker containers run as the `root` user. This is a massive security risk. While the container is isolated, if a hacker finds a kernel exploit to break out of the container (a "container escape"), they will pop out onto the host machine as the root user.

### 1. Dropping Capabilities
The Linux Kernel grants the `root` user specific capabilities (e.g., `CAP_SYS_ADMIN`, `CAP_NET_BIND_SERVICE`). You can strip these from a container so that even if the container is running as root, it is completely powerless to modify the host kernel.

```bash
# Drop ALL root capabilities
docker run -d --cap-drop ALL --name secure-nginx nginx:latest
```

### 2. Read-Only Root Filesystem
Hackers need to download malware into your container to execute attacks. If you mount the entire root filesystem of the container as Read-Only, they cannot write anything to disk.

```bash
docker run -d --read-only \
  -v /tmp/nginx:/var/cache/nginx \
  -v /tmp/run:/var/run \
  nginx:latest
```
*(Note: You must map temporary volumes to specific directories the app needs to write to).*

## Health Checks

A container might be "running" (Process ID exists), but the application inside it might be frozen or returning 500 errors. 

Docker allows you to define native Health Checks. The Docker daemon will periodically run a command inside the container to verify the app is actually alive.

```dockerfile
# Inside a Dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
```

If the `curl` command fails, Docker marks the container as `unhealthy`, allowing orchestrators like Docker Swarm or Kubernetes to automatically restart it.
