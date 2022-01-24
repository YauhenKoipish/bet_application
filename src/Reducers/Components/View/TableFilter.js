import C from "../../../Constants/";
import { getInitialValuesFilter } from "../../../Services/Shared";

const getCols = () => {
  const w = window.innerWidth;
  if (w >= 1024) {
    return 3;
  } else if (w >= 768) {
    return 2;
  } else {
    return 1;
  }
};

const initialCols = getCols();

const initialState = {
  cols: initialCols,
  filters: getInitialValuesFilter(initialCols)
};

export const tableFilter = (state = initialState, action) => {
  if (action.type === C.CHANGE_VIEW_TABLE_FILTER) {
    return {
      ...state,
      cols: action.cols,
      filters: action.filters
    };
  }
  return state;
};
