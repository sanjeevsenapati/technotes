# Advanced Security & Configuration

Running containers locally is simple, but running them securely in production requires dropping capabilities, restricting filesystems, and applying security profiles.

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

### 3. AppArmor and Seccomp Profiles
Docker automatically applies a default `seccomp` profile that disables roughly 44 of the 300+ available Linux system calls, preventing containers from doing things like altering the system clock or loading kernel modules.

You can apply custom, stricter security profiles:
```bash
docker run -d --security-opt seccomp=/path/to/custom-profile.json my-app
```

## Health Checks

A container might be "running" (Process ID exists), but the application inside it might be frozen or returning 500 errors. 

Docker allows you to define native Health Checks. The Docker daemon will periodically run a command inside the container to verify the app is actually alive.

```dockerfile
# Inside a Dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
```

If the `curl` command fails, Docker marks the container as `unhealthy`, allowing orchestrators like Docker Swarm or Kubernetes to automatically restart it.
