import { MessageType } from '@/components/Message';
import { atom } from 'recoil';

export interface ReserveProps {
  productId: number;
  name: string;
  price: number;
  count: number;
  image?: string;
}

export const totalPriceState = atom({
  key: 'totalPriceState',
  default: 0,
});

export const totalCountState = atom({
  key: 'totalCountState',
  default: 0,
});

export const reserveInfoState = atom<ReserveProps[]>({
  key: 'reserveInfoState',
  default: [],
});

export const pickupDateState = atom<Date | null>({
  key: 'pickupDateState',
  default: null,
});

export const pickupTimeState = atom<Date>({
  key: 'pickupTimeState',
  default: undefined,
});

export const messageState = atom<MessageType>({
  key: 'messageState',
  default: undefined,
});
