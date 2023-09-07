import axios from 'axios';

export const conn = axios.create({
  baseURL: 'http://localhost:5000'
});

export async function connection(username, password){
  try {
    const res =  await conn.post('/connection/', {
      username: username,
      password: password
    });
    return res.data;
  } catch (error) {
    return(error)
  }
}
