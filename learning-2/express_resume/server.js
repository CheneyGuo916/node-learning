// const http = require('http');
const express = require('express');

const hostname = 'localhost';
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('Hello World\n');
// });
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});

// server.listen(port, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});