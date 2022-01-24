import { combineReducers } from "redux";
import { chanels } from "./Chanels";
import { stateConnection } from "./Status";

export const withdrawal = combineReducers({
  stateConnection,
  chanels
});
