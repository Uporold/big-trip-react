import React from "react";

const Header = () => {
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