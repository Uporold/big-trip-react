import { createSelector } from "reselect";
import { GlobalState } from "../reducer";
import { getFilterType, getSortType } from "../app/selectors";
import { getSortedPoints } from "../../utils/common";
import { getPointsByFilter } from "../../utils/filter";

export const getPoints = (state: GlobalState) => state.DATA.points;

export const getOffers = (state: GlobalState) => state.DATA.offers;

export const getDestinations = (state: GlobalState) => state.DATA.destinations;

export const getFormBlockedStatus = (state: GlobalState) =>
  state.DATA.isFormBlocked;

export const getFormErrorStatus = (state: GlobalState) =>
  state.DATA.isFormError;

export const getSortedFilteredPoints = createSelector(
  [getPoints, getSortType, getFilterType],
  (points, sortType, filterType) =>
    getPointsByFilter(getSortedPoints(points, sortType), filterType),
);
