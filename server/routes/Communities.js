const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
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


module.exports = router;