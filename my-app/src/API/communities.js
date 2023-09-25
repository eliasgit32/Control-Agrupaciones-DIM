import {conn} from './connectUser'

export const getUnitsFaculties = async () => {
  const res = await conn.get('/communities/units-faculties');
  return res.data;
}