import {conn} from './connectUser'

export const getPersonal = async () => {
  const res = await conn.get('/personal');
  return res.data;
}