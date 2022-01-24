import C from "../../../../../Constants/";

const initialState = new Map();

export const markets = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    return new Map();
  }
  if (action.type === C.SAVE_MARKET_ENTITY) {
    action.markets.forEach((val, key) => {
      state.set(key, val);
    });
    return new Map(state);
  }
  return state;
};
