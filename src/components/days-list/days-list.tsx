import React from "react";
import { usePoints } from "../../redux/data/hooks/selectors";
import { getNoRepeatingDates } from "../trail/trail";
import { SortType, UniqueDate } from "../../types";
import Point from "../point/point";

interface Props {
  currentSortType: SortType;
}

const DaysList: React.FC<Props> = ({ currentSortType }): JSX.Element => {
  const points = usePoints();
  const trailDates = getNoRepeatingDates(points);

  const createTripDayItemMarkup = (date?: UniqueDate, index?: number) => {
    const pointsByDay = date
      ? points.filter((point) => point.startDate.getDate() === date.day)
      : points;
    return (
      <li className="trip-days__item  day">
        <div className="day__info">
          <span className="day__counter">
            {index !== undefined ? `${index + 1}` : ``}
          </span>
          <time className="day__date">
            {date ? `${date.month} ${date.day}` : ``}
          </time>
        </div>
        <ul className="trip-events__list">
          {pointsByDay.map((point) => (
            <Point point={point} />
          ))}
        </ul>
      </li>
    );
  };

  return (
    <>
      {currentSortType === `event`
        ? trailDates.map((date, index) => createTripDayItemMarkup(date, index))
        : createTripDayItemMarkup()}
    </>
  );
};

export default DaysList;
