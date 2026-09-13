# 2. Variables & Environment

Variables in bash do not have strict types. By default, everything is treated as a string, though Bash permits arithmetic operations under certain conditions.

## Defining and Using Variables

To define a variable, omit spaces around the `=` sign. To reference it, prepend the variable name with `$`.

```bash
# Correct
GREETING="Hello"
echo $GREETING

# Incorrect (will attempt to run a command named 'GREETING')
GREETING = "Hello"
```

## Quoting Rules

Understanding quotes in Bash is essential to prevent unintended variable expansion or word splitting.

- **Double Quotes (`" "`):** Weak quoting. Variables and command substitutions inside are evaluated.
- **Single Quotes (`' '`):** Strong quoting. Everything inside is treated as a literal string. Variables are NOT evaluated.

```bash
NAME="Alice"
echo "Hello $NAME"  # Output: Hello Alice
echo 'Hello $NAME'  # Output: Hello $NAME
```

## Special Variables

Bash automatically populates several special variables during execution:

| Variable | Description |
|----------|-------------|
| `$0` | The name of the script itself. |
| `$1, $2...` | The first, second, etc., arguments passed to the script. |
| `$@` | All arguments passed to the script as separate words. |
| `$#` | The total number of arguments passed. |
| `$$` | The Process ID (PID) of the current shell. |
| `$?` | The exit status of the last executed command. |

## Parameter Expansion

Bash provides powerful built-in ways to manipulate variables without needing external tools like `sed` or `awk`.

### Default Values
If a variable is unset or empty, use a default value:
```bash
# If USER is not set, use "Guest"
echo "Welcome ${USER:-Guest}"
```

### String Replacement
Replace the first occurrence of a substring:
```bash
FILENAME="image.jpg"
echo "${FILENAME/jpg/png}" # Output: image.png
```

### Substring Removal
Remove a prefix or suffix (useful for getting file extensions or basenames):
```bash
FILEPATH="/var/log/syslog.log"

# Remove shortest match from end (suffix)
echo "${FILEPATH%.*}"  # Output: /var/log/syslog

# Remove longest match from beginning (prefix)
echo "${FILEPATH##*/}" # Output: syslog.log
```

## Local vs Environment Variables

Variables created in a script are normally accessible only within that script's process. If a script calls *another* script, the child script won't see the variables unless they are **exported**.

```bash
# Available only to this process
MY_VAR="Secret"

# Available to this process AND all child processes
export PUBLIC_VAR="Visible"
```
