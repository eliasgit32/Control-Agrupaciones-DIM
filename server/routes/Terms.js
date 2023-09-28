const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar todos los períodos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM periodos';

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
      res.send('No terms found');
      return;
    }
  })
})

//PETICIONES POST
//Agregar período académico
router.post('/', (req, res) => {
  const sql = 'INSERT INTO periodos SET ?';
  const term = {
    id: req.body.id
  }

  conn.query(sql, term, error => {
    if(error){
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else {
      res.statusCode = 200;
      res.send('Content Added')
    }
  })
})

module.exports = router;