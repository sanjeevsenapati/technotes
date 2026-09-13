# Architecture and Differences

Red Hat OpenShift is an enterprise-ready container platform built on top of Kubernetes. While Kubernetes provides the core orchestration engine, OpenShift adds opinionated developer tools, strict security defaults, and integrated CI/CD pipelines.

## What is OpenShift?

OpenShift comes in two primary flavors:
- **OCP (OpenShift Container Platform):** The commercial, supported product from Red Hat.
- **OKD (Origin Community Distribution):** The upstream, open-source community version of OpenShift (formerly called OpenShift Origin).

### Core Differences from Vanilla Kubernetes

If you already know Kubernetes, here are the major differences you will encounter in OpenShift:

1. **Security by Default:** OpenShift restricts containers from running as `root` right out of the box using Security Context Constraints (SCC).
2. **Projects vs Namespaces:** OpenShift extends K8s namespaces into "Projects" which have built-in annotations and user access controls.
3. **Routes vs Ingress:** While K8s uses Ingress, OpenShift uses "Routes" (backed by HAProxy) to expose services to the outside world.
4. **Integrated Registry & Builds:** OpenShift has an internal container registry and native resources for building images from source code (BuildConfigs and Source-to-Image).
5. **Web Console:** OpenShift ships with a highly advanced, dual-perspective (Developer vs Administrator) web console out of the box.

## The `oc` CLI vs `kubectl`

The primary command-line tool for OpenShift is `oc`. 

Because OpenShift is fully compliant Kubernetes, **`oc` is completely backwards compatible with `kubectl`**. Every `kubectl` command works exactly the same in `oc`. However, `oc` adds commands specifically for OpenShift features.

```bash
# These commands do exactly the same thing
kubectl get pods
oc get pods

# This command ONLY works in OpenShift (creates a new Project)
oc new-project my-app
```

### Authentication and Contexts

In vanilla K8s, you manually manage your `~/.kube/config` file. In OpenShift, you typically log in dynamically via an API endpoint.

```bash
# Log into the cluster (prompts for username/password or a token)
oc login https://api.mycluster.example.com:6443

# Check who you are currently logged in as
oc whoami

# Check your current session context
oc config current-context
```

### The `oc new-app` Magic

OpenShift is designed to make deploying apps effortless for developers. The `oc new-app` command can take a Git repository, automatically detect the language (Node, Python, Java), build the container image via S2I (Source-to-Image), deploy it, and spin up the pods—all in one command.

```bash
# Deploy an application directly from source code
oc new-app https://github.com/sclorg/nodejs-ex.git
```
