const { Router } = require('express');
const router = new Router();
const conn = require('../connection');

//REPORTES SOBRE RENDIMIENTO DE AGRUPACIONES
//Solicitar reporte de inscripciones realizadas en cada agrupación
router.get('/TotalRegistrations/:startTerm/:endTerm', (req, res) => {
  const { startTerm, endTerm } = req.params;

  const sql = `SELECT p.primerNombre, p.segundoNombre, p.primerApellido, 
  p.segundoApellido, i.participante, a.nombre AS agrupacion, 
  c.nombre AS comunidad, i.periodo FROM inscripciones i 
  JOIN participantes p ON i.participante = p.cedula 
  JOIN agrupaciones a ON i.agrupacion = a.id 
  JOIN comunidades c ON p.comunidad = c.id 
  WHERE i.periodo >= '${startTerm}' AND i.periodo <= '${endTerm}'`;

  conn.query(sql, (error, data) => {
    if (error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if (data.length > 0) {
      //Organizar datos
      const results = data.map((participante) => {
        return {
          nombreCompleto: `${participante.primerApellido} ` +
            `${participante.segundoApellido}, ${participante.primerNombre} ` +
            `${participante.segundoNombre}`,
          cedula: participante.participante,
          agrupacion: participante.agrupacion,
          comunidad: participante.comunidad,
          periodo: participante.periodo
        }
      })

      results.sort((a, b) => {
        //Organizar por comunidad
        if (a.comunidad < b.comunidad) return -1;
        else if (a.comunidad > b.comunidad) return 1;
        //Organizar por Apellido
        if (a.nombreCompleto < b.nombreCompleto) return -1;
        else if (a.nombreCompleto > b.nombreCompleto) return 1;

        return 0;
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

//Reporte de inscripciones realizadas globalmente en todas las agrupaciones
router.get('/RegistrationsOnEveryTerm/:startTerm/:endTerm', (req, res) => {
  const { startTerm, endTerm } = req.params;

  const sql = `SELECT p.id AS semestre,  
  (SELECT COUNT(DISTINCT part.participante) FROM participaciones part 
  WHERE part.periodo = p.id) AS participantes,
  (SELECT COUNT(DISTINCT i.participante) FROM inscripciones i WHERE i.periodo = p.id) AS inscripciones
  FROM periodos p WHERE p.id >= '${startTerm}' AND p.id <= '${endTerm}'`;

  conn.query(sql, (error, data) => {
    if (error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if (data.length > 0) {
      //Organizar datos
      const results = data.map((semestre) => {
        let porcentaje = (semestre.participantes / semestre.inscripciones) * 100;
        return {
          ...semestre,
          porcentaje: `${porcentaje ? Math.round(porcentaje) : 0}%`,
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

//Solicitud de datos necesitados por el gráfico de barras
router.get('/BarChart/:groupID/:startTerm/:endTerm', (req, res) => {
  const { groupID, startTerm, endTerm } = req.params;

  const sql1 = `SELECT nombre FROM agrupaciones WHERE id = ${groupID}`;

  const sql2 = `SELECT c.nombre AS comunidad, (SELECT COUNT(DISTINCT i.participante) FROM inscripciones i 
  JOIN participantes p ON i.participante = p.cedula WHERE p.comunidad = c.id AND 
  i.periodo >= '${startTerm}' AND i.periodo <= '${endTerm}' AND i.agrupacion = ${groupID}) AS inscritos,
  (SELECT COUNT(DISTINCT part.participante) FROM participaciones part 
  JOIN participantes p ON part.participante = p.cedula WHERE p.comunidad = c.id AND 
  part.periodo >= '${startTerm}' AND part.periodo <= '${endTerm}' AND part.agrupacion = ${groupID}) AS participantes
  FROM comunidades c GROUP BY c.nombre HAVING inscritos > 0`;

  conn.query(sql1, (error, data1) => {
    if (error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if (data1.length > 0) {
      conn.query(sql2, (error, data2) => {
        if (error) {
          res.statusCode = 500;
          res.send(error.sqlMessage);
          return;
        } else if (data2.length > 0) {
          //Organizar datos en 3 arreglos:
          let comunidades = [];
          let inscritos = [];
          let participantes = [];

          for (let i = 0; i < data2.length; i++) {
            comunidades.push(data2[i].comunidad);
            inscritos.push(data2[i].inscritos);
            participantes.push(data2[i].participantes);
          }

          const results = {
            agrupacion: data1[0].nombre,
            comunidades: comunidades,
            inscritos: inscritos,
            participantes: participantes
          }

          res.statusCode = 200;
          res.send(results);
          return;

        } else {
          const results = {
            agrupacion: data1[0].nombre,
            comunidades: [],
            inscritos: [],
            participantes: []
          }
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

//Solicitud de datos necesitados por el gráfico de líneas 
router.get('/LineChart/:groupID/:startTerm/:endTerm', (req, res) => {
  const {groupID, startTerm, endTerm} =  req.params;

  const sql = `SELECT p.id AS periodo, (SELECT COUNT(DISTINCT i.participante) FROM 
  inscripciones i WHERE i.periodo = p.id AND i.agrupacion = ${groupID}) AS inscritos, 
  (SELECT COUNT(DISTINCT part.participante) FROM participaciones part 
  WHERE part.periodo = p.id AND part.agrupacion = ${groupID}) AS participantes 
  FROM periodos p WHERE p.id  >= '${startTerm}' AND p.id <= '${endTerm}'`;

  conn.query(sql, (error, data) => {
    if (error) {
      res.statusCode = 500;
      res.send(error.sqlMessage);
      return;
    } else if (data.length > 0) {
      //Organizar datos en 3 arreglos
      let periodos = [];
      let inscritos = [];
      let participantes = [];

      for (let i = 0; i < data.length; i++) {
        periodos.push(data[i].periodo);
        inscritos.push(data[i].inscritos);
        participantes.push(data[i].participantes);
      }

      const results = {
        periodos: periodos,
        inscritos: inscritos,
        participantes: participantes
      }

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