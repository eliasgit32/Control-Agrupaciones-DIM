import {conn} from './connectUser'

//GET
export const getCommunities = async () => {
  const res = await conn.get('/communities');
  return res.data;
}
export const getUnitsFaculties = async () => {
  const res = await conn.get('/communities/units-faculties');
  return res.data;
}
//POST
export const createCommunity = (community) => conn.post('/communities', community);