# 🔍 File Searcher

A simple tool to search for text in .txt files across folders.

## Team
- RMKolibarov (Developer)
- HAMihaylov24 (Developer)  
- PDKapralev24 (Developer)

## How it works

**searcher.js** - The search engine
- `getAllFiles(dir)` - Finds all files in a folder and subfolders
- `readTextFiles(dir)` - Reads the content of all .txt files
- `search(dir, word)` - Searches for a word and returns which files and line numbers

**index.js** - Command line tool
```bash
node index.js ./test-data World
```

**web-server.js + index.html** - Web interface
- Browser-based search tool
- Shows results in a nice UI
- Mobile-friendly design

## Running it

**Command line:**
```bash
node index.js ./test-data "your search word"
```

**Web version:**
```bash
node web-server.js
```
Then open http://localhost:3000 in your browser

## Result format

Results show:
- File path
- Line numbers where the word was found

Example:
```
./test-data/file.txt
Lines: 5, 12, 28
```
node index.js <directory> <search-token>

Example: node index.js ./test-data World
```

**Option 2 — Web Interface**
```
node web-server.js
```
Then open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
file-searcher/
├── index.js        # CLI interface
├── web-server.js   # Web server
├── index.html      # Web interface
├── style.css       # Styling
├── searcher.js     # Core search functions
├── test-data/      # Sample supermarket data files
└── README.md
```

---

## 🔄 Git Workflow

- `main` — stable, production-ready code
- `dev` — active development branch
- `feature/(your-feature-name)` — individual feature branches

**Commit Convention**
```
[type]: short description

Types: feat, fix, docs, refactor, test
Example: feat: add recursive directory traversal
```

---

## 📄 Documentation

All project documentation is maintained in the `/docs` folder as `.docx` and `.pptx` files.

Team File Searcher — © 2026
