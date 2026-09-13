# Projects and Users

In vanilla Kubernetes, environments are isolated using Namespaces. In OpenShift, Namespaces are wrapped in a higher-level object called a **Project**.

## Projects vs Namespaces

A Project is essentially a K8s Namespace with extra annotations. These annotations allow OpenShift to enforce Quotas and isolate network traffic between different teams.

When you create a Project, OpenShift automatically creates the underlying Namespace for you.

```bash
# Create a new project (this also switches your context to the new project)
oc new-project frontend-dev

# Switch between projects (similar to changing namespaces)
oc project backend-prod

# List all projects you have access to
oc get projects
```

> [!TIP]
> While `kubectl get namespaces` requires cluster-admin privileges to see all namespaces, `oc get projects` will securely return ONLY the projects that your specific user account is allowed to see.

## User Management and RBAC

OpenShift uses standard Kubernetes Role-Based Access Control (RBAC), but it provides powerful wrapper commands in the `oc adm` (admin) utility to make assigning permissions significantly easier than writing YAML manifests manually.

### Core Roles
OpenShift has three primary default cluster roles that you will assign to users within a project:
- **admin:** Can manage everything in the project (pods, services, roles), but cannot alter quotas.
- **edit:** Can modify most objects (pods, services) but cannot alter roles or bindings.
- **view:** Can read objects but cannot modify them.

### Assigning Roles to Users

If you want to grant a user named "alice" edit access to the current project:

```bash
# Add the 'edit' role to 'alice' in the current project
oc adm policy add-role-to-user edit alice

# Add the 'admin' role to 'bob' in a specific project
oc adm policy add-role-to-user admin bob -n backend-prod
```

### Managing Groups

In large organizations, assigning permissions per-user is unmanageable. OpenShift allows you to create **Groups** and assign permissions to the entire group.

```bash
# Create a group called 'developers'
oc adm groups new developers

# Add 'alice' and 'bob' to the developers group
oc adm groups add-users developers alice bob

# Grant the entire group 'view' access to the project
oc adm policy add-role-to-group view developers
```

### Checking Access

You can impersonate a user (if you are an admin) or ask OpenShift to evaluate if you have permission to perform an action using the `auth can-i` command.

```bash
# Can I delete pods in the current project?
oc auth can-i delete pods

# Can user 'alice' create secrets in the 'frontend-dev' project?
oc auth can-i create secrets --as=alice -n frontend-dev
```
