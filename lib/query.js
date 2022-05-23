const db = require('../db/connection');

class dbQuery {
    constructor(db) {
        this.db = db;
    }  

    addDept(data) {
        const values = [data.name];
        return this.db 
        .promise() 
        .query(
            `INSERT INTO department(department_name) VALUES(?)`,
            values
        );
    };

    addRole(data) {
        const values = [data.title, data.salary, data.department_id];
        return this.db
        .promise()
        .query(
            `INSERT INTO roles
            (title, salary, department_id) VALUES(?, ?, ?)`,
            values
        );
    };

    addEmployee(data) {
        const values = [data.first, data.last, data.role_id, data.manager_id];
        return this.db
        .promise()
        .query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
            values
        );
    };
 
    updateEmployeeRoleById(data) {
        const values = [data.role_id, data.employee_id];
        return this.db
        .promise()
        .query(
            `UPDATE employee
            SET role_id = ?
            WHERE id = ?`,
            values
        );
    };

    getDept() {
        return this.db
        .promise()
        .query(
            `SELECT * FROM department`
        );
    };
    
    getEmployeeByDeptId(data) {
        const values = [data.department_id]
        return this.db
        .promise()
        .query(
            `SELECT * e.first_name AS 'First Name,
            e.last_name AS 'Last Name',
            d.department_name AS department
            FROM employee e
            INNER JOIN role r
            ON e.role_id = r.id
            INNER JOIN department d
            ON r.department_id = d.id
            WHERE d.0d = ? `,
            values
        );
    }

    getRoles() {
        return this.db
        .promise
        .query(
            `SELECT r.title As title,
            r.salary AS salary,
            d.department_name AS department
            FROM role r
            LEFT JOIN department d
            ON r.department_id = d.id
            ORDER BY department, r.id ASC`
        );
    }
    getRoleIds() {
        return this.db
        .promise()
        .query(
            `SELECT * FROM roles`
        );
    };

    getEmployees() {
        return this.db
        .promise()
        .query(
            `SELECT employee.id AS 'Employee_ID',
            e.first_name AS 'First_Name',
            e.last_name AS 'Last_Name',
            department.department_name AS Department,
            role.salary AS salary,
            role.title AS roles,
            CONCAT(mgmt.first_name, ' ', mgmt.last_name) AS manager
            FROM employee e
            LEFT JOIN employee mgmt
            ON e.manager_id = mgmt.id
            INNER JOIN roles
            ON e.role_id = role.id
            LEFT JOIN department
            ON roles department_id = department.id
            ORDER BY e.id;
            `
        );
    };

    getEmployeeReg() {
        return this.db
        .promise()
        .query(
            `SELECT e.id, 
            e.first_name,
            e.last_name
            FROM employee e
            `
        );
    };

    getNonManagers() {
        return this.db
        .promise()
        .query(
            `SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name
            FROM employee
            WHERE manager_id IS NOT NULL`
        )
    }

    getManagers() {
        return this.db
        .promise()
        .query(
            `SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name
            FROM employee
            WHERE manager_id IS NULL`
        )
    }
}


module.exports = new dbQuery(db);