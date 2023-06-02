import Header from "@/components/header";
import Layout from "@/components/layout";
import Nav from "@/components/nav";
import RerservationTime from "@/components/reservationTime";
import TabBar from "@/components/tabBar";
import { totalCountState, totalPriceState } from "@/lib/recoilState";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export default function ReservationDate() {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
  const [totalCount, setTotalCount] = useRecoilState(totalCountState);

  return (
    <Layout>
      <Nav>
        <div className="relative w-full flex flex-row items-center">
          <Header title="픽업 시간 설정" />
        </div>
      </Nav>

      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 bg-white">
        <h3 className="text-lg font-bold mt-3 mb-2">예약 날짜</h3>
        <div>달력</div>
      </div>
      <div className="flex flex-col mt-16 border-t-2 shadow-md px-6 py-3 bg-white">
        <h3 className="text-lg font-bold mt-3 mb-2">예약 시간</h3>
        <div className="grid grid-cols-4 gap-2">
          <RerservationTime time="00:00" />
          <RerservationTime time="01:00" />
          <RerservationTime time="02:00" />
          <RerservationTime time="03:00" />
          <RerservationTime time="04:00" />
          <RerservationTime time="05:00" />
          <RerservationTime time="06:00" />
          <RerservationTime time="07:00" />
          <RerservationTime time="08:00" />
          <RerservationTime time="09:00" />
          <RerservationTime time="10:00" />
          <RerservationTime time="11:00" />
          <RerservationTime time="12:00" />
          <RerservationTime time="13:00" />
          <RerservationTime time="14:00" />
          <RerservationTime time="15:00" />
          <RerservationTime time="16:00" />
          <RerservationTime time="17:00" />
          <RerservationTime time="18:00" />
          <RerservationTime time="19:00" />
          <RerservationTime time="20:00" />
          <RerservationTime time="21:00" />
          <RerservationTime time="22:00" />
          <RerservationTime time="23:00" />
        </div>
      </div>
      <TabBar
        contain={true}
        count={totalCount}
        price={totalPrice}
        text="결제하기"
        onCLick={() => router.push("/payment")}
      />
    </Layout>
  );
}
