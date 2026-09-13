# 1. Linux Fundamentals

Understanding the core architecture of Linux is crucial for system administration, containerization, and backend development. Linux is not just an operating system; it is a kernel around which various GNU utilities and applications are built.

## The Kernel vs. User Space

The Linux operating system is divided into two primary memory and execution areas:

1. **Kernel Space**: The core of the operating system. It has complete and unrestricted access to the underlying hardware. It manages memory, processes, device drivers, and system calls.
2. **User Space**: Where user applications (like your shell, web servers, and databases) run. Applications in user space cannot access hardware directly; they must communicate with the Kernel via **System Calls** (syscalls).

This separation is what makes Linux highly stable and secure. If an application in User Space crashes, it cannot easily take down the Kernel.

## The Boot Process

When a Linux server powers on, it goes through a specific sequence:

1. **BIOS/UEFI**: The hardware initializes and looks for a bootable device.
2. **Bootloader (GRUB)**: Loads the selected Kernel into memory and executes it.
3. **Kernel Initialization**: The Kernel takes over, mounts the root filesystem (`/`), and initializes hardware drivers.
4. **Init System (Systemd)**: The Kernel executes the very first User Space process, which has Process ID (PID) 1. On modern Linux, this is almost always `systemd`. `systemd` is then responsible for starting all other services (networking, SSH, databases).

## The Unix Philosophy: "Everything is a File"

In Linux, the concept of a "file" extends far beyond standard text documents or images. 
- A hard drive is a file (e.g., `/dev/sda`).
- A terminal session is a file (e.g., `/dev/tty`).
- System memory and process information are exposed as files (e.g., `/proc/meminfo`).

This design means that standard tools used for reading and writing text files (`cat`, `echo`, `grep`) can also be used to interact with hardware and kernel parameters.
