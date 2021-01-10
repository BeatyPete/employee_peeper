const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
            choices: ['View all departments', 'Add new department', 'Exit']
        }
    ])
    .then(choice => {
        if (choice.add === 'View all departments') {
            connection.query('SELECT * FROM departments', function(err, res) {
                if (err) throw err;
                console.table(res);
                connection.end();
              });
        } else if (choice.add === 'Add new department') {
            addDepPrompt()
        } else {
            return;
        }
    })
};

const addDepPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'depName',
      message: 'Enter the new daprtments name.',
      validate: usageInput => {
        if (usageInput) {
          return true;
        } else {
          console.log('Please enter a name!');
          return false;
        }
      }
    }
  ])
  .then(addDep)
};

const addDep = thing => {
  console.log(thing)
  connection.query(
    'INSERT INTO departments SET ?',
    {
      dep_name: thing.depName,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' department created!\n');
    }
  );
};
