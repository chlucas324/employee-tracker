const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
     // Your MySQL password 
  password: 'Ronald522!',
  database: 'tracker'
});

module.exports = db;