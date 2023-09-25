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
  const { shopId } = router.query;
  const MENU_ID = Number(router.query.id);

  const setTotalPrice = useSetRecoilState(totalPriceState);
  const setTotalCount = useSetRecoilState(totalCountState);
  const setReserveInfo = useSetRecoilState(reserveInfoState);

  const { productData } = useFetchProduct({
    shopId: Number(shopId),
    menuId: MENU_ID,
  });
  const [menuCount, setMenuCount] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(productData?.price!);
  }, [router, productData]);

  return (
    <Layout>
      <div className="pb-20">
        <div className="flex justify-center items-center w-full h-64 bg-gray-200 font-bold text-2xl relative">
          <button
            className="absolute top-4 left-4 z-10"
            onClick={() => router.back()}>
            <svg
              className="w-6 h-6 text-white fixed z-10"
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
            <div className="w-full h-full relative ">
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
        <div className="bg-white px-6 py-4  border-b-2 border-gray-300 shadow-md">
          <div className="text-2xl font-extrabold mb-3">
            {productData?.name}
          </div>
          <div>간단하게 조리해서 먹을 수 있는 {productData?.name}!</div>
        </div>
        <div className="bg-white px-6 py-4 mt-2 border-t-2 shadow-md flex items-center justify-between">
          <div className="text-2xl font-extrabold flex items-center">수량</div>
          <div className="flex space-x-6 border border-gray-200 px-4 py-1">
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
