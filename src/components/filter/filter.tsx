import React, { useState } from "react";
import { filters } from "../../const";
import { FilterType } from "../../types";

const Filter: React.FC = (): JSX.Element => {
  const [currentFilter, setFilter] = useState<FilterType>(`everything`);
  const setFilterHandler = (filter: FilterType) => (evt: React.MouseEvent) => {
    evt.preventDefault();
    setFilter(filter);
  };
  return (
    <form className="trip-filters" action="#" method="get">
      {filters.map((filter) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className="trip-filters__filter"
          onClick={setFilterHandler(filter)}
        >
          <input
            id={`filter-${filter}`}
            className="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value={filter}
            checked={currentFilter === filter}
          />
          <label
            id={filter}
            className="trip-filters__filter-label"
            htmlFor={`filter-${filter}`}
          >
            {filter}
          </label>
        </div>
      ))}
      <button className="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>
  );
};

export default Filter;
