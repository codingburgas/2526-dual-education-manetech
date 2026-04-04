# File Searcher – Asynchronous Text Search in Files and Directories

**A JavaScript-based grep-like application for searching text tokens across directory hierarchies using async/await and Node.js.**

## 📋 Project Overview

**Project Name:** File Searcher – Asynchronous Text Search  
**Program:** Dual Education System (PGKPI – Burgas)  
**Activity:** Internship in IT Company (2 workdays × 6 hours = 12 hours)  
**Team Size:** 2-3 students  
**Technology Stack:** JavaScript (Node.js, ES6+)  
**Repository:** GitHub (Public)

### Background

The supermarket "Please Buy?" has transitioned to entirely digital documentation—logs, receipts, reports, and more. However, the complex folder structure makes finding information difficult. While an existing synchronous solution works, it's slow for large directories.

**Goal:** Develop a faster, asynchronous JavaScript version that mimics the Linux `grep` command functionality.

---

## 🎯 Project Goals

This project aims to help students:

- Master working with the **file system** in Node.js
- Apply **asynchronous programming** patterns (async/await)
- Implement **recursive directory traversal**
- Build a **practical solution** similar to the Linux `grep` command
- Develop code that is **well-structured, commented, and maintainable**

---

## 📋 Functional Requirements

The application must:

1. **Accept inputs:**
   - Path to a directory
   - Text string (token) to search for

2. **Recursively traverse:**
   - All subdirectories
   - All files within them

3. **Read files asynchronously** (.txt files only)

4. **Check each line** for the search token

5. **Return results** in this format:
   ```json
   {
     "path/to/file1.txt": [1, 4, 7],
     "path/to/file2.log": [3, 10]
   }
   ```
   - Keys: full file paths
   - Values: arrays of line numbers (1-indexed) containing the token
   - Only files with matches are included

6. **Handle edge cases:**
   - Invalid directory paths
   - Inaccessible files
   - Empty directories
   - No matches found

---

## 🏗️ Project Structure

```
file-searcher/
│
├── index.js              # CLI interface (command-line version)
├── web-server.js         # Web server (runs the website)
├── index.html            # Website interface
├── style.css             # Website styling
├── searcher.js           # Core search functions (4 async functions)
├── README.md             # Project documentation (this file)
│
└── test-data/            # Sample test files with supermarket data
    ├── general-data.txt
    ├── sales-logs/
    │   ├── daily-sales.txt
    │   ├── hourly-sales.txt
    │   └── archive/
    │       └── 2024/
    │           └── january-sales.txt
    ├── receipts/
    │   ├── receipt-log.txt
    │   └── processed/
    └── reports/
        └── monthly-report.txt
```

### File Descriptions

| File | Purpose |
|------|---------|
| `index.js` | CLI (command-line) interface - search from terminal |
| `web-server.js` | Web server - runs the website interface |
| `index.html` | Website page - beautiful web interface |
| `style.css` | Website styling - colors and design |
| `searcher.js` | Contains all 4 core async functions for the search algorithm |
| `test-data/` | Nested directory structure with realistic supermarket test files |

---

## 🛠️ Technologies Used

- **Node.js** (v12+) – JavaScript runtime
- **fs/promises** – Built-in async file system module
- **async/await** – Asynchronous programming pattern
- **No external dependencies** – Uses only Node.js built-in modules

---

## 📦 Installation

### Prerequisites

- Node.js (v12 or higher) installed on your system
- Basic terminal/command prompt knowledge

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd file-searcher
   ```

2. **No additional dependencies to install** – uses only Node.js built-in modules

---

## 🚀 Usage

### Option 1: Command-Line Interface (CLI)

**Basic Command:**
```bash
node index.js <directory> <search-token>
```

**Example - Search for "World" in test-data:**
```bash
node index.js ./test-data World
```

**Example - Search for "Hello":**
```bash
node index.js ./test-data Hello
```

**Example - Search in current directory:**
```bash
node index.js . ".js"
```

### Option 2: Web Interface (Website)

**Start the web server:**
```bash
node web-server.js
```

**Output:**
```
========================================
  File Searcher Web Server
========================================

Server is running at: http://localhost:3000

Open your browser and go to:
  → http://localhost:3000

Press Ctrl+C to stop the server
========================================
```

**Usage:**
1. Open your browser and go to **http://localhost:3000**
2. Enter a directory (e.g., `./test-data`)
3. Enter a search word (e.g., `World`)
4. Click **Search** button
5. See results appear instantly!

### Expected Output (CLI)

**Search for "World":**
```
Searching for "World" in "./test-data"...

Found in 6 file(s):

  test-data/general-data.txt
  Lines: 2

  test-data/sales-logs/daily-sales.txt
  Lines: 2

  test-data/sales-logs/hourly-sales.txt
  Lines: 2, 3

  test-data/sales-logs/archive/2024/january-sales.txt
  Lines: 4

  test-data/receipts/receipt-log.txt
  Lines: 2

  test-data/reports/monthly-report.txt
  Lines: 2

Results (as JSON):
{
  "test-data/general-data.txt": [2],
  "test-data/sales-logs/daily-sales.txt": [2],
  "test-data/sales-logs/hourly-sales.txt": [2, 3],
  "test-data/sales-logs/archive/2024/january-sales.txt": [4],
  "test-data/receipts/receipt-log.txt": [2],
  "test-data/reports/monthly-report.txt": [2]
}
```

---

## 🔍 How It Works

The solution consists of **4 core functions** that build upon each other:

### 1. `getPathNames(dir)` – List Single Level
Returns all files and directories at one level:
```javascript
await getPathNames('test-data')
// Returns: ['test-data/A', 'test-data/B', 'test-data/C', 'test-data/file1.txt']
```

### 2. `getNestedPathNames(dir)` – Recursive Traversal
Recursively traverses all subdirectories:
```javascript
await getNestedPathNames('test-data')
// Returns all files at all levels: ['test-data/A', 'test-data/B', ..., 'test-data/A/D/F/file1.txt']
```

### 3. `readFiles(dir)` – Read All .txt Files
Reads content of all .txt files:
```javascript
await readFiles('test-data')
// Returns: [['test-data/file1.txt', 'Hello\nWorld\n...'], ...]
```

### 4. `search(dir, token)` – Find Token and Return Line Numbers
Combines all previous functions to search for the token:
```javascript
await search('test-data', 'World')
// Returns: { 'test-data/file1.txt': [2], 'test-data/A/file1.txt': [2], ... }
```

---

## ⚙️ Key Features

✅ **Fully Asynchronous** – Uses async/await for better performance  
✅ **Recursive Traversal** – Handles deeply nested directory structures  
✅ **Error Handling** – Gracefully handles permission errors, missing files  
✅ **1-Indexed Line Numbers** – Matches user expectations and grep behavior  
✅ **Well-Commented Code** – JSDoc comments for all functions  
✅ **No External Dependencies** – Uses only Node.js built-in modules  
✅ **Test Data Included** – Multi-level directory structure for testing  

---

## 📝 Code Quality

- **Structure:** Organized into logical functions with clear separation of concerns
- **Comments:** Comprehensive JSDoc comments for all functions
- **Error Handling:** Catches and logs errors gracefully without crashing
- **ES6+ Features:** Uses modern JavaScript (arrow functions, const/let, template literals)
- **Naming:** Clear, descriptive variable and function names

---

## 🧪 Testing

### Manual Tests

1. **Test basic search:**
   ```bash
   node index.js ./test-data World
   ```
   Should find "World" in multiple files with correct line numbers.

2. **Test empty results:**
   ```bash
   node index.js ./test-data "nonexistent"
   ```
   Should return empty object `{}`.

3. **Test invalid directory:**
   ```bash
   node index.js ./nonexistent World
   ```
   Should handle gracefully with empty results.

4. **Test deeply nested files:**
   The test-data directory contains files 3+ levels deep to verify recursive traversal works.

---

## 🎓 Learning Outcomes

Upon completing this project, students will understand:

- How to work with the **Node.js file system** (fs/promises)
- **Asynchronous programming** patterns and best practices
- **Recursive algorithms** for directory traversal
- **Error handling** in async code
- **Git workflows** and collaborative development
- How to structure **maintainable, professional code**

---

## 📊 Evaluation Criteria

| Criterion | Weight |
|-----------|--------|
| Search Correctness | 20% |
| Asynchronous Implementation | 20% |
| File System Operations | 10% |
| Code Quality & Readability | 10% |
| Team Work & GitHub Usage | 10% |
| Documentation (README) | 10% |
| Project Defense | 20% |

---

## 👥 Team Members

| Name | Role |
|------|------|
| [Student 1] | Developer |
| [Student 2] | Developer |
| [Student 3] | Developer (Optional) |

---

## 📚 References

- [Node.js fs/promises Documentation](https://nodejs.org/api/fs.html#fs_promises_api)
- [async/await - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- [grep Command Tutorial](https://www.gnu.org/software/grep/manual/)

---

## 📄 License

This project is part of the Dual Education Program at PGKPI – Burgas.

---

## 🚀 Future Enhancements

Potential improvements for future versions:

- Case-insensitive search option
- Regex pattern matching support
- Search multiple file extensions (not just .txt)
- File size limits for very large files
- Progress bar for long searches
- Output to file / different formats (CSV, JSON)
- Parallel processing for optimal performance

---

**Created:** April 2026  
**Project Type:** Educational – Internship in IT Company  
**Difficulty Level:** Beginner-to-Intermediate