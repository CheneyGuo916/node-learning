// const http = require('http');
const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();

function loggingMiddleware(req, res, next) {
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

app.use(loggingMiddleware);

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end('Hello World\n');
// });
app.get('/', (req, res) => {
    res.send('Hello World');
});

// server.listen(port, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});