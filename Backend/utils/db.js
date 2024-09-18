const mysql = require('mysql2/promise');

// Create a connection pool to the database
const dbConnection = mysql.createPool({
    host: 'localhost',    // Replace with your database host
    user: 'root',         // Replace with your database user
    password: '', // Replace with your database password
    database: 'expensedb', // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,  // Adjust the connection limit as needed
    queueLimit: 0
});

module.exports = dbConnection;
