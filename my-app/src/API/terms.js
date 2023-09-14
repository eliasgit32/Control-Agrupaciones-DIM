import {conn} from './connectUser'

export const getTerms = async () => {
  const res = await conn.get('/terms');
  return res.data;
}