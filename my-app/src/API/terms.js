import {conn} from './connectUser'

//GET
//Solicitar listado de todos los períodos académicos registrados
export const getTerms = async () => {
  const res = await conn.get('/terms');
  return res.data;
}

//POST
//Registrar período académico
export const createTerm = (term) => conn.post('/terms', term);

//PUT
//Asignar período académico como el actual
export const updateTerm = (term) => conn.put('/terms' , term);