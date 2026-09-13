# Git Fundamentals

Git is a distributed version control system designed to handle everything from small to massive projects with speed and efficiency. Unlike older systems (like SVN) that store files as a list of changes, Git thinks of its data more like a series of snapshots of a miniature filesystem.

## The Three Trees

To master Git, you must understand its core philosophy: **The Three Trees**.

1. **Working Directory:** The actual files you see and edit on your computer's hard drive.
2. **Staging Area (Index):** A conceptual "loading dock" where you place modified files you are preparing to commit.
3. **Local Repository (HEAD):** The actual database where Git permanently stores your committed snapshots.

The standard Git workflow moves files from the Working Directory -> Staging Area -> Local Repository.

## Basic Operations

### 1. Initialization
Turn any normal directory into a Git repository.
```bash
# Initialize an empty repository
git init

# Alternatively, download an existing repository from the internet
git clone https://github.com/torvalds/linux.git
```

### 2. Checking Status
Always run this command before doing anything. It tells you exactly what tree your files are currently in.
```bash
git status
```

### 3. Adding to the Staging Area
You've made changes to a file. Now you need to move it to the Staging Area (the loading dock).
```bash
# Stage a specific file
git add server.py

# Stage all modified and new files in the current directory
git add .
```

### 4. Committing
Take a snapshot of everything currently sitting in the Staging Area and save it permanently to the Local Repository.
```bash
git commit -m "Add user authentication feature"
```

### 5. Viewing History
Look back at the snapshots you (and others) have taken.
```bash
# View the full commit history
git log

# View a condensed, one-line-per-commit history
git log --oneline
```

## Ignoring Files

You do not want to track every file in your project. Compiled binaries, temporary files, IDE configs (like `.vscode`), and secrets (like `.env` files) should never be committed.

You tell Git what to ignore by creating a file named `.gitignore` in the root of your repository.

```text
# Example .gitignore
node_modules/
*.log
.env
build/
```

> [!WARNING]
> If a file is already tracked by Git (already committed), adding it to `.gitignore` will **not** stop Git from tracking it. You must first untrack it using `git rm --cached <file>`.
