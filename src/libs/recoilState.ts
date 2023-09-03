import { atom } from 'recoil';

export interface ReserveProp {
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

export const reserveInfoState = atom<ReserveProp[]>({
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
