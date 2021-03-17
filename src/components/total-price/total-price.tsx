import React, { memo } from "react";

interface Props {
  totalPrice: number;
}

const TotalPrice: React.FC<Props> = memo(function TotalPrice({
  totalPrice,
}): JSX.Element {
  return (
    <p className="trip-info__cost">
      Total: &euro;&nbsp;
      <span className="trip-info__cost-value">{totalPrice}</span>
    </p>
  );
});

export default TotalPrice;
