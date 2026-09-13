# Advanced Podman

Podman's most distinct feature over Docker is its native concept of **Pods**. 

## What is a Pod?

If you are familiar with Kubernetes, a Podman Pod is the exact same concept. A pod is a group of one or more containers that share the same network, IPC, and PID namespaces.

In Docker, if you want a web server container and a database container to talk to each other, you put them on a bridge network and they resolve each other via DNS.

In Podman, if you put them in a Pod, they literally share `localhost`. The web server container can connect to the database container using `localhost:5432`.

### Creating and Managing Pods

```bash
# 1. Create an empty Pod, mapping port 8080 on the host to the Pod
podman pod create --name my-app-pod -p 8080:80

# 2. Add a backend database to the Pod
podman run -d --pod my-app-pod --name db postgres:15

# 3. Add a frontend API to the Pod (it connects to the DB via localhost!)
podman run -d --pod my-app-pod --name api my-api-image:latest
```

When you inspect `podman ps`, you will see a hidden "Infra" container (usually using the `pause` image). This container does nothing but hold the Network Namespace open for the other containers in the pod to attach to.

## Migrating to Kubernetes

Because Podman understands the concept of Pods natively, it is designed to be a stepping stone to Kubernetes. 

If you build an architecture using Podman Pods on a single server, and eventually outgrow it and decide to migrate to a massive Kubernetes cluster, Podman will write the Kubernetes YAML files for you!

```bash
# Generate Kubernetes standard YAML from a local Podman pod
podman generate kube my-app-pod > deployment.yaml
```
You can take that `deployment.yaml` and run `kubectl apply -f deployment.yaml` directly on an OpenShift or Kubernetes cluster, and it will deploy the exact same architecture.

*(Note: Just like `generate systemd`, the `generate kube` command is extremely useful for generating boilerplate, but for complex deployments you should write your Kubernetes manifests by hand or use Helm).*

## Auto-Updates

Because Podman relies on systemd for lifecycle management, it also integrates with systemd timers to automatically update containers!

If you add a specific label to your container when running it:
```bash
podman run -d --label "io.containers.autoupdate=registry" --name my-web nginx:latest
```

And you enable the systemd auto-update timer:
```bash
systemctl enable --now podman-auto-update.timer
```

Podman will wake up every midnight, check the registry for a new `nginx:latest` image, download it, safely restart the container using the new image, and clean up the old image automatically.
