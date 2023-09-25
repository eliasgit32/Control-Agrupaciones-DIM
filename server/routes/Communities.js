const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar todas las comunidades
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM comunidades ORDER BY id DESC';

  conn.query(sql, (error, results) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(results.length > 0) {
      // Mapeo de datos para enviar los resultados como un varios arreglos
      // de cadenas
      // var array = [];
      // results.map(() => {
      //   var row = [results['nombre'], results['tipo']];
      //   array.push(row);
      // })
      res.statusCode = 200;
      res.send(JSON.stringify(results));
      return;
    } else {
      res.statusCode = 204;
      res.send('No Content');
      return;
    }
  })
})


//Solicitar info de las escuelas y unidades
router.get('/units-faculties', (req, res) => {
  const sql = 'SELECT id, nombre FROM comunidades ' + 
              `WHERE tipo = 'Escuela' OR tipo = 'Unidad'`;

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

//PETICIONES POST
//Agregar comunidad
router.post('/', (req, res) => {
  const sql = 'INSERT INTO comunidades SET ?';
  
  const community = {
    nombre: req.body.name,
    tipo: req.body.type
  }

  conn.query(sql, community, error => {
    if(error){
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else {
      res.statusCode = 200;
      res.send('Succesfully added')
    }
  })
})

module.exports = router;