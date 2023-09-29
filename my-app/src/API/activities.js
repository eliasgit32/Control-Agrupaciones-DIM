import {conn} from './connectUser'

export const createActivity = (activity) => conn.post('/activities', activity);