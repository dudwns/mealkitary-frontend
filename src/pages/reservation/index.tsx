import Layout from "@/components/layout";
import Nav from "@/components/nav";
import Link from "next/link";
import shopList from "@/data/shopList.json";
import { useState } from "react";
import Image from "next/image";

interface ShopListProp {
  id: number;
  image: string;
  name: string;
  score: number;
}

export default function Home() {
  const [shopListData, setShopListData] = useState<ShopListProp[]>(shopList);
  return (
    <Layout>
      <Nav backBtn={true}>
        <div className="relative w-[22rem] flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 absolute left-2 text-gray-400 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <form className="w-full">
            <input className="w-full h-6 bg-gray-200 rounded-sm text-sm pl-7 focus:outline-none" placeholder="Search"></input>
          </form>

          <span className="absolute text-sm text-blue-500 right-2">Cancel</span>
        </div>
      </Nav>
      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 bg-white">
        <div className="text-lg font-bold mt-3 mb-2">예약</div>
        <ul className="flex flex-col divide-y ">
          {shopListData.map((shop) => (
            <Link key={shop.id} href={`/shop/${shop.id}`}>
              <li className="py-3">
                <div className="flex">
                  {shop.image ? (
                    <div className="w-12 h-12 relative rounded-lg mr-3">
                      <Image src={shop.image} alt="지점 이미지" layout="fill" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-300 rounded-lg mr-3"></div>
                  )}
                  <div className="flex flex-col ">
                    <div className="text-sm mb-3 font-bold">{shop.name}</div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 cursor-pointer text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs">{shop.score}</span>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
