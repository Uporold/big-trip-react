import { useSelector } from "react-redux";
import { getMode, getActivePointId, getSortType } from "../selectors";
import { SortingType } from "../../../types";

export const useMode = (): string => {
  return useSelector(getMode);
};

export const useActivePointId = (): number => {
  return useSelector(getActivePointId);
};

export const useCurrentSortType = (): SortingType => {
  return useSelector(getSortType);
};
