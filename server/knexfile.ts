import path from 'path';

require('dotenv').config();

module.exports = {
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME,
        port : 52000,
      },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
};