# Remotes and Collaboration

Git is a *distributed* version control system. This means your local `.git` repository contains the entire history of the project, completely independent of any server. 

To collaborate with others, you sync your local repository with a **Remote Repository** hosted on a service like GitHub, GitLab, or Bitbucket.

## Working with Remotes

By default, when you `git clone` a repository, Git automatically names the remote server `origin`.

```bash
# View all remotes attached to your local repository
git remote -v

# Add a new remote manually (e.g., if you started with git init)
git remote add origin git@github.com:username/repo.git
```

### 1. Fetching (`git fetch`)
`git fetch` contacts the remote server and downloads all the new branches and commits that you don't have locally. **It does not modify your Working Directory.** It simply updates your local copy of the remote's history (stored in hidden tracking branches like `origin/main`).

```bash
git fetch origin
```

### 2. Pulling (`git pull`)
`git pull` is essentially `git fetch` followed immediately by a `git merge`. It downloads the new data and automatically tries to merge it into your current working branch.

```bash
git pull origin main
```

### 3. Pushing (`git push`)
Once you have committed your changes locally, you must "push" them up to the remote server so others can see them.

```bash
# Push your local 'main' branch to the 'origin' remote
git push origin main
```

## Upstream Tracking

When you push a brand new local branch to a remote for the first time, Git doesn't know where to send it. You must establish an "upstream tracking link" using the `-u` (or `--set-upstream`) flag.

```bash
# Create a new branch
git checkout -b feature-api

# Push it to the remote AND tell Git to remember the link
git push -u origin feature-api

# For all future pushes on this branch, you just need to type:
git push
```

## Forks vs Branches (The GitHub Flow)

In enterprise environments, there are two primary ways teams collaborate using Remotes:

1. **The Branching Model (Shared Repository):** 
   Everyone has write access to the central `origin` repository. You clone it, create a branch locally, push your branch to `origin`, and open a Pull Request against `main`.

2. **The Forking Model (Open Source / Strict Security):**
   You do *not* have write access to the central repository (often called `upstream`). 
   - You click "Fork" on GitHub to create your own personal copy of the repo (`origin`).
   - You clone your `origin`.
   - You add the original repository as a second remote called `upstream` (`git remote add upstream <url>`).
   - You push your branches to your `origin`, and open a Pull Request across repositories from your `origin` to the `upstream`.
