import React from "react";
import { Offer } from "../../types";

interface Props {
  selectedOffers: Offer[];
  typeOffers: Offer[];
}

const createOfferSelectorMarkup = (offer: Offer, selectedOffers: Offer[]) => {
  const isChecked = () =>
    selectedOffers.some((selectedOffer) => selectedOffer.title === offer.title);
  return (
    <div className="event__offer-selector">
      <input
        className="event__offer-checkbox  visually-hidden"
        id={`event-offer-${offer.title.toLowerCase()}-1`}
        type="checkbox"
        name="event-offer"
        checked={isChecked()}
        value={offer.title}
        data-price={offer.price}
      />
      <label className="event__offer-label">
        <span className="event__offer-title">{offer.title}</span>+ €
        <span className="event__offer-price">{offer.price}</span>
      </label>
    </div>
  );
};

const Offers: React.FC<Props> = ({ selectedOffers, typeOffers }) => {
  const selectorMarkup = typeOffers.map((offer) =>
    createOfferSelectorMarkup(offer, selectedOffers),
  );
  return (
    <section className="event__section  event__section--offers">
      <h3 className="event__section-title  event__section-title--offers">
        Offers
      </h3>
      <div className="event__available-offers">{selectorMarkup}</div>
    </section>
  );
};

export default Offers;
