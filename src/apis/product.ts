import { useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ProductProps {
  id: number;
  name: string;
  image?: string;
  price: number;
  description: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useFetchProducts = ({ shopId }: { shopId: number }) => {
  const { data, isLoading, isSuccess, error } = useQuery<
    AxiosResponse<ProductProps[]>,
    AxiosError
  >('products', () => axios.get(`${API_URL}/shops/${shopId}/products`), {
    enabled: Boolean(shopId),
  });
  return {
    productsData: data?.data,
    isProductsLoading: isLoading,
    isProductsSuccess: isSuccess,
    isProductsError: error,
  };
};

export const useFetchProduct = ({
  shopId,
  menuId,
}: {
  shopId: number;
  menuId: number;
}) => {
  const { data, isLoading, isSuccess, error } = useQuery<
    AxiosResponse<ProductProps[]>,
    AxiosError,
    ProductProps | undefined
  >('product', () => axios.get(`${API_URL}/shops/${shopId}/products`), {
    select: ({ data }) => {
      return data.find((shop) => shop.id === menuId) || undefined;
    },
    enabled: Boolean(menuId),
  });
  return {
    productData: data,
    isProductLoading: isLoading,
    isProductSuccess: isSuccess,
    isProductError: error,
  };
};
