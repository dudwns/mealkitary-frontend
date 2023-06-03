import Layout from "@/components/layout";
import Nav from "@/components/nav";
import TabBar from "@/components/tabBar";
import { reservationMenuName, totalPriceState } from "@/lib/recoilState";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import Shop from "./shop/[id]";

export default function Pocket() {
  const router = useRouter();

  const [menuName, setMenuName] = useRecoilState(reservationMenuName);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  return (
    <Layout>
      <Nav backBtn={true}>
        <div>장바구니</div>
      </Nav>
      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 bg-white">
        <h3 className="font-bold text-lg mt-3">예약한 메뉴</h3>
        {[1, 1, 1].map((i) => (
          <div key={i} className="flex border-b">
            <div className="w-12 h-12 bg-gray-400 rounded-md mr-2 my-5 " />
            <div className="flex flex-col py-4">
              <span className="text-sm">메뉴 이름</span>
              <span className="text-xs">설명</span>
              <span className="text-xs">가격 : 13000</span>
            </div>
          </div>
        ))}
        <h3
          className="text-center cursor-pointer py-4"
          onClick={() => router.back()}
        >
          + 더 담으러 가기
        </h3>
      </div>
      <div className="flex flex-col mt-2 mb-16 border-t-2 shadow-md px-6 pt-2 pb-6 bg-white">
        <div className="flex justify-between mx-2 py-2 border-b">
          <span>총 결제 금액</span>
          <span>{totalPrice?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mx-2 py-2 border-b">
          <span>결제 수단</span>
          <span className="text-blue-700 cursor-pointer">⬇</span>
        </div>
        <div className="flex justify-between mx-2 py-2 border-b">
          <span>예약 하기</span>
          <span className="text-blue-700 cursor-pointer">⬇</span>
        </div>
      </div>
      <TabBar text="결제하기" onClick={() => router.push("/payment")} />
    </Layout>
  );
}
