const mysql = require('mysql2');

// Creates the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: '$Doraemon4eva$',
    database: 'employeeDB'
  });

module.exports = connection;