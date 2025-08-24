const mysql = require('mysql2/promise');

const host = process.env.DB_HOST || process.env.MYSQLHOST || 'localhost';
const port = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);
const user = process.env.DB_USER || process.env.MYSQLUSER;
const password = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD;
const database = process.env.DB_NAME || process.env.MYSQLDATABASE;

// set DB_SSL=true in your LOCAL .env only
const useSSL = process.env.DB_SSL === 'true';

const dbConnection = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ...(useSSL ? { ssl: { rejectUnauthorized: false } } : {})
});

module.exports = dbConnection;
