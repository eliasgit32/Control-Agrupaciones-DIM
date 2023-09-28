import {conn} from './connectUser'

//GET
export const getTerms = async () => {
  const res = await conn.get('/terms');
  return res.data;
}

//POST
export const createTerm = (term) => conn.post('/terms', term);

//PUT
export const updateTerm = (term) => conn.put('/terms' , term);