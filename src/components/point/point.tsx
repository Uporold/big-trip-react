import React from "react";
import { capitalizeFirstLetter } from "../../utils/common";
import { PointInterface } from "../../types";
import { OFFERS_PREVIEW_LIMIT, typeItemsActivity } from "../../const";
import { formatTimeDiff, formatDate } from "../../utils/time";

interface Props {
  point: PointInterface;
}

const Point: React.FC<Props> = ({ point }) => {
  const {
    type,
    destination: { name },
    startDate,
    endDate,
    basePrice,
    offers,
  } = point;
  const isTypeActivity = typeItemsActivity.some(
    (it) => type === it.toLowerCase(),
  )
    ? `in`
    : `to`;
  const startTime = formatDate(startDate);
  const endTime = formatDate(endDate);
  return (
    <li className="trip-events__item">
      <div className="event">
        <div className="event__type">
          <img
            className="event__type-icon"
            width="42"
            height="42"
            src={`img/icons/${type}.png`}
            alt="Event type icon"
          />
        </div>
        <h3 className="event__title">
          {capitalizeFirstLetter(type)} {isTypeActivity} {name}
        </h3>

        <div className="event__schedule">
          <p className="event__time">
            <time className="event__start-time" dateTime="2019-03-18T11:00">
              {startTime}
            </time>
            {` — `}
            <time className="event__end-time" dateTime="2019-03-18T11:00">
              {endTime}
            </time>
          </p>
          <p className="event__duration">
            {formatTimeDiff(endDate, startDate)}
          </p>
        </div>

        <p className="event__price">
          &euro;&nbsp;<span className="event__price-value">{basePrice}</span>
        </p>

        <h4 className="visually-hidden">Offers:</h4>
        <ul className="event__selected-offers">
          {offers.slice(0, OFFERS_PREVIEW_LIMIT).map((offer) => (
            <li className="event__offer">
              <span className="event__offer-title">{offer.title}</span>
              {` `} + &euro;
              <span className="event__offer-price">{offer.price}</span>
            </li>
          ))}
        </ul>
        <button className="event__rollup-btn" type="button">
          <span className="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  );
};

export default Point;