# Builds and Deployments

Unlike Vanilla Kubernetes which expects you to build your container images externally (using Docker/Podman, Jenkins, or GitHub Actions) and push them to a registry, **OpenShift can build source code into container images directly inside the cluster.**

## ImageStreams (IS)

An **ImageStream** does not contain actual image data. Instead, it is a pointer or alias to a container image located in the internal OpenShift registry or an external registry (like Docker Hub).

ImageStreams provide powerful abstraction. If you tell your deployment to watch an ImageStream, OpenShift can automatically trigger a rolling update the moment a new image is pushed to that stream.

```bash
# List all ImageStreams in the project
oc get is
```

## BuildConfigs (BC)

A **BuildConfig** defines the process of transforming source code into a runnable container image. 

The most powerful build strategy in OpenShift is **S2I (Source-to-Image)**. S2I takes your raw application source code (e.g., a Python Flask app), injects it into a "builder image", compiles it, and outputs a final, ready-to-run container image into an ImageStream.

```bash
# Start a build manually from an existing BuildConfig
oc start-build my-app-build

# Watch the build logs stream in real-time
oc logs -f bc/my-app-build
```

BuildConfigs can be triggered automatically via Webhooks (e.g., every time a developer merges code into the `main` branch on GitHub, GitHub pings OpenShift, which starts a new build).

## DeploymentConfigs (DC) vs Deployments

When reading older OpenShift tutorials, you will heavily see `DeploymentConfig` (DC). 

A `DeploymentConfig` is an OpenShift-specific resource that predates the standard K8s `Deployment`. DCs were tightly integrated with ImageStreams to trigger automatic rollouts when new images were built.

> [!WARNING]
> **DeploymentConfigs are deprecated in modern OpenShift (OCP 4.x+).** You should use standard Kubernetes `Deployment` objects for all modern workloads. 

Standard K8s `Deployments` have fully caught up in functionality and are the industry standard. OpenShift now natively supports triggering K8s Deployments via ImageStream changes.

```bash
# Scale a standard deployment
oc scale deployment/my-app --replicas=3

# View the rollout history
oc rollout history deployment/my-app
```
