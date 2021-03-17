import { PointInterface } from "../types";

export const getTotalPrice = (array: Array<PointInterface>): number => {
  let sum = 0;
  array.forEach((point) => {
    sum += point.basePrice;
    point.offers.forEach((offer) => {
      sum += offer.price;
    });
  });
  return sum;
};
