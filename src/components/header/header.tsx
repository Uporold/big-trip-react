import React from "react";
import { usePoints } from "../../redux/data/hooks/selectors";
import { months } from "../../const";
import { Point, UniqueDate } from "../../types";

const FULL_PATH_CITIES_COUNT = 3;

export const getTrail = (points: Array<Point>): string => {
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

const Header: React.FC = (): JSX.Element => {
  const points = usePoints().sort(
    (a, b) => a.startDate.valueOf() - b.startDate.valueOf(),
  );
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
    <header className="page-header">
      <div className="page-body__container  page-header__container">
        <img
          className="page-header__logo"
          src="img/logo.png"
          width="42"
          height="42"
          alt="Trip logo"
        />

        <div className="trip-main">
          {/* Trail component */}
          <div className="trip-info__main">
            <h1 className="trip-info__title">{trail}</h1>
            <p className="trip-info__dates">{daysInterval}</p>
          </div>
          <div className="trip-main__trip-controls  trip-controls">
            <h2 className="visually-hidden">Switch trip view</h2>
            {/* Menu component */}
            <h2 className="visually-hidden">Filter events</h2>
            {/* Filter component */}
          </div>

          <button
            className="trip-main__event-add-btn  btn  btn--big  btn--yellow"
            type="button"
          >
            New event
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
