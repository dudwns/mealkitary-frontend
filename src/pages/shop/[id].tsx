import Layout from '@/components/layout';
import TabBar from '@/components/TabBar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import shop_Dummy from '@/data/shop.json';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { totalPriceState, totalCountState } from '@/libs/recoilState';
import Slider from '@/components/Slider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useQuery } from 'react-query';
import { getProducts, getShops } from '@/libs/api';
import { ShopProps } from '../reservation';

export interface MenuProps {
  id: number;
  name: string;
  image: string | null;
  price: number;
  description: string;
}

export type MenusProps = MenuProps[];

interface Shop {
  id: number;
  title: string;
  images: string[] | null;
  description: string;
  menus: MenuProps[];
} // 더미 데이터 타입

export default function Shop() {
  const router = useRouter();
  const SHOP_ID = Number(router.query.id);
  const [shopData, setShopData] = useState<Shop>(shop_Dummy[Number(router.query.id) - 1]); // 더미 데이터
  const [shop, setShop] = useState<ShopProps>();
  const [menus, setMenus] = useState<MenusProps>();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [totalCount, setTotalCount] = useRecoilState(totalCountState);

  const { isLoading, data, error } = useQuery('menuList', () => getProducts({ id: SHOP_ID }), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: ({ data }) => {
      setMenus(data);
    },
    onError: (e: Error) => {
      console.error(e.message);
    },
    enabled: Boolean(SHOP_ID),
  });

  const { data: shops } = useQuery('shopList', getShops, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: ({ data }) => {
      const findShop = data?.find((shop: ShopProps) => shop.id === SHOP_ID);
      setShop(findShop);
    },
    onError: (e: Error) => {
      console.error(e.message);
    },
    enabled: Boolean(SHOP_ID),
  });

  useEffect(() => {
    setShopData(shop_Dummy[Number(router.query.id) - 1]);
  }, [router, shopData]);

  return (
    <Layout>
      <div className="pb-20">
        <div className="flex justify-center items-center w-full h-64 bg-gray-200 font-bold text-2xl relative">
          <button className="absolute top-4 left-4 z-10" onClick={() => router.push('/reservation')}>
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
          {shopData?.images ? <Slider images={shopData?.images} /> : <div>상품 이미지가 없습니다.</div>}
        </div>
        <div className="bg-white px-6 py-4  border-b-2 border-gray-300 shadow-lg ">
          <div className="text-2xl font-extrabold mb-4">{shop?.title}</div>
          <div className="flex justify-center items-center border-2 h-48 rounded-xl">{`${shop?.title}입니다.`}</div>
        </div>
        <div className="bg-white px-6 mt-2 border-t-2 shadow-md">
          <div className="text-lg font-bold mt-4 mb-2 ">인기 메뉴</div>
          <List className="flex flex-col divide-y">
            {menus?.map((menu) => (
              <Link key={menu.id} href={`/product/${menu.id}?shopId=${SHOP_ID}`}>
                <ListItemButton className="py-4">
                  <div className="flex">
                    {menu.image ? (
                      <div className="w-16 h-16 rounded-lg mr-4 relative overflow-hidden border border-gray-300">
                        <Image src={menu.image} alt="메뉴 이미지" layout="fill" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg mr-4 relative overflow-hidden border border-gray-300 bg-gray-300 flex justify-center items-center">
                        <span className="text-xs text-white">이미지 없음</span>
                      </div>
                    )}
                    <div className="flex flex-col justify-between">
                      <div className="text-sm font-bold">{menu.name}</div>
                      <div className="text-xs text-gray-500">{menu.description}</div>
                      <div className="text-sm">{menu.price.toLocaleString()}원</div>
                    </div>
                  </div>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </div>
        {totalCount !== 0 ? (
          <TabBar
            contain={true}
            count={totalCount}
            price={totalPrice}
            text={'장바구니 보기'}
            onClick={() => router.push(`/basket?shopId=${SHOP_ID}`)}
          />
        ) : null}
      </div>
    </Layout>
  );
}
