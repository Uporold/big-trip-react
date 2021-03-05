import React, { useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { typeItemsTransfer, typeItemsActivity, Mode } from "../../const";
import { useDestinations, useOffers } from "../../redux/data/hooks/selectors";
import { formatDate } from "../../utils/time";
import { Offer, OfferWithType, PointInterface } from "../../types";
import { capitalizeFirstLetter } from "../../utils/common";
import Offers from "../offers/offers";
import Destination from "../destination/destination";
import { useMode } from "../../redux/app/hooks/selectors";
import { useSetMode } from "../../redux/app/hooks/useSetMode";
import { useSetActivePointId } from "../../redux/app/hooks/useSetActivePointId";

dayjs.extend(customParseFormat);

interface Props {
  point: PointInterface;
}

const PointEdit: React.FC<Props> = ({ point }) => {
  const allDestinations = useDestinations();
  const allOffers = useOffers();
  const cities = allDestinations.map((destination) => destination.name);
  const [currentType, setType] = useState(point.type);
  const [currentCity, setCity] = useState(point.destination.name);
  const mode = useMode();
  const setMode = useSetMode();
  const setActivePointId = useSetActivePointId();

  const typeOffersNew = allOffers.find(
    (it) => it.type.toLowerCase() === currentType,
  );

  const currentDestination = allDestinations.find(
    (it) => it.name === currentCity,
  );

  const cancelButtonHandler = () => {
    if (mode === Mode.ADDING) {
      setMode(Mode.DEFAULT);
    }
  };

  const closeArrowHandler = () => {
    setMode(Mode.DEFAULT);
    setActivePointId(-1);
  };

  const tempFunc = () => {
    return typeOffersNew !== undefined ? typeOffersNew.offers : [];
  };

  const favoriteCheckboxAndCloseArrow = () => {
    return (
      <>
        <input
          id="event-favorite-1"
          className="event__favorite-checkbox  visually-hidden"
          type="checkbox"
          name="event-favorite"
          checked={point.isFavorite}
        />
        <label className="event__favorite-btn" htmlFor="event-favorite-1">
          <span className="visually-hidden">Add to favorite</span>
          <svg
            className="event__favorite-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
          >
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
          </svg>
        </label>
        <button
          className="event__rollup-btn"
          type="button"
          onClick={closeArrowHandler}
        >
          <span className="visually-hidden">Close event</span>
        </button>
      </>
    );
  };

  const createTypeItem = (type: string) => {
    return (
      <div className="event__type-item">
        <input
          id={`event-type-${type}-1`}
          className="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value={type}
          onClick={() => {
            setType(type);
          }}
          checked={currentType === type}
        />
        <label
          className={`event__type-label  event__type-label--${type}`}
          htmlFor={`event-type-${type}-1`}
        >
          {type}
        </label>
      </div>
    );
  };
  return (
    <form
      className="trip-events__item  event  event--edit"
      action="#"
      method="post"
    >
      <header className="event__header">
        <div className="event__type-wrapper">
          <label
            className="event__type  event__type-btn"
            htmlFor="event-type-toggle-1"
          >
            <span className="visually-hidden">Choose event type</span>
            <img
              className="event__type-icon"
              width="17"
              height="17"
              src={`img/icons/${currentType}.png`}
              alt="Event type icon"
            />
          </label>
          <input
            className="event__type-toggle  visually-hidden"
            id="event-type-toggle-1"
            type="checkbox"
          />

          <div className="event__type-list">
            <fieldset className="event__type-group">
              <legend className="visually-hidden">Transfer</legend>
              {typeItemsTransfer.map((item) => createTypeItem(item))}
            </fieldset>

            <fieldset className="event__type-group">
              <legend className="visually-hidden">Activity</legend>
              {typeItemsActivity.map((item) => createTypeItem(item))}
            </fieldset>
          </div>
        </div>

        <div className="event__field-group  event__field-group--destination">
          <label
            className="event__label  event__type-output"
            htmlFor="event-destination-1"
          >
            {capitalizeFirstLetter(currentType)} to
          </label>
          <input
            className="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value={currentCity}
            list="destination-list-1"
            onChange={(evt) => {
              setCity(evt.target.value);
            }}
          />
          <datalist id="destination-list-1">
            {cities.map((city) => (
              <option value={city} />
            ))}
          </datalist>
        </div>

        <div className="event__field-group  event__field-group--time">
          <label className="visually-hidden" htmlFor="event-start-time-1">
            From
          </label>
          <input
            className="event__input  event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="18/03/19 00:00"
          />
          &mdash;
          <label className="visually-hidden" htmlFor="event-end-time-1">
            To
          </label>
          <input
            className="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="18/03/19 00:00"
          />
        </div>

        <div className="event__field-group  event__field-group--price">
          <label className="event__label" htmlFor="event-price-1">
            <span className="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            className="event__input  event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value=""
          />
        </div>

        <button className="event__save-btn  btn  btn--blue" type="submit">
          Save
        </button>
        <button
          className="event__reset-btn"
          type="reset"
          onClick={cancelButtonHandler}
        >
          {mode === Mode.ADDING ? `Cancel` : `Delete`}
        </button>
        {mode === Mode.EDIT ? favoriteCheckboxAndCloseArrow() : ``}
      </header>
      <section className="event__details">
        {tempFunc().length ? (
          <Offers selectedOffers={point.offers} typeOffers={tempFunc()} />
        ) : (
          ``
        )}
        {currentDestination && <Destination destination={currentDestination} />}
      </section>
    </form>
  );
};

export default PointEdit;
