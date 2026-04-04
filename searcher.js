// Import the fs (file system) module to read files
const fs = require('fs').promises;
const path = require('path');

// ============================================================================
// STEP 1: Get files and folders in ONE directory (not nested)
// ============================================================================

async function getPathNames(dir) {
  try {
    // Read the directory and get all files/folders inside it
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    // Create full paths like "dir1/file.txt" instead of just "file.txt"
    const fullPaths = [];
    for (let entry of entries) {
      const fullPath = path.join(dir, entry.name);
      fullPaths.push(fullPath);
    }
    
    return fullPaths;
  } catch (error) {
    // If something goes wrong (folder doesn't exist, no permission, etc.)
    console.log("Could not read directory:", dir);
    return [];
  }
}

// ============================================================================
// STEP 2: Get ALL files and folders recursively (including nested ones)
// ============================================================================

async function getNestedPathNames(dir) {
  const allPaths = [];
  
  // This function will call itself to go deeper into folders
  async function goDeeper(currentFolder) {
    // Get items in current folder
    const items = await getPathNames(currentFolder);
    
    // Check each item
    for (let item of items) {
      // Add it to our list
      allPaths.push(item);
      
      // Check if this item is a folder
      const info = await fs.stat(item);
      if (info.isDirectory()) {
        // If it's a folder, go inside it (call this function again)
        await goDeeper(item);
      }
    }
  }
  
  // Start the recursive search from the starting directory
  await goDeeper(dir);
  return allPaths;
}

// ============================================================================
// STEP 3: Read all .txt files and get their content
// ============================================================================

async function readFiles(dir) {
  // Get all files (including nested ones)
  const allItems = await getNestedPathNames(dir);
  
  // Create a list to store [filename, content] pairs
  const fileContents = [];
  
  // Check each item
  for (let item of allItems) {
    // Only process .txt files
    if (item.endsWith('.txt')) {
      try {
        // Read the file content
        const content = await fs.readFile(item, 'utf8');
        
        // Store [filepath, content] together
        fileContents.push([item, content]);
      } catch (error) {
        console.log("Could not read file:", item);
      }
    }
  }
  
  return fileContents;
}

// ============================================================================
// STEP 4: Search for a word and return which lines it's on
// ============================================================================

async function search(dir, token) {
  // Step 1: Read all .txt files
  const allFiles = await readFiles(dir);
  
  // Step 2: Create an empty object to store results
  const results = {};
  
  // Step 3: Check each file
  for (let [filePath, content] of allFiles) {
    // Split the content into lines (separated by newline)
    const lines = content.split('\n');
    
    // Create a list to store matching line numbers
    const matchingLines = [];
    
    // Check each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Does this line contain our search word?
      if (line.includes(token)) {
        // Line numbers start from 1, not 0 (that's why we do i+1)
        matchingLines.push(i + 1);
      }
    }
    
    // If we found any matches in this file, add it to results
    if (matchingLines.length > 0) {
      results[filePath] = matchingLines;
    }
  }
  
  return results;
}

// ============================================================================
// Export the functions so other files can use them
// ============================================================================

module.exports = {
  getPathNames,
  getNestedPathNames,
  readFiles,
  search
};

