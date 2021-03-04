import { SortType } from "../const";
import { PointInterface, SortingType } from "../types";

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getSortedPoints = (
  points: PointInterface[],
  sortType: SortingType,
) => {
  const showingEvents = points.slice();

  switch (sortType) {
    case SortType.PRICE:
      return showingEvents.sort((a, b) => b.basePrice - a.basePrice);
    case SortType.TIME:
      return showingEvents.sort(
        (a, b) =>
          b.endDate.valueOf() -
          b.startDate.valueOf() -
          (a.endDate.valueOf() - a.startDate.valueOf()),
      );
    default:
      return showingEvents;
  }
};