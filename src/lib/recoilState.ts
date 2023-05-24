import { atom } from "recoil";

export const totalPriceState = atom({
  key: "totalPriceState",
  default: 0,
});

export const totalCountState = atom({
  key: "totalCountState",
  default: 0,
});
