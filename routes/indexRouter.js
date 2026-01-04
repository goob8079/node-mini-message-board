const express = require('express');

const router = express.Router();

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

router.get('/', (req, res) => {
    res.render('index', { title: 'Mini Message Board', messages: messages });
});

router.get('/new', (req, res) => {
    res.render('form');
});
router.post('/new', (req, res) => {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;
    
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect('/');
});

router.get('/message/:id', (req, res) => {
    const message = messages[req.params.id];

    res.render('message', { message });
});

module.exports = router;