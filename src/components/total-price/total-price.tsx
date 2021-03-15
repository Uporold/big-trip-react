import React, { useMemo } from "react";
import { PointInterface } from "../../types";

interface Props {
  points: Array<PointInterface>;
}

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
