import Header from "@/components/header";
import Layout from "@/components/layout";
import Nav from "@/components/nav";
import TabBar from "@/components/tabBar";
import { reserveInfoState, totalPriceState } from "@/lib/recoilState";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export default function Pocket() {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [reserveInfo, setReserveInfo] = useRecoilState(reserveInfoState);
  console.log(reserveInfo);
  return (
    <Layout>
      <Nav>
        <Header title="장바구니" />
      </Nav>
      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 bg-white">
        <div className="text-lg font-bold mt-3 mb-2">예약 한 메뉴</div>
        <ul className="flex flex-col divide-y">
          {reserveInfo?.map((menu, index) => (
            <Link key={index} href={`/products/${menu?.id}`}>
              <li className="py-4">
                <div className="flex">
                  {menu.image ? (
                    <div className="w-16 h-16 rounded-lg  mr-3 relative overflow-hidden">
                      <Image src={menu.image} alt="메뉴 이미지" layout="fill" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-lg mr-3"></div>
                  )}
                  <div className="flex flex-col justify-between w-full">
                    <div className="text-sm font-bold">{menu?.name}</div>
                    <div className="text-xs text-gray-500">제품 설명</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">{menu?.price.toLocaleString()}원</div> <div className="text-sm">x{menu?.count}</div>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 bg-white"></div>
      <div className="flex flex-col mt-2 mb-16 border-t-2 shadow-md px-6 pt-2 pb-6 bg-white">
        <div className="flex justify-between mx-2 py-2 border-b">
          <span>총 결제 금액</span>
          <span>{totalPrice?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mx-2 py-2 border-b">
          <span>결제 수단</span>
          <span className="text-blue-700">⬇</span>
        </div>
      </div>
      <TabBar text="예약하기" onClick={() => router.push("/reservationDate")} />
    </Layout>
  );
}
