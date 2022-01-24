import CONSTATNTS from "../../../../Constants";

export const bookmakerTabs = (state = [], action) => {
  if (action.type === CONSTATNTS.BOOKMAKER_TABS) {
    return action.value;
  }
  return state;
};
