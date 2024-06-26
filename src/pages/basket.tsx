import { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useAsync } from 'react-use';
import { useFetchReservationTime } from '@/apis/reservation';
import { HeaderBar, Spinner, TabBar } from '@/components';
import DatePickerComponent from '@/components/DatePickerComponent';
import Layout from '@/components/layout';
import addMenuData from '@/data/addMenu.json';
import { reserveInfoState, totalPriceState } from '@/libs/recoilState';
import { cls } from '@/libs/utils';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { List, ListItemButton } from '@mui/material';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Basket = () => {
  let uuid = '';
  const router = useRouter();
  const shopId = Number(router.query.shopId);

  const totalPrice = useRecoilValue(totalPriceState);
  const reserveInfo = useRecoilValue(reserveInfoState);

  const [pickup, setPickup] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [price, setPrice] = useState(totalPrice);
  const [addMenu, setAddMenu] = useState(addMenuData);
  const [isLoading, setIsLoading] = useState(false);

  const { reservationTimeData } = useFetchReservationTime({
    shopId,
  });

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);

  useAsync(async () => {
    const paymentWidget = await loadPaymentWidget(
      clientKey as string,
      '@@ANONYMOUS',
    );

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      price,
    );

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON,
    );
  }, [price]);

  const rotationPickup = pickup ? '180deg' : '0deg';
  const rotationPayment = isPayment ? '180deg' : '0deg';

  const pickupSvgStyle = {
    transform: `rotate(${rotationPickup})`,
    transition: 'transform 0.5s',
  };

  const paymentSvgStyle = {
    transform: `rotate(${rotationPayment})`,
    transition: 'transform 0.5s',
  };

  const createReserve = async () => {
    try {
      setIsLoading(true);
      const products = reserveInfo.map((product) => {
        const { image, ...rest } = product;
        return rest;
      });
      const requestData = {
        shopId,
        products,
        reservedAt: '2023-09-28T18:30',
      };
      const response = await axios.post(`${API_URL}/reservations`, requestData);
      if (response.status === 201) {
        uuid = response.headers['location'].slice(37);
        await paymentHandler();
      }
    } catch (error) {
      console.error('createReserve', error);
    }
    setIsLoading(false);
  };

  const paymentHandler = async () => {
    const serializedReserveInfo = encodeURIComponent(
      JSON.stringify(reserveInfo),
    );
    const paymentWidget = paymentWidgetRef.current;
    try {
      await paymentWidget?.requestPayment({
        orderId: uuid,
        orderName:
          reserveInfo.length === 1
            ? reserveInfo[0].name
            : `${reserveInfo[0].name} 외 ${reserveInfo.length - 1}건`,
        customerName: '김영준', // @TODO: 로그인 유저 이름으로 변경
        customerEmail: 'dudwns99@gmail.com',
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <HeaderBar backBtn={true}>
        <div className="text-white">장바구니</div>
      </HeaderBar>
      <div className="flex flex-col px-6 pb-12 mt-16 bg-white border-t-2 shadow-md">
        <div className="mt-4 mb-2 text-lg font-bold">예약 한 메뉴</div>
        <List className="flex flex-col ">
          {reserveInfo?.map((menu, index) => (
            <div
              key={index}
              className="border-b">
              <li className="py-4">
                <div className="flex">
                  <div>
                    {menu.image ? (
                      <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-lg">
                        <Image
                          src={menu.image}
                          alt="메뉴 이미지"
                          layout="fill"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-16 h-16 mr-3 bg-gray-300 rounded-lg">
                        <span className="text-xs text-white">이미지 없음</span>
                      </div>
                    )}
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
            </div>
          ))}
        </List>

        <ListItemButton
          className="flex flex-col items-center mt-4 mb-10 text-center "
          onClick={() => router.back()}>
          <BottomNavigationAction
            className="text-blue-600 pointer-events-none animate-bounce"
            label="더 담으러 가기"
            icon={<ArrowCircleDownIcon />}
          />
          <div>더 담으러가기</div>
        </ListItemButton>

        <Spinner
          size={50}
          color={'#2F56E1'}
          loading={isLoading}
        />

        <div className="mt-2 bg-white border-t border-b border-b-gray-200">
          <div className="mt-4 mb-2 text-lg font-bold">추가 옵션 선택</div>
          <ul className="divide-y">
            {addMenu?.options.map((data, index) => (
              <li key={index}>
                <div className="relative flex w-full">
                  <label
                    className="w-full py-4"
                    htmlFor={String(data?.id)}>
                    <input
                      className="mr-4 text-blue-600 focus:ring-0"
                      type="checkbox"
                    />
                    {data?.option}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between py-6 border-b">
          <div className="text-lg font-bold">총 결제금액</div>
          <div className="text-lg font-bold">
            {totalPrice.toLocaleString()}원
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between py-6">
            <div className="text-lg font-bold">픽업 날짜</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-600 cursor-pointer"
              onClick={() => {
                setPickup((prev) => !prev);
              }}
              style={pickupSvgStyle}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div
            className={cls(
              'transition-all duration-500',
              pickup ? 'opacity-100 h-250' : 'opacity-0 h-0 duration-0',
            )}>
            <DatePickerComponent />
          </div>
        </div>

        <div>
          <div className={cls('flex justify-between  py-6  border-y ')}>
            <div className="text-lg font-bold">결제 선택</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-blue-600 cursor-pointer"
              onClick={() => setIsPayment((prev) => !prev)}
              style={paymentSvgStyle}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>

          <div
            className={cls(
              'flex flex-col mb-5  transition-all duration-500',
              isPayment ? 'opacity-100 h-250 ' : 'opacity-0 h-0 duration-0',
            )}>
            <div id="payment-widget" />
          </div>
        </div>
      </div>

      <TabBar
        text="결제하기"
        onClick={createReserve}
        disable={isLoading}
      />
    </Layout>
  );
};

export default Basket;
