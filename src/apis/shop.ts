import { useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ShopProps {
  id: number;
  image: string;
  title: string;
  score: number;
  images?: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetchShops = () => {
  const { data, isLoading, isSuccess, error } = useQuery<
    AxiosResponse<ShopProps[]>,
    AxiosError
  >('shops', () => axios.get(`${API_URL}/shops`));
  return {
    shopsData: data?.data,
    isShopsLoading: isLoading,
    isShopsSuccess: isSuccess,
    isShopsError: error,
  };
};

export const useFetchShop = ({ shopId }: { shopId: number }) => {
  const { data, isLoading, isSuccess, error } = useQuery<
    AxiosResponse<ShopProps[]>,
    AxiosError,
    ShopProps | undefined
  >('shop', () => axios.get(`${API_URL}/shops`), {
    select: ({ data }) => {
      return data.find((shop) => shop.id === shopId) || undefined;
    },
  });
  return {
    shopData: data,
    isShopLoading: isLoading,
    isShopSuccess: isSuccess,
    isShopError: error,
  };
};
