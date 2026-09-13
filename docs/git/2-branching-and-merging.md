# Branching and Merging

One of Git's most powerful features is its nearly instantaneous branching mechanism. A branch in Git is simply a lightweight movable pointer to a specific commit.

## Branch Management

The default branch name in Git is usually `master` or `main`. Whenever you start working on a new feature or bug fix, you should create a new branch to isolate your changes.

```bash
# List all local branches
git branch

# Create a new branch called "feature-login"
git branch feature-login

# Switch your Working Directory to that branch
git checkout feature-login
```

> [!TIP]
> **Checkout vs Switch:** `git checkout` is an older, overloaded command that can switch branches *and* restore files. In newer versions of Git (2.23+), you can use `git switch feature-login` which is safer and designed specifically for changing branches.

**Shortcut:** Create and switch to a new branch in one command:
```bash
git checkout -b feature-login
# or
git switch -c feature-login
```

## Merging

Once you have finished your work on `feature-login` and committed the changes, you need to merge them back into `main`.

1. Switch back to the receiving branch (`main`).
2. Run the merge command, pointing to the branch you want to pull in.

```bash
# Switch to main
git switch main

# Merge the feature branch into main
git merge feature-login
```

### Fast-Forward vs Recursive Merges

- **Fast-Forward:** If `main` has not changed since you created `feature-login`, Git simply moves the `main` pointer forward to match `feature-login`. No new merge commit is created.
- **Recursive (3-Way) Merge:** If `main` *has* changed (e.g., someone else merged a different feature), Git will attempt to automatically combine the changes and create a special "Merge Commit".

## Resolving Merge Conflicts

If you and another developer edited the exact same line of the exact same file on different branches, Git cannot automatically merge them. It will pause the merge and declare a **Merge Conflict**.

If you run `git status`, it will list the conflicting files as "both modified". If you open the conflicting file in your text editor, Git will have injected conflict markers:

```text
Here is some text in the file.
<<<<<<< HEAD
This is the line on the 'main' branch (where you currently are).
=======
This is the line on the 'feature-login' branch (what you are trying to merge).
>>>>>>> feature-login
And here is more text.
```

**How to resolve it:**
1. Manually edit the file to look exactly how you want the final version to look (delete the `<<<<<<<`, `=======`, and `>>>>>>>` markers).
2. Save the file.
3. Add the file to the staging area to tell Git the conflict is resolved: `git add <file>`.
4. Finish the merge by committing: `git commit`.
