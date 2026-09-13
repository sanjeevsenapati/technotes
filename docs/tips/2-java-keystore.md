# Java Keystore (`keytool`)

Java applications (like Tomcat, Spring Boot, or older Jenkins instances) traditionally do not read standard OpenSSL PEM files (`.crt` / `.key`). Instead, they require a password-protected binary vault called a **Java Keystore (JKS)**.

The `keytool` CLI is bundled with the JDK and is used to manage these vaults.

## TrustStore vs KeyStore

Before running commands, you must understand the difference between the two types of keystores Java uses:

1. **KeyStore:** Holds your *Private Key* and your *Identity Certificate*. This is used to prove who the Java server is (e.g., when a browser connects to your Spring Boot app over HTTPS).
2. **TrustStore:** Holds the public certificates of *other* Certificate Authorities that your Java application is willing to trust. If your Java app needs to make an API call to `https://api.external.com`, the TrustStore must contain the Root CA that signed `api.external.com`.

*(Technically, they are the exact same file format, just used for different purposes).*

---

## 1. Creating a Keystore

### Generate a new Keystore and KeyPair
This command creates a brand new keystore file and generates a Private/Public keypair inside it under the alias `my-server`.
```bash
keytool -genkeypair \
  -alias my-server \
  -keyalg RSA \
  -keysize 2048 \
  -keystore keystore.jks \
  -validity 365
```
*You will be prompted to set a keystore password, and provide the Distinguished Name (CN, OU, O, L, ST, C) for the certificate.*

### Generate a CSR from the Keystore
Once you have the keypair inside the keystore, you must generate a CSR to send to your Certificate Authority.
```bash
keytool -certreq \
  -alias my-server \
  -keystore keystore.jks \
  -file request.csr
```

---

## 2. Importing Certificates

When the Certificate Authority gives you your signed certificate back, you must import it into the *exact same keystore* you used to generate the CSR.

**CRITICAL RULE:** You must import the CA's Root and Intermediate certificates *before* you import your actual server certificate!

### Step 1: Import the Root CA
```bash
keytool -importcert \
  -alias root-ca \
  -file rootCA.crt \
  -keystore keystore.jks
```

### Step 2: Import the Intermediate CA
```bash
keytool -importcert \
  -alias intermediate-ca \
  -file intermediateCA.crt \
  -keystore keystore.jks
```

### Step 3: Import your Server Certificate
You must use the *exact same alias* (`my-server`) that you used when generating the keypair. `keytool` will match the imported cert against the private key already in the vault.
```bash
keytool -importcert \
  -alias my-server \
  -file my_server.crt \
  -keystore keystore.jks
```

---

## 3. Inspection and Management

### List the contents of a Keystore
```bash
# Basic list
keytool -list -keystore keystore.jks

# Verbose list (shows expiry dates and issuer details)
keytool -list -v -keystore keystore.jks
```

### Check a specific Alias
```bash
keytool -list -v -keystore keystore.jks -alias my-server
```

### Delete an Alias
If you imported a certificate incorrectly, you can delete it:
```bash
keytool -delete -alias bad-cert -keystore keystore.jks
```

### Change the Keystore Password
```bash
keytool -storepasswd -keystore keystore.jks
```

---

## 4. Modernization (Migrating to PKCS12)

The `.jks` (Java KeyStore) format is proprietary to Java. Modern Java (JDK 9+) recommends using the industry-standard **PKCS12** (`.p12` / `.pfx`) format instead, because PKCS12 is universally supported by OpenSSL, Windows, and macOS.

### Convert a legacy JKS to PKCS12
```bash
keytool -importkeystore \
  -srckeystore keystore.jks \
  -srcstoretype JKS \
  -destkeystore keystore.p12 \
  -deststoretype PKCS12
```

### Import a PKCS12 file (from OpenSSL) into a JKS
If you used OpenSSL to generate your keys and certificates, you can bundle them into a `.pfx` file (using the command from the OpenSSL guide), and then import that entire bundle into a Java Keystore.
```bash
keytool -importkeystore \
  -srckeystore certificate.pfx \
  -srcstoretype PKCS12 \
  -destkeystore keystore.jks \
  -deststoretype JKS
```
