import {conn} from './connectUser'

//POST
export const createActivity = (activity) => conn.post('/activities', activity);

export const createConformation = ({group, activities, term}) => {
  conn.post(`/activities/${group}/${term}`, activities);
}

//GET
export const getGroupActivities = async (group, term) => {
  const res =  await conn.get(`/activities/${group}/${term}`);
  if(res.data === ''){ console.log('retornando arrya'); return [];}
  return res.data;
}

export const getOneActivity = async (idGroup, idAct, term) => {
  const res =  await conn.get(`/activities/singleAct/${idGroup}/${idAct}/${term}`);
  return res.data;
}