const db = require("../db/queries");

async function getAllMessages(req, res) {
    const messages = await db.getMessages();
    console.log("Messages: ", messages);
    res.send(messages);
}

async function messageHomepageGet(req, res) {
    const messages = await db.getMessages();
    res.render('index', { title: 'Mini Message Board', messages: messages });
}

async function newMessageGet(req, res) {
    res.render('form');
}

async function newMessagePost(req, res) {
    const message = req.body.message;
    const username = req.body.username;
    
    await db.insertMessage(message, username);
    res.redirect('/');
}

async function messagesByUsernameGet(req, res) {
    const search = req.query.username?.trim() || '';
    const messages = await db.getMessageByUser(search);
    res.render('messages', { 
        messages: messages,
    });
}

module.exports = {
    getAllMessages, messageHomepageGet,
    newMessageGet, newMessagePost,
    messagesByUsernameGet,
}