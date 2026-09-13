# `grep` and Regular Expressions

`grep` stands for **Global Regular Expression Print**. It is the standard tool for searching text using patterns.

## Basic Usage

By default, `grep` searches for a literal string.

```bash
# Search for "ERROR" in a file
grep "ERROR" /var/log/syslog

# Search recursively through a directory (-r)
grep -r "API_KEY" /var/www/html/

# Ignore case sensitivity (-i)
grep -i "warning" /var/log/syslog
```

## Useful Flags

- **`-v` (Invert Match):** Print lines that do *not* match the pattern.
  ```bash
  # Print everything EXCEPT errors
  grep -v "ERROR" app.log
  ```
- **`-c` (Count):** Print only a count of matching lines.
  ```bash
  grep -c "Failed password" /var/log/auth.log
  ```
- **`-l` (List Files):** Print only the names of files that contain a match, not the matched lines.
  ```bash
  grep -l "TODO" src/*.js
  ```
- **Context Flags (`-A`, `-B`, `-C`):** Print lines surrounding the match.
  ```bash
  # Print the match, plus 3 lines After
  grep -A 3 "Exception" app.log

  # Print the match, plus 2 lines Before
  grep -B 2 "Exception" app.log

  # Print the match, plus 2 lines Before and After (Context)
  grep -C 2 "Exception" app.log
  ```

## Regular Expressions (Regex)

Regex allows you to search for patterns rather than exact strings. 

To use advanced regex in grep, you should use the `-E` flag (Extended Regex), or use the `egrep` command.

### Anchors
Anchors tie your search to the beginning or end of a line.
- `^` : Matches the beginning of a line.
- `$` : Matches the end of a line.

```bash
# Find lines that EXACTLY start with "root"
grep "^root" /etc/passwd

# Find lines that end with ".conf"
grep "\.conf$" files.txt

# Find completely empty lines
grep "^$" file.txt
```

### Wildcards and Quantifiers
- `.` : Matches exactly *one* character of any kind.
- `*` : Matches zero or more of the *preceding* character.
- `+` : Matches one or more of the *preceding* character (requires `-E`).
- `?` : Matches zero or one of the *preceding* character (requires `-E`).

```bash
# Matches "car", "cat", "cab"
grep "ca." words.txt

# Matches "colr" or "color"
grep -E "colou?r" words.txt

# The ultimate wildcard: .* (matches absolutely anything of any length)
# E.g., matches "error" followed eventually by "failed" on the same line
grep "error.*failed" log.txt
```

### Character Classes
You can specify a list or range of acceptable characters inside brackets `[]`.

```bash
# Matches "bat", "cat", or "rat"
grep "[bcr]at" words.txt

# Matches any three-digit number
grep "[0-9][0-9][0-9]" text.txt
```

### Or Operator (`|`)
Requires extended regex (`-E`). Matches either the left or right pattern.

```bash
# Match lines with ERROR or CRITICAL
grep -E "ERROR|CRITICAL" syslog
```
