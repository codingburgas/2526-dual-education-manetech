# Live Server Setup Guide

This guide explains how to use Live Server for development while keeping the Node.js backend API working.

## What You'll Need

1. **Node.js** - Still required for the backend API
2. **Live Server Extension** - Already installed in VS Code ✅
3. **Two terminals** - One for Node.js, one for Live Server

## Setup Steps

### Step 1: Install Node.js

1. Visit https://nodejs.org/
2. Download and install the **LTS** (Long Term Support) version
3. Accept default settings (make sure "Add to PATH" is checked)
4. Restart your computer or terminal

### Step 2: Verify Installation

Open PowerShell and run:
```powershell
node --version
npm --version
```

Both should print version numbers. If not, Node.js wasn't installed correctly.

## Running the Servers

### Terminal 1: Start the Node.js Backend API Server

```powershell
cd c:\Users\Hristiyan\source\repos\2526-dual-education-manetech
node web-server.js
```

You should see:
```
========================================
  File Searcher Web Server
========================================

Server is running at: http://localhost:3000
```

**Keep this terminal open** - it provides the search API.

### Terminal 2: Use Live Server for Live Reload

1. In VS Code, right-click on **index.html**
2. Select **"Open with Live Server"**
3. Your browser opens at `http://localhost:5500` (or similar port)

Now you can:
- Edit `index.html`, `style.css`, or `searcher.js`
- Changes automatically reload in your browser
- The search API calls go to `http://localhost:3000` (the Node.js server)

## How It Works

- **Port 3000** - Node.js server (handles API requests, search logic)
- **Port 5500** - Live Server (serves HTML/CSS with live reload)
- **index.html** - Contains `http://localhost:3000/api/search` URL so it always talks to the Node.js server, no matter which port it's served from

## Troubleshooting

### Error: "Can't find Node.js"
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### Error: "Port 3000 already in use"
- Another process is using port 3000
- Open Task Manager → find "node.exe" → End the process
- Or use a different port: Edit `web-server.js` line 11

### Live Server not opening browser
- Right-click `index.html` → "Open with Live Server"
- Or press `Ctrl+L` then `Ctrl+O` (if you have the keybinding)

### Search returns no results
- Make sure `directory` path is correct: `./test-data`
- Make sure `test-data` folder exists in your project directory
- Check the Node.js console for error messages

## Alternative: Use Just Node.js Server

If you don't need hot reload, you can just run:
```powershell
node web-server.js
```

Then open `http://localhost:3000` in your browser.

The website and API both work without Live Server - you just have to refresh manually when you change files.

## Files Modified

- **index.html** - Changed API URL from `/api/search` to `http://localhost:3000/api/search`
  - This allows Live Server (port 5500) to call the Node.js API (port 3000)

That's it! Enjoy developing! 🚀
