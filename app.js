const express = require('express');
const path = require('node:path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = 3000;

const messages = [
    {
        text: 'Hi there!',
        user: 'Armando',
        added: new Date(),
    },
    {
        text: 'Hi World!',
        user: 'Tyler',
        added: new Date(),
    },
];

app.get('/', (req, res) => {
    res.render('index', { title: 'Mini Messages', messages: messages });
});
app.post('/new', (req, res) => {

});

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }

    console.log(`Server Running on port: ${PORT}`)
})