const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar info de todos los coordinadores
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM coordinadores';

  conn.query(sql, (error, results) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(results.length > 0) {
      res.statusCode = 200;
      res.send(results);
      return;
    } else {
      res.statusCode = 204;
      res.send('No Content');
      return;
    }
  })
})


//Solicitar nombres de coordinadores (Para listarlos en <select>)
router.get('/names', (req, res) => {
  const sql = 'SELECT participantes.cedula, participantes.primerNombre, participantes.primerApellido ' + 
              'FROM participantes ' +
              'JOIN coordinadores ON participantes.cedula = coordinadores.cedula';

  conn.query(sql, (error, results) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(results.length > 0) {
      res.statusCode = 200;
      res.send(results);
      return;
    } else {
      res.statusCode = 204;
      res.send('No Content');
      return;
    }
  })
})

module.exports = router;