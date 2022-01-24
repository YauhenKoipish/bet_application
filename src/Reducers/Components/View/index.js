import { combineReducers } from "redux";
import { tableFilter } from "./TableFilter";
import { topNav } from "./TopNav";
import { historyOperation } from "./HistoryOperation";
import { outrightsTable } from "./OutrightsTable";

export const view = combineReducers({
  tableFilter,
  topNav,
  historyOperation,
  outrightsTable
});
