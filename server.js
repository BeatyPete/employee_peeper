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
  startPrompt();
};

const questions = [];

const startPrompt = () => {
    console.log('Employee Peeper');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'add',
            message: 'What would yo like to do?.',
            choices: ['View all departments', 'Add new department', 'Delete department', 'Exit']
        }
    ])
    .then(choice => {
        if (choice.add === 'View all departments') {
          /* connection.query('SELECT * FROM departments', function(err, res) {
            if (err) throw err;
            console.table(res)
          }); */
          allDepartments()
          .then( departments => {
            console.table(departments)
          })
        } else if (choice.add === 'Add new department') {
            addDepPrompt()
        } else if (choice.add === 'Delete department') {
            deleteDepPrompt()
        } else {
            return;
        }
    })
};

const allDepartments = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) reject(err);
        resolve(res);
    });
  });
};

const deleteDepPrompt = () => {
  let depNames = [];
  allDepartments()
  .then( depData => {
    /* console.log(depData) */
    
    depData.forEach( thing => {
      depNames.push(thing.Dep_Name)
    })
    console.log(depNames)
    return inquirer.prompt([
      {
        type: 'list',
        name: 'deleteDep',
        message: 'Select a department to delete.',
        choices: depNames
      }
    ])
    .then( depName => deleteDepartment(depName.deleteDep))
  })
  
  /* .then(startPrompt) */
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
  .then(addDepartment)
  .then(startPrompt)
};

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
