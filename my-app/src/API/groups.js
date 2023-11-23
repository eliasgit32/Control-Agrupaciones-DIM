import {conn} from './connectUser'

//GET
//Solicitar info de agrupaciones registradas
export const getGroups = async () => {
  const res = await conn.get('/groups');
  return res.data;
}

//Solicitar info de una sola agrupación
export const getOneGroup = async (id) => {
  const res =  await conn.get(`/groups/${id}`);
  return res.data;
}

//POST
//Registrar agrupación
export const createGroup = (group) => conn.post('/groups', group);

//PUT
//Actualizar datos de una agrupación
export const updateGroup = (group) => conn.put('/groups' , group);