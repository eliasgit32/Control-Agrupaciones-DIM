const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar todos los grupos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM agrupaciones';

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
      res.send('No groups found');
      return;
    }
  })
  
})

//PETICIONES POST
//Agregar grupo
router.post('/', (req, res) => {
  const sql = 'INSERT INTO agrupaciones SET ?';
  const group = {
    nombre: req.body.name,
    descripcion: req.body.description,
    cupos: req.body.limit,
    publico: req.body.publico
  }

  conn.query(sql, group, error => {
    if(error){
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else {
      res.statusCode = 200;
      res.send('Group Added')
    }
  })
})

module.exports = router;