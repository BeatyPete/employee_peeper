const mysql = require('mysql2');
const connection = require('../db/database');

const allDepartments = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM departments', (err, res) => {
          if (err) reject(err);
          resolve(res);
      });
    });
  };

  const getDepId = department => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id FROM departments WHERE Dep_Name = '${department}'`, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}

const addDepartment = department => {
    connection.query(
      'INSERT INTO departments SET ?',
      {
        dep_name: department.depName,
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' department created!\n');
      }
    );
};

const deleteDepartment = department => {
    console.log(`Deleting ${department}...\n`);
    connection.query(
      'DELETE FROM departments WHERE ?',
      {
        Dep_Name: department
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ' department deleted!\n');
      }
    );
  };
  
  module.exports = { allDepartments, addDepartment, deleteDepartment, getDepId };