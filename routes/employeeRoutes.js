const mysql = require('mysql2');
const connection = require('../db/database');
const  { getRoleId } = require('./roleRoutes')

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

const getManagerId = manager => {
    const managerName = manager.split(' ')
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id FROM employees WHERE last_name = '${managerName[1]}'`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const addEmployee = employeeData => {
    let roleId = []
    getRoleId(employeeData.role)
      .then( roleData => {
        roleId.push(roleData[0].id)
      })
    getManagerId(employeeData.manager)
      .then( managerData => {
          console.log(roleId)
          console.log(managerData[0].id)
        connection.query(
            'INSERT INTO employees SET ?',
            {
              first_name: employeeData.firstName,
              last_name: employeeData.lastName,
              role_id: roleId[0],
              manager_id: managerData[0].id
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + ' employee created!\n');
            }
          );
      })
};

const updateEmployee = employeeData => {
    const employeeName = employeeData.employee.split(' ')
    getRoleId(employeeData.role)
    .then( roleData => {
        connection.query(
            'UPDATE employees SET ? WHERE ?',
            [
                {
                  role_id: roleData[0].id
                },
                {
                  last_name: employeeName[1]
                }
            ],
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + ' department created!\n');
            }
          );
    })
};

module.exports = { allEmployees, addEmployee, updateEmployee };