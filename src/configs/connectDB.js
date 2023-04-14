const mysql = require("mysql2/promise");

console.log("Creating connection pool...");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
  //password: 'password'
});
// create the connection to database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "nodejsbasic",
// });

// simple query
// connection.query("SELECT * FROM `user` ", function (err, results, fields) {
//   console.log("check mysql2>>>>");
//   console.log(results); // results contains rows returned by server
//   let rows = results.map((rows) => {
//     return rows;
//   });
//   console.log(rows); // fields contains extra meta data about results, if available
// });
export default pool;
