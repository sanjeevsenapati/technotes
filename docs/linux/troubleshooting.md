# 6. System Troubleshooting

When things go wrong on a Linux system, knowing how to diagnose the issue quickly is what separates a junior administrator from a senior engineer.

## Process Management

When a server is slow, the first step is checking for processes consuming too much CPU or RAM.

### `top` and `htop`
`top` provides a real-time, dynamic view of running processes. `htop` is a popular, more user-friendly alternative (often requires manual installation).
```bash
# Start top
top

# Start htop (if installed)
htop
```

### `ps` (Process Status)
To capture a snapshot of currently running processes:
```bash
# Show all running processes with full formatting
ps aux

# Find a specific process by name
ps aux | grep nginx
```

### Killing Processes
If a process is unresponsive, you can terminate it using its PID (Process ID).
```bash
# Send a graceful termination signal (SIGTERM - 15)
kill 1234

# Forcefully kill the process (SIGKILL - 9)
kill -9 1234
```

## Disk Space and I/O

A completely full disk will cause services (especially databases) to crash immediately.

### Checking Disk Space (`df`)
Use `df` to check filesystem space.
```bash
# Show disk space in human-readable format (MB/GB)
df -h
```

### Finding Large Directories (`du`)
If the disk is full, you need to find out *what* is taking up the space.
```bash
# Summarize the size of directories in the root, human-readable, and sort them
sudo du -sh /* | sort -h
```

## Network Diagnostics

When an application can't reach the internet or a database:

### Checking Connectivity (`ping` and `curl`)
```bash
# Check if a server is reachable via ICMP
ping 8.8.8.8

# Check if a web server is responding via HTTP
curl -I https://google.com
```

### Checking Listening Ports (`ss`)
If your web server won't start, another process might be using port 80.
```bash
# Show all listening TCP and UDP sockets with process names
sudo ss -tulpn
```

### DNS Lookups (`dig` and `nslookup`)
If a hostname won't resolve, use `dig` or `nslookup` to debug the DNS response.
```bash
# Query a domain's A record using the default resolver
dig google.com

# Simple, interactive query using nslookup
nslookup google.com
```

### Tracing Routes (`traceroute` and `tracepath`)
To see the exact path packets take across the internet (and where they might be dropping):
```bash
# Classic traceroute (requires root for some ICMP packets)
traceroute google.com

# Tracepath (similar to traceroute but doesn't require root privileges)
tracepath google.com
```

### Advanced Diagnostics (`nc` / netcat)
Netcat is the "Swiss Army knife" of networking. It can be used for port scanning, transferring files, or testing raw TCP/UDP connections.
```bash
# Test if a specific port is open (e.g., check if a database is reachable on 3306)
nc -vz 192.168.1.50 3306

# Start a simple temporary listening server on port 8080
nc -l -p 8080
```
