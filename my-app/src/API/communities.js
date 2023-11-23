import {conn} from './connectUser'

//GET
//Solicitar info de todas las comunidades
export const getCommunities = async () => {
  const res = await conn.get('/communities');
  return res.data;
}

//Solicitar info de comunidades de tipo escuela o unidad
export const getUnitsFaculties = async () => {
  const res = await conn.get('/communities/units-faculties');
  if(res.data === '') return [];
  return res.data;
}

//Solicitar info de comunidades tipo escuela
export const getFaculties = async () => {
  const res = await conn.get('/communities/faculties');
  if(res.data === '') return [];
  return res.data;
}

//Solicitar info de comunidades externas a la universidad
export const getExternalCommunities = async () => {
  const res = await conn.get('/communities/externalCommunities');
  if(res.data === '') return [];
  return res.data;
}

//POST
//Registrar comunidad
export const createCommunity = (community) => conn.post('/communities', community);