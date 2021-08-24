
const dotenv = require('dotenv');
dotenv.config();

var mysql = require('mysql2');

var con = mysql.createConnection({
    host     : process.env.host,
    user     : "root",
    password : process.env.bdPass,
    database : process.env.database,
    port     : "3306" 
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;