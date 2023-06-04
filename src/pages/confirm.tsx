import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Nav from "@/components/nav";
import Header from "@/components/header";
import TabBar from "@/components/tabBar";

export default function Confirm() {
  const router = useRouter();

  return (
    <Layout>
      <Nav>
        <div className="relative w-full flex flex-row items-center">
          <Header title="예약 확인서" />
        </div>
      </Nav>

      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 bg-white">
        {/* {<div/> } 예약된 메뉴 */}예약된 메뉴들
      </div>

      <div className="flex flex-col mt-3 border-t-2 shadow-md px-6 bg-white">
        <div className="mt-4">
          <h3 className="font-bold text-lg">픽업 매장</h3>
        </div>
        <div className="flex my-2 border-b py-2">
          <div className="w-12 h-12 bg-gray-400 rounded-md mr-2" />
          <div className="flex flex-col">
            <span className="text-sm">지점 이름</span>
            <span className="text-xs">주소</span>
            <span className="text-xs">지도로 보기</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3 mb-10 py-5 border-t-2 shadow-md px-6 bg-white">
        <h3 className="font-bold text-lg">예약 시간</h3>
        <div className="flex justify-between">
          <span>예약 날짜</span>
          <span>2023.06.25</span>
        </div>
        <div className="flex justify-between">
          <span>예약 시간</span>
          <span>15:00</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="w-10 h-10 bg-gray-400 rounded-md" />
          <div className="w-10 h-10 bg-gray-400 rounded-md" />
          <div className="w-10 h-10 bg-gray-400 rounded-md" />
          <div className="w-10 h-10 bg-gray-400 rounded-md" />
        </div>
      </div>
      <TabBar text="홈" onCick={() => router.push("/reservation")} />
    </Layout>
  );
}
