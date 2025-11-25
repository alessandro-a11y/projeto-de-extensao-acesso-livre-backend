const mysql = require('mysql2/promise');
require('dotenv').config(); // Adicione esta linha se estiver usando um arquivo .env

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: process.env.senha_do_mysql,
    database: 'acessolivre_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;