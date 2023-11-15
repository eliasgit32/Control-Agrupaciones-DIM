const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar actividades cuya fecha de finalización haya pasado
router.get('/finished/:currentDate', (req, res) => {
  const { currentDate } = req.params;

  const sql1 = `SELECT grupo.id AS agrupacionID, grupo.nombre AS agrupacion, 
  a.id AS actividadID, a.nombre AS actividad, c.periodo, DATE_FORMAT(c.fechaFin, '%d/%m/%Y') AS fechaFin,
  (SELECT COUNT(*) FROM participaciones p WHERE p.actividad = c.actividad AND 
  p.periodo =  c.periodo) AS participaciones 
  FROM conformaciones_agrupaciones c JOIN agrupaciones grupo ON 
  c.agrupacion = grupo.id JOIN actividades a ON c.actividad = a.id 
  WHERE c.fechaFin < '${currentDate}' GROUP BY a.id, c.periodo, c.fechaFin
  HAVING participaciones = 0`;

  conn.query(sql1, (error, data) => {
    if(error) {
      res.statusCode = 500;
      console.log(error.sqlMessage);
      res.send(error.sqlMessage);
      return;
    } else if(data.length > 0) {
      res.statusCode = 200;
      res.send(data);
      return;
    } else {
      res.statusCode = 204;
      res.send('No Content');
      return;
    }
  })
})

//Solicitar todas las actividades de un determinado grupo
router.get('/:group/:term', (req, res) => {
  const {group, term} = req.params;
  const sql1 = `SELECT * FROM actividades WHERE agrupacion = ${group}`;

  conn.query(sql1, (error, data1) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data1.length > 0) {
      //2da consulta sql
      
      const sql2 = 'SELECT * FROM conformaciones_agrupaciones ' +
      `WHERE agrupacion = ${group} AND periodo = '${term}'`;
      conn.query(sql2, (error, data2) => {
        if (error) {
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        } else if(data2.length > 0) {
          //Reordenar datos en nuevo arreglo
          const results = data1.map((activity) => {
            let asignado = 0;
            let fechaInicio = 'N/A';
            let fechaFin = 'N/A';
            
            for(let i = 0; i < data2.length; i++) {
              if(activity.id === data2[i].actividad) {
                asignado = 1;
                data2[i].fechaInicio ?
                  fechaInicio = data2[i].fechaInicio : fechaInicio = 'N/A';

                data2[i].fechaFin ?
                  fechaFin = data2[i].fechaFin : fechaFin = 'N/A';
                break;
              }
            }

            return {
              id: activity.id,
              nombre: activity.nombre,
              descripcion: activity.descripcion,
              asignado:  asignado,
              fechaInicio: fechaInicio,
              fechaFin: fechaFin
            }
          })
          res.statusCode = 200;
          res.send(results);
          return;
        } else {
          //Reorganizar los datos para enviar las actividades sin asignaciones
          const results = data1.map((activity) => {
            return {
              id: activity.id,
              nombre: activity.nombre,
              descripcion: activity.descripcion,
              asignado:  0
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

//Solicitar info de una sola actividad
router.get('/singleAct/:idGroup/:idAct/:term', (req, res) => {
  const {idGroup, idAct, term} =  req.params;

  const sql1 = `SELECT nombre, descripcion FROM actividades WHERE id = ${idAct}`;
  const sql2 = `SELECT nombre FROM agrupaciones WHERE id = ${idGroup}`;
  const sql3 =  `SELECT fechaInicio, fechaFin FROM conformaciones_agrupaciones ` +
  `WHERE agrupacion = ${idGroup} AND actividad = ${idAct} AND periodo = '${term}'`; 
  //1era consulta
  conn.query(sql1, (error, data1) => {
    if(error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if(data1.length > 0) {
      //2da consulta sql
      conn.query(sql2, (error, data2) => {
        if (error) {
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        } else if (data2.length > 0) {
          //3era consulta sql
          conn.query(sql3, (error, data3) => {
            if (error) {
              res.statusCode = 500;
              res.send(error.sqlMessage);
              return;
            } else if (data3.length > 0) {
              //Reordenar los datos en un solo objeto
              const infoActivity = {
                nombreAct: data1[0].nombre,
                descripcionAct: data1[0].descripcion,
                nombreAgrupacion: data2[0].nombre,
                fechaInicio: data3[0].fechaInicio,
                fechaFin: data3[0].fechaFin
              }
              res.statusCode = 200;
              res.send(infoActivity);
              return;
            } else {
              const infoActivity = {
                nombreAct: data1[0].nombre,
                descripcionAct: data1[0].descripcion,
                nombreAgrupacion: data2[0].nombre,
                fechaInicio: null,
                fechaFin: null
              }
              res.statusCode = 200;
              res.send(infoActivity);
              return;
              // res.statusCode = 204;
              // res.send('No Content');
              // return; 
            }
          })
        }
      })
    } else {
      res.statusCode = 204;
      res.send('No content');
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

//Agregar acompañante a la actividad
router.post('/helper', (req, res) => {
  const sql = 'INSERT INTO acompannantes SET ?'
  
  const helper =  {
    agrupacion: req.body.group,
    actividad: req.body. activity,
    acompannante: req.body.helper,
    periodo: req.body.term
  }

  conn.query(sql, helper, error => {
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

//Agregar conformación de actividades en agrupación
router.post('/:group/:term', (req, res) => {
  const {group, term} =  req.params;
  const activities = req.body;
  const values = activities.map((activity) => {
    return `(${group}, ${activity}, '${term}')`
  })

  //Borrar conformación del periodo seleccionado
  //(para poder añadir nuevo lote de conformación sin problemas)
  const sql1 = 'DELETE FROM conformaciones_agrupaciones ' +
  `WHERE agrupacion = ${group} AND periodo = '${term}'`;

  //Insertar nuevo lote de conformaciones
  const sql2 = 'INSERT INTO conformaciones_agrupaciones ' +
  `(agrupacion, actividad, periodo) VALUES ${values}`;

  conn.beginTransaction((error) => {
    if (error) console.log(error);

    //Borrado de conformación vieja
    conn.query(sql1, error => {
      if(error) {
        return conn.rollback(() => {
          console.log(error);
        })
      }
    })

    //Inserción de nueva conformación
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
          return;
        })
      } else {
        res.statusCode = 200;
        res.send('Content Updated');
        return;
      }
    });
  })
})

//PETICIONES PUT
//Actualizar datos de actividad
router.put('/:idGroup/:idAct/:term', (req, res) => {
  const {idGroup, idAct, term} = req.params
  const activity = {
    nombre: req.body.name,
    descripcion: req.body.description,
    fechaInicio: req.body.startDate,
    fechaFin: req.body.endDate
  }
  
  //Actualizar nombre y descripción de la actividad
  const sql1 = 'UPDATE actividades SET ' +
  `nombre = '${activity.nombre}', ` +
  `descripcion = '${activity.descripcion}' ` +
  `WHERE agrupacion = ${idGroup} AND id = ${idAct}`;

  //Actualizar fechas de la actividad
  const sql2 = 'UPDATE conformaciones_agrupaciones SET ' +
  `fechaInicio = ${!activity.fechaInicio ? null : `'${activity.fechaInicio}'`}, ` +
  `fechaFin = ${!activity.fechaFin ? null : `'${activity.fechaFin}'`} ` +
  `WHERE agrupacion = ${idGroup} AND actividad = ${idAct} ` +
  `AND periodo = '${term}'`;

  conn.beginTransaction((error) => {
    if (error) console.log(error);

    //Actualización tabla actividad
    conn.query(sql1, error => {
      if (error) {
        return conn.rollback(() => {
          console.log(error);
        })
      }
    })

    //Actualización tabla conformaciones_agrupaciones
    conn.query(sql2, error => {
      if (error) {
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
})

//PETICIONES DELETE
//Eliminar acompañante de la actividad
router.delete('/helper', (req, res) => {
  const helper = {
    agrupacion: req.body.group,
    actividad: req.body. activity,
    acompannante: req.body.helper,
    periodo: req.body.term
  }

  const sql = `DELETE FROM acompannantes WHERE agrupacion = ${helper.agrupacion} 
  AND actividad = ${helper.actividad} AND acompannante = ${helper.acompannante} 
  AND periodo = '${helper.periodo}'`;

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