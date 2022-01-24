import C from "../../../../../Constants/";

const initialState = new Map();

export const tournaments = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    return new Map();
  }
  if (action.type === C.SAVE_TOURNAMENT_ENTITY) {
    action.tournaments.forEach((val, key) => {
      state.set(key, val);
    });
    return new Map(state);
  }
  return state;
};
