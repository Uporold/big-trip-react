import { FilterType, SortingType } from "./types";

export const URL = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export const endPoint = `https://11.ecmascript.pages.academy/big-trip`;

export const token = `vbfgdfgdfgrertertdff344523fg`;

export const months = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

export const filters: FilterType[] = [`everything`, `future`, `past`];

export const sortTypes: SortingType[] = [`event`, `time`, `price`];

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const typeItemsActivity = [`Check-in`, `Sightseeing`, `Restaurant`];

export const OFFERS_PREVIEW_LIMIT = 3;
