import C from "../../../Constants/";
import { getViewColsOutrightsTable } from "../../../Components/Main/Components/TableOutright/";

const initialState = {
  cols: getViewColsOutrightsTable()
};

export const outrightsTable = (state = initialState, action) => {
  if (action.type === C.CHANGE_VIEW_OUTRIGHTS_TABLE) {
    return {
      ...state,
      cols: action.val
    };
  }
  return state;
};
