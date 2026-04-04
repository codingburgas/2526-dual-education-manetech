# 🔍 File Searcher — Asynchronous Text Search
A JavaScript grep-like tool for searching text across directory hierarchies using async/await and Node.js.

---

## 👥 Team

| Name | Role |
|------|------|
| RMKolibarov | Developer |
| HAMihaylov24 | Developer |
| PDKapralev24 | Developer |

---

## 📌 About the Project

File Searcher is an async CLI and web-based tool that recursively searches `.txt` files for a given token — similar to the Linux `grep` command. Built as part of an internship activity at PGKPI – Burgas.

**Key Features**
- Recursive directory traversal
- Async file reading with `async/await`
- Returns matched file paths and line numbers as JSON
- CLI and web interface included
- Graceful error handling (invalid paths, empty dirs, no matches)

---

## 🛠️ Tech Stack & Tools

- **Node.js** (v12+) — JavaScript runtime
- **fs/promises** — Built-in async file system module
- No external dependencies

---

## 🚀 Getting Started

**Prerequisites**
- Node.js (v12 or higher)
- Git installed on your machine

**Clone the Repository**
```
git clone <repository-url>
cd file-searcher
```

**Option 1 — CLI**
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
