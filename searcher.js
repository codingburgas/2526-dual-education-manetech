// Import file system and path modules
const fs = require('fs').promises;
const path = require('path');

// ===== STEP 1: Read all files in a directory (including subfolders) =====
async function getAllFiles(dir) {
  const allFiles = [];
  
  async function readFolder(currentDir) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      
      for (let entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        allFiles.push(fullPath);
        
        // If it's a folder, read inside it too
        if (entry.isDirectory()) {
          await readFolder(fullPath);
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
  
  for (let filePath of allPaths) {
    if (filePath.endsWith('.txt')) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        files.push({ filePath, content });
      } catch (error) {
        console.log('Could not read file:', filePath);
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

