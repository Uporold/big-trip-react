import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Filter, Mode, PagePath } from "../../const";
import history from "../../history";
import { useSetActivePointId } from "../../redux/app/hooks/useSetActivePointId";
import { useSetMode } from "../../redux/app/hooks/useSetMode";
import { useSetFilterType } from "../../redux/app/hooks/useSetFilterType";

const Controls: React.FC = memo(function Controls(): JSX.Element {
  const setActivePointId = useSetActivePointId();
  const setMode = useSetMode();
  const setFilter = useSetFilterType();
  const onStatsLinkClickHandler = () => {
    setActivePointId(-1);
    setMode(Mode.DEFAULT);
    setFilter(Filter.EVERYTHING);
  };
  return (
    <nav className="trip-controls__trip-tabs  trip-tabs">
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
      <Link
        className={`trip-tabs__btn  ${
          history.location.pathname === PagePath.STATS
            ? `trip-tabs__btn--active`
            : ``
        }`}
        to={PagePath.STATS}
        id="stats"
        onClick={onStatsLinkClickHandler}
      >
        Stats
      </Link>
    </nav>
  );
});

export default Controls;
