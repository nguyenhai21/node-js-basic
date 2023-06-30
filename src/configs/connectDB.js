// get the client
// const mysql = require('mysql2');
import mysql from 'mysql2/promise';

console.log('create connection pool....');
const pool=mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'
})

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejsbasic'
// });

// // simple query
// connection.query(
//   'SELECT * FROM `users` ',
//   function(err, results, fields) {
//     console.log(`>>> check mysql`)
//     console.log(results); // results contains rows returned by server
//     // console.log(fields); // fields contains extra meta data about results, if available
//     console.log(results[0]); // results contains rows returned by server
//   }
// );
export default pool;