import React, { memo } from "react";
import { DestinationInterface, Picture } from "../../types";

interface Props {
  destination: DestinationInterface;
}

const Destination: React.FC<Props> = memo(function Destination({
  destination,
}) {
  return (
    <section className="event__section  event__section--destination">
      <h3 className="event__section-title  event__section-title--destination">
        Destination
      </h3>
      <p className="event__destination-description">
        {destination.description}
      </p>
      <div className="event__photos-container">
        <div className="event__photos-tape">
          {destination.pictures.map((picture: Picture) => (
            <img
              className="event__photo"
              src={picture.src}
              alt={picture.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Destination;
