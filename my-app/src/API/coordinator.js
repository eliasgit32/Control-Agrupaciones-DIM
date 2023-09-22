import {conn} from './connectUser'

export const getCoordinatorsNames = async () => {
  const res = await conn.get('/coordinators/names');
  return res.data;
}