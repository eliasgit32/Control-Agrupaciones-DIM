const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'DIM',
  password: '2023',
  port:3306,
  database:'grupos_actividades_dim'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = conn;