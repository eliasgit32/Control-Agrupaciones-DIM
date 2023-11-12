import {conn} from './connectUser'

//POST
export const createParticipant = (participant) => 
conn.post('/participants', participant);

export const registerOnGroup = ({cedula, groupID, term}) => 
conn.post(`/participants/signUp/${cedula}/${groupID}/${term}`);

//GET
export const getRegisteredParticipants = async (groupID, term) => {
  const res = await conn.get(`/participants/signUp/${groupID}/${term}`);
  if (res.data === '') return [];
  return res.data;
}

export const getInfoParticipant = async (cedula) => {
  const res =  await conn.get(`/participants/${cedula}`);
  if (res.data === '') return [];
  return res.data;
}

export const getStudents = async () => {
  const res = await conn.get(`/participants/students`);
  if (res.data === '') return [];
  return res.data;
}

//DELETE
export const deleteGroupRegistration = ({cedula, groupID, term}) => {
  conn.delete(`/participants/signUp/${cedula}/${groupID}/${term}`);
}