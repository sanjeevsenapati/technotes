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
