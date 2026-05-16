#!/bin/bash
# Purges .env from all git history so the deployment security scanner can pass.
# Run this once from the project root in the Shell tab:
#   bash scripts/purge-env-from-history.sh

set -e

echo "=== Purging .env from git history ==="

# Use filter-branch to remove .env from every commit
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env' \
  --prune-empty --tag-name-filter cat -- --all

echo "=== Cleaning up refs ==="
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ""
echo "=== Done! .env has been purged from all history ==="
echo ""
echo "Now run: git push --force"
echo "Then click Publish in Replit to deploy."
