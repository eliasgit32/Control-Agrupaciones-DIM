import {conn} from './connectUser'

export const getCoordinatorsNames = async () => {
  const res = await conn.get('/coordinators/names');
  return res.data;
}

export const getCoordinators = async () => {
  const res = await conn.get('/coordinators');
  return res.data;
}