import { combineReducers } from "redux";
import { ident } from "./Components/Indent";
import { documents } from "./Components/Documents";
import { callMeResponse } from "./Components/CallMeResponse";

export default combineReducers({
  ident,
  documents,
  callMeResponse
});
