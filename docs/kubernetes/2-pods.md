# 2. Pods

A **Pod** is the smallest and simplest deployable object in Kubernetes. It represents a single instance of a running process in your cluster.

## What is a Pod?

Pods contain one or more containers, such as Docker containers. When a Pod runs multiple containers, the containers are managed as a single entity and share the Pod's resources.

### Characteristics of a Pod:
1. **Ephemeral**: Pods are designed to be relatively ephemeral (short-lived). If a node dies, the Pods scheduled to that node are deleted.
2. **Shared Network**: All containers in a Pod share the same IP address and port space. They can communicate with each other using `localhost`.
3. **Shared Storage**: Containers in a Pod can share storage volumes.

## Creating a Pod

Here is a simple example of a Pod definition (`pod.yaml`) running an NGINX web server:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: web
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
    ports:
    - containerPort: 80
```

### Common Commands

Apply the configuration:
```bash
kubectl apply -f pod.yaml
```

List running Pods:
```bash
kubectl get pods
```

View detailed information about a Pod:
```bash
kubectl describe pod nginx-pod
```

View logs of a container inside the Pod:
```bash
kubectl logs nginx-pod
```

::: warning
You should almost **never** create individual Pods directly in production. Instead, use workload resources like `Deployments` or `StatefulSets` to manage them, which provide self-healing and scaling capabilities.
:::
