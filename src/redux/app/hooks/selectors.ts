import { useSelector } from "react-redux";
import { getMode, getActivePointId } from "../selectors";

export const useMode = (): string => {
  return useSelector(getMode);
};

export const useActivePointId = (): number => {
  return useSelector(getActivePointId);
};
