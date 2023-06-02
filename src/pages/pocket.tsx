import Header from "@/components/header";
import Layout from "@/components/layout";
import Nav from "@/components/nav";
import TabBar from "@/components/tabBar";
import { reservationMenuName, totalPriceState } from "@/lib/recoilState";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { MenuItem } from "./order";
import Shop from "./shop/[id]";

interface shop {
  id: number;
  title: string;
  images: string[] | null;
  description: string;
  menus: MenuItem[];
}

export default function Pocket({
  id,
  name,
  image,
  price,
  description,
}: MenuItem) {
  const router = useRouter();

  const [menuName, setMenuName] = useRecoilState(reservationMenuName);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  return (
    <Layout>
      <Nav>
        <Header title="장바구니" />
      </Nav>
      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 bg-white">
        <h3>예약한 메뉴</h3>
        <ul>
          {[1, 1].map((data, index) => (
            <li key={index}>
              <div>{name}</div>
              <div>{image}</div>
              <div>{price}</div>
            </li>
          ))}
        </ul>
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
          <span className="text-blue-700">⬇</span>
        </div>
      </div>
      <TabBar text="예약하기" onClick={() => router.push("/reservationDate")} />
    </Layout>
  );
}
