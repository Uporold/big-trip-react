import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../data";
import { PointBackend } from "../../../types";

export const useCreatePoint = (): ((data: PointBackend) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (data) => {
      dispatch(Operation.createPoint(data));
    },
    [dispatch],
  );
};
