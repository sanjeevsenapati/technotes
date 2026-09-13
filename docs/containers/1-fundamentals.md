# Container Fundamentals

Before running a single Docker or Podman command, it is crucial to understand that **"containers" do not actually exist as a distinct object in the Linux kernel.** 

Unlike Virtual Machines (VMs), which use a hypervisor to virtualize entire chunks of physical hardware (CPU, RAM, Disks), a container is simply a normal Linux process that has been heavily restricted using three native Linux kernel features: **Namespaces**, **cgroups**, and **UnionFS**.

## 1. Namespaces (Isolation)

Namespaces provide *isolation*. They trick a process into thinking it has its own dedicated operating system, when in reality, it is sharing the kernel with thousands of other processes.

When you start a container, Linux creates dedicated namespaces for it:
- **PID Namespace:** The container thinks its main application is Process ID `1`. (On the host machine, it might be PID `34502`).
- **NET Namespace:** The container gets its own isolated network stack, virtual ethernet interface (veth), and IP address.
- **MNT Namespace:** The container cannot see the host's `/var` or `/etc`. It only sees its own isolated filesystem (like a modern `chroot`).
- **USER Namespace:** A process running as `root` inside the container can be mapped to a completely unprivileged user on the host machine.

## 2. cgroups (Resource Limits)

While namespaces isolate *visibility*, Control Groups (`cgroups`) isolate *resources*.

If a bug causes a Node.js app inside a container to enter an infinite loop and consume 100% of the CPU, it would normally crash the entire host server. `cgroups` prevent this by enforcing hard limits:
- **CPU:** "This container can only use a maximum of 0.5 CPU cores."
- **Memory:** "This container is strictly limited to 512MB of RAM. If it exceeds this, the kernel will OOM-kill it."

## 3. UnionFS (Layered Filesystems)

Containers boot instantly (in milliseconds) because they don't actually boot an OS. They just unpack an image.

Container images are built using **Union Filesystems (UnionFS)** (like `overlay2`). 
Instead of a single massive 1GB file, an image is a stack of read-only layers.

1. **Layer 1:** The Base OS (e.g., Ubuntu).
2. **Layer 2:** Security updates applied.
3. **Layer 3:** Nginx installed.
4. **Layer 4:** Your specific HTML code added.

When a container runs, Docker places a thin **Read/Write (R/W) layer** on the very top of this stack. If the container deletes a file from Layer 1, it doesn't actually delete it; it just marks it as deleted in the top R/W layer. 

> [!IMPORTANT]  
> Because the underlying image layers are strictly Read-Only, **hundreds of containers can share the exact same underlying base image simultaneously**, saving massive amounts of disk space and RAM.

## VMs vs Containers

| Feature | Virtual Machine (VM) | Container |
|---------|----------------------|-----------|
| **Architecture** | Virtualizes the Hardware | Virtualizes the OS (shares the Host Kernel) |
| **Boot Time** | Minutes | Milliseconds |
| **Size** | Gigabytes | Megabytes |
| **Overhead** | High (runs a full Guest OS) | Near Zero (just normal Linux processes) |
| **Isolation** | Absolute (Hypervisor enforced) | Strong (Namespace/cgroup enforced) |
