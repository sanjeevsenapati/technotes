# 3. User & Group Management

Linux is a multi-user system. Managing who has access to what is the foundation of system security.

## Core Configuration Files

Three main files manage users and groups in Linux:

1. **`/etc/passwd`**: Contains a list of all users, their User IDs (UIDs), Group IDs (GIDs), home directories, and default shells. It does *not* contain passwords.
2. **`/etc/shadow`**: Contains the securely hashed passwords for users. It is readable only by root.
3. **`/etc/group`**: Contains a list of all groups and which users belong to them.

## Managing Users

### Adding a User
Use `useradd` (or the interactive `adduser` on Debian-based systems) to create a new user account.
```bash
# Add a user with a home directory and bash shell
sudo useradd -m -s /bin/bash alice
```

### Modifying a User
Use `usermod` to modify properties like appending a user to a group.
```bash
# Add 'alice' to the 'docker' group (-aG means append group)
sudo usermod -aG docker alice
```

### Passwords
Set or change a user's password using `passwd`.
```bash
sudo passwd alice
```

## Privilege Escalation

Directly logging in as the root user is considered bad practice. Instead, regular users are granted administrative privileges using `sudo` (Super User DO).

### The Sudoers File
The `/etc/sudoers` file defines exactly which users and groups can run commands as root. 
> [!CAUTION]
> Never edit `/etc/sudoers` directly with a text editor like vim or nano. A syntax error can lock you out of root access permanently. **Always use `visudo`.**

```bash
# Safely edit the sudoers file
sudo visudo
```

Common entries in the sudoers file look like this:
```text
# Allow the user 'alice' to run any command
alice   ALL=(ALL:ALL) ALL

# Allow members of the '%wheel' group to run any command
%wheel  ALL=(ALL:ALL) ALL

# Allow user 'bob' to restart Nginx without a password
bob     ALL=(ALL) NOPASSWD: /bin/systemctl restart nginx
```

### Switching Users (`su`)
To temporarily switch to another user session in your terminal, use `su`.
```bash
# Switch to root (requires root password)
su -

# Switch to alice (if you are root, no password needed)
su - alice
```
