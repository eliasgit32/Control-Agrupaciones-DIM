const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET

//Solicitar info de los participantes tipo estudiante
router.get('/students', (req, res) => {
  const sql = `SELECT * FROM participantes WHERE tipo = 'Estudiante' ORDER BY comunidad`;
  conn.query(sql, (error, data) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data.length > 0) {
      const results = data.map((student) => {
        //Formatear fecha
        let date =  new Date(student.fechaNac);
        let birthdate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        return {
          cedula: student.cedula,
          nombreCompleto: `${student.primerApellido} ${student.segundoApellido},`+ 
         ` ${student.primerNombre} ${student.segundoNombre}`,
          fechaNac: birthdate,
          escuela: student.comunidad,
          etapa: student.etapa,
          correo: student.email,
          telefono: student.telefono,
          correoUCAB: student.emailInst
        }
      })
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

//Solicitar info de los participantes tipo comunidad
router.get('/community', (req, res) => {
  const sql = `SELECT * FROM participantes WHERE tipo = 'Comunidad' ORDER BY comunidad`;
  conn.query(sql, (error, data) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data.length > 0) {
      const results = data.map((participant) => {
        return {
          cedula: participant.cedula,
          nombreCompleto: `${participant.primerApellido} ${participant.segundoApellido},`+ 
         ` ${participant.primerNombre} ${participant.segundoNombre}`,
          escuela: participant.comunidad,
          etapa: participant.etapa,
          correo: participant.email,
          telefono: participant.telefono,
          correoUCAB: participant.emailInst
        }
      })
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

//Solicitar info de los participantes tipo personal
router.get('/personal', (req, res) => {
  const sql = `SELECT * FROM participantes WHERE tipo != 'Comunidad' 
  AND tipo != 'Estudiante' ORDER BY comunidad` ;
  conn.query(sql, (error, data) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data.length > 0) {
      const results = data.map((participant) => {
        return {
          cedula: participant.cedula,
          nombreCompleto: `${participant.primerApellido} ${participant.segundoApellido},`+ 
         ` ${participant.primerNombre} ${participant.segundoNombre}`,
          escuela: participant.comunidad,
          etapa: participant.etapa,
          correo: participant.email,
          telefono: participant.telefono,
          correoUCAB: participant.emailInst
        }
      })
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

//Solicitar info de personal de Identidad y Misión
router.get('/personal/DIM', (req, res) => {
  const sql = `SELECT cedula, primerNombre, segundoNombre,
  primerApellido, segundoApellido FROM participantes 
  WHERE comunidad = 'DIM'`;

  conn.query(sql, (error, data) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data.length > 0) {
      const results = data.map((participant) => {
        return {
          cedula: participant.cedula,
          nombreCompleto: `${participant.primerApellido} ${participant.segundoApellido},`+ 
         ` ${participant.primerNombre} ${participant.segundoNombre}`
        }
      })
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

//Solicitar toda la info de un participante
router.get('/:cedula', (req, res) => {
  const {cedula} =  req.params;
  const sql = `SELECT * FROM participantes WHERE cedula = ${cedula}`;

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

//Solicitar participantes inscritos en una agrupación
router.get('/signUp/:groupID/:term', (req, res) => {
  const {groupID, term} = req.params;
  
  const sql = `SELECT p.cedula, p.primerNombre, p.segundoNombre, ` + 
  `p.primerApellido, p.segundoApellido, p.comunidad ` + 
  `FROM inscripciones i JOIN participantes p ON i.participante = p.cedula ` +
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
          comunidad: participant.comunidad
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

//PETICIONES POST
//Registrar participante en la bd
router.post('/', (req, res) => {
  const sql = 'INSERT INTO participantes SET ?';

  const participant = {
    cedula: req.body.cedula,
    primerNombre: req.body.firstName,
    segundoNombre: req.body.secondName,
    primerApellido: req.body.firstLastName,
    segundoApellido: req.body.secondLastName,
    tipo: req.body.type,
    comunidad: req.body.community,
    etapa: req.body.phase,
    email: req.body.email,
    telefono: req.body.telephone,
    emailInst: req.body.emailInst
  }

  conn.query(sql, participant, error => {
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

//PETICIONES PUT
//Actualizar participante
router.put('/:cedula', (req, res) => {
  const {cedula} =  req.params;

  const participant = {
    primerNombre: req.body.fName,
    segundoNombre: req.body.sName,
    primerApellido: req.body.fLastName,
    segundoApellido: req.body.sLastName,
    etapa: req.body.stage,
    email: req.body.email,
    telefono: req.body.tlphone,
    emailInst: req.body.emailUCAB
  }

  const sql = `UPDATE participantes SET 
  primerNombre = '${participant.primerNombre}', 
  segundoNombre = '${participant.segundoNombre}', 
  primerApellido = '${participant.primerApellido}', 
  segundoApellido = '${participant.segundoApellido}', 
  etapa = '${participant.etapa}', 
  email = '${participant.email}', 
  telefono = '${participant.telefono}', 
  emailInst = '${participant.emailInst}' 
  WHERE cedula = ${cedula} `;

  conn.query(sql, error => {
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