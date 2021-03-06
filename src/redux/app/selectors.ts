import { GlobalState } from "../reducer";

export const getMode = (state: GlobalState) => state.APP.mode;
export const getActivePointId = (state: GlobalState) => state.APP.activePointId;
export const getSortType = (state: GlobalState) => state.APP.currentSortType;
