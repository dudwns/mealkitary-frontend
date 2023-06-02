import Layout from "@/components/layout";
import TabBar from "@/components/tabBar";
import { useRouter } from "next/router";
import shop from "@/data/shop.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  totalPriceState,
  totalCountState,
  reservationMenuName,
  reservationDescription,
  reservationPrice,
} from "@/lib/recoilState";
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

export default function Product() {
  const router = useRouter();
  const [menuData, setMenuData] = useState<MenuItem>();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [totalCount, setTotalCount] = useRecoilState(totalCountState);

  const [menuName, setMenuName] = useRecoilState(reservationMenuName);
  const [description, setDescription] = useRecoilState(reservationDescription);
  const [reservationprice, setReservationprice] =
    useRecoilState(reservationPrice);

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
        <div className="bg-white px-6 mt-2 border-t-2 shadow-md border-b-2 border-b-gray-300">
          <div className="text-lg font-bold mt-3 mb-2">옵션 선택</div>
          <ul className="divide-y">
            {menuData?.options.map((data, index) => (
              <li key={index}>
                <div className="flex relative w-full">
                  <label className="w-full py-4" htmlFor={String(data?.id)}>
                    <input
                      className="mr-4 text-blue-500 focus:ring-0"
                      type="checkbox"
                    />
                    {data?.option}
                  </label>
                  {/* <div className="absolute right-0"> +1000원</div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white px-6 py-4 mt-2 border-t-2 shadow-md flex items-center justify-between">
          <div className="text-2xl font-extrabold mb-3 flex items-center">
            수량
          </div>
          <div className="flex space-x-6 border border-gray-200  px-4 py-1">
            <button
              onClick={() => {
                setMenuCount((prev) => (prev > 1 ? prev - 1 : 1));
                setPrice((prev) =>
                  menuCount > 1 ? prev - menuData?.price! : menuData?.price!
                );
              }}
            >
              -
            </button>
            <div className="flex items-center">{menuCount}개</div>
            <button
              onClick={() => {
                setMenuCount((prev) => prev + 1);
                setPrice((prev) => prev + menuData?.price!);
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
            setMenuName((prev) => prev + menuData?.name);
            router.back();
          }}
        />
      </div>
    </Layout>
  );
}
