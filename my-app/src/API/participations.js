import {conn} from './connectUser';

//GET
export const getParticipations = async (groupID, term, activityID) => {
  const res = await conn.get(`/participations/${groupID}/${term}/${activityID}`);
  if (res.data === '') return []; 
  return res.data;
}

export const getParticipationHistory = async (cedula, startTerm, endTerm) => {
  const res = await conn.get(`/participations/history/${cedula}/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

export const getAllParticipations =  async (groupID, startTerm, endTerm) => {
  const res = await conn.get(`/participations/AllParticipations/${groupID}/${startTerm}/${endTerm}`);
  if (res.data === '') return {}; 
  return res.data;
}

export const getParticipationsStats =  async (groupID, startTerm, endTerm) => {
  const res = await conn.get(`/participations/ParticipationsOnActivities/${groupID}/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

//POST
export const createParticipation = (participation) => conn.post('/participations', participation);

//DELETE
export const deleteParticipation = (participation) =>
  conn.delete('/participations', { data: participation });
