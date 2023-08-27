import Layout from '@/components/layout';
import TabBar from '@/components/TabBar';
import { useRouter } from 'next/router';
import shop from '@/data/shop.json';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { totalPriceState, totalCountState, reserveInfoState } from '@/libs/recoilState';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { getProducts } from '@/libs/api';
import { ShopProps } from '../reservation';
import { MenuProps } from '../shop/[id]';

interface OptionsProp {
  id: number;
  option: string;
}

export interface MenuItem {
  id: number;
  name: string;
  image: string | null;
  price: number;
  description: string;
  options: OptionsProp[];
} // 더미 타입

export default function Product() {
  const router = useRouter();
  const { shopId } = router.query;
  const MENU_ID = Number(router.query.id);
  const [menu, setMenu] = useState<MenuProps>();
  const [menuData, setMenuData] = useState<MenuItem>(); // 더미 데이터
  const setTotalPrice = useSetRecoilState(totalPriceState);
  const setTotalCount = useSetRecoilState(totalCountState);
  const setReserveInfo = useSetRecoilState(reserveInfoState);
  const [menuCount, setMenuCount] = useState(1);
  const [price, setPrice] = useState(0);

  const { isLoading, data, error } = useQuery('menuList', () => getProducts({ shopId: Number(shopId) }), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: ({ data }) => {
      const fineMenu = data?.find((shop: ShopProps) => shop.id === MENU_ID);
      setMenu(fineMenu);
    },
    onError: (e: Error) => {
      console.error(e.message);
    },
    enabled: Boolean(MENU_ID),
  });

  useEffect(() => {
    setMenuData(shop[0].menus[Number(router.query.id) - 1]);
    setPrice(menu?.price!);
  }, [router, menu]);

  return (
    <Layout>
      <div className="pb-20">
        <div className="flex justify-center items-center w-full h-64 bg-gray-200 font-bold text-2xl relative">
          <button className="absolute top-4 left-4 z-10" onClick={() => router.back()}>
            <svg
              className="w-6 h-6 text-white fixed z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          {menuData?.image ? (
            <div className="w-full h-full relative ">
              <Image src={menuData.image} layout="fill" alt="제품 이미지" />
            </div>
          ) : (
            <div>상품 이미지가 없습니다.</div>
          )}
        </div>
        <div className="bg-white px-6 py-4  border-b-2 border-gray-300 shadow-md">
          <div className="text-2xl font-extrabold mb-3">{menu?.name}</div>
          <div>간단하게 조리해서 먹을 수 있는 {menu?.name}!</div>
        </div>
        <div className="bg-white px-6 py-4 mt-2 border-t-2 shadow-md flex items-center justify-between">
          <div className="text-2xl font-extrabold flex items-center">수량</div>
          <div className="flex space-x-6 border border-gray-200 px-4 py-1">
            <button
              onClick={() => {
                setMenuCount((prev) => (prev > 1 ? prev - 1 : 1));
                setPrice((prev) => (menuCount > 1 ? prev - menu?.price! : menu?.price!));
              }}
            >
              -
            </button>
            <div className="flex items-center">{menuCount}개</div>
            <button
              onClick={() => {
                setMenuCount((prev) => prev + 1);
                setPrice((prev) => prev + menu?.price!);
              }}
            >
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
                productId: menu?.id!,
                name: menu?.name!,
                price: menu?.price!,
                count: menuCount,
                image: menu?.image!,
              },
            ]);
            router.back();
          }}
        />
      </div>
    </Layout>
  );
}
