import {conn} from './connectUser';

//GET
//Solicitar listado de participantes de una actividad
export const getParticipations = async (groupID, term, activityID) => {
  const res = await conn.get(`/participations/${groupID}/${term}/${activityID}`);
  if (res.data === '') return []; 
  return res.data;
}

//Solicitar historial de participación
export const getParticipationHistory = async (cedula, startTerm, endTerm) => {
  const res = await conn.get(`/participations/history/${cedula}/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

//Solicitar todas las participaciones de una agrupación
export const getAllParticipations =  async (groupID, startTerm, endTerm) => {
  const res = await conn.get(`/participations/AllParticipations/${groupID}/${startTerm}/${endTerm}`);
  if (res.data === '') return {}; 
  return res.data;
}

//Solicitar estadísticas de participación de una agrupación
export const getParticipationsStats =  async (groupID, startTerm, endTerm) => {
  const res = await conn.get(`/participations/ParticipationsOnActivities/${groupID}/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

//POST
//Registrar participación
export const createParticipation = (participation) => conn.post('/participations', participation);

//PUT
//Actualizar registro de participaciones
export const updateParticipation = (groupID, activityID, term, participants) =>
  conn.put(`/participations/${groupID}/${activityID}/${term}`, participants);

//DELETE
//Eliminar participación
export const deleteParticipation = (participation) =>
  conn.delete('/participations', { data: participation });
