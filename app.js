const express = require('express');
const path = require('node:path');

const indexRouter = require('./routes/indexRouter');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use('/', indexRouter);

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server Running on port: ${PORT}`)
});