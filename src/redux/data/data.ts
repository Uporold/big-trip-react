import { AxiosResponse } from "axios";
import { pointAdapter } from "../adapter/adapter";
import { ActionCreator as AppAction } from "../app/app";
import {
  DestinationInterface,
  OfferWithType,
  PointInterface,
  PointBackend,
} from "../../types";
import { InferActionsTypes, BaseThunkActionType } from "../reducer";

export const initialState = {
  points: [] as Array<PointInterface>,
  offers: [] as Array<OfferWithType>,
  destinations: [] as Array<DestinationInterface>,
  isFormBlocked: false,
  isFormError: false,
};

type InitialStateType = typeof initialState;
type DataActionTypes = ReturnType<InferActionsTypes<typeof ActionCreator>>;
type ThunkActionType = BaseThunkActionType<DataActionTypes>;

const ActionType = {
  LOAD_POINTS: `LOAD_POINTS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_DESTINATIONS: `LOAD_DESTINATIONS`,
  DELETE_POINT: `DELETE_POINT`,
  SET_FORM_BLOCK_STATUS: `SET_FORM_BLOCK_STATUS`,
  SET_ERROR_FORM_STATUS: `SET_ERROR_FORM`,
} as const;

export const ActionCreator = {
  loadPoints: (points: Array<PointInterface>) => {
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

  loadDestinations: (destinations: Array<DestinationInterface>) => {
    return {
      type: ActionType.LOAD_DESTINATIONS,
      payload: destinations,
    };
  },

  deletePoint: (id: number) => {
    return {
      type: ActionType.DELETE_POINT,
      payload: id,
    };
  },

  setFormBlockStatus: (status: boolean) => {
    return {
      type: ActionType.SET_FORM_BLOCK_STATUS,
      payload: status,
    };
  },

  setErrorFormStatus: (status: boolean) => {
    return {
      type: ActionType.SET_ERROR_FORM_STATUS,
      payload: status,
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
    const response: AxiosResponse<Array<DestinationInterface>> = await api.get(
      `/destinations`,
    );
    dispatch(ActionCreator.loadDestinations(response.data));
  },

  deletePoint: (pointId: number): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    dispatch(ActionCreator.setFormBlockStatus(true));
    try {
      await api.delete(`/points/${pointId}`);
      dispatch(ActionCreator.deletePoint(pointId));
      dispatch(ActionCreator.setFormBlockStatus(false));
    } catch (err) {
      dispatch(ActionCreator.setFormBlockStatus(false));
      dispatch(ActionCreator.setErrorFormStatus(true));
      setTimeout(() => dispatch(ActionCreator.setErrorFormStatus(false)), 600);
    }
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
    case ActionType.DELETE_POINT:
      return {
        ...state,
        points: state.points.filter(
          (point) => Number(point.id) !== action.payload,
        ),
      };
    case ActionType.SET_FORM_BLOCK_STATUS:
      return {
        ...state,
        isFormBlocked: action.payload,
      };
    case ActionType.SET_ERROR_FORM_STATUS:
      return {
        ...state,
        isFormError: action.payload,
      };
    default:
      return state;
  }
};
