import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActionCreator } from "../app";

export const useSetMode = (): ((mode: string) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (mode) => {
      dispatch(ActionCreator.setMode(mode));
    },
    [dispatch],
  );
};
