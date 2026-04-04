#!/usr/bin/env node

// Import the search function from searcher.js
const { search } = require('./searcher');

// Main function - this runs when we execute "node index.js"
async function main() {
  // Get the arguments from the command line
  // Example: node index.js ./test-data World
  const args = process.argv.slice(2);
  
  // Check if user provided the right number of arguments
  if (args.length < 2) {
    console.log('Usage: node index.js <directory> <word-to-search>');
    console.log('Example: node index.js ./test-data World');
    return;
  }
  
  const directory = args[0];
  const searchWord = args[1];
  
  console.log('\nSearching for "' + searchWord + '" in "' + directory + '"...\n');
  
  // Run the search
  const results = await search(directory, searchWord);
  
  // Show results
  const filesFound = Object.keys(results).length;
  
  if (filesFound === 0) {
    console.log('No files found with that word.\n');
  } else {
    console.log('Found in ' + filesFound + ' file(s):\n');
    
    // Show each file and its line numbers
    for (let filePath in results) {
      const lineNumbers = results[filePath];
      console.log('  ' + filePath);
      console.log('  Lines: ' + lineNumbers.join(', ') + '\n');
    }
  }
  
  // Show the raw results as JSON
  console.log('Results (as JSON):');
  console.log(JSON.stringify(results, null, 2));
}

// Run the main function
main();