const { Router } = require('express');
const router = new Router();
const conn = require('../connection');

//PETICIONES GET
//Solicitar todos los grupos
router.get('/', (req, res) => {
  const sql = 'SELECT a.*, p.id AS periodoActual FROM agrupaciones a JOIN periodos p ON ' +
    'p.actual = 1 ORDER BY a.id DESC';

  conn.query(sql, (error, results) => {
    if (error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if (results.length > 0) {
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
router.get('/:id/:term', (req, res) => {
  const { id, term } = req.params;

  //Query de agrupación
  const sql1 = `SELECT a.*, (SELECT COUNT(*) FROM inscripciones WHERE agrupacion = ${id} 
  AND periodo = '${term}') AS inscritos, s.coordinador 
  FROM agrupaciones a LEFT JOIN supervisiones s ON (s.agrupacion = ${id} AND s.periodo = '${term}') 
  WHERE id = ${id}`;

  //Query de coordinador
  const sql2 = `SELECT p.primerNombre, p.segundoNombre, p.primerApellido, p.segundoApellido
  FROM supervisiones s JOIN participantes p ON s.coordinador = p.cedula 
  WHERE s.agrupacion = ${id} AND s.periodo = ${term}`;

  conn.query(sql1, (error, data1) => {
    let nombreCoord = '';
    if (error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if (data1.length > 0) {
      if(!data1[0].coordinador) data1[0].coordinador = 'N/A';
      (data1[0].catedra ? data1[0].catedra = true : data1[0].catedra = false)
      res.statusCode = 200;
      res.send(data1);
      return;
      // conn.query(sql2, (error, data2) => {
      //   if (error) {
      //     res.statusCode = 500;
      //     res.send(error.sqlMessage);
      //     return;
      //   } else if (data2.length > 0) {
      //     nombreCoord =  `${data2[0].primerApellido} ${data2[0].segundoApellido}, ` +
      //     `${data2[0].primerNombre} ${data2[0].segundoNombre}`;
      //   } else {
      //     nombreCoord = 'N/A';
      //   }
      //   const results = [{
      //     ...data1[0],
      //     coordinador: nombreCoord
      //   }]
      //   res.statusCode = 200;
      //   res.send(results);
      //   return;
      // })
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
    if (error) {
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
    publico: req.body.publico,
    coordinador: req.body.coordinator,
    periodo: req.body.term,
    catedra: req.body.catedra
  }

  const supervision = {
    coordinador: req.body.coordinator,
    agrupacion: req.body.id,
    periodo: req.body.term,
    docente: null
  }

  // Actualizar info de agrupación
  const sql1 = 'UPDATE agrupaciones SET ' +
    `nombre='${group.nombre}', ` +
    `descripcion='${group.descripcion}', ` +
    `cupos=${group.cupos}, ` +
    `publico='${group.publico}', ` +
    `catedra = ${group.catedra} ` +
    `WHERE id=${group.id}`;

  // Borrar asignación de coordinador
  const sql2 = `DELETE FROM supervisiones 
  WHERE agrupacion = ${group.id} AND periodo = '${group.periodo}'`;

  //Registrar asignación de nuevo coordinador
  const sql3 = `INSERT INTO supervisiones SET ?`;

  conn.beginTransaction((error) => {
    if (error) console.log(error);

    //Actualizar datos de agrupación
    conn.query(sql1, error => {
      if(error) {
        return conn.rollback(() => {
          console.log(error);
        })
      }
    })

    //Borrar asignación de coordinador
    conn.query(sql2, error => {
      if(error) {
        return conn.rollback(() => {
          console.log(error);
        })
      }
    })

    //Registrar asignación de nuevo coordinador
    conn.query(sql3, supervision, error => {
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
          return;
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