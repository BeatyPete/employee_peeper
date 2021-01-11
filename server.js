const inquirer = require('inquirer');
const cTable = require('console.table');

const { allDepartments, addDepartment, deleteDepartment } = require('./routes/departmentRoutes');

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
          allDepartments()
          .then( departments => {
            console.table(departments)
          })
          .then(startPrompt)
        } else if (choice.add === 'Add new department') {
            addDepPrompt()
        } else if (choice.add === 'Delete department') {
            deleteDepPrompt()
        } else {
            return;
        }
    })
};

const deleteDepPrompt = () => {
  let depNames = [];
  
  allDepartments()
  .then( depData => {
    /* console.log(depData) */
    
    depData.forEach( thing => {
      depNames.push(thing.Dep_Name)
    })
    
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
  .then(startPrompt)
};

const addDepPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'depName',
      message: 'Enter the new departments name.',
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

startPrompt();