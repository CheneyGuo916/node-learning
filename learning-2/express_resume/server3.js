const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.set('views', 'views');
app.set('view engine', 'hbs');

function loggingMiddleware(req, res, next) {
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

app.use(loggingMiddleware);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/broken', (req, res) => {
    throw new Error('Broken!');
  });

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});