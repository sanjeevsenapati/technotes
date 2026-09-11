# 9. RBAC (Role-Based Access Control)

RBAC is a method of regulating access to computer or network resources based on the roles of individual users within an enterprise. In Kubernetes, it is used to control what users and applications can do within the cluster.

## Key Concepts

1. **Role**: Defines a set of permissions (e.g., "can get and list Pods"). Roles are scoped to a specific Namespace.
2. **ClusterRole**: Same as a Role, but scoped globally to the entire cluster.
3. **Subject**: The entity receiving the permissions (e.g., a User, Group, or ServiceAccount).
4. **RoleBinding / ClusterRoleBinding**: The glue that binds a Role to a Subject.

## Example: Granting Read-Only Access

First, create the **Role**:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

Second, create the **RoleBinding** to grant this role to a specific user named "jane":

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jane
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### ServiceAccounts

A `ServiceAccount` provides an identity for processes that run in a Pod. If your application needs to talk to the Kubernetes API (e.g., to list other Pods), you assign a ServiceAccount to the Pod, and use RBAC to grant permissions to that ServiceAccount.

::: important
Always operate under the principle of least privilege. Do not give `cluster-admin` privileges to applications or users unless absolutely necessary.
:::
