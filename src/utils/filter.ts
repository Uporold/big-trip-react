import dayjs from "dayjs";
import { Filter } from "../const";
import { FilterType, PointInterface } from "../types";

const isFutureDate = (startDate: Date) => {
  return dayjs(startDate).isAfter(dayjs());
};

const isPastDate = (startDate: Date) => {
  return dayjs().isAfter(dayjs(startDate));
};

export const getPointsByFilter = (
  points: PointInterface[],
  filterType: FilterType,
): PointInterface[] => {
  switch (filterType) {
    // case Filter.EVERYTHING:
    //   return points;
    case Filter.PAST:
      return points.filter((point) => isPastDate(point.startDate));
    case Filter.FUTURE:
      return points.filter((point) => isFutureDate(point.startDate));
    default:
      return points;
  }
};
