---
layout: home

hero:
  name: TechNotes
  text: Practical Engineering Documentation
  tagline: Commands, configurations, troubleshooting guides, and production-ready engineering notes.
  actions:
    - theme: brand
      text: Search documentation...
      link: /linux/fundamentals

features:
  - title: 🐧 Linux
    details: System fundamentals, permissions, systemd, disk management, and core OS troubleshooting.
    link: /linux/fundamentals
  - title: 🐚 Bash & Shell
    details: Scripting basics, text processing, sed, awk, jq, and production automation scripts.
    link: /shell/bash-basics
  - title: ☸️ Kubernetes
    details: Architecture, pods, deployments, services, networking, RBAC, and cluster troubleshooting.
    link: /kubernetes/fundamentals
  - title: 🐳 Docker
    details: Containerization, image building, networking, volumes, registries, and docker-compose.
---

## Quick Commands

Here are some frequently used commands for rapid reference:

```bash
ps aux
ss -lntp
df -h
free -m
top
curl -v https://example.com
kubectl get pods -A
docker ps
```

## Recommended Learning Paths

If you are new to DevOps or System Administration, follow this learning path:

1. **Linux Fundamentals** -> Start with the core OS concepts.
2. **Shell Scripting** -> Automate basic tasks and manipulate text.
3. **Containers (Docker/Podman)** -> Isolate applications.
4. **Kubernetes** -> Orchestrate containers at scale.
5. **Observability** -> Monitor and troubleshoot production systems.

## Recently Added Topics

- [Kubernetes Pods](/kubernetes/2-pods)
- [Linux File Permissions](/linux/files-and-directories)
- [Bash Variables Guide](/shell/variables)
