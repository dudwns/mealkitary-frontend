import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Nav from "@/components/nav";

import TabBar from "@/components/tabBar";

export default function Confirm() {
  const router = useRouter();

  return (
    <Layout>
      <Nav backBtn={true}>
        <div>예약 확인서</div>
      </Nav>

      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 bg-white">
        {/* {<div/> } 예약된 메뉴 */}
        <h3 className="font-bold text-lg mt-3">예약된 메뉴</h3>
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
      </div>

      <div className="flex flex-col mt-3 border-t-2 shadow-md px-6 bg-white">
        <h3 className="font-bold text-lg mt-3">픽업 매장</h3>
        <div className="flex my-2 border-b py-2">
          <div className="w-12 h-12 bg-gray-400 rounded-md mr-2" />
          <div className="flex flex-col">
            <span className="text-sm">지점 이름</span>
            <span className="text-xs cursor-pointer">주소</span>
            <span className="text-xs cursor-pointer">지도로 보기</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3 border-t-2 shadow-md px-6 bg-white mb-4">
        <h3 className="font-bold text-lg mt-3">예약 시간</h3>
        <div className="flex justify-between border-b py-2">
          <span className="text-md">예약 날짜</span>
          <span className="text-md text-gray-400">2023.06.25</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span className="text-md">예약 시간</span>
          <span className="text-md text-gray-400">15:00</span>
        </div>
        <div className="flex justify-around py-4 space-x-2">
          <div className="bg-slate-400 p-5 rounded-md text-xs flex flex-col items-center w-15 h-10 box-content cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clip-rule="evenodd"
              />
            </svg>
            <span> 매장 문의</span>
          </div>
          <div className="bg-slate-400 p-5 rounded-md text-xs flex flex-col items-center w-15 h-10 box-content cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
            <span>지도 보기</span>
          </div>
          <div className="bg-slate-400 p-5 rounded-md text-xs flex flex-col items-center w-15 h-10 box-content cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
                clip-rule="evenodd"
              />
            </svg>
            <span>주소 복사</span>
          </div>
          <div className="bg-slate-400 p-5 rounded-md text-xs flex flex-col items-center w-15.5 h-10 box-content cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.694 12.694 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z"
                clip-rule="evenodd"
              />
            </svg>
            <span>길찾기</span>
          </div>
        </div>
      </div>
      <TabBar text="홈" onCick={() => router.push("/reservation")} />
    </Layout>
  );
}
