import {conn} from './connectUser';

//GET
export const getParticipations = async (groupID, term, activityID) => {
  const res = await conn.get(`/participations/${groupID}/${term}/${activityID}`);
  if (res.data === '') return []; 
  return res.data;
}

//POST
export const createParticipation = (participation) => conn.post('/participations', participation);

//DELETE
export const deleteParticipation = (participation) =>
  conn.delete('/participations', { data: participation });
