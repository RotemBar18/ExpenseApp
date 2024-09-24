const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
    host: process.env.DB_HOST,          // Use the host from .env
    user: process.env.DB_USER,          // Use the user from .env
    password: process.env.DB_PASSWORD,  // Use the password from .env
    database: process.env.DB_NAME,      // Use the database name from .env
    port: process.env.DB_PORT,          // Use the port from .env
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

module.exports = dbConnection;
