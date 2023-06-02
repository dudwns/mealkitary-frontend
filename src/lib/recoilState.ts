import { atom } from "recoil";

export const totalPriceState = atom({
  key: "totalPriceState",
  default: 0,
});

export const totalCountState = atom({
  key: "totalCountState",
  default: 0,
});

export const reservationMenuName = atom({
  key: "reservationMenuName",
  default: "",
});
export const reservationDescription = atom({
  key: "reservationDescription",
  default: "",
});
export const reservationPrice = atom({
  key: "reservationMenuName",
  default: "",
});

// export const reservation = atom({
//   {
//     key: "reservationMenuName",
//     default: "",
//   },
//   {
//     key: "reservationDescription",
//     default: "",
//   },
//   {
//     key: "reservationPrice",
//     default: "",
//   },
// });
