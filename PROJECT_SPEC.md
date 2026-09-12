# Project: Technical Documentation & Engineering Knowledge Portal

Build a modern, professional, extremely reader-friendly **technical documentation website** for system administrators, DevOps engineers, SREs, developers, cloud engineers, and infrastructure engineers.

The website will contain practical documentation, commands, examples, troubleshooting guides, architecture explanations, configuration references, and engineering notes for technologies such as:

- Linux
- Shell / Bash scripting
- Git
- Docker
- Podman
- Kubernetes
- Helm
- Nginx
- Networking
- SSL/TLS
- DNS
- PostgreSQL
- Oracle
- Redis
- Kafka
- CI/CD
- GitLab
- GitHub
- ArgoCD
- Prometheus
- Grafana
- OpenTelemetry
- Java / Spring Boot
- Go / Golang
- Rust
- Microservices
- Cloud Native
- DevOps
- SRE
- Production Support
- Troubleshooting
- Performance Engineering
- Security

The site must be designed primarily for **reading and quickly finding technical information**, rather than looking like a generic corporate website.

---

## 1. Core Requirement

The final website must be a:

**Static HTML website after build/rendering.**

The deployed output must contain static assets that can be hosted directly on:

- GitHub Pages
- GitLab Pages
- Nginx
- Apache
- S3-compatible object storage
- Cloudflare Pages
- Any static web server

There must be **no backend server requirement at runtime**.

If a framework is used during development/build, generate a completely static production build.

---

# 2. Design Philosophy

The most important requirement is:

> Make technical documentation comfortable to read for long periods.

Avoid flashy startup-style designs.

The UI should feel like a combination of:

- High-quality engineering documentation
- Developer portal
- Linux man pages
- Modern documentation systems
- IDE/code-editor aesthetics
- Clean technical knowledge base

Prioritize:

1. Readability
2. Navigation
3. Search
4. Code readability
5. Information hierarchy
6. Fast loading
7. Accessibility
8. Mobile responsiveness

---

# 3. Visual Theme

Create a clean, elegant technical theme.

Use:

- Soft background
- High contrast readable text
- Excellent typography
- Comfortable line spacing
- Subtle borders
- Minimal shadows
- Rounded corners where appropriate
- Clear headings
- Monospace fonts for commands/code
- Plenty of whitespace

Avoid:

- Excessive gradients
- Huge hero sections
- Excessive animations
- Distracting illustrations
- Large empty spaces
- Overly colorful cards
- Excessive glassmorphism

The site should look like a serious engineering reference portal.

---

# 4. Theme Modes

Support:

### Light Mode

Comfortable off-white documentation background rather than pure white.

### Dark Mode

A professional dark developer theme with comfortable contrast.

### System Mode

Automatically follow OS preference.

Provide a visible theme toggle.

Persist the user's preference using localStorage.

---

# 5. Main Layout

Use a three-column documentation layout on desktop:

```text
┌─────────────────────────────────────────────────────────────┐
│ Logo / Site Name     Search             Theme / GitHub      │
├──────────────┬───────────────────────────────┬──────────────┤
│              │                               │              │
│ LEFT SIDEBAR │       DOCUMENTATION           │ ON THIS PAGE │
│              │                               │              │
│ Categories   │       Article                 │ Headings     │
│ Navigation   │                               │              │
│              │       Code blocks             │              │
│              │       Examples                │              │
│              │       Notes                   │              │
│              │       Tables                  │              │
│              │                               │              │
└──────────────┴───────────────────────────────┴──────────────┘
```

On mobile:

```text
Header
Search
Article
Floating/expandable navigation
```

The left navigation should become a drawer.

The right "On This Page" navigation can become a collapsible section.

---

# 6. Header

Create a sticky header.

Include:

### Left

Site logo/name:

**TechNotes**

Subtitle:

**Practical Engineering Documentation**

Make the site name configurable.

### Center

Global search box:

```text
Search documentation...
```

Support keyboard shortcut:

```text
⌘ K
```

on macOS and:

```text
Ctrl K
```

on Windows/Linux.

### Right

Include:

- Theme toggle
- GitHub/source link
- Version selector if required
- Menu button on mobile

---

# 7. Documentation Categories

Create a well-organized sidebar.

Example:

```text
HOME

LINUX
  ├── Linux Fundamentals
  ├── Files & Directories
  ├── Users & Groups
  ├── Permissions
  ├── Processes
  ├── Services
  ├── Systemd
  ├── Networking
  ├── Disk Management
  ├── Memory
  ├── CPU
  ├── Logs
  └── Troubleshooting

SHELL
  ├── Bash Basics
  ├── Variables
  ├── Conditions
  ├── Loops
  ├── Functions
  ├── Arrays
  ├── Text Processing
  ├── sed
  ├── awk
  ├── grep
  ├── jq
  ├── Shell Scripting
  └── Production Scripts

CONTAINERS
  ├── Docker
  ├── Podman
  ├── Container Networking
  ├── Volumes
  ├── Images
  ├── Registries
  └── Troubleshooting

KUBERNETES
  ├── Fundamentals
  ├── Architecture
  ├── Pods
  ├── Deployments
  ├── Services
  ├── ConfigMaps
  ├── Secrets
  ├── Ingress
  ├── Storage
  ├── RBAC
  ├── Scheduling
  ├── Probes
  ├── Networking
  ├── Operators
  ├── Controllers
  ├── CRDs
  └── Troubleshooting

NGINX
  ├── Configuration
  ├── Reverse Proxy
  ├── SSL/TLS
  ├── Load Balancing
  ├── Rate Limiting
  ├── Headers
  ├── Rewrite
  └── Troubleshooting

NETWORKING
  ├── TCP/IP
  ├── HTTP
  ├── DNS
  ├── TLS
  ├── Ports
  ├── Routing
  ├── curl
  ├── netstat
  ├── ss
  └── tcpdump

DATABASE
  ├── PostgreSQL
  ├── Oracle
  ├── Redis
  └── Database Troubleshooting

DEVOPS
  ├── Git
  ├── CI/CD
  ├── GitLab
  ├── GitHub
  ├── Helm
  ├── ArgoCD
  └── GitOps

OBSERVABILITY
  ├── Prometheus
  ├── Grafana
  ├── OpenTelemetry
  ├── Jaeger
  └── Logging

PROGRAMMING
  ├── Go
  ├── Rust
  ├── Java
  └── Spring Boot

MICROSERVICES
  ├── Architecture
  ├── API Gateway
  ├── Service Discovery
  ├── Resilience
  ├── Distributed Systems
  └── Performance

SECURITY
  ├── Linux Security
  ├── TLS
  ├── Certificates
  ├── Secrets
  ├── Kubernetes Security
  └── Hardening

PRODUCTION SUPPORT
  ├── Incident Management
  ├── RCA
  ├── Troubleshooting
  ├── Monitoring
  ├── Performance
  ├── Deployment
  └── Disaster Recovery
```

Make the navigation data-driven so categories and pages can easily be added later.

---

# 8. Homepage

Create a useful documentation homepage rather than a marketing landing page.

Hero section:

```text
Practical Engineering Documentation

Commands, configurations, troubleshooting guides
and production-ready engineering notes.

[ Search documentation... ]
```

Below it show:

### Popular Topics

Cards for:

- Linux
- Bash
- Kubernetes
- Docker
- Nginx
- Networking
- Git
- DevOps
- Databases
- Observability

### Quick Commands

Show useful examples:

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

### Recently Added

Display recently created documentation pages.

### Recommended Learning Paths

Example:

```text
Linux → Shell → Git → Docker → Kubernetes → DevOps → SRE
```

---

# 9. Documentation Article Design

Every documentation page should follow a consistent structure.

Example:

```text
# Kubernetes Pod Troubleshooting

Short explanation.

## Overview

...

## Common Commands

...

## Troubleshooting Steps

...

## Examples

...

## Common Errors

...

## Production Notes

...

## Related Topics

...
```

At the top of each article show:

- Category
- Page title
- Short description
- Last updated date
- Estimated reading time
- Tags

Example:

```text
KUBERNETES

Pod CrashLoopBackOff

How to troubleshoot Kubernetes pods
that continuously restart.

Updated: September 2026
Reading time: 6 min
```

---

# 10. Code Blocks

Code blocks are one of the most important elements.

Support syntax highlighting for:

- Bash
- Shell
- YAML
- JSON
- Go
- Rust
- Java
- SQL
- Dockerfile
- Nginx
- JavaScript
- TypeScript
- Markdown
- XML
- HTTP

Every code block should have:

- Language indicator
- Copy button
- Optional filename
- Horizontal scrolling
- Good contrast
- Line wrapping option where appropriate

Example:

```bash
kubectl get pods -A
```

Display:

```text
BASH                         [COPY]

kubectl get pods -A
```

Clicking COPY should copy the exact command to clipboard.

Show a small "Copied" confirmation.

---

# 11. Terminal / Command Blocks

Create a special style for shell commands.

Example:

```text
$ kubectl get pods -A
$ kubectl describe pod my-pod
$ kubectl logs my-pod
```

Distinguish:

- Command
- Output
- Explanation

Example:

```bash
$ kubectl get pods

NAME        READY   STATUS
api-7d8f    1/1     Running
```

Use different visual treatment for command and output.

---

# 12. Callouts

Support documentation callouts:

### Note

```text
NOTE
This command requires root privileges.
```

### Warning

```text
WARNING
Do not execute this command on production
without understanding its impact.
```

### Important

```text
IMPORTANT
Always verify the target namespace first.
```

### Tip

```text
TIP
Use kubectl -n <namespace> to avoid
accidentally working in the wrong namespace.
```

### Danger

Use a stronger visual treatment for destructive operations.

---

# 13. Copyable Commands

Any command shown in documentation should be easily copyable.

For example:

```bash
sudo systemctl restart nginx
```

Provide a copy button.

For multi-command blocks, copy the entire block.

---

# 14. Tables

Create beautiful readable tables.

Example:

| Command    | Purpose               |
| ---------- | --------------------- |
| `ps aux`   | Process listing       |
| `top`      | CPU/memory monitoring |
| `df -h`    | Disk usage            |
| `free -m`  | Memory usage          |
| `ss -lntp` | Listening ports       |

Tables must be responsive on mobile.

---

# 15. Search

Implement client-side static search.

The search must work without a backend.

Generate a search index during build.

Search should find:

- Page titles
- Headings
- Tags
- Descriptions
- Documentation content
- Commands

Display results such as:

```text
Kubernetes
Pod Troubleshooting

Troubleshoot CrashLoopBackOff,
ImagePullBackOff and OOMKilled...
```

Support keyboard navigation.

Use:

```text
⌘ K
Ctrl K
```

to open search.

---

# 16. Command Finder

Create a dedicated command reference/search feature.

Example:

```text
Search Linux command...

[ docker ]

docker ps
docker images
docker logs
docker exec
docker inspect
```

Each command page should contain:

```text
docker ps

Purpose:
List running containers.

Syntax:
docker ps [OPTIONS]

Examples:

docker ps
docker ps -a
docker ps --format ...
```

Do the same for:

- Linux
- Bash
- kubectl
- Docker
- Podman
- Git
- curl
- systemctl
- journalctl
- networking commands

---

# 17. "Copy Command" UX

When hovering over commands, show a copy icon.

On click:

```text
✓ Copied
```

Do not show intrusive notifications.

---

# 18. On This Page

The right sidebar should automatically generate a table of contents from:

```text
H2
H3
```

Example:

```text
ON THIS PAGE

Overview
Installation
Configuration
Examples
Troubleshooting
Common Errors
Related Topics
```

Highlight the current section while scrolling.

---

# 19. Previous / Next Navigation

At the bottom of each article:

```text
← Previous
Linux Permissions

Next →
Linux Processes
```

Navigation must follow the documentation structure.

---

# 20. Breadcrumbs

Show:

```text
Home / Kubernetes / Troubleshooting / Pod Troubleshooting
```

at the top of each article.

---

# 21. Tags

Support tags:

```text
#linux
#bash
#kubernetes
#docker
#networking
#production
#troubleshooting
```

Clicking a tag should display related documentation.

---

# 22. Architecture Diagrams

Support diagrams using static-friendly formats.

Allow documentation pages to contain:

- Mermaid diagrams
- SVG diagrams
- Images
- Architecture diagrams

Examples:

```text
Client
   |
   v
Nginx
   |
   v
API Gateway
   |
   +------ Service A
   |
   +------ Service B
   |
   v
Database
```

If Mermaid is used, ensure it is rendered into static HTML/SVG during the build whenever practical.

---

# 23. Interactive Examples

Keep interactivity lightweight.

Examples:

- Copy command
- Expand/collapse sections
- Search
- Tabs
- Theme switch
- Mobile navigation
- Code line highlighting

Do NOT create unnecessary client-side applications.

The final output should remain static.

---

# 24. Tabs

Useful for showing different operating systems or approaches.

Example:

```text
Ubuntu | RHEL | Alpine
```

or:

```text
Docker | Podman
```

Example:

```bash
# Ubuntu
sudo apt install nginx

# RHEL
sudo dnf install nginx
```

Remember selected tab when appropriate.

---

# 25. Troubleshooting Page Template

Create a specialized troubleshooting format.

Example:

```text
# Nginx 502 Bad Gateway

SYMPTOM

Nginx returns HTTP 502.

POSSIBLE CAUSES

1. Backend unavailable
2. Incorrect upstream
3. Connection refused
4. Timeout
5. DNS problem

CHECK

systemctl status nginx

CHECK PORT

ss -lntp

TEST BACKEND

curl -v http://127.0.0.1:8080

CHECK LOGS

tail -f /var/log/nginx/error.log

SOLUTION

...

PREVENTION

...
```

This structure should be reusable.

---

# 26. Production Notes

Create special sections for real-world operational considerations.

Example:

```text
Production Checklist

□ Verify configuration
□ Check active connections
□ Check logs
□ Check CPU
□ Check memory
□ Check disk
□ Verify downstream dependencies
□ Confirm rollback procedure
□ Monitor after deployment
```

---

# 27. Security Warnings

Clearly identify destructive commands.

For example:

```bash
rm -rf /
```

must never be presented as a normal command.

Use warnings for commands that can:

- Delete data
- Restart production services
- Change firewall rules
- Modify Kubernetes resources
- Drop databases
- Delete containers
- Change permissions

---

# 28. Static Architecture

Prefer a content-driven architecture.

Recommended structure:

```text
project/
│
├── content/
│   ├── linux/
│   ├── shell/
│   ├── kubernetes/
│   ├── docker/
│   ├── nginx/
│   ├── networking/
│   ├── databases/
│   ├── devops/
│   ├── observability/
│   ├── programming/
│   ├── security/
│   └── production-support/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── diagrams/
│
├── src/
│   ├── components/
│   ├── layouts/
│   ├── styles/
│   └── search/
│
├── scripts/
│
└── dist/
```

Keep documentation content separate from UI components.

---

# 29. Content Format

Prefer Markdown for documentation.

Example:

```markdown
---
title: Kubernetes Pod Troubleshooting
description: Troubleshoot common Kubernetes pod failures.
category: Kubernetes
tags:
  - kubernetes
  - troubleshooting
  - pods
---

# Kubernetes Pod Troubleshooting

...
```

The system should automatically generate:

- URL
- title
- metadata
- breadcrumbs
- table of contents
- tags
- previous/next links
- reading time
- search index

---

# 30. URL Structure

Use clean URLs.

Examples:

```text
/linux/
/linux/processes/
/linux/systemd/
/shell/
/shell/bash/
/shell/awk/
/kubernetes/
/kubernetes/pods/
/kubernetes/troubleshooting/
/docker/
/docker/commands/
/nginx/
/nginx/reverse-proxy/
/networking/
/networking/tcp/
/devops/
/devops/git/
```

Avoid unnecessary URL parameters.

---

# 31. SEO

Generate static SEO metadata.

Every documentation page should have:

- Title
- Description
- Canonical URL
- Open Graph metadata
- Twitter/X metadata
- Structured metadata where useful

Generate:

```text
sitemap.xml
robots.txt
```

---

# 32. Performance

Performance is extremely important.

Target:

- Very small JavaScript bundle
- Optimized CSS
- Lazy-loaded images
- Optimized SVG
- No unnecessary dependencies
- No backend API calls
- Fast first render
- Static HTML generated at build time

Aim for excellent Lighthouse scores.

---

# 33. Accessibility

Follow WCAG principles.

Include:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation
- Focus indicators
- ARIA labels where needed
- Accessible contrast
- Screen-reader-friendly navigation
- Accessible code blocks
- Reduced-motion support

Do not depend solely on color to communicate meaning.

---

# 34. Mobile Design

The documentation must work extremely well on phones.

Mobile requirements:

- Collapsible sidebar
- Sticky header
- Search easily accessible
- Horizontal code scrolling
- Responsive tables
- Readable typography
- Large enough touch targets
- No horizontal page overflow

The documentation article should remain the primary focus.

---

# 35. Print Support

Create a print stylesheet.

When printing a documentation page:

Hide:

- Sidebar
- Search
- Navigation controls
- Theme controls

Keep:

- Article
- Code blocks
- Tables
- Headings
- URLs where useful

---

# 36. Offline-Friendly Design

Where practical, make documentation usable after the static site is downloaded or served locally.

Do not depend on runtime APIs.

All core documentation must work without network calls.

---

# 37. Versioning

Design the content system so documentation can eventually support:

```text
v1
v2
v3
```

without redesigning the application.

Do not over-engineer this feature initially.

---

# 38. Favorites / Bookmarks

If feasible, implement client-side bookmarks using localStorage.

Example:

```text
☆ Bookmark
```

Users should be able to bookmark useful articles without an account.

A:

```text
My Bookmarks
```

page can list locally saved documentation.

This must remain completely client-side.

---

# 39. Code Theme

Use a professional developer-oriented syntax highlighting theme.

Code should be easy to distinguish from normal text.

Support:

- command highlighting
- YAML indentation
- JSON
- SQL
- Go
- Rust
- Java
- Bash

Do not make code blocks excessively colorful.

---

# 40. Footer

Simple footer:

```text
TechNotes

Practical Engineering Documentation

Linux · Kubernetes · Containers · DevOps · SRE

© 2026 TechNotes

GitHub
```

Avoid a large marketing footer.

---

# 41. Initial Documentation Content

Generate useful sample documentation so the website does not look empty.

Create at least:

### Linux

- Linux Basic Commands
- Process Management
- Disk Management
- Memory Management
- Systemd
- Journalctl
- File Permissions
- Networking Commands

### Bash

- Bash Variables
- Conditions
- Loops
- Functions
- Arrays
- Shell Script Best Practices

### Docker

- Docker Basics
- Docker Commands
- Dockerfile
- Docker Networking
- Docker Volumes
- Docker Troubleshooting

### Kubernetes

- Kubernetes Architecture
- Pods
- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- Probes
- Resource Limits
- kubectl Commands
- Pod Troubleshooting

### Nginx

- Reverse Proxy
- SSL Configuration
- Headers
- Rewrite Rules
- Rate Limiting
- Troubleshooting 4xx/5xx

### Networking

- TCP/IP
- DNS
- HTTP
- HTTPS
- curl
- ss
- tcpdump
- Port Troubleshooting

### Git

- Basic Commands
- Branches
- Rebase
- Merge
- Reset
- Reflog
- Troubleshooting

---

# 42. Command Cheat Sheets

Create dedicated cheat-sheet pages.

Examples:

```text
Linux Cheat Sheet
Bash Cheat Sheet
Git Cheat Sheet
Docker Cheat Sheet
kubectl Cheat Sheet
Nginx Cheat Sheet
Networking Cheat Sheet
```

These pages should be optimized for quickly finding commands.

---

# 43. "How Do I?" Section

Create a practical problem-oriented section.

Examples:

```text
How do I find which process is using a port?

How do I check CPU usage?

How do I find large files?

How do I restart a Kubernetes pod?

How do I check Kubernetes logs?

How do I check an SSL certificate?

How do I test an HTTP endpoint?

How do I find a Docker container's IP?

How do I configure Nginx reverse proxy?

How do I check open ports?
```

These pages should provide direct commands first, followed by explanation.

---

# 44. Documentation Quality Rules

Every technical article should prefer this structure:

```text
What is it?
↓
Why is it useful?
↓
Syntax / architecture
↓
Basic example
↓
Real-world example
↓
Common problems
↓
Troubleshooting
↓
Production considerations
↓
Related topics
```

Avoid unnecessary theoretical explanations.

Favor:

**"Here is the command → here is what it does → here is the output → here is how to troubleshoot it."**

---

# 45. Error Reference

Create an error-reference section.

Examples:

```text
Linux Errors
Kubernetes Errors
Docker Errors
Nginx Errors
HTTP Errors
SSL Errors
Git Errors
Database Errors
```

Example:

```text
Kubernetes

CrashLoopBackOff
ImagePullBackOff
OOMKilled
Pending
CreateContainerConfigError
ErrImagePull
```

Each error should have:

- Meaning
- Common causes
- Commands to check
- Resolution
- Prevention

---

# 46. Developer Experience

The project must be easy to extend.

Adding a new article should require something similar to:

```text
content/kubernetes/pod-troubleshooting.md
```

rather than modifying application code.

Adding a new category should also be data-driven.

Provide documentation explaining:

```text
How to add a new page
How to add a category
How to add images
How to add diagrams
How to add code examples
How to build the static site
How to preview locally
How to deploy
```

---

# 47. Build Commands

Provide simple commands such as:

```bash
npm install
npm run dev
npm run build
npm run preview
```

The production build must generate:

```text
dist/
```

containing the complete static website.

---

# 48. Deployment

Provide deployment instructions for:

### Nginx

### GitHub Pages

### GitLab Pages

### Cloudflare Pages

The final site must not require:

```text
Node.js runtime
Python runtime
Go runtime
database
API server
```

after deployment.

Build tools may use Node.js or another build environment, but the resulting website must be static.

---

# 49. Configuration

Put site-wide configuration in one place.

Example:

```yaml
site:
  name: TechNotes
  description: Practical Engineering Documentation
  author: Engineering Team
  github: ""

theme:
  default: system

features:
  search: true
  bookmarks: true
  mermaid: true
  darkMode: true
```

---

# 50. No Backend

This is mandatory.

Do NOT create:

- Authentication server
- Database
- REST API
- GraphQL
- Server-side runtime dependency
- Dynamic backend

Everything required for normal documentation browsing must work from static files.

---

# 51. Final Acceptance Criteria

Before considering the project complete, verify:

### UI

- [ ] Excellent readability
- [ ] Professional technical appearance
- [ ] Light mode
- [ ] Dark mode
- [ ] Responsive mobile layout
- [ ] Sticky navigation
- [ ] Sidebar
- [ ] Table of contents
- [ ] Breadcrumbs
- [ ] Previous/next navigation

### Documentation

- [ ] Markdown content
- [ ] Syntax highlighting
- [ ] Copy buttons
- [ ] Callouts
- [ ] Tables
- [ ] Tabs
- [ ] Diagrams
- [ ] Tags
- [ ] Reading time

### Search

- [ ] Client-side search
- [ ] Search titles
- [ ] Search content
- [ ] Search tags
- [ ] Search commands
- [ ] Keyboard shortcut
- [ ] Mobile search

### Static

- [ ] `npm run build` succeeds
- [ ] `dist/` contains complete site
- [ ] No backend required
- [ ] No runtime API dependency
- [ ] Works from a static web server

### Quality

- [ ] SEO metadata
- [ ] Sitemap
- [ ] robots.txt
- [ ] Accessibility
- [ ] Print stylesheet
- [ ] Fast loading
- [ ] No console errors
- [ ] No broken links
- [ ] No missing assets

---

# 52. Important Implementation Instruction

Do not merely create a visually attractive prototype.

Build a **real documentation platform** with:

```text
Content
   ↓
Markdown
   ↓
Static Build
   ↓
HTML + CSS + JS + Assets
   ↓
dist/
   ↓
Static Web Server
```

The architecture must make it easy to continuously add hundreds or thousands of technical documentation pages without changing the core application.

The final result should feel like a polished engineering knowledge base that an engineer can open during production troubleshooting and immediately find the command, configuration, explanation, or solution they need.
