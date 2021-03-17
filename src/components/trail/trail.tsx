import React, { memo } from "react";

interface Props {
  trail: string;
  daysInterval: string;
}

const Trail: React.FC<Props> = memo(function Trail({
  trail,
  daysInterval,
}): JSX.Element {
  return (
    <div className="trip-info__main">
      <h1 className="trip-info__title">{trail}</h1>
      <p className="trip-info__dates">{daysInterval}</p>
    </div>
  );
});

export default Trail;
