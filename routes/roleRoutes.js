const mysql = require('mysql2');
const connection = require('../db/database');
const  { getDepId } = require('./departmentRoutes')

const allRoles = () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT roles.*, departments.Dep_Name 
        AS dep_name 
        FROM roles 
        LEFT JOIN departments
        ON roles.department_id = departments.id`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const getRoleId = role => {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT id FROM roles WHERE job_title = '${role}'`, (err, res) => {
          if (err) reject(err);
          resolve(res);
      });
  });
}

const addRole = role => {
    /* query for id from department chosen from inquirer */
    getDepId(role.department)
      .then( depId => {
        connection.query(
            'INSERT INTO roles SET ?',
            {
              job_title: role.name,
              salary: role.salary,
              department_id: depId[0].id
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + ' role created!\n');
            }
          );
      })
};

const deleteRole = role => {
    console.log(`Deleting ${role}...\n`);
    connection.query(
      'DELETE FROM roles WHERE ?',
      {
        job_title: role
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' department deleted!\n');
      }
    );
};

module.exports = { allRoles, addRole, deleteRole, getRoleId };