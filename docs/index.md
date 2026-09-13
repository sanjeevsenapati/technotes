---
layout: home

hero:
  name: TechNotes
  text: The Engineer's Dashboard
  tagline: Production-ready documentation, core system fundamentals, and copy-paste cheatsheets.
  actions:
    - theme: brand
      text: 🔍 Search the Docs...
      link: /linux/fundamentals
    - theme: alt
      text: Browse Shell Guides →
      link: /shell/bash-basics

features:
  - title: 🐧 Linux Systems
    details: Deep dives into Kernel space, LVM storage arrays, package management, and systemd services.
    link: /linux/fundamentals
  - title: 🐚 Advanced Shell
    details: Masterclass guides on grep, sed, awk, regex, and building robust automation scripts.
    link: /shell/bash-basics
  - title: ☸️ Kubernetes
    details: Architectural diagrams, ReplicaSets, Ingress networking, and advanced RBAC troubleshooting.
    link: /kubernetes/1-architecture
  - title: 🐳 Containers
    details: Isolation fundamentals, building minimal Docker images, and managing rootless Podman.
    link: /containers/1-fundamentals
---

## ⚡ Daily Cheatsheet

Quick access to commands you need right now.

::: code-group

```bash [System]
# Find what process is listening on port 8080
sudo ss -tulpn | grep 8080

# Find directories larger than 1GB
sudo du -h -d 1 / | grep G

# Watch real-time system logs
journalctl -f -n 100
```

```bash [Kubernetes]
# Get all failing pods across the entire cluster
kubectl get pods -A | grep -v Running

# Force delete a stuck namespace
kubectl delete namespace <name> --grace-period=0 --force

# Decode a base64 secret on the fly
kubectl get secret my-secret -o jsonpath='{.data.password}' | base64 --decode
```

```bash [Text/Parsing]
# Extract the 3rd column of a CSV file
awk -F',' '{print $3}' data.csv

# Find and replace "foo" with "bar" in all config files recursively
find . -name "*.conf" -exec sed -i 's/foo/bar/g' {} +
```

:::

<br>

## 📚 Recently Updated Topics

Stay up to date with the newest deep dives added to the documentation:

| Topic | Category | Description |
|-------|----------|-------------|
| **[Storage & LVM](/linux/storage-and-lvm)** | Linux | Managing ext4/xfs filesystems and resizing Logical Volumes on the fly. |
| **[Awk Masterclass](/shell/awk)** | Shell | Leveraging the awk programming language for complex data aggregation. |
| **[Processes & Services](/linux/processes-and-services)** | Linux | Managing background daemons and writing custom `systemd` unit files. |
| **[Networking](/linux/networking)** | Linux | Subnetting, supernetting, CIDR blocks, and using the `ipcalc` utility. |

---

<p align="center" style="opacity: 0.7; font-size: 0.9em;">
  Built for reliability. Run exactly as written.
</p>
