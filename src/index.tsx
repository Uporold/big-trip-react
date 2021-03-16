import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { AxiosInstance } from "axios";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { createAPI } from "./api";
import { AllReduxActions, GlobalState, rootReducer } from "./redux/reducer";
import { Operation as DataOperation } from "./redux/data/data";

const api = createAPI();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument(api) as ThunkMiddleware<
        GlobalState,
        AllReduxActions,
        AxiosInstance
      >,
    ),
  ),
);

store.dispatch(DataOperation.loadPoints());
store.dispatch(DataOperation.loadDestinations());
store.dispatch(DataOperation.loadOffers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
