import React from "react";
import { Point, UniqueDate } from "../../types";
import { months } from "../../const";

interface Props {
  points: Array<Point>;
}

const FULL_PATH_CITIES_COUNT = 3;

const getTrail = (points: Array<Point>): string => {
  return points.length <= FULL_PATH_CITIES_COUNT
    ? points.map((point) => point.destination.name).join(` — `)
    : `${points[0].destination.name} — ... — ${
        points[points.length - 1].destination.name
      }`;
};

const getNoRepeatingDates = (points: Array<Point>): Array<UniqueDate> => {
  const set: Set<string> = new Set();
  points.forEach((point) =>
    set.add(
      JSON.stringify({
        year: point.startDate.getFullYear(),
        day: point.startDate.getDate(),
        month: months[point.startDate.getMonth()],
      }),
    ),
  );

  return Array.from(set).map((point) => JSON.parse(point));
};

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
