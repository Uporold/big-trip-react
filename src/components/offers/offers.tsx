import React, { memo } from "react";
import { Offer } from "../../types";

interface Props {
  selectedOffers: Offer[];
  typeOffers: Offer[];
  handleOfferClick: (formOffer: Offer) => (event: React.MouseEvent) => void;
}

const createOfferSelectorMarkup = (
  offer: Offer,
  selectedOffers: Offer[],
  handleOfferClick: (formOffer: Offer) => (event: React.MouseEvent) => void,
) => {
  const isChecked = () =>
    selectedOffers.some((selectedOffer) => selectedOffer.title === offer.title);
  return (
    <div className="event__offer-selector" key={`${offer.title}-form`}>
      <input
        className="event__offer-checkbox  visually-hidden"
        id={`event-offer-${offer.title.toLowerCase()}-1`}
        type="checkbox"
        name="event-offer"
        checked={isChecked()}
        value={offer.title}
        data-price={offer.price}
        readOnly
      />
      <label className="event__offer-label" onClick={handleOfferClick(offer)}>
        <span className="event__offer-title">{offer.title}</span>+ €
        <span className="event__offer-price">{offer.price}</span>
      </label>
    </div>
  );
};

const Offers: React.FC<Props> = memo(function Offers({
  selectedOffers,
  typeOffers,
  handleOfferClick,
}) {
  const selectorMarkup = typeOffers.map((offer) =>
    createOfferSelectorMarkup(offer, selectedOffers, handleOfferClick),
  );
  return (
    <section className="event__section  event__section--offers">
      <h3 className="event__section-title  event__section-title--offers">
        Offers
      </h3>
      <div className="event__available-offers">{selectorMarkup}</div>
    </section>
  );
});

export default Offers;
