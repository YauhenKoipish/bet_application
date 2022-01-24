import C from "../../../../../Constants/";

const initialState = new Map();

export const marketsByNum = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    return new Map();
  }
  if (action.type === C.SAVE_MARKET_BY_NUM_ENTITY) {
    action.markets.forEach((val, key) => {
      state.set(val.id, key);
    });
    return state;
  }
  return state;
};
