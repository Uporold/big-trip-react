import { AxiosResponse } from "axios";
import { pointAdapter } from "../adapter/adapter";
import { Destination, OfferWithType, Point, PointBackend } from "../../types";
// eslint-disable-next-line import/no-cycle
import { InferActionsTypes, BaseThunkActionType } from "../reducer";

export const initialState = {
  points: [] as Array<Point>,
  offers: [] as Array<OfferWithType>,
  destinations: [] as Array<Destination>,
};

type InitialStateType = typeof initialState;
type DataActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;
type ThunkActionType = BaseThunkActionType<DataActionTypes>;

const ActionType = {
  LOAD_POINTS: `LOAD_POINTS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_DESTINATIONS: `LOAD_DESTINATIONS`,
} as const;

export const ActionCreator = {
  loadPoints: (points: Array<Point>) => {
    return {
      type: ActionType.LOAD_POINTS,
      payload: points,
    };
  },

  loadOffers: (offers: Array<OfferWithType>) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },

  loadDestinations: (destinations: Array<Destination>) => {
    return {
      type: ActionType.LOAD_DESTINATIONS,
      payload: destinations,
    };
  },
};

export const Operation = {
  loadPoints: (): ThunkActionType => async (dispatch, getState, api) => {
    const response: AxiosResponse<Array<PointBackend>> = await api.get(
      `/points`,
    );
    const loadedPoints = response.data.map((point) => pointAdapter(point));
    dispatch(ActionCreator.loadPoints(loadedPoints));
  },

  loadOffers: (): ThunkActionType => async (dispatch, getState, api) => {
    const response: AxiosResponse<Array<OfferWithType>> = await api.get(
      `/offers`,
    );
    dispatch(ActionCreator.loadOffers(response.data));
  },

  loadDestinations: (): ThunkActionType => async (dispatch, getState, api) => {
    const response: AxiosResponse<Array<Destination>> = await api.get(
      `/destinations`,
    );
    dispatch(ActionCreator.loadDestinations(response.data));
  },
};

export const reducer = (
  state = initialState,
  action: DataActionTypes,
): InitialStateType => {
  switch (action.type) {
    case ActionType.LOAD_POINTS:
      return { ...state, points: action.payload };
    case ActionType.LOAD_OFFERS:
      return { ...state, offers: action.payload };
    case ActionType.LOAD_DESTINATIONS:
      return { ...state, destinations: action.payload };
    default:
      return state;
  }
};