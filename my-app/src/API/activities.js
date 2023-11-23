import {conn} from './connectUser'

//GET
//Solicitar actividades de una agrupacion
export const getGroupActivities = async (group, term) => {
  const res =  await conn.get(`/activities/${group}/${term}`);
  if(res.data === '') return [];
  return res.data;
}

//Solicitar info de una actividad
export const getOneActivity = async (idGroup, idAct, term) => {
  const res =  await conn.get(`/activities/singleAct/${idGroup}/${idAct}/${term}`);
  return res.data;
}

//Solicitar actividades terminadas sin participación registrada
export const getFinishedAct = async (currentDate) => {
  const res =  await conn.get(`/activities/finished/${currentDate}`);
  if(res.data === '') return [];
  return res.data;
}

//Solicitar listado de acompañantes en actividad
export const getHelpers = async (groupID, activity, term) => {
  const res =  await conn.get(`/activities/helper/${groupID}/${activity}/${term}`);
  if(res.data === '') return [];
  return res.data;
}

//POST
//Registrar actividad
export const createActivity = (activity) => conn.post('/activities', activity);

//Registrar acompañante
export const createHelper = (helper) => conn.post('/activities/helper', helper)

//Registrar conformacion de agrupacion
export const createConformation = ({group, activities, term}) => {
  conn.post(`/activities/${group}/${term}`, activities);
}

//PUT
//Actualizar info de actividad
export const updateActivity =  ({idGroup, idAct, term, activity}) => {
  conn.put(`/activities/${idGroup}/${idAct}/${term}`, activity);
}

//DELETE
//Eliminar acompañante
export const deleteHelper = (helper) => conn.delete('/activities/helper', { data: helper});