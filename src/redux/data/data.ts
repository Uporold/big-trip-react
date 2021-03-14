import { AxiosResponse } from "axios";
import { pointAdapter, toRawPoint } from "../adapter/adapter";
import { ActionCreator as AppActionCreator } from "../app/app";
import {
  DestinationInterface,
  OfferWithType,
  PointInterface,
  PointBackend,
} from "../../types";
import { BaseThunkActionType, AllReduxActions } from "../reducer";
import { Mode } from "../../const";

export const initialState = {
  points: [] as Array<PointInterface>,
  offers: [] as Array<OfferWithType>,
  destinations: [] as Array<DestinationInterface>,
  isFormBlocked: false,
  isFormError: false,
  isPointsLoading: true,
};

type InitialStateType = typeof initialState;
type ThunkActionType = BaseThunkActionType<AllReduxActions>;

const ActionType = {
  LOAD_POINTS: `LOAD_POINTS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_DESTINATIONS: `LOAD_DESTINATIONS`,
  DELETE_POINT: `DELETE_POINT`,
  CREATE_POINT: `CREATE_POINT`,
  UPDATE_POINT: `UPDATE_POINT`,
  CHANGE_POINT_FAVORITE_STATUS: `CHANGE_POINT_FAVORITE_STATUS`,
  SET_FORM_BLOCK_STATUS: `SET_FORM_BLOCK_STATUS`,
  SET_ERROR_FORM_STATUS: `SET_ERROR_FORM`,
  FINISH_POINTS_LOADING: `FINISH_POINTS_LOADING`,
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

  createPoint: (point: PointInterface) => {
    return {
      type: ActionType.CREATE_POINT,
      payload: point,
    };
  },

  updatePoint: (point: PointInterface) => {
    return {
      type: ActionType.UPDATE_POINT,
      payload: point,
    };
  },

  changePointFavoriteStatus: (point: PointInterface) => {
    return {
      type: ActionType.CHANGE_POINT_FAVORITE_STATUS,
      payload: point,
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

  finishPointsLoading: () => {
    return {
      type: ActionType.FINISH_POINTS_LOADING,
      payload: false,
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
    dispatch(ActionCreator.finishPointsLoading());
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

  createPoint: (data: PointBackend): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    dispatch(ActionCreator.setFormBlockStatus(true));
    try {
      const response = await api.post(`/points`, data);
      dispatch(ActionCreator.createPoint(pointAdapter(response.data)));
      dispatch(ActionCreator.setFormBlockStatus(false));
      dispatch(AppActionCreator.setMode(Mode.DEFAULT));
    } catch (err) {
      dispatch(ActionCreator.setFormBlockStatus(false));
      dispatch(ActionCreator.setErrorFormStatus(true));
      setTimeout(() => dispatch(ActionCreator.setErrorFormStatus(false)), 600);
    }
  },

  updatePoint: (data: PointBackend): ThunkActionType => async (
    dispatch,
    getState,
    api,
  ) => {
    dispatch(ActionCreator.setFormBlockStatus(true));
    try {
      const response = await api.put(`/points/${data.id}`, data);
      dispatch(ActionCreator.updatePoint(pointAdapter(response.data)));
      dispatch(ActionCreator.setFormBlockStatus(false));
      dispatch(AppActionCreator.setMode(Mode.DEFAULT));
    } catch (err) {
      dispatch(ActionCreator.setFormBlockStatus(false));
      dispatch(ActionCreator.setErrorFormStatus(true));
      setTimeout(() => dispatch(ActionCreator.setErrorFormStatus(false)), 600);
    }
  },

  changePointFavoriteStatus: (
    point: PointInterface,
    status: boolean,
  ): ThunkActionType => async (dispatch, getState, api) => {
    try {
      const data = toRawPoint(point);
      data.is_favorite = status;
      const response = await api.put(`/points/${point.id}`, data);
      dispatch(
        ActionCreator.changePointFavoriteStatus(pointAdapter(response.data)),
      );
    } catch (err) {
      dispatch(ActionCreator.setErrorFormStatus(true));
      setTimeout(() => dispatch(ActionCreator.setErrorFormStatus(false)), 600);
    }
  },
};

export const reducer = (
  state = initialState,
  action: AllReduxActions,
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
    case ActionType.CREATE_POINT:
      return { ...state, points: [...state.points, action.payload] };
    case ActionType.UPDATE_POINT:
      return {
        ...state,
        points: state.points.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    case ActionType.CHANGE_POINT_FAVORITE_STATUS:
      return {
        ...state,
        points: state.points.map((item) =>
          item.id === action.payload.id ? action.payload : item,
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
    case ActionType.FINISH_POINTS_LOADING:
      return { ...state, isPointsLoading: action.payload };
    default:
      return state;
  }
};
