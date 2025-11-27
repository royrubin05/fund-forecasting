#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔄 Starting GitHub Sync...${NC}"

# 1. Check for Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed.${NC}"
    exit 1
fi

# 2. Check/Install GitHub CLI (gh)
if ! command -v gh &> /dev/null; then
    echo -e "${BLUE}⚠️  GitHub CLI not found. Attempting install via Homebrew...${NC}"
    if command -v brew &> /dev/null; then
        brew install gh
        
        if ! command -v gh &> /dev/null; then
             echo -e "${RED}❌ Failed to install GitHub CLI.${NC}"
             echo -e "Please run the following command to fix your Homebrew permissions, then try again:"
             echo -e "${BLUE}sudo chown -R \$(whoami) /usr/local/var/log${NC}"
             exit 1
        fi
    else
        echo -e "${RED}❌ Homebrew not found. Please install GitHub CLI manually: https://cli.github.com/${NC}"
        exit 1
    fi
fi

# 3. Authenticate
echo -e "${BLUE}🔐 Checking GitHub authentication...${NC}"
if gh auth status &> /dev/null; then
    # Already logged in
    CURRENT_USER=$(gh api user -q .login)
    echo -e "${GREEN}✅ Already logged in as: ${CURRENT_USER}${NC}"
else
    # Not logged in
    echo -e "${BLUE}⚠️  Not logged in. Initiating login...${NC}"
    echo -e "👉 Select 'GitHub.com', 'HTTPS', and 'Login with a web browser'"
    gh auth login
fi

# 4. Initialize & Create Repo
if [ ! -d ".git" ]; then
    git init
    git branch -M main
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo -e "${BLUE}📂 Creating private repository on GitHub...${NC}"
    REPO_NAME=$(basename "$PWD")
    # Create repo and set remote
    gh repo create "$REPO_NAME" --private --source=. --remote=origin
else
    echo -e "${GREEN}✅ Repository already linked.${NC}"
fi

# 5. Push Changes
echo -e "${BLUE}⬆️  Pushing changes...${NC}"
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
git push -u origin main

echo -e "${GREEN}✅ Success! Your code is synced to GitHub.${NC}"
