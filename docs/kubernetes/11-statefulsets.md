# 11. StatefulSets

Deployments and ReplicaSets are designed for **stateless** applications. They assume all Pods are identical and interchangeable. But what if you are running a database (like PostgreSQL, Cassandra, or Kafka) where identity and persistent storage matter?

This is where **StatefulSets** come in.

## Characteristics of a StatefulSet

1. **Stable Network Identity**: Each Pod in a StatefulSet derives its hostname from the name of the StatefulSet and the ordinal of the Pod (e.g., `web-0`, `web-1`, `web-2`).
2. **Stable Storage**: Each Pod gets its own PersistentVolumeClaim (PVC). If `web-1` dies, the replacement Pod will be named `web-1` and it will automatically re-attach to the exact same PVC that the old `web-1` used.
3. **Ordered Deployment and Scaling**: Pods are created sequentially (`web-0`, then `web-1`). If you scale down, they are terminated in reverse order.

## Example YAML

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: "nginx"
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: registry.k8s.io/nginx-slim:0.24
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi
```

Notice the `volumeClaimTemplates` section. Instead of pointing all Pods to the same PVC, the StatefulSet uses this template to generate a unique PVC for each individual Pod.

::: tip
StatefulSets require a **Headless Service** (a Service with `clusterIP: None`) to control the domain of the Pods and provide stable network identities.
:::
