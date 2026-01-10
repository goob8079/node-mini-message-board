const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const usernameErr = 'Username must contain only letters, numbers, and underscores!';
const usernameLenErr = 'Username must be between 1 and 30 characters';
const messageLenErr = 'Message must be between 1-300 characters!'

const validateMessage = [
    body('username').trim()
        .matches(/^[a-zA-Z0-9_]+$/).withMessage(`${usernameErr}`)
        .isLength({ min: 1, max: 30 }).withMessage(`${usernameLenErr}`),
    body('message').trim()
        .isLength({ min: 1, max: 300 }).withMessage(`${messageLenErr}`),
];

async function messageHomepageGet(req, res) {
    const messages = await db.getMessages();
    res.render('index', { 
        title: 'Mini Message Board', 
        messages: messages 
    });
}

async function newMessageGet(req, res) {
    res.render('form', {
        errors: [],
        old: {},
    });
}

async function newMessagePost(req, res) {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
        return res.status(400).render('form', {
            errors: errs.array(),
            old: req.body
        });
    }

    const message = req.body.message;
    const username = req.body.username;
    
    await db.insertMessage(message, username);
    res.redirect('/');
}

async function messagesByUsernameGet(req, res) {
    const search = req.query.username?.trim();
    
    if (!search) {
        return res.render('messagesByUser', {
            messages: []
        });
    }
    
    const messages = await db.getMessageByUser(search);
    res.render('messagesByUser', { 
        messages: messages,
    });
}

module.exports = {
    messageHomepageGet,
    newMessageGet,
    newMessagePost,
    messagesByUsernameGet,
    validateMessage,
}