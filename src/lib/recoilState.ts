import { atom } from "recoil";

interface ReserveProp {
  id: number;
  name: string;
  price: number;
  count: number;
  image: string;
}

export const totalPriceState = atom({
  key: "totalPriceState",
  default: 0,
});

export const totalCountState = atom({
  key: "totalCountState",
  default: 0,
});

export const reserveInfoState = atom<ReserveProp[]>({
  key: "reserveInfoState",
  default: [],
});
