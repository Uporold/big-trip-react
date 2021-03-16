import React from "react";
import { SortingType } from "../../types";
import { SortType, sortTypes } from "../../const";

interface Props {
  setSortTypeHandler: (
    sortType: SortingType,
  ) => (evt: React.MouseEvent) => void;
  currentSortType: SortingType;
}

const Sorting: React.FC<Props> = ({
  setSortTypeHandler,
  currentSortType,
}): JSX.Element => {
  const checkbox = (sortType: SortingType) => {
    return (
      <div
        className={`trip-sort__item  trip-sort__item--${sortType}`}
        key={sortType}
      >
        <input
          id="sort-time"
          className="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value={`sort-${sortType}`}
          checked={sortType === currentSortType}
          readOnly
        />
        <label
          data-sort-type="time"
          className="trip-sort__btn"
          htmlFor={`sort-${sortType}`}
          onClick={setSortTypeHandler(sortType)}
        >
          {sortType}
          <svg
            className="trip-sort__direction-icon"
            width="8"
            height="10"
            viewBox="0 0 8 10"
          >
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z" />
          </svg>
        </label>
      </div>
    );
  };
  return (
    <form className="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span className="trip-sort__item  trip-sort__item--day">
        {currentSortType === SortType.EVENT ? `Day` : ``}
      </span>
      {sortTypes.map((sortType) => checkbox(sortType))}
      <span className="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  );
};

export default Sorting;
