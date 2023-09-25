import { useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface ReservationProps {
  description: string;
  reservationId: string;
  reserveAt: string;
  reservedProduct: {
    productId: number;
    name: string;
    price: number;
    count: number;
  }[];
  shopName: string;
  status: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetchReservationTime = ({ shopId }: { shopId: number }) => {
  const { data, isLoading, isSuccess, error } = useQuery<
    AxiosResponse<String[]>,
    AxiosError
  >(
    'reservation-time',
    () => axios.get(`${API_URL}/shops/${shopId}/reservable-time`),
    {
      enabled: Boolean(shopId),
    },
  );
  return {
    reservationTimeData: data?.data,
    isReservationTimeLoading: isLoading,
    isReservationTimeSuccess: isSuccess,
    isReservationTimeError: error,
  };
};

export const useFetchReservation = ({ uuid }: { uuid: string }) => {
  const { data, isLoading, isSuccess, error } = useQuery<
    AxiosResponse<ReservationProps>,
    AxiosError
  >('reservation', () => axios.get(`${API_URL}/reservations/${uuid}`));
  return {
    reservationData: data?.data,
    isReservationLoading: isLoading,
    isReservationSuccess: isSuccess,
    isReservationError: error,
  };
};
