import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { PointBackend } from "../../../types";
import { Operation } from "../data";

export const useUpdatePoint = (): ((data: PointBackend) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (data) => {
      dispatch(Operation.updatePoint(data));
    },
    [dispatch],
  );
};
