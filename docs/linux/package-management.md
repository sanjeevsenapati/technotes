# 4. Package & Service Management

Unlike Windows, where you typically download installers from websites, Linux relies on **Package Managers** and centralized repositories to securely download, install, and update software along with its dependencies.

## Package Managers

The commands differ based on your Linux distribution family.

### Debian / Ubuntu (`apt`)
`apt` (Advanced Package Tool) handles `.deb` packages.

```bash
# Update the local cache of available packages
sudo apt update

# Upgrade all installed packages to their latest versions
sudo apt upgrade

# Install a new package
sudo apt install nginx

# Remove a package
sudo apt remove nginx
```

### RHEL / CentOS / Fedora (`dnf` / `yum`)
`dnf` handles `.rpm` packages (replacing the older `yum`).

```bash
# Install a package
sudo dnf install httpd

# Upgrade all packages
sudo dnf upgrade
```

## Service Management (`systemd`)

Once you install software (like a web server or database), it usually installs a **systemd service unit**. `systemd` is responsible for starting the software in the background and keeping it running.

You control these services using the `systemctl` command.

```bash
# Check if Nginx is running
systemctl status nginx

# Start the Nginx service right now
sudo systemctl start nginx

# Stop the Nginx service right now
sudo systemctl stop nginx

# Restart the service (useful after changing config files)
sudo systemctl restart nginx

# Enable the service to start automatically on boot
sudo systemctl enable nginx
```

### Viewing Service Logs

If a service fails to start, `systemctl status` will show you a small snippet of the error. For full logs, you use `journalctl`, which queries systemd's central logging system.

```bash
# View all logs for the Nginx unit
sudo journalctl -u nginx

# View logs in real-time (like tail -f)
sudo journalctl -u nginx -f
```
