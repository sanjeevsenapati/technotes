# 3. Control Flow

Control flow allows your scripts to make decisions and repeat actions. 

## If/Else and the Test Command

In Bash, `if` statements evaluate the exit status of a command. If the command exits with `0` (Success), the `then` block executes.

```bash
if grep -q "ERROR" app.log; then
  echo "An error was found in the logs!"
fi
```

### `[` vs `[[`

Often you want to evaluate conditions (like comparing strings or checking if a file exists). For this, we use the test commands: `[` (standard POSIX) or `[[` (advanced Bash).

**Always prefer `[[ ]]` in Bash scripts.** It handles spaces in variables more safely and supports pattern matching.

```bash
USER="admin"

if [[ "$USER" == "admin" ]]; then
  echo "Access granted"
elif [[ "$USER" == "guest" ]]; then
  echo "Limited access"
else
  echo "Access denied"
fi
```

### Common Test Operators

- `-z "$VAR"` : True if the string is empty (zero length).
- `-n "$VAR"` : True if the string is NOT empty.
- `-eq`, `-ne`, `-lt`, `-gt` : Integer comparison (equal, not equal, less than, greater than).
- `-f "$FILE"` : True if the file exists and is a regular file.
- `-d "$DIR"` : True if the directory exists.

## Loops

### `for` Loops
Iterate over a list of items or the output of a command.

```bash
# Iterate over a static list
for color in red green blue; do
  echo "Color: $color"
done

# Iterate over files in a directory
for file in /var/log/*.log; do
  echo "Found log: $file"
done
```

### `while` Loops
Execute as long as a condition is true. The most common use case is reading a file line by line.

```bash
# Read a file line by line safely
while IFS= read -r line; do
  echo "Line: $line"
done < input.txt
```

## Case Statements

When you have a variable that can match multiple distinct values, a `case` statement is much cleaner than a long `if/elif` chain. It is heavily used in init scripts or when parsing command-line flags.

```bash
ACTION=$1

case "$ACTION" in
  start)
    echo "Starting service..."
    ;;
  stop)
    echo "Stopping service..."
    ;;
  restart|reload)
    echo "Restarting service..."
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
    exit 1
    ;;
esac
```
