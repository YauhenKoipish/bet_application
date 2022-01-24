import C from "../../../Constants/";
import { getViewHistoryOperations } from "../../../Components/Main/Components/Cabinet/MyScore/Components/HistoryOperation/";

const initialState = getViewHistoryOperations();

export const historyOperation = (state = initialState, action) => {
  if (action.type === C.CHANGE_VIEW_HISTORY_OPERATION) {
    return action.val;
  }
  return state;
};
