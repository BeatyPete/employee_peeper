const mysql = require('mysql2');
const connection = require('../db/database');

const allEmployees = () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT employees.*, roles.job_title 
        AS role 
        FROM employees 
        LEFT JOIN roles
        ON employees.role_id = roles.id`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

module.exports = { allEmployees };