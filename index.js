const inquirer = require('inquirer');
const cTable = require('console.table');

const { allDepartments, addDepartment, deleteDepartment } = require('./routes/departmentRoutes');
const { allRoles, addRole, deleteRole } = require('./routes/roleRoutes')

const startPrompt = () => {
    console.log('Employee Peeper');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'add',
            message: 'What would yo like to do?.',
            choices: ['View all departments', 'Add new department', 'Delete department', 'View all roles', 'Add new role', 'Delete role', 'Exit']
        }
    ])
    .then(choice => {
        if (choice.add === 'View all departments') {
          allDepartments()
          .then( departments => console.table(departments))
          .then(startPrompt)
        } else if (choice.add === 'Add new department') {
            addDepPrompt()
        } else if (choice.add === 'Delete department') {
            deleteDepPrompt()
        } else if (choice.add === 'View all roles') {
          allRoles()
          .then( roles => console.table(roles))
          .then(startPrompt)
        } else if (choice.add === 'Add new role') {
          addRolePrompt()
        } else if (choice.add === 'Delete role') {
          deleteRolePrompt()
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

const deleteDepPrompt = () => {
  let depNames = [];

  allDepartments()
  .then( depData => {
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

const addRolePrompt = () => {
  let depNames = [];

  allDepartments()
  .then( depData => {
    depData.forEach( thing => {
      depNames.push(thing.Dep_Name)
    })
    
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the new roles name.',
        validate: usageInput => {
          if (usageInput) {
            return true;
          } else {
            console.log('Please enter a name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter a salary for the new role.',
        validate: usageInput => {
          if (Number.isInteger(parseInt(usageInput))) {
            return true;
          } else {
            console.log('Please enter a salary!');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'department',
        message: 'Select the associated department.',
        choices: depNames
      }
    ])
    .then(addRole)
  })
  .then(startPrompt)
};

const deleteRolePrompt = () => {
  let roleNames = [];

  allRoles()
  .then( roleData => {
    roleData.forEach( thing => {
      roleNames.push(thing.job_title)
    })
    
    return inquirer.prompt([
      {
        type: 'list',
        name: 'deleteRole',
        message: 'Select a role to delete.',
        choices: roleNames
      }
    ])
    .then( roleName => deleteRole(roleName.deleteRole))
  })
  .then(startPrompt)
};

startPrompt();