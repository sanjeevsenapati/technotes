# 1. Bash Basics

Understanding the fundamentals of Bash (Bourne Again SHell) is critical for system administration, DevOps, and general automation.

## The Shebang (`#!`)

Every shell script should begin with a shebang. This tells the operating system which interpreter to use to execute the file.

```bash
#!/bin/bash
```

While `#!/bin/sh` is also common, it defaults to the system's POSIX-compliant shell (often `dash` on Ubuntu), which lacks many advanced features of Bash. If you use Bash features, explicitly use `#!/bin/bash` or `#!/usr/bin/env bash`.

## Executing Scripts

To execute a script, it must first be marked as executable. 

1. **Make it executable:**
   ```bash
   chmod +x my_script.sh
   ```
2. **Run it:**
   ```bash
   ./my_script.sh
   ```
*(Note: The `./` specifies that the file is in the current directory. Without it, the shell only looks in the directories listed in your `$PATH`.)*

## Standard Streams and Redirection

Every command in Linux has three default data streams:
1. **Standard Input (`stdin` - 0)**: Where data is read from (defaults to keyboard).
2. **Standard Output (`stdout` - 1)**: Where normal output goes (defaults to screen).
3. **Standard Error (`stderr` - 2)**: Where error messages go (defaults to screen).

### Redirection Operators

You can redirect these streams using operators:

- `>` : Redirect standard output to a file (overwrites).
  ```bash
  echo "Hello World" > output.txt
  ```
- `>>` : Append standard output to a file.
  ```bash
  echo "Another line" >> output.txt
  ```
- `2>` : Redirect standard error to a file.
  ```bash
  ls /nonexistent_directory 2> errors.log
  ```
- `&>` or `> file 2>&1` : Redirect BOTH output and error to the same file.
  ```bash
  ./my_script.sh &> combined_output.log
  ```

## Exit Codes

When a command finishes, it returns an integer called an exit status (or exit code).
- `0` means **Success**.
- `1-255` means **Failure** (different numbers can indicate different types of errors).

You can check the exit status of the *last run command* using the special variable `$?`.

```bash
ls /tmp
echo "The command exited with: $?"
```
