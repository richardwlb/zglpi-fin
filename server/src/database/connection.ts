import knex from 'knex';

require('dotenv').config();

const connection = knex({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME,
        port : 52000,
      }
});

export default connection;