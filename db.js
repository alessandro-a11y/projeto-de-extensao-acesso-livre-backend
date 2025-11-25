const mysql = require('mysql2/promise');
require('dotenv').config(); // Adicione esta linha se estiver usando um arquivo .env

const pool = mysql.createPool({
    host: process.env.MYSQLHOST ,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;