# OpenSSL Mastery

OpenSSL is the Swiss Army knife of cryptography. While it is incredibly powerful, its command-line arguments are notoriously difficult to memorize. This guide serves as a definitive reference for the most common (and most frustrating) OpenSSL tasks.

## 1. Generating Keys and CSRs

Before you can get an SSL certificate from a Certificate Authority (like Verisign, GoDaddy, or an internal corporate CA), you must generate a **Private Key** and a **Certificate Signing Request (CSR)**.

### Generate a Private Key (RSA 2048-bit)
```bash
openssl genrsa -out private.key 2048
```
*(Keep this file absolutely secret. Do not share it with anyone, not even the Certificate Authority).*

### Generate a CSR (Interactive)
```bash
openssl req -new -key private.key -out request.csr
```
You will be prompted to enter your Country, State, Organization, and Common Name (the domain name, e.g., `www.example.com`).

### Generate a CSR with SANs (Subject Alternative Names)
Modern browsers (like Chrome) strictly require SANs; they no longer trust the Common Name field alone. To add SANs without creating a complex config file, use this one-liner:
```bash
openssl req -new -key private.key -out request.csr \
  -subj "/C=US/ST=CA/O=MyCompany/CN=www.example.com" \
  -addext "subjectAltName=DNS:www.example.com,DNS:example.com,IP:10.0.0.1"
```

---

## 2. Viewing & Verifying Certificates

When someone hands you a `.crt`, `.csr`, or `.key` file, it is usually base64-encoded (PEM format). You cannot read it directly. You must use OpenSSL to decode and display the human-readable text.

### View a Certificate (`.crt` / `.pem`)
```bash
openssl x509 -in certificate.crt -text -noout
```
*Look for `Issuer:` (who signed it), `Validity:` (when it expires), and `Subject Alternative Name:` (the domains it covers).*

### View a CSR (`.csr`)
```bash
openssl req -in request.csr -text -noout
```

### View a Private Key (`.key`)
```bash
openssl rsa -in private.key -check
```

### Does the Key match the Certificate?
If you have a folder full of keys and certs and don't know which goes with which, you can extract the public modulus from both. If the hashes match, they are a pair!
```bash
openssl x509 -noout -modulus -in certificate.crt | openssl md5
openssl rsa -noout -modulus -in private.key | openssl md5
```

---

## 3. Format Conversions

Different systems require different formats. Nginx/Apache use **PEM** (Base64 text). Windows/IIS and Java often use **PKCS12 / PFX** (Binary).

### PEM to PKCS12 (`.pfx` / `.p12`)
Bundles a private key and a certificate into a single password-protected binary file.
```bash
openssl pkcs12 -export \
  -out certificate.pfx \
  -inkey private.key \
  -in certificate.crt \
  -certfile ca-chain.crt
```

### PKCS12 to PEM (Extracting from `.pfx`)
If you are migrating off Windows IIS to Linux Nginx, you must extract the text keys from the binary PFX.

```bash
# Extract everything (Key + Certs)
openssl pkcs12 -in certificate.pfx -out everything.pem -nodes

# Extract ONLY the Private Key
openssl pkcs12 -in certificate.pfx -nocerts -out private.key -nodes

# Extract ONLY the Certificates
openssl pkcs12 -in certificate.pfx -clcerts -nokeys -out certificate.crt
```

### DER (Binary) to PEM (Text)
```bash
openssl x509 -inform der -in certificate.cer -out certificate.pem
```

---

## 4. Network Debugging (`s_client`)

OpenSSL isn't just for files; it is a powerful network debugging tool. If a website is throwing an SSL error, you can use `s_client` to interrogate the remote server's SSL handshake directly from your terminal.

### Check a remote server's certificate chain
```bash
openssl s_client -connect www.example.com:443 -showcerts
```
*This will print out the entire chain of certificates the server is sending. If the intermediate CA is missing, you will see it here.*

### Test if a server supports a specific TLS version
```bash
# Force TLS 1.2
openssl s_client -connect www.example.com:443 -tls1_2

# Check if the server still accepts insecure TLS 1.0 (it shouldn't!)
openssl s_client -connect www.example.com:443 -tls1
```

### Check a specific SNI (Server Name Indication)
If a single IP address hosts multiple websites (like in a Kubernetes Ingress), you MUST specify the `-servername` flag, otherwise the server won't know which certificate to serve you.
```bash
openssl s_client -connect 10.0.0.50:443 -servername api.example.com
```
