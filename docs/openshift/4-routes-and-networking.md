# Routes and Networking

In standard Kubernetes, you expose services to the internet using an `Ingress` object. While OpenShift *supports* standard Ingress objects for backwards compatibility, its native and preferred method for external routing is the **Route** object.

## OpenShift Routes vs Kubernetes Ingress

Routes existed in OpenShift long before the K8s community standardized the Ingress object. 
A Route is processed by the **OpenShift Router** (which is essentially an HAProxy load balancer running as pods inside the cluster).

Routes are generally easier to configure than Ingress objects and offer native TLS termination strategies out of the box.

### Exposing a Service

The fastest way to generate a Route and expose an internal service to the public internet is using the `oc expose` command.

```bash
# Assuming you have a Service named 'frontend'
oc expose svc/frontend

# View the generated URL
oc get route
```

By default, OpenShift will automatically generate a DNS hostname for your route based on the service name, project name, and the cluster's base domain (e.g., `frontend-myproject.apps.cluster.example.com`).

### Specifying a Custom Hostname

If you want to use a specific domain name, you can pass it to the expose command:
```bash
oc expose svc/frontend --hostname=www.mycompany.com
```

## TLS Termination Strategies

Securing your routes with HTTPS is handled entirely by the HAProxy router. OpenShift supports three distinct TLS termination strategies:

### 1. Edge Termination
The TLS connection is terminated at the OpenShift Router. The traffic from the client to the router is encrypted (HTTPS), but the traffic from the router to your actual pod is unencrypted (HTTP). 
- **Use case:** Standard web applications where internal cluster traffic is trusted.

```bash
oc create route edge --service=frontend --hostname=www.example.com
```

### 2. Passthrough Termination
The OpenShift Router does *not* decrypt the traffic. It simply forwards the encrypted TCP stream directly to your pod. Your pod must have its own SSL certificates mounted to terminate the connection.
- **Use case:** Strict security compliance requirements where traffic must remain encrypted until it hits the application code.

```bash
oc create route passthrough --service=secure-app
```

### 3. Re-encrypt Termination
A hybrid approach. The OpenShift Router terminates the external TLS connection using its public certificate, but then *re-encrypts* the traffic using an internal cluster certificate before sending it to your pod.
- **Use case:** High security requirements without forcing the application developers to manage public SSL certificates inside their containers.

```bash
oc create route reencrypt --service=secure-app
```
