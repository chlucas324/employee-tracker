// dependencies
const inquirer = require('inquirer');
const cTable = require('console.table');
const sql = require('./lib/query');
const opt =  require('./lib/options');



//add department
const newDept = async () => {

const department = await inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is the department name?",
        validate: (name) => {
            if (name) {
                return true;
            } else {
                console.log("please enter a department name.")
                return false;
            }
        },
    },
]);
await sql.addDept(department);
choosePrompt();
};

// add employee
const newEmployee = async () => {
    const roleArr = await opt.roleOptions();
    const mgmtArr = await opt.mgmtOptions();
    
    const employee = await inquirer.prompt([
    {
        type: "input",
        name: "first",
        message: "What is the employee's first name?",
        validate: (first) => {
            if (first && isNaN(first)) {
                return true;
            } else {
                console.log("Please enter a first name.")
                return false;
            }
        },
    },
    {
        type: "input",
        name: "last",
        message: "What is the employee's last name?",
        validate: (last) => {
            if (last && isNaN(last)) {
                return true;
            } else {
                console.log("Please enter a last name.")
             return false;
            }
        },
    },
{
    type: "list",
    name: "role_id",
    message: "What is the employee's role?",
    choices: roleArr, 
    loop: false,
},
{
    type: "list",
    name: "manager_id",
    message: "Who is the employee's manager?",
    choices: mgmtArr,
    loop: false,
},
]);

await sql.addEmployee(employee);
choosePrompt();
}; 

//add a role
const newRole = async () => {
    const optionsArr = await opt.deptOptions();
    const role = await inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the role?",
        validate: (title) => {
            if (title) {
                return true;
            } else {
                console.log("Please enter a role.")
                return false;
            }
        },
    },
    {
        type: "input",
        name: "salary",
        message: "What is the salary?",
        validate: (salary) => {
            if (salary && !isNaN(salary)) {
                return true;
            } else {
                console.log("Please enter a salary.")
                return false;
            }
        },
    },
    {
     type: "list",
     name: "department_id",
     message: "What department does this role belong to?",
     choices: optionsArr,
     loop: false,
    }
]);

await sql.addRole(role);
choosePrompt();
};

//update employee role
const updateEmployeeRole = async () => {
    const roleArr = await opt.roleOptions();
    const employeeArr = await opt.employeeOptions();
    
    const employee = await inquirer.prompt([
        {
          type: "list",
          name: "employee_id",
          message: "What employee do you want to update?",
          choices: employeeArr,
          loop: false,
        },
        {
          type: "list",
          name: 'role_id',
          message: "What is the employee's role?",
          choices: roleArr,
          loop: false,
        }
       ]);

await sql.updateEmployeeRoleById(employee);

choosePrompt();

}

// view all departments 
const viewDept = () => {
    sql.getDept()

    .then(([rows]) => {
        console.log(cTable.getTable(rows));
    })

    .then(()=> {
        choosePrompt();
    });
}

//view all employees 
const viewEmployees = () => {
    sql.getEmployees()

    .then(([rows]) => {
        console.log('\n');
        console.log(cTable.getTable(rows));
    })

    .then(() => {
        choosePrompt();
    })
};

// view all roles

const viewRoles = () => {
    sql.getRoles() 

    .then(([rows]) => {
        console.log('\n');
        console.log(cTable.getTable(rows))
    })

    .then(() => {
        choosePrompt();
    })
}



//inital prompts
const choosePrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: [
              "Add a department",
              "Add an employee",
              "Add a role",
              "Update employee's role",
              "View all departments",
              "View all employees",
              "View all roles"  
            ],
            loop: false,
        },
    ])

    .then((data) => {
        const {prompt} = data;
        console.log(prompt);
        //switch case
        switch(prompt) {
            case 'Add a department':
                newDept();
                break;
            case 'Add a role':
                newRole();
                break;
            case 'Add an employee':
                newEmployee();
                break;
            case "Update employee's role":
                updateEmployeeRole();
                break;
            case 'View all departments':
                viewDept();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all roles':
                viewRoles();
                break;   

            default: 
            break;
        }
    })
}

choosePrompt();