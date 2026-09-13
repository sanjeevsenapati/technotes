# Container Storage

Containers are inherently ephemeral. When a container is deleted, the Read/Write layer on top of the image is destroyed permanently. To persist data (like a database, or user uploads), you must mount storage from the host machine.

## 1. Bind Mounts

A bind mount directly maps a specific directory on your host machine to a directory inside the container. 

```bash
docker run -d \
  -v /var/log/my-app:/app/logs \
  nginx
```

**When to use them:**
- Local development (mounting your source code into the container so changes reflect instantly).
- Injecting static configuration files (like `nginx.conf`).

**The Permission Problem (UID/GID Mismatch):**
The biggest issue with bind mounts is permissions. If the container process runs as user `node` (UID 1000), but the directory on your host is owned by `root` (UID 0), the container will crash with a "Permission Denied" error when trying to write to the mount. You must ensure the ownership on the host matches the UID expected inside the container.

## 2. Named Volumes (Managed Storage)

Instead of hardcoding a host path, you can ask Docker to manage the storage location for you. This creates a "Named Volume". Docker stores these volumes deep in its own private directory (usually `/var/lib/docker/volumes/`).

```bash
# Create the volume explicitly
docker volume create pgdata

# Mount it to the container
docker run -d \
  -v pgdata:/var/lib/postgresql/data \
  postgres:15
```

**When to use them:**
- Databases! This is the gold standard for stateful applications.
- When you want Docker to abstract away the underlying file permissions.

### Backing Up a Named Volume
Because named volumes are abstracted, the safest way to back them up is to run a temporary container that mounts *both* the volume and your local host directory, and creates a tarball.

```bash
# Backup 'pgdata' to a tar file in your current directory
docker run --rm \
  -v pgdata:/volume \
  -v $(pwd):/backup \
  alpine tar -czvf /backup/pgdata_backup.tar.gz -C /volume .
```

## 3. tmpfs Mounts (RAM Storage)

A `tmpfs` mount is not saved on disk at all. It is strictly stored in the host machine's RAM.

```bash
docker run -d \
  --tmpfs /app/secrets \
  my-secure-app
```

**When to use them:**
- Storing highly sensitive cryptographic keys or passwords that the application needs to read, but you absolutely do not want written to a physical spinning disk or SSD where they could be recovered later.
- High-speed cache directories where I/O performance is critical, and losing the data on reboot is acceptable.
