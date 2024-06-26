import { useFetchReservation } from '@/apis/reservation';
import { HeaderBar, TabBar } from '@/components';
import Layout from '@/components/layout';
import shopList from '@/data/shopList.json';
import { messageState } from '@/libs/recoilState';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface SuccessPageProps {
  payment: Payment;
}
interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: '카드' | '가상계좌' | '계좌이체';
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { paymentKey, orderId, amount },
  } = context;
  try {
    const { data: payment } = await axios.post<Payment>(
      `${API_URL}/reservations/${orderId}/pay`,
      {
        paymentKey,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.TOSS_PAYMENTS_SECRET_KEY}:`,
          ).toString('base64')}`,
        },
      },
    );
    return {
      props: { payment },
    };
  } catch (err: any) {
    console.error('err', err);
    return {
      redirect: {
        destination: `/fail?code=${err.code}&message=${err.message}`,
        permanent: false,
      },
    };
  }
};

const SuccessPage = ({ payment }: SuccessPageProps) => {
  const router = useRouter();
  const uuid = String(router.query.orderId);

  const message = useRecoilValue(messageState);
  const { reservationData } = useFetchReservation({ uuid });

  return (
    <Layout>
      <HeaderBar backBtn={true}>
        <div className="text-white">
          {message ? '예약 확인서' : '예약 대기'}
        </div>
      </HeaderBar>

      <div className="flex flex-col px-6 pb-20 mt-16 bg-white border-t-2 shadow-md">
        <div className="flex justify-center mt-3 mb-2 text-2xl font-bold">
          {message ? message.title : '예약 대기중...'}
        </div>
        <div className="mt-3 mb-2 text-lg font-bold">예약 한 메뉴</div>
        <ul className="flex flex-col ">
          {reservationData?.reservedProduct.map((menu, index) => (
            <li
              key={menu.productId}
              className="py-4 border-b">
              <div className="flex">
                <div>
                  {/* {menu.image ? (
                    <div className="relative w-16 h-16 mr-3 overflow-hidden border border-gray-300 rounded-lg">
                      <Image src={menu.image} alt="메뉴 이미지" layout="fill" />
                    </div>
                  ) : ( */}
                  <div className="flex items-center justify-center w-16 h-16 mr-3 bg-gray-300 rounded-lg">
                    <span className="text-xs text-white">이미지 없음</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between w-full">
                  <div className="flex items-center">
                    <div className="mr-2 text-sm font-bold">{menu?.name}</div>
                    <div className="text-xs text-gray-500">
                      가격: {menu?.price.toLocaleString()}원
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">제품 설명</div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {(menu?.count * menu?.price).toLocaleString()}원
                    </div>
                    <div className="text-sm">x{menu?.count}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col mt-3 bg-white border-b">
          <div className="text-lg font-bold ">픽업 매장</div>
          <div className="flex py-4 ">
            <div className="relative w-16 h-16 mr-3 overflow-hidden border border-gray-300 rounded-lg">
              <div>
                {shopList[0].image ? (
                  <div className="relative w-16 h-16 mr-3 overflow-hidden border border-gray-300 rounded-lg">
                    <Image
                      src={shopList[0].image}
                      alt="지점 이미지"
                      layout="fill"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 mr-3 bg-gray-300 rounded-lg"></div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="text-sm">{reservationData?.shopName}</div>
              <div className="text-xs">주소</div>
              <div className="text-xs text-blue-600">지도로 보기</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-3 bg-white">
          <div className="text-lg font-bold ">픽업 정보</div>
          <div className="flex justify-between py-2 border-b">
            <div className="text-base">픽업 날짜</div>
            <div className="text-base text-gray-500">
              {reservationData?.reserveAt.slice(0, 10)}
            </div>
          </div>
          <div className="flex justify-between py-2 mb-2 border-b">
            <div className="text-base">픽업 시간</div>
            <div className="text-base text-gray-500">
              {reservationData?.reserveAt.slice(11, 16)}
            </div>
          </div>

          <div className="flex justify-around py-4">
            <div className="box-content flex flex-col items-center justify-center w-20 h-16 text-xs bg-gray-300 rounded-md cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clip-rule="evenodd"
                />
              </svg>
              <span> 매장 문의</span>
            </div>
            <div className="box-content flex flex-col items-center justify-center w-20 h-16 text-xs bg-gray-300 rounded-md cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6">
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
            <div className="box-content flex flex-col items-center justify-center w-20 h-16 text-xs bg-gray-300 rounded-md cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>주소 복사</span>
            </div>
            <div className="box-content flex flex-col items-center justify-center w-20 h-16 text-xs bg-gray-300 rounded-md cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6">
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
      </div>
      <TabBar
        text="홈"
        onClick={() => router.push('/')}
      />
    </Layout>
  );
};

export default SuccessPage;
