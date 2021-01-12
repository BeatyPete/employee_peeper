const mysql = require('mysql2');
const connection = require('../db/database');

const allEmployees = () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT employees.*, 
      roles.job_title AS role,
      roles.salary AS salary,
      departments.Dep_Name AS department,
      b.first_name AS "manager" 
      FROM employees 
      LEFT JOIN roles ON employees.role_id = roles.id
      LEFT JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees b ON employees.manager_id = b.id
      `, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

module.exports = { allEmployees };