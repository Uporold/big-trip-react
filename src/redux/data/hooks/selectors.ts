import { useSelector } from "react-redux";
import { getDestinations, getOffers, getPoints } from "../selectors";
import { Destination, OfferWithType, Point } from "../../../types";

export const usePoints = (): Array<Point> => {
  return useSelector(getPoints);
};
export const useOffers = (): Array<OfferWithType> => {
  return useSelector(getOffers);
};
export const useDestinations = (): Array<Destination> => {
  return useSelector(getDestinations);
};
