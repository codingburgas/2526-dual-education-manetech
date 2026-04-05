#!/usr/bin/env node

// Import search function
const { search } = require('./searcher');

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  // Check if we have directory and search word
  if (args.length < 2) {
    console.log('Usage: node index.js <directory> <word-to-search>');
    console.log('Example: node index.js ./test-data World');
    return;
  }
  
  const directory = args[0];
  const searchWord = args[1];
  
  console.log(`\nSearching for "${searchWord}" in "${directory}"...\n`);
  
  // Search for the word
  const results = await search(directory, searchWord);
  const filesFound = Object.keys(results).length;
  
  // Show results
  if (filesFound === 0) {
    console.log('No files found with that word.\n');
  } else {
    console.log(`Found in ${filesFound} file(s):\n`);
    
    for (let filePath in results) {
      console.log(`  ${filePath}`);
      console.log(`  Lines: ${results[filePath].join(', ')}\n`);
    }
  }
  
  // Show results as JSON
  console.log('Results (as JSON):');
  console.log(JSON.stringify(results, null, 2));
}

// Run it
main();