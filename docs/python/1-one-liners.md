# Python One-Liners

Because Python is almost universally installed on modern Linux distributions, it can be used directly from the shell using the `-c` (command) flag or the `-m` (module) flag. 

Python one-liners are an incredibly powerful addition to a DevOps engineer's toolkit, often replacing complex `sed`, `awk`, or `jq` commands.

## Built-in Modules (`-m`)

Python comes with "batteries included," meaning many powerful tools can be executed directly without writing any code.

### 1. Instant HTTP Web Server
Need to quickly share files in your current directory over the network?
```bash
# Starts a web server on port 8000 serving the current directory
python3 -m http.server
```

### 2. Pretty-Printing JSON
If a system doesn't have `jq` installed, Python can parse and pretty-print JSON directly from standard input.
```bash
# Pretty-print a JSON file
cat data.json | python3 -m json.tool

# Fetch an API and format the output
curl -s https://api.github.com/users/sanjeevsenapati | python3 -m json.tool
```

### 3. Creating ZIP Archives
You can zip directories and files directly using Python's built-in zipfile module.
```bash
# Zip the 'docs' directory into 'archive.zip'
python3 -m zipfile -c archive.zip docs/

# Extract a zip file
python3 -m zipfile -e archive.zip destination_dir/
```

## Command Execution (`-c`)

The `-c` flag allows you to pass a string of Python code to execute.

### 1. Generate a UUID
Need a random UUID for a database entry or configuration file?
```bash
python3 -c "import uuid; print(uuid.uuid4())"
```

### 2. URL Encoding / Decoding
Encoding strings for HTTP requests is painful in native Bash, but trivial in Python.
```bash
# URL Encode
python3 -c "import urllib.parse; print(urllib.parse.quote('hello world & welcome!'))"
# Output: hello%20world%20%26%20welcome%21

# URL Decode
python3 -c "import urllib.parse; print(urllib.parse.unquote('hello%20world%20%26%20welcome%21'))"
```

### 3. Base64 Encoding
While `base64` exists as a Linux binary, using Python ensures cross-platform consistency.
```bash
# Encode
python3 -c "import base64; print(base64.b64encode(b'my secret').decode('utf-8'))"

# Decode
python3 -c "import base64; print(base64.b64decode(b'bXkgc2VjcmV0').decode('utf-8'))"
```

### 4. Mathematical Calculations
Bash math (`$((1 + 1))`) is limited to integers. Python handles floats, powers, and complex math effortlessly.
```bash
# Calculate 2 to the power of 16
python3 -c "print(2**16)"

# Float division
python3 -c "print(10 / 3)"
```

### 5. String Manipulation
Python string methods can easily replace tricky `sed` and `awk` operations.
```bash
# Reverse a string
python3 -c "print('devops'[::-1])"
# Output: spoved

# Convert a comma-separated list into newlines
echo "apple,banana,orange" | python3 -c "import sys; print(sys.stdin.read().replace(',', '\n'))"
```
