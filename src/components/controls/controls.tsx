import React from "react";
import { Link } from "react-router-dom";
import { Filter, Mode, PagePath } from "../../const";
import history from "../../history";
import { useSetActivePointId } from "../../redux/app/hooks/useSetActivePointId";
import { useSetMode } from "../../redux/app/hooks/useSetMode";
import { useSetFilterType } from "../../redux/app/hooks/useSetFilterType";

const Controls: React.FC = (): JSX.Element => {
  const setActivePointId = useSetActivePointId();
  const setMode = useSetMode();
  const setFilter = useSetFilterType();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <nav className="trip-controls__trip-tabs  trip-tabs">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        className={`trip-tabs__btn  ${
          history.location.pathname === PagePath.MAIN
            ? `trip-tabs__btn--active`
            : ``
        }`}
        to={PagePath.MAIN}
        id="table"
      >
        Table
      </Link>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link
        className={`trip-tabs__btn  ${
          history.location.pathname === PagePath.STATS
            ? `trip-tabs__btn--active`
            : ``
        }`}
        to={PagePath.STATS}
        id="stats"
        onClick={() => {
          setActivePointId(-1);
          setMode(Mode.DEFAULT);
          setFilter(Filter.EVERYTHING);
        }}
      >
        Stats
      </Link>
    </nav>
  );
};

export default Controls;
