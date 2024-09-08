const http = require('http');
const fs = require('fs');
const os = require('os');

// Get the greeting from the "GREETING" environment variable, or use a default value
const greeting = process.env.GREETING || 'Hello World!';

// Get the file path from the "FILE_PATH" environment variable, or use a default value
const filePath = process.env.FILE_PATH || '/var/secret/secret.txt';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // File not found or error reading the file
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`${greeting}\nServer hostname: ${os.hostname()}\n`);
      } else {
        // File found, send its content along with the server hostname
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`File content:\n${data}\nServer hostname: ${os.hostname()}\n`);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Server hostname is ${os.hostname()}`);
  console.log(`File path is set to: ${filePath}`);
});

// Gracefully handle shutdown signals
process.on('SIGINT', () => {
  console.log('Received SIGINT signal. Shutting down gracefully.');
  server.close(() => {
    console.log('Server has been closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal. Shutting down gracefully.');
  server.close(() => {
    console.log('Server has been closed.');
    process.exit(0);
  });
});
