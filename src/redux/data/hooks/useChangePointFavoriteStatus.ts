import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";
import { PointInterface } from "../../../types";

export const useChangePointFavoriteStatus = (): ((
  point: PointInterface,
  status: boolean,
) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (point, status) => {
      dispatch(Operation.changePointFavoriteStatus(point, status));
    },
    [dispatch],
  );
};
