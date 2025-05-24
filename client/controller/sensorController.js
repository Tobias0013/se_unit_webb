/* Author(s): Securella */
import API from './API/connection';
export async function fetchSensors() {
  const token = sessionStorage.getItem('token');
  return (await API.get('/sensors', { headers: { Authorization: `Bearer ${token}` } })).data;
}