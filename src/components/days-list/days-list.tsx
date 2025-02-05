import React from "react";
import { useSortedFilteredPoints } from "../../redux/data/hooks/selectors";
import { getNoRepeatingDates } from "../../utils/trail";
import { SortingType, UniqueDate } from "../../types";
import Point from "../point/point";

interface Props {
  currentSortType: SortingType;
}

const DaysList: React.FC<Props> = ({ currentSortType }): JSX.Element => {
  const points = useSortedFilteredPoints();
  const trailDates = getNoRepeatingDates(points);
  const createTripDayItemMarkup = (date?: UniqueDate, index?: number) => {
    const pointsByDay = date
      ? points.filter((point) => point.startDate.getDate() === date.day)
      : points;
    return (
      <li
        className="trip-days__item  day"
        key={
          date ? `${date.month}-${date.day + date.year}-day-list` : `day-list`
        }
      >
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
            <Point key={point.id} point={point} />
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
