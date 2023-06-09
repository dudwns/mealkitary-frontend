import Layout from "@/components/layout";
import TabBar from "@/components/tabBar";
import Link from "next/link";
import { useRouter } from "next/router";
import shop from "@/data/shop.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { totalPriceState, totalCountState } from "@/libs/recoilState";
import Slider from "@/components/slider";

export interface MenuItem {
  id: number;
  name: string;
  image: string | null;
  price: number;
  description: string;
}

interface shop {
  id: number;
  title: string;
  images: string[] | null;
  description: string;
  menus: MenuItem[];
}

export default function Shop() {
  const router = useRouter();
  const [shopData, setShopData] = useState<shop>(shop[Number(router.query.id) - 1]);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [totalCount, setTotalCount] = useRecoilState(totalCountState);

  useEffect(() => {
    setShopData(shop[Number(router.query.id) - 1]);
  }, [router, shopData]);

  return (
    <Layout>
      <div className="pb-20">
        <div className="flex justify-center items-center w-full h-64 bg-gray-200 font-bold text-2xl relative">
          <button
            className="absolute top-4 left-4 z-10"
            onClick={() => router.push("/reservation")}
          >
            <svg
              className="w-6 h-6 text-white fixed z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          {shopData?.images ? (
            <Slider images={shopData?.images} />
          ) : (
            <div>상품 이미지가 없습니다.</div>
          )}
        </div>
        <div className="bg-white px-6 py-4  border-b-2 border-gray-300 shadow-md ">
          <div className="text-2xl font-extrabold mb-3">{shopData?.title}</div>
          <div className="flex justify-center items-center border-2 h-48 rounded-xl">
            {shopData?.description}
          </div>
        </div>
        <div className="bg-white px-6 mt-2 border-t-2 shadow-md">
          <div className="text-lg font-bold mt-3 mb-2">인기 메뉴</div>
          <ul className="flex flex-col divide-y">
            {shopData?.menus?.map((menu) => (
              <Link key={menu.id} href={`/products/${menu.id}`}>
                <li className="py-4">
                  <div className="flex">
                    {menu.image ? (
                      <div className="w-16 h-16 rounded-lg mr-3 relative overflow-hidden">
                        <Image src={menu.image} alt="메뉴 이미지" layout="fill" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-lg mr-3"></div>
                    )}
                    <div className="flex flex-col justify-between">
                      <div className="text-sm font-bold">{menu.name}</div>
                      <div className="text-xs text-gray-500">{menu.description}</div>
                      <div className="text-sm">{menu.price.toLocaleString()}원</div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {totalCount !== 0 ? (
          <TabBar
            contain={true}
            count={totalCount}
            price={totalPrice}
            text={"장바구니 보기"}
            onClick={() => router.push("/basket")}
          />
        ) : null}
      </div>
    </Layout>
  );
}
