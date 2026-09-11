# 10. Advanced Scheduling

By default, the `kube-scheduler` evenly distributes Pods across your worker nodes based on resource availability. However, in advanced or production scenarios, you may need more granular control over where your Pods land.

## 1. Node Selectors

The simplest way to schedule a Pod to a specific node is using a `nodeSelector`. 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ssd-pod
spec:
  containers:
  - name: nginx
    image: nginx
  nodeSelector:
    disktype: ssd
```

The Pod will only be scheduled onto nodes that have the label `disktype=ssd`.

## 2. Node Affinity

Node affinity is conceptually similar to `nodeSelector` but provides much more expressive syntax.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: with-node-affinity
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: topology.kubernetes.io/zone
            operator: In
            values:
            - us-east-1a
            - us-east-1b
  containers:
  - name: nginx
    image: nginx
```

## 3. Taints and Tolerations

Node affinity is a property of Pods that attracts them to a set of nodes. **Taints** are the opposite—they allow a node to repel a set of Pods.

**Tolerations** are applied to Pods and allow (but do not require) the Pods to schedule onto nodes with matching taints.

### Example

1. Taint a node so no normal Pods can schedule on it:
```bash
kubectl taint nodes node1 key1=value1:NoSchedule
```

2. Add a toleration to a Pod so it can tolerate that taint:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: nginx
    image: nginx
  tolerations:
  - key: "key1"
    operator: "Equal"
    value: "value1"
    effect: "NoSchedule"
```

## 4. Pod Affinity and Anti-Affinity

These allow you to constrain which nodes your Pod is eligible to be scheduled based on the labels of **Pods that are already running on the node**, rather than the labels on nodes.

- **Pod Affinity**: "Place this Pod near Pod X." (e.g., place a frontend Pod near the backend cache Pod to reduce latency).
- **Pod Anti-Affinity**: "Do not place this Pod near Pod X." (e.g., ensure replicas of a database Pod are on different nodes for high availability).
