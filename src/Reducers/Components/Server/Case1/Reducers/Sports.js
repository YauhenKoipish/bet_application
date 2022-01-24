import C from "../../../../../Constants/";

const initialState = new Map();

export const sports = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    return new Map();
  }
  if (action.type === C.SAVE_SPORT_ENTITY) {
    action.sports.forEach((val, key) => {
      state.set(key, val);
    });
    return new Map(state);
  }
  return state;
};
