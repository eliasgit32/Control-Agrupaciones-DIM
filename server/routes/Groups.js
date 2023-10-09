const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar todos los grupos
router.get('/', (req, res) => {
  const sql = 'SELECT a.*, p.id AS periodoActual FROM agrupaciones a JOIN periodos p ON ' + 
  'p.actual = 1 ORDER BY a.id DESC';

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

//Solicitar info de solo un grupo
router.get('/:id', (req, res) => {
  const {id} =  req.params;

  const sql = `SELECT * FROM agrupaciones WHERE id = ${id}`; 
  conn.query(sql, (error, results) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(results.length > 0) {
      res.statusCode = 200;
      res.json(results);
      return;
    } else {
      res.statusCode = 204;
      res.send('No content');
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
    publico: req.body.publico,
    catedra: req.body.academic,
  }

  conn.query(sql, group, error => {
    if(error){
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else {
      res.statusCode = 200;
      res.send('Content Added');
    }
  })
})

//PETICIONES PUT
//Actualizar datos de un grupo
router.put('/', (req, res) => {
  const group = {
    id: req.body.id,
    nombre: req.body.name,
    descripcion: req.body.description,
    cupos: req.body.limit,
    publico: req.body.publico
  }
  const sql = 'UPDATE agrupaciones SET '  +
  `nombre='${group.nombre}', ` +
  `descripcion='${group.descripcion}', ` +
  `cupos=${group.cupos}, ` +
  `publico='${group.publico}' ` +
  `WHERE id=${group.id}`;

  conn.query(sql, error => {
    if(error){
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else {
      res.statusCode = 200;
      res.send('Content Updated');
      return;
    }
  })
});

module.exports = router;