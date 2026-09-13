# Docker Compose

Running `docker run` commands with 15 different flags (`-p`, `-v`, `-e`, `--network`) for a single container is tedious. It becomes completely unmanageable when your application consists of a Frontend, a Backend API, a Redis cache, and a PostgreSQL database.

**Docker Compose** is an Infrastructure-as-Code (IaC) tool that allows you to define multi-container applications in a single declarative YAML file.

## The `docker-compose.yml` File

Instead of running four separate terminal commands, you write a `docker-compose.yml` file describing the desired state of your entire stack.

```yaml
version: "3.8"

services:
  # The Database
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: mysecretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: always

  # The Backend API
  api:
    build: 
      context: ./backend    # Points to a directory containing a Dockerfile
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://admin:mysecretpassword@db:5432/postgres
    depends_on:
      - db                  # Wait for the DB to start before starting the API

# Define the managed volumes
volumes:
  pgdata:
```

## Compose Commands

With your YAML file written, managing the entire stack requires only a few commands.

```bash
# Spin up the entire stack in the background
docker compose up -d

# View logs from ALL containers simultaneously
docker compose logs -f

# Spin down the stack and remove the networking (preserves volumes)
docker compose down

# Spin down AND destroy the volumes (Deletes the database data!)
docker compose down -v
```

## Internal Networking (DNS)

The true magic of Docker Compose is its automatic networking. 

When you run `docker compose up`, Docker creates an isolated virtual bridge network for the stack. All containers inside this stack are attached to this network.

Because they share this network, Docker's embedded DNS server allows them to resolve each other's IP addresses using their **service names** defined in the YAML file.

Notice in the example above, the `api` service connects to the database using the URL: `postgres://...@db:5432`. It literally uses the hostname `db`! You never have to worry about what random IP address Docker assigned to the database container.
