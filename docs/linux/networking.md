# 5. Networking Basics

Understanding how a Linux system connects to networks, resolves hostnames, and protects itself is a fundamental skill.

## Network Interfaces and IP Addresses

A Linux machine connects to networks via interfaces (e.g., `eth0` for wired ethernet, `wlan0` for wireless, or `lo` for the local loopback).

### Viewing IP Addresses
Use the `ip` command (which replaces the deprecated `ifconfig`).

```bash
# Show IP addresses for all interfaces
ip addr

# Show routing table (Default Gateway)
ip route
```

## DNS Resolution

When you ping `google.com`, Linux needs to convert that hostname into an IP address.

1. **`/etc/hosts`**: The system checks this file first. You can manually map IPs to hostnames here to override public DNS (useful for local development).
   ```text
   # Example /etc/hosts entry
   192.168.1.50   my-database-server
   ```
2. **`/etc/resolv.conf`**: If the hostname isn't in `/etc/hosts`, the system queries the nameservers listed in this file.
   ```text
   # Example /etc/resolv.conf
   nameserver 8.8.8.8
   nameserver 1.1.1.1
   ```

## Firewalls

By default, the Linux Kernel has a built-in firewall called `Netfilter`. Direct configuration is extremely complex, so user-space frontend tools are used instead.

### UFW (Uncomplicated Firewall) on Ubuntu
UFW provides a simple CLI to manage rules.

```bash
# Enable the firewall
sudo ufw enable

# Allow SSH traffic (port 22)
sudo ufw allow ssh

# Allow HTTP and HTTPS traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check current firewall status and rules
sudo ufw status
```

### Firewalld on CentOS/RHEL
Firewalld uses the concept of "zones".

```bash
# Allow HTTP traffic permanently
sudo firewall-cmd --permanent --add-service=http

# Reload the firewall to apply the changes
sudo firewall-cmd --reload
```

## IP Addressing and Subnets

Networks are divided into subnets to improve security and performance. An IP address combined with a Subnet Mask determines which part of the address is the network and which part is the specific host.

### Subnetting (CIDR Notation)
CIDR (Classless Inter-Domain Routing) notation is the modern standard for writing subnets. E.g., `192.168.1.0/24`.
- The `/24` means the first 24 bits represent the network. 
- A `/24` subnet provides 256 total IP addresses (254 usable for hosts).

### Supernetting
Supernetting (Route Aggregation) is the exact opposite of subnetting. It combines multiple smaller contiguous subnets into a single larger route. 
For example, instead of routing `192.168.0.0/24` and `192.168.1.0/24` separately, a router can supernet them into a single `192.168.0.0/23` route.

### `ipcalc`
Calculating subnets in your head can be difficult. The `ipcalc` utility does the math for you.

```bash
# Calculate broadcast, network, and host ranges for an IP/CIDR
ipcalc 192.168.1.50/26

# Output snippet:
# Address:   192.168.1.50         11000000.10101000.00000001.0011 0010
# Netmask:   255.255.255.192 = 26 11111111.11111111.11111111.1100 0000
# Wildcard:  0.0.0.63             00000000.00000000.00000000.0011 1111
# =>
# Network:   192.168.1.0/26       11000000.10101000.00000001.0000 0000
# HostMin:   192.168.1.1          11000000.10101000.00000001.0000 0001
# HostMax:   192.168.1.62         11000000.10101000.00000001.0011 1110
# Broadcast: 192.168.1.63         11000000.10101000.00000001.0011 1111
# Hosts/Net: 62                    Class C, Private Internet
```
