import React, { memo } from "react";
import { filters, PagePath } from "../../const";
import { FilterType } from "../../types";
import { useSetFilterType } from "../../redux/app/hooks/useSetFilterType";
import { useCurrentFilterType } from "../../redux/app/hooks/selectors";
import history from "../../history";

const disabledStyle = {
  pointerEvents: `none`,
  cursor: `default`,
} as React.CSSProperties;

const Filter: React.FC = memo(function Filter(): JSX.Element {
  const setFilter = useSetFilterType();
  const currentFilter = useCurrentFilterType();
  const setFilterHandler = (filter: FilterType) => (evt: React.MouseEvent) => {
    evt.preventDefault();
    setFilter(filter);
  };
  return (
    <form className="trip-filters" action="#" method="get">
      {filters.map((filter) => (
        <div className="trip-filters__filter" key={filter}>
          <input
            id={`filter-${filter}`}
            className="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value={filter}
            checked={currentFilter === filter}
            readOnly
          />
          <label
            id={filter}
            className="trip-filters__filter-label"
            htmlFor={`filter-${filter}`}
            onClick={setFilterHandler(filter)}
            style={
              history.location.pathname !== PagePath.MAIN ? disabledStyle : {}
            }
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
});

export default Filter;
