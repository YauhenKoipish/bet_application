import { combineReducers } from "redux";
import { responseEndingBonusOnDeposit } from "./Response";

export default combineReducers({
  response: responseEndingBonusOnDeposit
});
