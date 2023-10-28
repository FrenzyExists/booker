const mysql = require("mysql2");
const dotenv = require('dotenv')

dotenv.config()

// Create a connection to the database
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DB,
  connectTimeout: 15000
}).promise();


// open the MySQL pool
pool.getConnection( (err, connection) => {
  if (err) {
    console.error('Error connecting to database');
    throw err;
  }
  console.log("Successfully connected to the database.");
  connection.release()
});

module.exports = pool;