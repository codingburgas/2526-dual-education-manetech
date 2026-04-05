# Code Structure - Simplified Guide

## Quick Overview

This project has 3 main parts:
1. **searcher.js** - The search engine (backend logic)
2. **index.js** - Command-line tool (CLI)
3. **index.html + web-server.js** - Web interface (browser)

---

## 1️⃣ searcher.js - The Search Engine

**3 simple functions:**

### `getAllFiles(dir)`
- Takes a folder path
- Reads all files in that folder
- Also reads files in subfolders (recursively)
- Returns a list of all file paths

### `readTextFiles(dir)`
- Gets all files using `getAllFiles()`
- Only keeps `.txt` files
- Reads the content of each file
- Returns: `[{filePath, content}, ...]`

### `search(dir, searchWord)`
- Gets all text files using `readTextFiles()`
- For each file, splits content into lines
- Checks each line for the search word
- Returns: `{filepath: [line1, line2, ...], ...}`

**Example:**
```javascript
const results = await search('./test-data', 'World');
// Returns:
// {
//   './test-data/file1.txt': [5, 12],
//   './test-data/file2.txt': [8]
// }
```

---

## 2️⃣ index.js - Command Line Tool

Simple steps:
1. Get arguments: directory and search word
2. Call `search()` from searcher.js
3. Show results in console

**Run it:**
```bash
node index.js ./test-data "World"
```

---

## 3️⃣ index.html - Web Interface

**JavaScript Sections (in order):**

### Mobile Sidebar Toggle
- Hamburger menu for phones
- Closes sidebar when clicking nav items
- Closes sidebar when clicking outside

### Tab Switching
- Shows/hides Search, Recent, Help tabs
- Updates page title

### Load Recent Searches
- Gets recent searches from browser memory (localStorage)
- Shows them in a list

### Perform Search
- Gets directory and search word from form
- Sends to server via `fetch()`
- Shows loading spinner while waiting
- Displays results when done

### Display Results
- Updates the results badge (number of files)
- Shows each file and its line numbers
- Shows "No files found" if empty

---

## File Flow Diagram

```
User enters directory and word
          ↓
   HTML form submits
          ↓
   JavaScript sends to server
          ↓
   web-server.js receives request
          ↓
   Calls searcher.js search()
          ↓
   searcher.js returns results
          ↓
   JavaScript receives results
          ↓
   HTML displays results
```

---

## Variable Names Used

| Variable | What it is |
|----------|-----------|
| `dir` | Directory path |
| `searchWord` | Word to find |
| `filePath` | Path to a file |
| `content` | File content (text) |
| `results` | Found matches |
| `matchingLines` | Line numbers where word found |

---

## Key Concepts

### Async/Await
- `async function` means it can wait for slow tasks
- `await` pauses until a file is read
- Allows reading many files without blocking

### Recursion
- `readFolder()` calls itself to read subfolders
- Finds files at any depth

### Array Methods
- `.map()` - Transform each item
- `.filter()` - Keep only matching items  
- `.join()` - Combine array into string
- `.includes()` - Check if string contains text

---

## How to Explain Each Part

**To a beginner:**
"This tool finds words in text files, like using Ctrl+F but for entire folders."

**To a developer:**
"It recursively reads .txt files, splits by newlines, checks each line for a token, and returns file paths with matching line numbers."

**To a student:**
"It demonstrates async/await, recursion, file I/O, and REST APIs in a practical project."
