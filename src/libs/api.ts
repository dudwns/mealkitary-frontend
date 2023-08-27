import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getShops() {
  return await axios.get(`${API_URL}/shops`);
}

interface GetProductsProps {
  shopId: number;
}

export async function getProducts({ shopId }: GetProductsProps) {
  return await axios.get(`${API_URL}/shops/${shopId}/products`, {
    params: { shopId },
  });
}

export async function getReserveTime({ shopId }: GetProductsProps) {
  return await axios.get(`${API_URL}/shops/${shopId}/reservable-time`, {
    params: { shopId },
  });
}

// export async function addReservation({ reservedData }: GetProductsProps) {
//   return await axios.get(`${API_URL}/shops/${shopId}/reservable-time`, {
//     params: { shopId },
//   });
// }
