import { InferActionsTypes } from "../reducer";

export const initialState = {
  mode: `default`,
  activePointId: -1,
};

type InitialStateType = typeof initialState;
type AppActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;

const ActionType = {
  SET_MODE: `SET_MODE`,
  SET_ACTIVE_POINT_ID: `SET_ACTIVE_POINT_ID`,
} as const;

export const ActionCreator = {
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
      return { ...state, mode: action.payload };
    case ActionType.SET_ACTIVE_POINT_ID:
      return { ...state, activePointId: action.payload };
    default:
      return state;
  }
};
