# Container Networking

Networking in Docker and Podman is highly configurable, allowing you to choose between maximum isolation, ease of use, or raw bare-metal performance.

## 1. The Bridge Network (Default)

When you run a container without specifying a network, it is attached to the default `bridge` network (represented by the `docker0` or `cni0` virtual interface on your host). 

- The container receives a private IP address (e.g., `172.17.0.2`).
- The container can access the internet using NAT (Network Address Translation).
- External computers **cannot** access the container unless you explicitly map a port (e.g., `-p 8080:80`).

### User-Defined Bridges

The default bridge network is legacy and has a major flaw: **containers on the default bridge cannot resolve each other by name.**

If you create a *custom* bridge network, Docker enables an internal DNS server, allowing containers to talk to each other using their container names!

```bash
# Create a custom bridge network
docker network create my-net

# Run two containers on the new network
docker run -d --name web --network my-net nginx
docker run -d --name app --network my-net alpine sleep 9999

# The 'app' container can ping the 'web' container by name!
docker exec app ping web
```
*(Note: Docker Compose automatically creates a custom bridge network for you).*

## 2. The Host Network

If you run a container with `--network host`, Docker removes the network isolation entirely. The container literally binds directly to the physical network interface of your host machine.

- **Pros:** Maximum performance. There is zero NAT overhead. Ideal for high-throughput databases or load balancers.
- **Cons:** No isolation. If the container listens on port 80, it binds to port 80 on the host machine. You cannot run two containers listening on port 80 using the host network.

```bash
docker run -d --network host nginx
```

## 3. The Macvlan Network

If you want a container to appear as a physical device on your real-world router (e.g., your home router at `192.168.1.1`), you can use the `macvlan` driver.

Macvlan assigns a unique, real MAC address to the container, and your physical router will assign it a real IP address on your physical subnet (e.g., `192.168.1.50`).

- **Pros:** The container acts like a completely separate physical computer on your LAN.
- **Cons:** Complex to set up, and due to security restrictions in the Linux kernel, the host machine cannot directly ping its own macvlan containers.

```bash
# Example Macvlan creation (requires defining your physical subnet)
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 pub_net
```

## 4. The None Network

For maximum security workloads (e.g., a container whose only job is to encrypt files read from a mounted volume), you can completely disable networking. The container will only have a `loopback` interface (`127.0.0.1`).

```bash
docker run -d --network none alpine sleep 9999
```
