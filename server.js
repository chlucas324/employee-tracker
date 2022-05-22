// dependencies
const inquirer = require('inquirer');
const cTable = require("console.table");


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
     choices: deptArr,
     loop: false,
    }
]);

await sql.addRole(role);
choosePrompt();
};

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
              "View all roles"  
            ],
            loop: false,
        },
    ]);
}

choosePrompt();