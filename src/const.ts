import { FilterType, PointInterface, SortingType } from "./types";

export const endPoint = `https://11.ecmascript.pages.academy/big-trip`;

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

export const filters: FilterType[] = [
  `everything`,
  `future`,
  `past`,
  `favorites`,
];

export const sortTypes: SortingType[] = [`event`, `time`, `price`];

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
} as const;

export const Filter = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
  FAVORITES: `favorites`,
} as const;

export const typeItemsTransfer = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

export const typeItemsActivity = [`check-in`, `sightseeing`, `restaurant`];

export const OFFERS_PREVIEW_LIMIT = 3;

export const emptyPoint: PointInterface = {
  id: "-1",
  type: `bus`,
  startDate: new Date(),
  endDate: new Date(),
  destination: {
    name: ``,
    description: ``,
    pictures: [],
  },
  basePrice: 0,
  offers: [],
  isFavorite: false,
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const ChartType = {
  MONEY: `money`,
  TRANSPORT: `transport`,
  TIME_SPENT: `time spent`,
};

export const PagePath = {
  MAIN: `/`,
  STATS: `/statistic`,
};
