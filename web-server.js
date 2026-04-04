#!/usr/bin/env node

// Import built-in Node.js modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const { search } = require('./searcher');

// Port to run the server on
const PORT = 3000;

// ============================================================================
// Helper functions for response formatting
// ============================================================================

function sendJSON(response, statusCode, data) {
  const jsonString = JSON.stringify(data);
  const byteLength = Buffer.byteLength(jsonString);
  
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': byteLength,
    'Access-Control-Allow-Origin': '*'
  });
  response.end(jsonString);
}

function sendHTML(response, statusCode, htmlContent) {
  const byteLength = Buffer.byteLength(htmlContent);
  
  response.writeHead(statusCode, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': byteLength,
    'Access-Control-Allow-Origin': '*'
  });
  response.end(htmlContent);
}

function sendCSS(response, statusCode, cssContent) {
  const byteLength = Buffer.byteLength(cssContent);
  
  response.writeHead(statusCode, {
    'Content-Type': 'text/css; charset=utf-8',
    'Content-Length': byteLength,
    'Access-Control-Allow-Origin': '*'
  });
  response.end(cssContent);
}

// ============================================================================
// Create the web server
// ============================================================================

const server = http.createServer(async (request, response) => {
  const url = request.url;
  const method = request.method;
  
  console.log('Request: ' + method + ' ' + url);
  
  // ======================================================================
  // ROUTE 1: OPTIONS - Handle CORS preflight
  // ======================================================================
  
  if (method === 'OPTIONS') {
    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    response.end();
    return;
  }
  
  // ======================================================================
  // ROUTE 2: GET / - Show the web page
  // ======================================================================
  
  if (url === '/' && method === 'GET') {
    try {
      const htmlFile = path.join(__dirname, 'index.html');
      const htmlContent = fs.readFileSync(htmlFile, 'utf8');
      sendHTML(response, 200, htmlContent);
    } catch (error) {
      console.error('Error loading index.html:', error.message);
      sendHTML(response, 500, '<h1>Error</h1><p>Could not load index.html</p><p>' + error.message + '</p>');
    }
    return;
  }
  
  // ======================================================================
  // ROUTE 3: GET /style.css - Serve CSS file
  // ======================================================================
  
  if (url === '/style.css' && method === 'GET') {
    try {
      const cssFile = path.join(__dirname, 'style.css');
      const cssContent = fs.readFileSync(cssFile, 'utf8');
      sendCSS(response, 200, cssContent);
    } catch (error) {
      console.error('Error loading style.css:', error.message);
      response.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      response.end('CSS file not found');
    }
    return;
  }
  
  // ======================================================================
  // ROUTE 4: POST /api/search - Handle search requests
  // ======================================================================
  
  if (url === '/api/search' && method === 'POST') {
    let body = '';
    let hasError = false;
    
    // Collect incoming data
    request.on('data', chunk => {
      if (body.length > 1e6) {
        hasError = true;
        request.connection.destroy();
        console.error('Request body too large');
      }
      body += chunk.toString();
    });
    
    // Process complete request
    request.on('end', async () => {
      if (hasError) {
        return;
      }
      
      try {
        console.log('Request body length: ' + body.length + ' bytes');
        
        // Check for empty body
        if (!body || body.trim().length === 0) {
          console.log('Error: Empty request body');
          sendJSON(response, 400, { error: 'Request body is empty' });
          return;
        }
        
        // Parse JSON
        let data;
        try {
          data = JSON.parse(body);
          console.log('Parsed data: directory="' + data.directory + '", searchWord="' + data.searchWord + '"');
        } catch (parseError) {
          console.error('JSON parse error: ' + parseError.message);
          sendJSON(response, 400, { error: 'Invalid JSON: ' + parseError.message });
          return;
        }
        
        const directory = data.directory;
        const searchWord = data.searchWord;
        
        // Validate inputs
        if (!directory || !searchWord) {
          console.log('Error: Missing directory or searchWord');
          sendJSON(response, 400, { error: 'Please provide both directory and search word' });
          return;
        }
        
        // Run search
        console.log('Starting search for "' + searchWord + '" in "' + directory + '"');
        const results = await search(directory, searchWord);
        const fileCount = Object.keys(results).length;
        console.log('Search complete. Files found: ' + fileCount);
        
        // Send success response
        if (!response.headersSent) {
          sendJSON(response, 200, {
            success: true,
            results: results,
            filesFound: fileCount
          });
        }
        
      } catch (error) {
        console.error('Search error: ' + error.message);
        console.error('Stack: ' + error.stack);
        
        if (!response.headersSent) {
          sendJSON(response, 500, { error: 'Search failed: ' + error.message });
        }
      }
    });
    
    // Handle request errors
    request.on('error', (error) => {
      console.error('Request error: ' + error.message);
      if (!response.headersSent) {
        sendJSON(response, 400, { error: 'Request error: ' + error.message });
      }
    });
    
    return;
  }
  
  // ======================================================================
  // ROUTE 5: Handle 404
  // ======================================================================
  
  response.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
  response.end('404 - Page not found');
});

// Start the server
server.listen(PORT, () => {
  console.log('\n');
  console.log('========================================');
  console.log('  File Searcher Web Server');
  console.log('========================================');
  console.log('');
  console.log('Server is running at: http://localhost:' + PORT);
  console.log('');
  console.log('Open your browser and go to:');
  console.log('  → http://localhost:' + PORT);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('========================================\n');
});
