import {conn} from './connectUser'

//POST
export const createActivity = (activity) => conn.post('/activities', activity);

//GET
export const getGroupActivities = async (group) => {
  const res =  await conn.get(`/activities/${group}`);
  return res.data;
}