const mysql = require('promise-mysql');

export default function connect(username, password) {
  const connection =  mysql.createConnection({
      host: 'localhost',
      user: username,
      password: password,
      database: 'grupos_actividades_dim'
  })
  return connection;
}