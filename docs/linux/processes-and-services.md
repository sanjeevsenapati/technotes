# Processes, Daemons, and Services

Understanding how Linux executes and manages programs is essential for server administration and deployment.

## What is a Process?

A **Process** is a running instance of a program. When you execute a command like `ls` or start a database, the Linux kernel loads the program into memory and assigns it a unique integer called a **Process ID (PID)**.

Every process (except the very first one) has a parent process that started it, identified by the **Parent Process ID (PPID)**.

### Foreground vs. Background
When you run a command in your terminal, it runs in the **foreground**. You cannot use that terminal again until the command finishes.

To run a process in the **background**, append an ampersand (`&`) to the command:
```bash
# Run a long backup script in the background
./backup.sh &
```

You can bring a background job back to the foreground using `fg`, or send a running foreground job to the background by pausing it with `Ctrl+Z` and typing `bg`.

## What is a Daemon?

A **Daemon** (pronounced *demon*) is a special type of background process. Daemons are processes that:
1. Run continuously in the background.
2. Are not attached to any interactive terminal (they don't need user input).
3. Usually start automatically when the system boots.

In Linux, daemon processes typically have names ending with the letter `d` (e.g., `sshd` for the SSH daemon, `httpd` for the Apache web daemon, `systemd` for the system daemon).

## Services and Systemd

While a daemon is the actual running process, a **Service** is the configuration that tells the system *how* to manage that daemon. 

Modern Linux systems use **systemd** as the init system (the very first process, PID 1). Systemd is responsible for starting, stopping, and restarting all other daemons.

### Managing Services with `systemctl`

You interact with systemd using the `systemctl` command.

```bash
# Check if the Nginx web server daemon is currently running
systemctl status nginx

# Start the Nginx daemon
sudo systemctl start nginx

# Stop the Nginx daemon
sudo systemctl stop nginx

# Tell systemd to automatically start Nginx when the server boots up
sudo systemctl enable nginx
```

### Systemd Unit Files

How does systemd know how to start Nginx? It reads a configuration file called a **Unit File**. These files are typically located in `/usr/lib/systemd/system/` (provided by the package manager) or `/etc/systemd/system/` (custom ones created by administrators).

A basic unit file (`/etc/systemd/system/my-app.service`) looks like this:

```ini
[Unit]
Description=My Custom Python Application
After=network.target

[Service]
Type=simple
User=appuser
ExecStart=/usr/bin/python3 /opt/myapp/main.py
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

If you create or modify a unit file, you must tell systemd to reload its configuration before you can start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl start my-app
```
