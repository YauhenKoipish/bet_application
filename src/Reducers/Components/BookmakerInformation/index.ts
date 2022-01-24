import { combineReducers } from "redux";

import { bookmakerTabs } from "./Tabs";
import { group } from "./Groups";
import { clients } from "./Clients";

export default combineReducers({
  bookmakerTabs,
  group,
  clients
});
