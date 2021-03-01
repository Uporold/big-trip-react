import React from "react";

const Controls: React.FC = (): JSX.Element => {
  return (
    <nav className="trip-controls__trip-tabs  trip-tabs">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="trip-tabs__btn  trip-tabs__btn--active" href="#" id="table">
        Table
      </a>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="trip-tabs__btn" href="#" id="stats">
        Stats
      </a>
    </nav>
  );
};

export default Controls;
