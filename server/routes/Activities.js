const { Router } = require('express');
const router = new Router();
const conn =  require('../connection');

//PETICIONES GET
//Solicitar todas las actividades de un determinado grupo
//Modificar esto a las 2 operaciones de consulta sql
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
      
      const sql2 = 'SELECT actividad FROM conformaciones_agrupaciones ' +
      `WHERE agrupacion = ${group} AND periodo = '${term}'`;
      conn.query(sql2, (error, data2) => {
        if (error) {
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        } else if(data2.length > 0) {
          //Reordenar datos en nuevo arreglo
          const results = data1.map((activity) => {
            // console.log(activity);
            let asignado = 0;
            
            
            for(let i = 0; i < data2.length; i++) {
              console.log(activity.id + '=' + data2[i].actividad)
              if(activity.id === data2[i].actividad) {
                asignado = 1;
                break;
              }
            }
            return {
              id: activity.id,
              nombre: activity.nombre,
              descripcion: activity.descripcion,
              asignado:  asignado
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

//Agregar conformación de actividades en agrupación
router.post('/:group/:term', (req, res) => {
  const {group, term} =  req.params;
  const activities = req.body;
  const values = activities.map((activity) => {
    return `(${group}, ${activity}, '${term}')`
  })
    // .join(', ');

  //Borrar conformación del periodo seleccionado
  //(para poder añadir nuevo lote de conformación sin problemas)
  const sq1 = 'DELETE FROM conformaciones_agrupaciones ' +
  `WHERE agrupacion = ${group} AND periodo = '${term}'`;

  //Insertar nuevo lote de conformaciones
  const sql2 = 'INSERT INTO conformaciones_agrupaciones ' +
  `(agrupacion, actividad, periodo) VALUES ${values}`;

  conn.beginTransaction((error) => {
    if (error) console.log(error);

    //Borrado de conformación vieja
    conn.query(sq1, error => {
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
        })
      } else {
        res.statusCode = 200;
        res.send('Content Updated');
        return;
      }
    });
  })
})

module.exports = router;