const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar todas las actividades de un determinado grupo
router.get('/:group', (req, res) => {
  const {group} = req.params;
  const sql = `SELECT * FROM actividades WHERE agrupacion = ${group} ORDER BY id DESC`;

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
//Agregar actividad
router.post('/', (req, res) => {
  const sql = 'INSERT INTO actividades SET ?';
  
  const activity = {
    agrupacion: req.body.group,
    nombre: req.body.name,
    descripcion: req.body.description
  }

  conn.query(sql, activity, error => {
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