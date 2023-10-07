import {conn} from './connectUser'

//POST
export const registerOnGroup = ({cedula, groupID, term}) => 
  conn.post(`/participants/signUp/${cedula}/${groupID}/${term}`);

//GET
export const getRegisteredParticipants = async (groupID, term) => {
  const res = await conn.get(`/participants/signUp/${groupID}/${term}`);
  if (res.data === '') return [];
  return res.data;
}