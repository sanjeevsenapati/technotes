# 2. Files & Directories

Linux organizes data in a single, hierarchical directory structure starting from the root directory (`/`). 

## The Filesystem Hierarchy Standard (FHS)

The FHS defines the directory structure and directory contents in Linux distributions. Knowing where things belong is critical.

- `/bin` & `/usr/bin`: Essential user command binaries (e.g., `ls`, `grep`).
- `/sbin` & `/usr/sbin`: System binaries intended for the root user (e.g., `fdisk`, `iptables`).
- `/etc`: Host-specific system configuration files. (No executable binaries should be here).
- `/var`: Variable data files, such as logs (`/var/log`), databases, and website content (`/var/www`).
- `/tmp`: Temporary files. Often cleared upon reboot.
- `/home`: User home directories containing personal configurations (like `~/.bashrc`).
- `/proc` & `/sys`: Virtual filesystems representing Kernel and Process states.

## Inodes and Links

In Linux, a filename is just a pointer. The actual metadata (permissions, ownership, physical disk location) is stored in a data structure called an **inode**.

### Hard Links
A hard link creates a new filename that points to the exact same inode as the original file. If you delete the original filename, the data still exists until the last hard link is deleted.
```bash
ln file1.txt hardlink.txt
```

### Soft (Symbolic) Links
A soft link is a special file that acts as a shortcut. It points to the *filename* of another file, not its inode. If the original file is deleted, the soft link becomes "broken".
```bash
ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
```

## Permissions and Ownership

Linux security is heavily dependent on file permissions. Every file has an **Owner** user and an **Owner Group**.

Permissions are divided into three categories: **User (u)**, **Group (g)**, and **Others (o)**.
For each, you can assign **Read (r - 4)**, **Write (w - 2)**, and **Execute (x - 1)**.

### Viewing Permissions
```bash
ls -l /etc/passwd
# Example output: -rw-r--r-- 1 root root 2.3K Jan  1 12:00 /etc/passwd
```
The string `-rw-r--r--` translates to:
- `-`: Regular file
- `rw-`: User (root) can read and write. (4+2=6)
- `r--`: Group (root) can read. (4)
- `r--`: Others can read. (4)
This is octal permission `644`.

### Changing Permissions (`chmod`)
You can use symbolic or octal modes:
```bash
# Octal mode (Give User full access, Group and Others read/execute)
chmod 755 script.sh

# Symbolic mode (Add execute permission for everyone)
chmod +x script.sh
```

### Changing Ownership (`chown`)
Only the root user can change the owner of a file.
```bash
# Change owner to 'alice' and group to 'developers'
sudo chown alice:developers /var/www/html
```
