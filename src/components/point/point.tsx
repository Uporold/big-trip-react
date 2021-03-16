import React, { memo } from "react";
import { capitalizeFirstLetter } from "../../utils/common";
import { PointInterface } from "../../types";
import { Mode, OFFERS_PREVIEW_LIMIT } from "../../const";
import { formatTimeDiff } from "../../utils/time";
import PointEdit from "../point-edit/point-edit";
import { useDefaultPoint } from "../../hooks/useDefaultPoint";

interface Props {
  point: PointInterface;
}

const Point: React.FC<Props> = memo(({ point }) => {
  const {
    id,
    type,
    destination: { name },
    startDate,
    endDate,
    basePrice,
    offers,
  } = point;

  const {
    isTypeActivity,
    mode,
    activePointId,
    startTime,
    endTime,
    editPointButtonHandler,
  } = useDefaultPoint(point);

  return (
    <>
      {mode === Mode.EDIT && activePointId === Number(id) ? (
        <PointEdit point={point} />
      ) : (
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
                <time
                  className="event__start-time"
                  dateTime={startDate.toJSON()}
                >
                  {startTime}
                </time>
                {` — `}
                <time className="event__end-time" dateTime={endDate.toJSON()}>
                  {endTime}
                </time>
              </p>
              <p className="event__duration">
                {formatTimeDiff(
                  endDate.getMilliseconds() - startDate.getMilliseconds(),
                )}
              </p>
            </div>

            <p className="event__price">
              &euro;&nbsp;
              <span className="event__price-value">{basePrice}</span>
            </p>

            <h4 className="visually-hidden">Offers:</h4>
            <ul className="event__selected-offers">
              {offers.slice(0, OFFERS_PREVIEW_LIMIT).map((offer) => (
                <li className="event__offer" key={offer.title}>
                  <span className="event__offer-title">{offer.title}</span>
                  {` `} + &euro;
                  <span className="event__offer-price">{offer.price}</span>
                </li>
              ))}
            </ul>
            <button
              className="event__rollup-btn"
              type="button"
              onClick={editPointButtonHandler}
            >
              <span className="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
      )}
    </>
  );
});

export default Point;
