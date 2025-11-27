#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Fund Forecasting Tool Setup...${NC}"

# 1. Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${BLUE}⚠️  Node.js not found. Attempting to install via Homebrew...${NC}"
    
    if command -v brew &> /dev/null; then
        brew install node
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ Node.js installed successfully!${NC}"
        else
            echo -e "${RED}❌ Failed to install Node.js via Homebrew.${NC}"
            echo -e "Please install it manually from: https://nodejs.org/"
            exit 1
        fi
    else
        echo -e "${RED}❌ Homebrew not found.${NC}"
        echo -e "Please install Node.js manually from: https://nodejs.org/"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Node.js found: $(node -v)${NC}"
fi

# 2. Install Dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependencies installed successfully.${NC}"

# 3. Run Tests
echo -e "${BLUE}🧪 Running automated tests...${NC}"
npm test

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Tests failed. Please check the output above.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All tests passed!${NC}"

# 4. Success Message
echo -e "\n${GREEN}🎉 Setup Complete!${NC}"
echo -e "To start the application, run:"
echo -e "${BLUE}npm run dev${NC}"
echo -e "Then open http://localhost:3000 in your browser."
