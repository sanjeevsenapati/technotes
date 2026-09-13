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
  - title: 🐙 Git Version Control
    details: The three trees, branching, rebasing, cherry-picking, and reflog recovery.
    link: /git/1-fundamentals
  - title: 🟢 Nginx
    details: Reverse proxies, load balancing algorithms, SSL termination, and microcaching.
    link: /nginx/1-fundamentals
  - title: ☸️ Kubernetes
    details: Architectural diagrams, ReplicaSets, Ingress networking, and advanced RBAC troubleshooting.
    link: /kubernetes/1-architecture
  - title: 🐳 Container Mastery
    details: Namespaces, cgroups, multi-stage builds, rootless Podman, and systemd integration.
    link: /containers/1-fundamentals
  - title: 🛑 OpenShift
    details: Enterprise Kubernetes features, SCC security restrictions, Routes, and BuildConfigs.
    link: /openshift/1-architecture-and-differences
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
| **[Docker Compose](/containers/4-docker-compose)** | Containers | Defining IaC deployments and understanding internal Docker DNS resolution. |
| **[Advanced Podman](/containers/9-podman-advanced)** | Containers | Building Kubernetes-style Pods and configuring systemd auto-updates. |
| **[Python One-Liners](/python/1-one-liners)** | Python | Shell replacements using `python -c` for JSON parsing, base64, and math. |
| **[Nginx Load Balancing](/nginx/2-reverse-proxy-and-load-balancing)** | Nginx | Configuring `proxy_pass` and `least_conn` vs `ip_hash` load balancing algorithms. |
| **[Advanced Git](/git/4-advanced-workflows)** | Git | Rewriting history safely using rebasing, cherry-picking, and `reflog`. |
| **[OpenShift SCCs](/openshift/3-security-context-constraints)** | OpenShift | Why pods crash with "Permission Denied" and how to fix them using `anyuid`. |
| **[OpenShift Routes](/openshift/4-routes-and-networking)** | OpenShift | Exposing services and configuring edge vs passthrough TLS termination. |

---

<p align="center" style="opacity: 0.7; font-size: 0.9em;">
  Built for reliability. Run exactly as written.
</p>
