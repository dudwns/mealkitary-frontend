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
  const [shopData, setShopData] = useState<shop>(
    shop[Number(router.query.id) - 1]
  );
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
        <div className="bg-white px-6 py-4  border-b-2 border-gray-300 shadow-lg ">
          <div className="absolute p-1 w-20 h-20  shadow-md top-48 z-20">
            <img src="data:image/png;base64,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" />
          </div>
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
                        <Image
                          src={menu.image}
                          alt="메뉴 이미지"
                          layout="fill"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-lg mr-3"></div>
                    )}
                    <div className="flex flex-col justify-between">
                      <div className="text-sm font-bold">{menu.name}</div>
                      <div className="text-xs text-gray-500">
                        {menu.description}
                      </div>
                      <div className="text-sm">
                        {menu.price.toLocaleString()}원
                      </div>
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
