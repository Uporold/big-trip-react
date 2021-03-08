import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";
import { FilterType } from "../../../types";

export const useSetFilterType = (): ((filterType: FilterType) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (filterType) => {
      dispatch(ActionCreator.setFilterType(filterType));
    },
    [dispatch],
  );
};
