const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Creates the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection();
});

afterConnection = () => {
  /* connection.query('SELECT * FROM departments', function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  }); */
  prompt();
};

const questions = [];

const prompt = () => {
    console.log('Employee Peeper');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'add',
            message: 'What would yo like to do?.',
            choices: ['View all departments', 'Exit']
        }
    ])
    .then(choice => {
        if (choice.add === 'View all departments') {
            readProducts = () => {
                connection.query('SELECT * FROM products', function(err, res) {
                  if (err) throw err;
                  // Log all results of the SELECT statement
                  console.table(res);
                  connection.end();
                });
            };
        } else {
            return;
        }
    })
};
