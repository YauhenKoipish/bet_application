import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "../Reducers/";
import { redirect } from "../Router/";
import {
  // reconnect,
  addEventsInActionDeleteOrPauseEvent,
  couponMiddleware,
  routing
} from "../Server/";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const initialState = localStorage["abet-store"]
//    ? JSON.parse(localStorage["abet-store"])
//    : {};

const initialState = {};

const store = createStore(
  reducers,
  initialState,
  composeEnhancer(
    applyMiddleware(
      thunk,
      // reconnect,
      addEventsInActionDeleteOrPauseEvent,
      couponMiddleware,
      routing,
      redirect
    )
  )
);

//store.subscribe(() => {
//    localStorage["abet-store"] = JSON.stringify(store.getState());
//});

export const dispatch = action => {
  store.dispatch(action);
};

export default store;
