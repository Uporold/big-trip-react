import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";
import { SortingType } from "../../../types";

export const useSetSortType = (): ((sortType: SortingType) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (sortType) => {
      dispatch(ActionCreator.setSortType(sortType));
    },
    [dispatch],
  );
};
