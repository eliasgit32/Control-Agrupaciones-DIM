import {conn} from './connectUser'

export const getTotalRegistrations = async (startTerm, endTerm) => {
  const res = await conn.get(`/reports/TotalRegistrations/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

export const getSemesterStats =  async (startTerm, endTerm) => {
  const res = await conn.get(`/reports/RegistrationsOnEveryTerm/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

export const getBarChartData = async (groupID, startTerm, endTerm) => {
  const res = await conn.get(`/reports/BarChart/${groupID}/${startTerm}/${endTerm}`);
  if (res.data === '') return { agrupacion: '', comunidades: [], inscritos: [], participantes: []};
  return res.data;
}

export const getLineChartData = async (groupID, startTerm, endTerm) => {
  const res = await conn.get(`/reports/LineChart/${groupID}/${startTerm}/${endTerm}`);
  if (res.data === '') return { periodos: [], inscritos: [], participantes: []};
  return res.data;
}