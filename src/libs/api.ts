import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getShops() {
  return await axios.get(`${API_URL}/shops`);
}
