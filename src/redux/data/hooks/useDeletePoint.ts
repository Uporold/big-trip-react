import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";

export const useDeletePoint = (): ((pointId: number) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (pointId) => {
      dispatch(Operation.deletePoint(pointId));
    },
    [dispatch],
  );
};
