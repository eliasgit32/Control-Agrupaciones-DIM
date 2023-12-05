import {conn} from './connectUser'

//GET
//Solicitar info de los participantes inscritos en una agrupación
export const getRegisteredParticipants = async (groupID, term) => {
  const res = await conn.get(`/participants/signUp/${groupID}/${term}`);
  if (res.data === '') return [];
  return res.data;
}

//Solicitar info de un participante
export const getInfoParticipant = async (cedula) => {
  const res =  await conn.get(`/participants/${cedula}`);
  if (res.data === '') return [];
  return res.data;
}

//Solcitar info de todos los participantes que sean estudiantes
export const getStudents = async () => {
  const res = await conn.get(`/participants/students`);
  if (res.data === '') return [];
  return res.data;
}

//Solicitar info de los participantes tipo personal
export const getPersonal = async () => {
  const res = await conn.get(`/participants/personal`);
  if (res.data === '') return [];
  return res.data;
}

//Solicitar info del personal de Identidad y Misión
export const getPersonalDIM = async () => {
  const res = await conn.get(`/participants/personal/DIM`);
  if (res.data === '') return [];
  return res.data;
}

//Solicitar info de los participantes miembros de comunidades externas
export const getComunnityMembers = async () => {
  const res = await conn.get(`/participants/community`);
  if (res.data === '') return [];
  return res.data;
}

//POST
//Registrar participante
export const createParticipant = (participant) => 
conn.post('/participants', participant);

//Inscribir participante en una agrupación
export const registerOnGroup = ({cedula, groupID, term}) => 
conn.post(`/participants/signUp/${cedula}/${groupID}/${term}`);

//PUT
//Actualizar info de participante
export const updateParticipant = ({cedula, participant}) => 
  conn.put(`/participants/${cedula}`, participant);

//DELETE
//Eliminar participante
export const deleteParticipant = (cedula) => 
conn.delete(`/participants/${cedula}`);

//Eliminar inscripción de participante en agrupación
export const deleteGroupRegistration = ({cedula, groupID, term}) => {
  conn.delete(`/participants/signUp/${cedula}/${groupID}/${term}`);
}