# Network Scripts

This section covers scripts related to network verification and information gathering.

## Netcat Port Tester

**Script**: `networks/nc_port_tester.sh`

A pre-deployment port & firewall connectivity verification tool running in server (listener) or client (prober) mode using Netcat (`nc`).

### Usage

```bash
chmod +x networks/nc_port_tester.sh
# To see available options
./networks/nc_port_tester.sh -h
```

## Port Checker

**Script**: `networks/port_checker.sh`

A TCP connectivity, port availability, and response latency tester for target host IP/domain and port.

### Usage

```bash
chmod +x networks/port_checker.sh
./networks/port_checker.sh -h google.com -p 443
```

## Network Information

**Script**: `networks/network_info.sh`

Displays network interfaces and assigned IPv4/IPv6 addresses across OS environments.

### Usage

```bash
chmod +x networks/network_info.sh
./networks/network_info.sh
```
