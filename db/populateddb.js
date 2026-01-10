const { Client } = require("pg");
require('dotenv/config');

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR ( 300 ),
    username VARCHAR ( 255 ),
    added DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO messages (text, username)
VALUES 
    ('Hello my name is Bob!', 'Bob1'),
    ('Hi Bob, I''m Tom!', 'Tom01'),
    ('Wabble bloodle slowm boblob?', 'wibble33');
`;

async function main() {
    console.log('...seeding');
    const client = new Client({
        connectionString: `${process.env.DATABASE_URL}`,
    });
    await client.connect()
    await client.query(SQL);
    await client.end()
    console.log('done');
}

main();