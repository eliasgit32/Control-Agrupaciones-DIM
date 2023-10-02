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

//PETICIONES PUT
//Actualizar datos de un período
router.put('/', (req, res) => {
  const term = {
    id: req.body.id,
    actual: req.body.current
  }
  const sql1 = 'UPDATE periodos SET '  +
  `actual = ${term.actual} ` +
  `WHERE id = '${term.id}'`;
  
  const sql2 = 'UPDATE periodos SET '  +
  `actual = 0 ` +
  `WHERE id <> '${term.id}'`;

  conn.beginTransaction((error) => {
    if (error) console.log(error);

    //Primera Operación de actualización
    conn.query(sql1, error => {
      if(error) {
        return conn.rollback(() => {
          console.log(error);
        })
      }
    })

    //Segunda Operación de actualización
    conn.query(sql2, error => {
      if(error) {
        return conn.rollback(() => {
          console.log(error);
        })
      }
    })

    // Confirmar la transacción
    conn.commit((error) => {
      if (error) {
        return conn.rollback(() => {
          res.statusCode = 500;
          res.send(error.sqlMessage);
        })
      } else {
        res.statusCode = 200;
        res.send('Content Updated');
        return;
      }
    });
  })
});

module.exports = router;