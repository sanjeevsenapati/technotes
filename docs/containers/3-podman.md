# 3. Podman

Podman (Pod Manager) is a daemonless, open-source, Linux-native tool designed to make it easy to find, run, build, share, and deploy applications using OCI (Open Container Initiative) containers.

## Podman vs Docker

While Docker is excellent, Podman was created by Red Hat to address two specific architectural concerns with Docker:

1. **Daemonless**: Podman does not require a background daemon. It interacts directly with the image registry and container runtime. If the Podman command stops, the container keeps running independently under the user's process tree.
2. **Rootless by Default**: Podman allows standard, non-root users to run containers. This vastly improves the security posture of the host system.

```mermaid
flowchart LR
    subgraph Docker
        CLI[Docker CLI] -->|Talks to| D[Docker Daemon (Root)]
        D --> C[Container]
    end

    subgraph Podman
        P[Podman CLI (User)] --> C2[Container (User space)]
    end
```

## Drop-in Replacement

Podman's CLI is intentionally identical to Docker's. You can simply alias it:

```bash
alias docker=podman
```

All the standard commands (`run`, `build`, `ps`, `exec`) work exactly the same way.

## Pods in Podman

As the name suggests, Podman natively supports **Pods**—the same concept used in Kubernetes (a group of containers sharing the same network, pid, and ipc namespaces). You can create and test Pods locally before migrating them to Kubernetes.

```bash
# Create an empty pod
podman pod create --name mypod -p 8080:80

# Run a container inside that pod
podman run -d --pod mypod nginx
```
