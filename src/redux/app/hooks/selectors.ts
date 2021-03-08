import { useSelector } from "react-redux";
import {
  getMode,
  getActivePointId,
  getSortType,
  getFilterType,
} from "../selectors";
import { FilterType, SortingType } from "../../../types";

export const useMode = (): string => {
  return useSelector(getMode);
};
export const useActivePointId = (): number => {
  return useSelector(getActivePointId);
};

export const useCurrentSortType = (): SortingType => {
  return useSelector(getSortType);
};

export const useCurrentFilterType = (): FilterType => {
  return useSelector(getFilterType);
};
