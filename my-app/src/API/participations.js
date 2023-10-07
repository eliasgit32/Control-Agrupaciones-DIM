import {conn} from './connectUser';

//GET
export const getParticipations = async (groupID, term, activityID) => {
  const res = await conn.get(`/participations/${groupID}/${term}/${activityID}`);
  if (res.data === '') return [];
  console.log(res.data);
  return res.data;
}

//POST
export const createParticipation = (participation) => conn.post('/participations', participation);