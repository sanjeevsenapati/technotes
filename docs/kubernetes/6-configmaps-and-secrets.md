# 6. ConfigMaps & Secrets

The Twelve-Factor App methodology states that configuration should be strictly separated from code. Kubernetes provides **ConfigMaps** and **Secrets** to achieve this.

## ConfigMaps

A ConfigMap is an API object used to store non-confidential data in key-value pairs. Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "debug"
  APP_ENV: "production"
```

## Secrets

Secrets are similar to ConfigMaps but are specifically intended to hold confidential data, such as passwords, OAuth tokens, and SSH keys.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=    # "admin" base64 encoded
  password: cGFzc3dvcmQxMjM= # "password123" base64 encoded
```

::: danger
By default, Kubernetes Secrets are stored unencrypted in `etcd` (they are only base64 encoded). Always enable encryption at rest for `etcd` in production environments, or use external secret management systems like HashiCorp Vault or AWS Secrets Manager via the External Secrets Operator.
:::

## Injecting into a Pod

You can inject these objects into a Pod as Environment Variables:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: my-app-container
    image: my-app:latest
    env:
      - name: LOG_LEVEL
        valueFrom:
          configMapKeyRef:
            name: app-config
            key: LOG_LEVEL
      - name: DB_PASS
        valueFrom:
          secretKeyRef:
            name: db-credentials
            key: password
```

### Common Commands

Create a ConfigMap from a file:
```bash
kubectl create configmap app-config --from-file=config.properties
```

Create a Secret from a literal value:
```bash
kubectl create secret generic db-credentials --from-literal=password=supersecret
```
