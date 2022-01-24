import C from "../../../Constants/";

export const changeViewHistoryOperation = val => {
  return {
    type: C.CHANGE_VIEW_HISTORY_OPERATION,
    val
  };
};
