import Layout from "@/components/layout";
import TabBar from "@/components/tabBar";
import { useRouter } from "next/router";
import shop from "@/data/shop.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import { totalPriceState, totalCountState } from "@/lib/recoilState";
import { useRecoilState } from "recoil";

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
}

export default function Order() {
  const router = useRouter();
  const [menuData, setMenuData] = useState<MenuItem>();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [totalCount, setTotalCount] = useRecoilState(totalCountState);
  const [menuCount, setMenuCount] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setMenuData(shop[0].menus[Number(router.query.id) - 1]);
    setPrice(menuData?.price!);
  }, [router, menuData]);

  return (
    <Layout>
      <div className="pb-20">
        <div className="flex justify-center items-center w-full h-64 bg-gray-200 font-bold text-2xl relative">
          <button
            className="absolute top-4 left-4 z-10"
            onClick={() => router.back()}
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
          {menuData?.image ? (
            <div className="w-full h-full relative ">
              <Image src={menuData.image} layout="fill" alt="제품 이미지" />
            </div>
          ) : (
            <div>상품 이미지가 없습니다.</div>
          )}
        </div>
        <div className="bg-white px-6 py-4  border-b-2 border-gray-300 shadow-md">
          <div className="text-2xl font-extrabold mb-3">음식 이름</div>
          <div>음식 세부 정보</div>
        </div>
        <div className="bg-white px-6 py-4 mt-2 border-t-2 shadow-md flex items-center justify-between">
          <div className="text-2xl font-extrabold mb-3 flex items-center">
            수량
          </div>
          <div className="flex space-x-6 border border-gray-200  px-4 py-1">
            재고 없음
          </div>
        </div>
        <div className="text-center bg-white px-6 py-8  border-b-2 border-gray-300 shadow-md">
          예약 주문을 하시겠습니까?
        </div>
        <div className="bg-white max-w-xl text-white border-t-4 border-gray-200  fixed bottom-0 w-full px-10 py-3 flex justify-between">
          <div className="bg-blue-500 w-full py-2 rounded-lg flex justify-around">
            <button>예</button>
            <button>아니오</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
