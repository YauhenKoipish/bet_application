import { combineReducers } from "redux";
import { replenishment } from "./Components/Replenishment";
import { withdrawal } from "./Components/Withdraw";

export const cupis = combineReducers({
  replenishment,
  withdrawal
});
