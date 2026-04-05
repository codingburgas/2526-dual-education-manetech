// Import file system and path modules
const fs = require('fs').promises;
const path = require('path');

// ===== STEP 1: Read all files in a directory (including subfolders) =====
async function getAllFiles(dir) {
  const allFiles = [];
  
  async function readFolder(currentDir, relativePath = '') {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      
      for (let entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        // Build relative path with forward slashes: dir1/file.txt or dir1/A/file.txt
        const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
        
        allFiles.push(relPath.replace(/\\/g, '/')); // Convert backslashes to forward slashes
        
        // If it's a folder, read inside it too
        if (entry.isDirectory()) {
          await readFolder(fullPath, relPath);
        }
      }
    } catch (error) {
      console.log('Could not read folder:', currentDir);
    }
  }
  
  await readFolder(dir);
  return allFiles;
}

// ===== STEP 2: Read content of all .txt files =====
async function readTextFiles(dir) {
  const allPaths = await getAllFiles(dir);
  const files = [];
  
  for (let relPath of allPaths) {
    if (relPath.endsWith('.txt')) {
      // Convert relative path back to full path
      const fullPath = path.join(dir, relPath.replace(/\//g, path.sep));
      
      try {
        const content = await fs.readFile(fullPath, 'utf8');
        // Store with relative path in correct format (forward slashes)
        files.push({ filePath: relPath, content });
      } catch (error) {
        console.log('Could not read file:', fullPath);
      }
    }
  }
  
  return files;
}

// ===== STEP 3: Search for a word in all files =====
async function search(dir, searchWord) {
  const files = await readTextFiles(dir);
  const results = {};
  
  for (let { filePath, content } of files) {
    const lines = content.split('\n');
    const matchingLines = [];
    
    // Check each line to see if it contains the search word
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchWord)) {
        matchingLines.push(i + 1); // Line numbers start at 1, not 0
      }
    }
    
    // If found matches, store them
    if (matchingLines.length > 0) {
      results[filePath] = matchingLines;
    }
  }
  
  return results;
}

// Export the search function
module.exports = { search };

