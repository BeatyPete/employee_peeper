const inquirer = require('inquirer');
const cTable = require('console.table');

const { allDepartments, addDepartment, deleteDepartment } = require('./routes/departmentRoutes');
const { allRoles, addRole, deleteRole } = require('./routes/roleRoutes');
const { allEmployees, addEmployee, updateEmployee, deleteEmployee } = require('./routes/employeeRoutes');

const startPrompt = () => {
    console.log('Employee Peeper');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'add',
            message: 'What would yo like to do?.',
            choices: ['View all departments', 'Add new department', 'Delete department', 'View all roles', 'Add new role', 'Delete role', 'View all employees', 'Add new employee', 'Updat an existing employee', 'Delete employee', 'Exit']
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
        } else if (choice.add === 'View all employees') {
          allEmployees()
          .then( employees => console.table(employees))
          .then(startPrompt)
        } else if (choice.add === 'Add new employee') {
          addEmployeePrompt()
        } else if (choice.add === 'Updat an existing employee') {
          updateEmployeePrompt()
        } else if (choice.add === 'Delete employee') {
          deleteEmployeePrompt()
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

const addEmployeePrompt = () => {
  let roleNames = [];
  let managerNames = [];

  allRoles()
  .then( roleData => {
    roleData.forEach( thing => {
      roleNames.push(thing.job_title)
    })
  })

  allEmployees()
  .then( employeeData => {
    employeeData.forEach( thing => {
      managerNames.push(`${thing.first_name}` + ` ${thing.last_name}`)
    })      
    return inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the employees first name.',
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
          name: 'lastName',
          message: 'Enter the employees last name.',
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
          type: 'list',
          name: 'role',
          message: 'Select this employees role.',
          choices: roleNames
        },
        {
          type: 'list',
          name: 'manager',
          message: 'Select this employees manager.',
          choices: managerNames
        }
    ])
    .then(addEmployee)
    .then(startPrompt)
  })
};

const updateEmployeePrompt = () => {
  let roleNames = [];
  let employeeNames = [];

  allRoles()
  .then( roleData => {
    roleData.forEach( thing => {
      roleNames.push(thing.job_title)
    })
  })

  allEmployees()
  .then( employeeData => {
    employeeData.forEach( thing => {
      employeeNames.push(`${thing.first_name}` + ` ${thing.last_name}`)
    })      
    return inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Select which employee to update.',
          choices: employeeNames
        },
        {
          type: 'list',
          name: 'role',
          message: 'Select this employees new role.',
          choices: roleNames
        }
    ])
    .then(updateEmployee)
    .then(startPrompt)
  })
};

const deleteEmployeePrompt = () => {
  let employeeNames = [];

  allEmployees()
  .then( employeeData => {
    employeeData.forEach( thing => {
      employeeNames.push(`${thing.first_name}` + ` ${thing.last_name}`)
    })
    
    return inquirer.prompt([
      {
        type: 'list',
        name: 'deleteEmployee',
        message: 'Select an employee to delete.',
        choices: employeeNames
      }
    ])
    .then( employee => deleteEmployee(employee.deleteEmployee))
  })
  .then(startPrompt)
};

startPrompt();