import { InferActionsTypes } from "../reducer";
import { Filter, Mode, SortType } from "../../const";
import { FilterType, SortingType } from "../../types";

export const initialState = {
  currentSortType: SortType.EVENT as SortingType,
  currentFilterType: Filter.EVERYTHING as FilterType,
  mode: Mode.DEFAULT as string,
  activePointId: -1 as number,
};

type InitialStateType = typeof initialState;
type AppActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;

const ActionType = {
  SET_FILTER_TYPE: `SET_FILTER_TYPE`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_MODE: `SET_MODE`,
  SET_ACTIVE_POINT_ID: `SET_ACTIVE_POINT_ID`,
} as const;

export const ActionCreator = {
  setFilterType: (filterType: FilterType) => {
    return {
      type: ActionType.SET_FILTER_TYPE,
      payload: filterType,
    };
  },

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
    case ActionType.SET_FILTER_TYPE:
      return {
        ...state,
        currentFilterType: action.payload,
        currentSortType: SortType.EVENT,
        activePointId: -1,
        mode: Mode.DEFAULT,
      };
    default:
      return state;
  }
};
