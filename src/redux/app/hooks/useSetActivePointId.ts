import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetActivePointId = (): ((id: number) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (id) => {
      dispatch(ActionCreator.setActivePointId(id));
    },
    [dispatch],
  );
};
