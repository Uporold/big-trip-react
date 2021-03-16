import React from "react";
import { PointInterface } from "../../types";
import { getTrail, getNoRepeatingDates } from "../../utils/trail";

interface Props {
  points: Array<PointInterface>;
}

const Trail: React.FC<Props> = ({ points }): JSX.Element => {
  const trail = getTrail(points);
  const trailDates = getNoRepeatingDates(points);
  const daysInterval = `${
    trailDates.length
      ? `${trailDates[0].month} ${trailDates[0].day} — ${
          trailDates[0].month !== trailDates[trailDates.length - 1].month
            ? trailDates[trailDates.length - 1].month
            : ``
        } ${trailDates[trailDates.length - 1].day}`
      : ``
  }`;
  return (
    <div className="trip-info__main">
      <h1 className="trip-info__title">{trail}</h1>
      <p className="trip-info__dates">{daysInterval}</p>
    </div>
  );
};

export default Trail;
