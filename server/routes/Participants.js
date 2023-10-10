const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar participantes inscritos en una agrupación
router.get('/signUp/:groupID/:term', (req, res) => {
  const {groupID, term} = req.params;

  const sql = `SELECT p.cedula, p.primerNombre, p.segundoNombre, ` + 
  `p.primerApellido, p.segundoApellido, c.nombre ` + 
  `FROM inscripciones i JOIN participantes p ON i.participante = p.cedula ` +
  `JOIN comunidades c ON c.id = p.comunidad ` +
  `WHERE i.agrupacion = ${groupID} AND i.periodo = '${term}'`;
  
  conn.query(sql, (error, data) => {
    if (error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if (data.length > 0) {
      const results = data.map((participant) => {
        return {
          cedula: participant.cedula,
          nombreCompleto: `${participant.primerApellido} ` + 
          `${participant.segundoApellido}, ` +
          `${participant.primerNombre} ${participant.segundoNombre}`,
          comunidad: participant.nombre
        }
      })
      res.statusCode = 200;
      res.send(results);
      return
    } else {
      res.statusCode = 204;
      res.send('No Content');
      return;
    }
  })
})

//Solicitar toda la info de un participante
router.get('/:cedula', (req, res) => {
  const {cedula} =  req.params;
  const sql = `SELECT p.*, c.nombre AS nombreComunidad FROM participantes p ` +
  ` JOIN comunidades c ON p.comunidad = c.id WHERE cedula = ${cedula}`;

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
//Inscribir participante en agrupación
router.post('/signUp/:cedula/:groupID/:term', (req, res) => {
  const {cedula, groupID, term} = req.params;

  const sql = 'INSERT INTO inscripciones SET ?';
  
  const registration = {
    agrupacion: groupID,
    participante: cedula,
    periodo: term
  }

  conn.query(sql, registration, error => {
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

//PETICIONES DELETE
//Eliminar inscripción de participante en agrupación
router.delete('/signUp/:cedula/:groupID/:term', (req, res) => {
  const {cedula, groupID, term} = req.params;

  const sql1 = 'DELETE FROM participaciones ' +
  `WHERE agrupacion = ${groupID} ` +
  `AND participante = ${cedula} `+
  `AND periodo = '${term}'`;

  const sql2 = 'DELETE FROM inscripciones ' +
  `WHERE agrupacion = ${groupID} ` +
  `AND participante = ${cedula} `+
  `AND periodo = '${term}'`;

  conn.beginTransaction((error) => {
    if (error) console.log(error);

    //Borrado de participaciones
    conn.query(sql1, error => {
      if(error) {
        return conn.rollback(() => {
          console.log(error);
        })
      }
    })

    //Borrado de inscripción
    conn.query(sql2, error => {
      if(error) {
        return conn.rollback(() => {
          console.log(error);
        })
      }
    })
    
    // Confirmación de transacción
    conn.commit((error) => {
      if (error) {
        return conn.rollback(() => {
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        })
      } else {
        res.statusCode = 200;
        res.send('Content Deleted');
        return;
      }
    });
  })
})
module.exports = router;