const mysql = require('mysql2/promise');

const dbConnection = mysql.createPool({
    host: 'localhost',    
    user: 'root',        
    password: '', 
    database: 'expensedb',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

module.exports = dbConnection;
