import {conn} from './connectUser'

//POST
export const createActivity = (activity) => conn.post('/activities', activity);

export const createConformation = ({group, activities, term}) => {
  conn.post(`/activities/${group}/${term}`, activities);
}

//GET
export const getGroupActivities = async (group, term) => {
  const res =  await conn.get(`/activities/${group}/${term}`);
  return res.data;
}