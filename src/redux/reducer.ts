import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AxiosInstance } from "axios";
import { reducer, ActionCreator as DataActions } from "./data/data";

export const rootReducer = reducer;

export type GlobalState = ReturnType<typeof rootReducer>;

const combinedActions = { ...DataActions };
export type AllReduxActions = ReturnType<
  InferActionsTypes<typeof combinedActions>
>;

export type InferActionsTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;

export type BaseThunkActionType<A extends Action = Action> = ThunkAction<
  Promise<void>,
  GlobalState,
  AxiosInstance,
  A
>;
