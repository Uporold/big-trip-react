import React, { useMemo } from "react";
import { Point } from "../types";

interface Props {
  points: Array<Point>;
}

export const getTotalPrice = (array: Array<Point>): number => {
  let sum = 0;
  array.forEach((point) => {
    sum += point.basePrice;
    point.offers.forEach((offer) => {
      sum += offer.price;
    });
  });
  return sum;
};

const TotalPrice: React.FC<Props> = ({ points }): JSX.Element => {
  const totalPrice = useMemo(() => getTotalPrice(points), [points]);
  return (
    <p className="trip-info__cost">
      Total: &euro;&nbsp;
      <span className="trip-info__cost-value">{totalPrice}</span>
    </p>
  );
};

export default TotalPrice;
