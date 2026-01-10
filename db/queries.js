const { pool } = require("./pool");

async function getMessages() {
    const { rows } = await pool.query("SELECT * FROM messages ORDER BY added DESC, id DESC");
    return rows;
}

async function getAllUsers() {
    const { rows } = await pool.query("SELECT DISTINCT username FROM messages ORDER BY username");
    // return only the usernames and not the whole object
    return rows.map(r => r.username);
}

async function insertMessage(message, username) {
    await pool.query("INSERT INTO messages (text, username) VALUES ($1, $2)", [message, username]);
}

// ILIKE = case-insensitive
// %${search}% enables partial matching using wildcards
async function getMessageByUser(username) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE username ILIKE ($1) ORDER BY added DESC", [`%${username}%`]);
    return rows;
}

module.exports = {
    getMessages, getAllUsers,
    insertMessage, getMessageByUser, 
}