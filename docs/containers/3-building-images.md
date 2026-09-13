# Building Images

While using pre-built images from Docker Hub is great, engineering requires building your own custom applications into immutable container images using a `Dockerfile`.

## The Dockerfile

A `Dockerfile` is a declarative script containing step-by-step instructions on how to build your image.

```dockerfile
# 1. Always start from a base image (Use Alpine for tiny image sizes!)
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json first to leverage Docker's layer caching
COPY package.json package-lock.json ./

# 4. Run commands to install dependencies
RUN npm ci --only=production

# 5. Copy the rest of the application source code
COPY . .

# 6. Declare the port the app listens on
EXPOSE 3000

# 7. The final command to execute when the container starts
CMD ["node", "server.js"]
```

To build this image, you run:
```bash
docker build -t my-node-app:1.0.0 .
```

## Layer Caching (Why Order Matters)

Remember that images are built in **layers** (UnionFS). Docker executes each line in the `Dockerfile` and saves it as a cached layer.

If you change a line in your `Dockerfile` (or if a `COPY` command detects that a file on your host machine changed), **that layer and every single layer after it breaks cache and must be rebuilt.**

This is why we `COPY package.json` and run `npm ci` *before* we `COPY . .` (the rest of the source code). If you only changed a typo in your `index.html`, Docker will use the cached `npm ci` layer and build instantly. If you copied the source code *before* installing dependencies, Docker would reinstall all npm packages every time you fixed a typo!

## The `.dockerignore` File

Just like `.gitignore`, you should never build an image without a `.dockerignore` file. If you don't ignore your local `node_modules` or `.git` folders, the `COPY . .` command will copy hundreds of megabytes of garbage into your container image.

```text
# Example .dockerignore
node_modules/
.git/
npm-debug.log
Dockerfile
.env
```

## Multi-Stage Builds

When building compiled languages like Go, Rust, or C++, you need heavy build tools (compilers, headers) to create the binary. However, your final production container *only* needs the binary itself, not the compiler.

**Multi-stage builds** solve this by allowing you to use multiple `FROM` statements. You build the app in a massive "builder" image, and then copy just the finished binary into a tiny, secure "runtime" image.

```dockerfile
# Stage 1: The Builder (Huge image with Go compiler)
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
# Compile a statically linked binary
RUN CGO_ENABLED=0 GOOS=linux go build -o myapp .

# Stage 2: The Runtime (Scratch is a 0-byte totally empty image!)
FROM scratch
WORKDIR /
# Copy ONLY the binary from the builder stage
COPY --from=builder /app/myapp /myapp
# Execute it
CMD ["/myapp"]
```

The resulting image might be exactly 5MB, rather than 800MB!
