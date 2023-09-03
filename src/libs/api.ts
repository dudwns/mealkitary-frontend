import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getShops() {
  return await axios.get(`${API_URL}/shops`);
}

interface GetProductsProps {
  id: number;
}

interface GetReservationsProps {
  uuid: string;
}

export async function getProducts({ id }: GetProductsProps) {
  return await axios.get(`${API_URL}/shops/${id}/products`, {
    params: { id },
  });
}

export async function getReserveTime({ id }: GetProductsProps) {
  return await axios.get(`${API_URL}/shops/${id}/reservable-time`, {
    params: { id },
  });
}

export async function getReservation({ uuid }: GetReservationsProps) {
  return await axios.get(`${API_URL}/reservations/${uuid}`, {
    params: { uuid },
  });
}

// export async function getShops() {
//   return await axios.get(`/api/shops`);
// }

// export async function addReservation({ reservedData }: GetProductsProps) {
//   return await axios.get(`${API_URL}/shops/${shopId}/reservable-time`, {
//     params: { shopId },
//   });
// }
