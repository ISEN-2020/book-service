// index.js
const express = require('express');
const _ = require('lodash');

const app = express();
const port = 5000;

// A simple route that responds with "Hello, World!"
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example of using lodash (an outdated dependency)
app.get('/lodash-example', (req, res) => {
  const numbers = [1, 2, 3, 4, 5];
  const doubled = _.map(numbers, num => num * 2);
  res.send(`Doubled Numbers: ${doubled}`);
});

// Start the web server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
