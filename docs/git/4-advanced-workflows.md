# Advanced Workflows

As you move from a solo developer to working on large enterprise teams, you will need to utilize Git's more advanced, surgical tools to maintain a clean project history.

## Stashing (`git stash`)

Imagine you are halfway through writing a new feature, and suddenly your boss asks you to fix a critical bug on `main`. You aren't ready to commit your half-broken feature, but Git won't let you switch branches with uncommitted changes.

**Stashing** temporarily saves your uncommitted changes on a stack and reverts your working directory to a clean state.

```bash
# Save your uncommitted changes
git stash

# Switch to main and fix the bug...
git switch main
# (do work, commit, push)

# Go back to your feature branch
git switch feature-login

# Pop the stashed changes back into your working directory
git stash pop
```

## Cherry-Picking (`git cherry-pick`)

Sometimes a colleague writes a brilliant commit on their branch, and you want *just that one specific commit* applied to your branch, without merging their entire branch.

```bash
# Find the commit hash (e.g., a1b2c3d) from the git log
git log --oneline

# Apply that specific commit to your current branch
git cherry-pick a1b2c3d
```

## Rebasing (`git rebase`)

Rebasing is an alternative to merging. While `git merge` takes two divergent branches and ties them together with a "Merge Commit", `git rebase` actually rewrites history. It takes all the commits you made on your feature branch, lifts them up, and replays them one-by-one on top of the latest `main`.

The result is a perfectly linear history with no messy merge commits.

```bash
# Make sure your local main is up to date
git switch main
git pull

# Switch to your feature branch
git switch feature-login

# Rebase your branch ON TOP OF main
git rebase main
```

> [!WARNING]
> **The Golden Rule of Rebasing:** Never rebase a branch that you have already pushed to a remote repository if other people are working on it. Rebasing rewrites history, which will cause massive conflicts for anyone else who has the old history.

### Interactive Rebasing (`git rebase -i`)

If you made 15 tiny, messy commits (like "fix typo", "fix typo again", "forgot a file"), you can use Interactive Rebasing to "squash" them into a single, clean, professional commit before opening a Pull Request.

```bash
# Interactively rebase the last 5 commits on your current branch
git rebase -i HEAD~5
```
This opens your text editor, where you can change the word `pick` to `squash` (or `s`) for the commits you want to combine.

## The Lifesaver: Reflog (`git reflog`)

If you accidentally delete a branch, or perform a terrible rebase that ruins your repository, do not panic. Git actually keeps a hidden log of *every single time* the HEAD pointer moves, even for commits that are no longer on any branch!

```bash
# View the secret history of all pointer movements
git reflog
```

If you see that HEAD@{4} is where your repository was before you ruined it, you can forcibly reset your repository back to that exact state:

```bash
# Time travel back to safety
git reset --hard HEAD@{4}
```
