# `awk` (Data Extraction and Reporting)

While `grep` filters lines and `sed` transforms them, `awk` is a complete programming language designed specifically for extracting, calculating, and reporting data from text files (especially columns/tabular data).

## The `awk` Execution Model

An `awk` program consists of a sequence of `pattern { action }` statements.

1. `BEGIN { ... }`: Executed exactly once *before* any input is read. Used for setup (e.g., printing headers).
2. `pattern { ... }`: Executed for every line that matches the pattern. If no pattern is provided, it executes for *every* line.
3. `END { ... }`: Executed exactly once *after* all input has been read. Used for summaries (e.g., printing totals).

## Fields and Variables

By default, `awk` splits each line into "fields" (columns) using whitespace (spaces or tabs) as the delimiter.

- `$0`: The entire current line.
- `$1, $2, $3...`: The first, second, third field, etc.
- `NF` (Number of Fields): The total number of fields on the current line. Therefore, `$NF` represents the *last* field on the line.
- `NR` (Number of Records): The current line number being processed.

### Basic Field Extraction
```bash
# Print only the 1st and 3rd columns from a file
echo -e "Alice 25 Engineer\nBob 30 Manager" | awk '{print $1, $3}'
# Output:
# Alice Engineer
# Bob Manager

# Print the line number (NR) and the last column ($NF)
awk '{print NR, $NF}' data.txt
```

### Changing the Delimiter (`-F`)
If your data is separated by commas (CSV) or colons (like `/etc/passwd`), use the `-F` flag.

```bash
# Extract only the usernames (1st column) from the passwd file
awk -F':' '{print $1}' /etc/passwd
```

## Pattern Matching and Conditionals

You can use standard mathematical and string comparisons in `awk`.

```bash
# Only print the line if the 2nd column is greater than 50
awk '$2 > 50 {print $0}' scores.txt

# Only print if the 1st column exactly matches "Alice"
awk '$1 == "Alice" {print $2}' data.txt

# Regex matching: Print if the 3rd column starts with "E"
awk '$3 ~ /^E/ {print $0}' data.txt
```

## Math and Aggregation

Because `awk` is a programming language, it excels at calculating totals across columns. Variables in `awk` do not need to be declared; they default to `0` or `""` (empty string).

```bash
# Assume a file 'sales.txt' has amounts in column 3.
# Sum column 3 for all lines, then print the total at the END.
awk '{ total += $3 } END { print "Total Sales: $" total }' sales.txt

# Calculate the average
awk '{ total += $3 } END { print "Average: " total/NR }' sales.txt
```

## Formatted Output (`printf`)

`awk` uses C-style `printf` for highly formatted output, allowing you to pad columns and control decimal places.

```bash
# Format the 2nd column as a float with 2 decimal places
echo "Alice 45.1234" | awk '{printf "Name: %-10s | Score: %.2f\n", $1, $2}'
# Output: Name: Alice      | Score: 45.12
```

## Awesome `awk` One-Liners

Here is a collection of the most practical and powerful `awk` one-liners for daily system administration and data processing:

### 1. File Formatting & Filtering
```bash
# Print lines that are exactly 80 characters long
awk 'length($0) == 80' file.txt

# Print lines longer than 80 characters
awk 'length($0) > 80' file.txt

# Remove blank lines (equivalent to grep -v '^$')
awk 'NF > 0' file.txt

# Print every 3rd line starting from the 1st
awk 'NR % 3 == 1' file.txt
```

### 2. Math & Column Operations
```bash
# Sum the values in the 1st column
awk '{sum += $1} END {print sum}' file.txt

# Calculate the average of the 1st column
awk '{sum += $1} END {print sum / NR}' file.txt

# Sum the 1st column only for lines where the 2nd column equals "apple"
awk '$2 == "apple" {sum += $1} END {print sum}' file.txt

# Print the maximum value in the 1st column
awk 'BEGIN {max = -99999} {if ($1 > max) max = $1} END {print max}' file.txt
```

### 3. Text Replacement & Field Manipulation
```bash
# Swap the 1st and 2nd columns
awk '{print $2, $1}' file.txt

# Replace the 2nd column with a static string and print the whole line
awk '{$2 = "REDACTED"; print $0}' file.txt

# Print everything EXCEPT the first column
awk '{$1 = ""; print $0}' file.txt | sed 's/^ *//'
```

### 4. Deduplication & Unique Values
```bash
# Print only unique lines (keeps the first occurrence, drops subsequent ones)
awk '!seen[$0]++' file.txt

# Print only unique values based on the 2nd column
awk '!seen[$2]++' file.txt

# Count the frequency of each unique value in the 1st column (like `uniq -c`)
awk '{count[$1]++} END {for (word in count) print count[word], word}' file.txt
```

### 5. System Administration Tricks
```bash
# Show only the IP addresses currently connected to port 80 (parsing netstat)
netstat -tn 2>/dev/null | awk '/:80 / {print $5}' | awk -F: '{print $1}' | sort | uniq -c

# Show the total RAM used by all running Apache processes (in KB)
ps aux | grep apache | awk '{sum += $6} END {print sum}'

# Extract the MAC address from ifconfig/ip output
ifconfig eth0 | awk '/ether/ {print $2}'
```
