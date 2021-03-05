import { GlobalState } from "../reducer";

export const getPoints = (state: GlobalState) => state.DATA.points;

export const getOffers = (state: GlobalState) => state.DATA.offers;

export const getDestinations = (state: GlobalState) => state.DATA.destinations;
