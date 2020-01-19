const mysql = require("mysql");

require("dotenv").config();

const { CLEARDB_DATABASE_URL } = process.env;
const pool = mysql.createPool(CLEARDB_DATABASE_URL);

/*const createConnection = () => {

}*/

module.exports = pool;