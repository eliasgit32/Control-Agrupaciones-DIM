const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

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