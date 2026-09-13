# Core Stream Utilities

Before diving into complex tools like `sed` and `awk`, you must master the fundamental stream editorial commands. The Unix philosophy states that programs should do one thing well, and be able to combine with other programs using pipes (`|`).

## Pipes (`|`) and Redirection

A **pipe** connects the standard output (`stdout`) of one command directly into the standard input (`stdin`) of another.

```bash
# Send the output of 'ls -l' into the 'wc' (word count) command
ls -l | wc -l
```

## 1. `cat` (Concatenate)

`cat` is most famously used to output the entire contents of a file to the terminal, but its actual purpose is to concatenate streams.

```bash
# Print file contents
cat /var/log/syslog

# Number all output lines (-n)
cat -n script.sh

# Show non-printable characters like tabs and line endings (-A)
cat -A script.sh

# Concatenate multiple files into one
cat file1.txt file2.txt > combined.txt
```

## 2. `tr` (Translate or Delete Characters)

`tr` reads from standard input and translates (or deletes) characters. It is extremely fast for basic character replacement.

```bash
# Translate lowercase to uppercase
echo "hello world" | tr 'a-z' 'A-Z'
# Output: HELLO WORLD

# Replace spaces with underscores
echo "file name with spaces.txt" | tr ' ' '_'
# Output: file_name_with_spaces.txt

# Delete all numeric characters (-d)
echo "user1234name" | tr -d '0-9'
# Output: username

# Squeeze repeating characters into a single instance (-s)
# Useful for fixing multiple spaces
echo "this    has   too   many spaces" | tr -s ' '
# Output: this has too many spaces
```

## 3. `sort`

`sort` sorts lines of text files.

```bash
# Sort alphabetically
sort names.txt

# Sort numerically (-n)
# Without -n, '10' would sort before '2'
sort -n numbers.txt

# Sort in reverse order (-r)
sort -nr numbers.txt

# Sort based on a specific column/field (-k). 
# E.g., sort by the 3rd column
ls -l | sort -k3
```

## 4. `uniq`

`uniq` filters out **adjacent** matching lines. This is why it is almost always paired with `sort` first!

```bash
# File contents:
# apple
# apple
# banana
# apple

# This will NOT remove the last apple because it's not adjacent to the first ones
uniq fruits.txt

# CORRECT: Sort first, then uniq
sort fruits.txt | uniq

# Count the occurrences of each unique line (-c)
sort fruits.txt | uniq -c
# Output:
#   3 apple
#   1 banana
```

## 5. `tee`

`tee` reads from standard input and writes to standard output *AND* to files simultaneously. Think of it as a T-junction in a pipe.

It is heavily used when you need to write to a privileged file using `sudo`, because `sudo echo "text" > /etc/file` does not work (the redirection `>` is handled by your user shell, not `sudo`).

```bash
# Safely append text to a protected file
echo "192.168.1.100  db-server" | sudo tee -a /etc/hosts > /dev/null

# See the output of a command on screen AND save it to a log file
./long-script.sh | tee script-output.log
```
