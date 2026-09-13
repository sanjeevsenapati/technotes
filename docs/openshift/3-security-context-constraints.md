# Security Context Constraints (SCC)

One of the most common hurdles for newcomers migrating applications from Vanilla Kubernetes to OpenShift is that **their pods immediately crash with a "Permission Denied" error.**

This happens because of **Security Context Constraints (SCC)**.

## What is an SCC?

An SCC is an OpenShift-specific admission controller that dictates exactly what a pod is allowed to do. 

By default, OpenShift applies the `restricted` SCC to all pods. The `restricted` SCC ensures that:
1. **The pod cannot run as `root` (UID 0).** OpenShift will literally force the container to run as a randomly assigned high-number User ID (e.g., UID 1000670000).
2. **The pod cannot bind to privileged ports** (any port below 1024, such as 80 or 443).
3. **The pod cannot access the host network or host filesystem.**

## Resolving Permission Issues

If your container image has hardcoded assumptions that it will run as `root` (like trying to write to `/var/run` or binding to port 80), it will fail to start in OpenShift.

### Option 1: Fix the Container Image (Best Practice)
The true cloud-native solution is to rebuild your container image so that it does not require root. Use high ports (e.g., 8080 instead of 80) and write logs to `stdout` or directories where any user has write access (like `/tmp`).

### Option 2: Grant the Pod Access to the `anyuid` SCC
If you are running a third-party image (like an older version of Nginx or PostgreSQL) and cannot change the Dockerfile to run as non-root, you can bypass the restriction by granting the pod's **ServiceAccount** access to the `anyuid` SCC.

The `anyuid` SCC allows a container to run as the User ID specified in its Dockerfile (including `root`).

```bash
# 1. Create a dedicated ServiceAccount in your project
oc create serviceaccount my-app-sa

# 2. Grant the 'anyuid' SCC to the ServiceAccount (Requires cluster-admin)
oc adm policy add-scc-to-user anyuid -z my-app-sa

# 3. Update your Deployment to use the ServiceAccount
oc set serviceaccount deployment/my-app my-app-sa
```
*(Note: The `-z` flag targets a ServiceAccount in the current namespace, rather than a normal human user).*

## Highly Privileged Pods

Sometimes you need to run infrastructure-level agents (like logging collectors or security scanners) that require full access to the underlying worker node's host paths or network.

For these pods, you must grant the `privileged` SCC.

> [!CAUTION]
> The `privileged` SCC effectively grants the container root access to the physical host machine. Never grant this to standard application workloads.

```bash
# Grant the 'privileged' SCC to a daemonset's ServiceAccount
oc adm policy add-scc-to-user privileged -z logging-sa
```
