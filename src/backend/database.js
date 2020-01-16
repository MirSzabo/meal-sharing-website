const mysql = require("mysql");

require("dotenv").config();

const { MYSQL_URL } = process.env;

const pool = mysql.createPool(MYSQL_URL);

module.exports = pool;