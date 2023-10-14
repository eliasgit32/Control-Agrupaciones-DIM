import {conn} from './connectUser'

//POST
export const createGroup = (group) => conn.post('/groups', group);

//GET
export const getGroups = async () => {
  const res = await conn.get('/groups');
  return res.data;
}

export const getOneGroup = async (id) => {
  const res =  await conn.get(`/groups/${id}`);
  return res.data;
}

export const getTotalRegistrations = async (startTerm, endTerm) => {
  const res = await conn.get(`/groups/TotalRegistrations/${startTerm}/${endTerm}`);
  if (res.data === '') return []; 
  return res.data;
}

//PUT
export const updateGroup = (group) => conn.put('/groups' , group);