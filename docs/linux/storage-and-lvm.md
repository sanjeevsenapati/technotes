# Storage, Filesystems, and LVM

Managing physical and logical storage is a foundational skill in Linux administration. 

## Filesystems

A filesystem dictates how data is stored and retrieved on a disk.

### Common Filesystems
- **ext4**: The standard Linux filesystem for many years. Highly stable and well-supported.
- **XFS**: A high-performance journaling file system created by Silicon Graphics. Often the default in RHEL/CentOS. It excels at handling large files and parallel I/O.
- **Btrfs**: A modern copy-on-write (CoW) filesystem with built-in snapshotting and volume management.

### Creating and Mounting
To use a raw disk, you must format it with a filesystem and mount it.

```bash
# 1. Format a partition (/dev/sdb1) with ext4
sudo mkfs.ext4 /dev/sdb1

# 2. Create a mount point directory
sudo mkdir -p /mnt/data

# 3. Mount the filesystem
sudo mount /dev/sdb1 /mnt/data
```

### Persistent Mounting (`/etc/fstab`)
To ensure a disk is mounted automatically on boot, it must be added to `/etc/fstab`.

```text
# /etc/fstab example using UUID (recommended over /dev/sdb1)
UUID=1234abcd-56ef-78gh-90ij-klmnopqrstuv  /mnt/data  ext4  defaults  0  2
```

## LVM (Logical Volume Management)

LVM adds a layer of abstraction between the physical disks and the filesystem. Instead of mounting a physical partition directly, you mount a "Logical Volume". 

This allows you to dynamically resize filesystems or stripe them across multiple physical disks without downtime.

### The LVM Hierarchy
1. **Physical Volumes (PV)**: The actual raw disks or partitions (e.g., `/dev/sdb`).
2. **Volume Groups (VG)**: A pool of storage created by combining one or more Physical Volumes.
3. **Logical Volumes (LV)**: Slices of the Volume Group that act like regular partitions, which you then format and mount.

### Example: Creating an LVM Stack

```bash
# 1. Initialize the disk as a Physical Volume
sudo pvcreate /dev/sdb

# 2. Create a Volume Group named 'data_vg' using the PV
sudo vgcreate data_vg /dev/sdb

# 3. Create a 50GB Logical Volume named 'app_lv' from the VG
sudo lvcreate -L 50G -n app_lv data_vg

# 4. Format the new LV with XFS
sudo mkfs.xfs /dev/data_vg/app_lv

# 5. Mount it
sudo mount /dev/data_vg/app_lv /mnt/app
```

### Extending an LVM Volume dynamically
The true power of LVM is resizing on the fly. If you run out of space, you can add another disk to the VG, extend the LV, and grow the filesystem without unmounting!

```bash
# Add 10GB to the Logical Volume
sudo lvextend -L +10G /dev/data_vg/app_lv

# Grow the XFS filesystem to use the new space
sudo xfs_growfs /mnt/app

# (If using ext4, you would use: sudo resize2fs /dev/data_vg/app_lv)
```
