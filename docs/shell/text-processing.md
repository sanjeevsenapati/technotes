# 4. Text Processing

The true power of shell scripting lies in combining small, single-purpose utilities using pipes (`|`). 

## Piping

The pipe operator `|` takes the standard output (`stdout`) of the command on the left and passes it as the standard input (`stdin`) to the command on the right.

```bash
# List all files, then count how many lines there are
ls -l | wc -l
```

## `grep` (Global Regular Expression Print)

`grep` is used to filter lines matching a specific pattern (often a regular expression).

```bash
# Find lines containing "ERROR" in a log file
grep "ERROR" /var/log/syslog

# Find lines that do NOT contain "INFO" (-v inverts the match)
grep -v "INFO" /var/log/syslog

# Case-insensitive search (-i)
grep -i "warning" /var/log/syslog
```

## `awk`

`awk` is a complete text processing language, but it is most commonly used in shell scripts to extract specific columns (fields) from text. By default, `awk` splits lines by whitespace.

```bash
# Print the 1st and 3rd columns of the text
echo "Alice 24 Engineer" | awk '{print $1, $3}'
# Output: Alice Engineer

# Use a custom delimiter (e.g., a colon in /etc/passwd)
awk -F':' '{print $1}' /etc/passwd
```

## `sed` (Stream Editor)

`sed` is used for parsing and transforming text. Its most common use case is substitution.

```bash
# Replace the first occurrence of "foo" with "bar" on each line
echo "foo baz foo" | sed 's/foo/bar/'
# Output: bar baz foo

# Replace ALL occurrences globally (-g)
echo "foo baz foo" | sed 's/foo/bar/g'
# Output: bar baz bar

# Delete lines matching a pattern
sed '/ERROR/d' logfile.txt
```

## Chaining Them Together

A common system administration task might require all three. For example, to find the IP addresses of all failed SSH login attempts:

```bash
cat /var/log/auth.log | grep "Failed password" | awk '{print $11}' | sort | uniq -c
```
