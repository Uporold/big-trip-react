import { useSelector } from "react-redux";
import {
  getDestinations,
  getFormBlockedStatus,
  getFormErrorStatus,
  getOffers,
  getPoints,
  getSortedFilteredPoints,
} from "../selectors";
import {
  DestinationInterface,
  OfferWithType,
  PointInterface,
} from "../../../types";

export const usePoints = (): Array<PointInterface> => {
  return useSelector(getPoints);
};
export const useOffers = (): Array<OfferWithType> => {
  return useSelector(getOffers);
};
export const useDestinations = (): Array<DestinationInterface> => {
  return useSelector(getDestinations);
};

export const useSortedFilteredPoints = (): Array<PointInterface> => {
  return useSelector(getSortedFilteredPoints);
};

export const useFormBlockedStatus = (): boolean => {
  return useSelector(getFormBlockedStatus);
};

export const useFormErrorStatus = (): boolean => {
  return useSelector(getFormErrorStatus);
};
