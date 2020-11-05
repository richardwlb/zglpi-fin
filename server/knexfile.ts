import path from 'path';

module.exports = {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '1Password',
        database : 'glpi',
        port : 52000,
      },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
};