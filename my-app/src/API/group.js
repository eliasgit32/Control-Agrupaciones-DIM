import {conn} from './connectUser'

export const createGroup = (group) => conn.post('/groups', group);

export const getGroups = async () => {
  const res = await conn.get('/groups');
  return res.data;
}
