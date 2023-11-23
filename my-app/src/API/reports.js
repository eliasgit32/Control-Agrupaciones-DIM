import {conn} from './connectUser'

//GET
//Solicitar reporte de inscripciones realizadas en cada agrupación
export const getTotalRegistrations = async (startTerm, endTerm) => {
  const res = await conn.get(`/reports/TotalRegistrations/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

//Solicitar estadísticas de inscripción en varios semestres
export const getSemesterStats =  async (startTerm, endTerm) => {
  const res = await conn.get(`/reports/RegistrationsOnEveryTerm/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

//Solicitar datos para visualizar reporte de gráfico de barras
export const getBarChartData = async (groupID, startTerm, endTerm) => {
  const res = await conn.get(`/reports/BarChart/${groupID}/${startTerm}/${endTerm}`);
  if (res.data === '') return { agrupacion: '', comunidades: [], inscritos: [], participantes: []};
  return res.data;
}

//Solicitar datos para visualizar reporte de gráfico de líneas
export const getLineChartData = async (groupID, startTerm, endTerm) => {
  const res = await conn.get(`/reports/LineChart/${groupID}/${startTerm}/${endTerm}`);
  if (res.data === '') return { periodos: [], inscritos: [], participantes: []};
  return res.data;
}