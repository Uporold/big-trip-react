import React, { memo } from "react";
import { usePoints } from "../../redux/data/hooks/selectors";
import Trail from "../trail/trail";
import Controls from "../controls";
import Filter from "../filter/filter";
import TotalPrice from "../total-price";
import NewEventButton from "../new-event-button/new-event-button";

const Header: React.FC = memo(function Header(): JSX.Element {
  const points = usePoints()
    .slice()
    .sort((a, b) => a.startDate.valueOf() - b.startDate.valueOf());
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
          <section className="trip-main__trip-info  trip-info">
            <Trail points={points} />
            <TotalPrice points={points} />
          </section>
          <div className="trip-main__trip-controls  trip-controls">
            <h2 className="visually-hidden">Switch trip view</h2>
            <Controls />
            <h2 className="visually-hidden">Filter events</h2>
            <Filter />
          </div>

          <NewEventButton />
        </div>
      </div>
    </header>
  );
});

export default Header;
