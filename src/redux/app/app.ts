import { InferActionsTypes } from "../reducer";
import { Mode, SortType } from "../../const";
import { SortingType } from "../../types";

export const initialState = {
  currentSortType: SortType.EVENT as SortingType,
  mode: Mode.DEFAULT as string,
  activePointId: -1 as number,
};

type InitialStateType = typeof initialState;
type AppActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;

const ActionType = {
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_MODE: `SET_MODE`,
  SET_ACTIVE_POINT_ID: `SET_ACTIVE_POINT_ID`,
} as const;

export const ActionCreator = {
  setSortType: (sortType: SortingType) => {
    return {
      type: ActionType.SET_SORT_TYPE,
      payload: sortType,
    };
  },

  setMode: (mode: string) => {
    return {
      type: ActionType.SET_MODE,
      payload: mode,
    };
  },

  setActivePointId: (id: number) => {
    return {
      type: ActionType.SET_ACTIVE_POINT_ID,
      payload: id,
    };
  },
};

export const reducer = (
  state = initialState,
  action: AppActionTypes,
): InitialStateType => {
  switch (action.type) {
    case ActionType.SET_MODE:
      return {
        ...state,
        mode: action.payload,
        currentSortType: SortType.EVENT,
      };
    case ActionType.SET_ACTIVE_POINT_ID:
      return { ...state, activePointId: action.payload };
    case ActionType.SET_SORT_TYPE:
      return {
        ...state,
        currentSortType: action.payload,
        activePointId: -1,
        mode: Mode.DEFAULT,
      };
    default:
      return state;
  }
};
