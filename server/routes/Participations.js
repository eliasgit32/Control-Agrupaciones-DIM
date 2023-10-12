const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Obtener listado de participantes en una actividad
router.get('/:groupID/:term/:activityID', (req, res) => {
  const {groupID, term, activityID} = req.params;

  //Pedir lista de inscritos
  const sql1 = `SELECT p.cedula, p.primerNombre, p.segundoNombre, ` + 
  `p.primerApellido, p.segundoApellido, c.nombre ` + 
  `FROM inscripciones i JOIN participantes p ON i.participante = p.cedula ` +
  `JOIN comunidades c ON c.id = p.comunidad ` +
  `WHERE i.agrupacion = ${groupID} AND i.periodo = '${term}'`;

  //Pedir lista de participaciones
  const sql2 = `SELECT participante FROM participaciones ` +
  `WHERE agrupacion = ${groupID} AND actividad = ${activityID} ` +
  `AND periodo = '${term}'`;

  //Realizar 1era consulta
  conn.query(sql1, (error, data1) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data1.length > 0) {
      //Realizar 2da consulta
      conn.query(sql2, (error, data2) => {
        if (error) {
          res.statusCode = 500;
          res.send(error.sqlMessage);
          console.log('error en sql2')
          return;
        } else if (data2.length > 0) {
          //Reordenar datos
          const results = data1.map((participant) => {
            let participacion = 0;

            for(let i = 0; i < data2.length; i++) {
              if(participant.cedula === data2[i].participante){
                
                participacion = 1;
                break;
              } 
            }
            return {
              cedula: participant.cedula,
              nombreCompleto: `${participant.primerApellido} ` + 
              `${participant.segundoApellido}, ` +
              `${participant.primerNombre} ${participant.segundoNombre}`,
              comunidad: participant.nombre,
              participacion: participacion
            }
          })
          res.statusCode = 200;
          res.send(results);
          return
        } else {
          //Reordenar datos
          const results = data1.map((participant) => {
            return {
              cedula: participant.cedula,
              nombreCompleto: `${participant.primerApellido} ` + 
              `${participant.segundoApellido}, ` +
              `${participant.primerNombre} ${participant.segundoNombre}`,
              comunidad: participant.nombre,
              participacion: 0
            }
          })
          res.statusCode = 200;
          res.send(results);
          return;
        }
      }) 
    } else {
      res.statusCode = 204;
      res.send('No Content');
      return;
    }
  })
})

//Obtener historial de participación
router.get('/history/:cedula/:startTerm/:endTerm', (req, res) => {
  const {cedula, startTerm, endTerm} =  req.params;

  //Pedir agrupaciones donde se haya inscrito el participante
  const sql1 =  `SELECT DISTINCT a.id, a.nombre FROM inscripciones i ` +
  `JOIN agrupaciones a ON i.agrupacion = a.id ` +
  `WHERE i.participante = ${cedula} AND i.periodo >= '${startTerm}' ` + 
  `AND i.periodo <= '${endTerm}'`;

  const sql2 = `SELECT a.id, a.nombre, a.agrupacion, p.periodo, c.fechaInicio, ` + 
  `c.fechaFin FROM participaciones p JOIN actividades a ` +
  `ON p.actividad = a.id JOIN conformaciones_agrupaciones c ` +
  `ON (p.periodo =  c.periodo AND p.actividad = c.actividad) ` +
  `WHERE p.participante = ${cedula} AND p.periodo >= '${startTerm}' AND p.periodo <= '${endTerm}' ` +
  `ORDER  BY c.fechaInicio ASC`;

  conn.query(sql1, (error, data1) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data1.length > 0) {
      conn.query(sql2, (error, data2) => {
        if(error) {
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        } else if(data2.length > 0) {
          //Reordenar datos
          const results = data1.map((group) => {
            let actividades = [];
            for(let i = 0; i < data2.length; i++) {
              if(group.id === data2[i].agrupacion) {
                actividades.push(data2[i]);
              }
            }
            return {
              idAgrupacion: group.id,
              nombreAgrupacion: group.nombre,
              actividades: actividades
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
    } else {
      res.statusCode = 204;
      res.send('No Content');
      return;
    }
  })
})

//Reporte de todas las participaciones de una agrupación
router.get('/AllParticipations/:groupID/:startTerm/:endTerm', (req, res) => {
  const {groupID, startTerm, endTerm} =  req.params;

  //Solicitar nombre de la agrupación
  const sql1 = `SELECT nombre FROM agrupaciones ` +
  `WHERE id = ${groupID}`;

  //Solicitar datos de todas las participaciones
  const sql2 = `SELECT a.nombre AS nombreAct, a.id AS idAct, p.primerNombre, ` +
  `p.segundoNombre, p.primerApellido, p.segundoApellido, p.cedula, c.nombre AS comunidad, ` +
  `participacion.periodo FROM participaciones participacion ` +
  `JOIN actividades a ON participacion.actividad = a.id ` +
  `JOIN participantes p ON participacion.participante = p.cedula ` +
  `JOIN comunidades c ON p.comunidad = c.id WHERE participacion.agrupacion = ${groupID} ` +
  `AND participacion.periodo >= '${startTerm}' AND participacion.periodo <= '${endTerm}'`;

  conn.query(sql1, (error, data1) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data1.length > 0) {
      conn.query(sql2, (error, data2) => {
        if(error) {
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        } else if(data2.length > 0) {
          //Reordenar datos
          const actividades = data2.map((actividad) => {
            return {
              nombre: actividad.nombreAct,
              idAct: actividad.idAct,
              nombreCompleto: `${actividad.primerApellido} ` +
              `${actividad.segundoApellido}, ${actividad.primerNombre} ` +
              `${actividad.segundoNombre}`,
              cedula: actividad.cedula,
              comunidad: actividad.comunidad,
              periodo: actividad.periodo
            }
          })
          const results = {
            nombreAgrupacion: data1[0].nombre,
            actividades: actividades
          }
          res.statusCode = 200;
          res.send(results);
          return;
        } else {
          res.statusCode = 204;
          res.send('No Participations');
          return;
        }
      })
    } else {
      res.statusCode = 204;
      res.send('No Content');
      return;
    }
  })
})

//PETICIONES POST
//Añadir participación en actividad
router.post('/', (req, res) => {
  const sql = 'INSERT INTO participaciones SET ?';

  const participation = {
    agrupacion: req.body.groupID,
    actividad: req.body.activityID,
    participante: req.body.cedula,
    periodo: req.body.term,
  }

  conn.query(sql, participation, error => {
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
router.delete('/', (req, res) => {

  const participation = {
    agrupacion: req.body.groupID,
    actividad: req.body.activityID,
    participante: req.body.cedula,
    periodo: req.body.term,
  }

  const sql = 'DELETE FROM participaciones ' +
  `WHERE agrupacion = ${participation.agrupacion} ` +
  `AND actividad = ${participation.actividad} ` +
  `AND participante = ${participation.participante} `+
  `AND periodo = '${participation.periodo}'`;

  conn.query(sql, participation, error => {
    if(error){
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else {
      res.statusCode = 200;
      res.send('Content Deleted')
    }
  })
})

module.exports = router;