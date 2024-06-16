import { useEffect, useState } from 'react';
import { useFetchProduct } from '@/apis/product';
import { TabBar } from '@/components';
import Layout from '@/components/layout';
import {
  reserveInfoState,
  totalCountState,
  totalPriceState,
} from '@/libs/recoilState';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

const Product = () => {
  const router = useRouter();
  const shopId = Number(router.query.shopId);
  const menuId = Number(router.query.id);

  const setTotalPrice = useSetRecoilState(totalPriceState);
  const setTotalCount = useSetRecoilState(totalCountState);
  const setReserveInfo = useSetRecoilState(reserveInfoState);

  const { productData } = useFetchProduct({
    shopId,
    menuId,
  });
  const [menuCount, setMenuCount] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(productData?.price!);
  }, [router, productData]);

  return (
    <Layout>
      <div className="pb-20">
        <div className="relative flex items-center justify-center w-full h-64 text-2xl font-bold bg-gray-200">
          <button
            className="absolute z-10 top-4 left-4"
            onClick={() => router.back()}>
            <svg
              className="fixed z-10 w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          {'/images/buda.PNG' ? (
            <div className="relative w-full h-full ">
              <Image
                src={'/images/buda.PNG'} // @TODO: productData.images로 변경
                layout="fill"
                alt="제품 이미지"
              />
            </div>
          ) : (
            <div>상품 이미지가 없습니다.</div>
          )}
        </div>
        <div className="px-6 py-4 bg-white border-b-2 border-gray-300 shadow-md">
          <div className="mb-3 text-2xl font-extrabold">
            {productData?.name}
          </div>
          <div>간단하게 조리해서 먹을 수 있는 {productData?.name}!</div>
        </div>
        <div className="flex items-center justify-between px-6 py-4 mt-2 bg-white border-t-2 shadow-md">
          <div className="flex items-center text-2xl font-extrabold">수량</div>
          <div className="flex px-4 py-1 space-x-6 border border-gray-200">
            <button
              onClick={() => {
                setMenuCount((prev) => (prev > 1 ? prev - 1 : 1));
                setPrice((prev) =>
                  menuCount > 1
                    ? prev - productData?.price!
                    : productData?.price!,
                );
              }}>
              -
            </button>
            <div className="flex items-center">{menuCount}개</div>
            <button
              onClick={() => {
                setMenuCount((prev) => prev + 1);
                setPrice((prev) => prev + productData?.price!);
              }}>
              +
            </button>
          </div>
        </div>
        <TabBar
          text={`${price?.toLocaleString()}원 담기`}
          onClick={() => {
            setTotalPrice((prev) => prev + price);
            setTotalCount((prev) => prev + menuCount);
            setReserveInfo((prev) => [
              ...prev,
              {
                productId: productData?.id!,
                name: productData?.name!,
                price: productData?.price!,
                count: menuCount,
                image: productData?.image!,
              },
            ]);
            router.back();
          }}
        />
      </div>
    </Layout>
  );
};

export default Product;
