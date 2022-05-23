const sql = require('../lib/query');

// call database and pass objects through inquirer
//department 
const deptOptions = async () => {
    const tempArr = await sql.getDept();

    const options = tempArr[0];

    let optionsArr = [];

    options.forEach(element => {
        let valueObj = {
            name: element.department_name,
            value: element.id
        }
        optionsArr.push(valueObj);
    });

    return optionsArr;
}

// management 
const mgmtOptions = async () => {
    const tempArr = await sql.getManagers();
    const options = tempArr[0];

    let optionsArr = [];

    options.forEach(element => {
        let valueObj = {
            name: element.manager_name,
            value: element.id
        }
        optionsArr.push(valueObj);
    });
    return optionsArr;
}

// non management
const NonMgmtOptions = async () => {
    const tempArr = await sql.getNonManagers();
    const options = tempArr[0];
    
    let optionsArr = [];

    options.forEach(element => {
        let valueObj = {
            name: element.employee_name,
            value: element.id
        }
        optionsArr.push(valueObj);
    });
    return optionsArr;
}

//roles
const roleOptions = async () => {
    const tempArr = await sql.getRoleIds();
    const options = tempArr[0];

    let optionsArr = [];

    options.forEach(element => {
        let valueObj = {
            name: element.title,
            value: element.id
        }
        optionsArr.push(valueObj);
    });

    return optionsArr;
}

// employee

const employeeOptions = async () => {
    const tempArr = await sql.getEmployeeReg();

    const options = tempArr[0];
    let optionsArr = [];

    options.forEach(element => {
        let valueObj = {
            name: element.first_name + ' ' + element.last_name,
            value: element.id
        };
        optionsArr.push(valueObj);
    });
    return optionsArr;
}

module.exports = { deptOptions, mgmtOptions, NonMgmtOptions, roleOptions, employeeOptions };