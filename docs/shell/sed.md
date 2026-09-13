# `sed` (Stream Editor)

`sed` is a non-interactive text editor. Instead of opening a file, moving your cursor, and typing, `sed` processes text line-by-line as a stream. It evaluates a set of instructions against a "pattern space" (the current line) and outputs the result.

## The Substitution Command (`s`)

The most common use of `sed` is for find-and-replace using the `s` (substitute) command. The syntax is `s/pattern/replacement/flags`.

```bash
# Replace the FIRST occurrence of "apple" with "orange" on each line
echo "apple banana apple" | sed 's/apple/orange/'
# Output: orange banana apple

# Replace ALL occurrences globally using the 'g' flag
echo "apple banana apple" | sed 's/apple/orange/g'
# Output: orange banana orange
```

### Changing the Delimiter
If your pattern contains forward slashes (like a file path), escaping them is messy (`s/\/var\/log/\/tmp/`). 
`sed` allows you to use almost *any* character as the delimiter immediately following the `s`.

```bash
# Using '#' as the delimiter makes paths readable
echo "/var/log/syslog" | sed 's#/var/log#/tmp/logs#'
```

### Capturing Groups
You can capture parts of a match using `\(` and `\)` and reference them in the replacement using `\1`, `\2`, etc.

```bash
# Swap the first and second words
echo "Alice Bob" | sed 's/\([A-Za-z]*\) \([A-Za-z]*\)/\2 \1/'
# Output: Bob Alice
```

## Deleting Lines (`d`)

Instead of substituting, you can tell `sed` to delete lines that match a pattern.

```bash
# Delete any line containing the word "DEBUG"
sed '/DEBUG/d' app.log

# Delete completely empty lines
sed '/^$/d' text.txt

# Delete lines from line 1 to 5
sed '1,5d' text.txt
```

## Printing Specific Lines (`p`)

By default, `sed` prints every line it processes. If you want to use it like `grep` to only print specific lines, you must suppress default output with `-n` and then explicitly print with `p`.

```bash
# Print only lines 10 through 20
sed -n '10,20p' large_file.txt

# Print only lines containing "ERROR"
sed -n '/ERROR/p' app.log
```

## In-Place Editing (`-i`)

By default, `sed` writes its results to standard output, leaving the original file untouched. The `-i` flag edits the file **in-place**.

> [!CAUTION]
> Always test your `sed` command without `-i` first! A bad regex with `-i` can destroy your configuration file permanently.

```bash
# Replace 'localhost' with '192.168.1.5' directly in the file
sed -i 's/localhost/192.168.1.5/g' config.yml

# On macOS/BSD, you MUST provide an extension backup string, or use an empty string like this:
sed -i '' 's/foo/bar/g' file.txt

# A safer cross-platform approach creates a backup file automatically:
sed -i.bak 's/foo/bar/g' file.txt
# This creates file.txt.bak before modifying file.txt!
```

## Multiple Commands (`-e`)

You can string multiple `sed` instructions together using the `-e` flag.

```bash
# Delete empty lines AND replace "foo" with "bar"
sed -e '/^$/d' -e 's/foo/bar/g' file.txt
```
