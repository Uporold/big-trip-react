import { SortType } from "../const";
import { PointInterface, SortingType } from "../types";

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getSortedPoints = (
  points: PointInterface[],
  sortType: SortingType,
) => {
  const showingPoints = points.slice();
  switch (sortType) {
    case SortType.PRICE:
      return showingPoints.sort((a, b) => b.basePrice - a.basePrice);
    case SortType.TIME:
      return showingPoints.sort(
        (a, b) =>
          b.endDate.valueOf() -
          b.startDate.valueOf() -
          (a.endDate.valueOf() - a.startDate.valueOf()),
      );
    default:
      return showingPoints.sort(
        (a, b) => a.startDate.valueOf() - b.startDate.valueOf(),
      );
  }
};

export const ensure = <T>(
  argument: T | undefined | null,
  message = "This value was promised to be there.",
): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
};
