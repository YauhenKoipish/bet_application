import { combineReducers } from "redux";
import { chanels } from "./Chanels";
import { stateConnection } from "./Status";

export const replenishment = combineReducers({
  stateConnection,
  chanels
});
