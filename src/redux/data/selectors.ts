import { GlobalState } from "../reducer";

export const getPoints = (state: GlobalState) => state.points;

export const getOffers = (state: GlobalState) => state.offers;

export const getDestinations = (state: GlobalState) => state.destinations;
