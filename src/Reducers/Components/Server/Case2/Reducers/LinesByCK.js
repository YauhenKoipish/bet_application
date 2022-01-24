import C from "../../../../../Constants/";

const initialState = new Map();

export const linesByCK = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    state.forEach(ev => (ev = null));
    state = null;

    return new Map();
  }
  if (action.type === C.SAVE_LINES_BY_CK) {
    action.linesByCK.forEach((val, key) => {
      state.set(key, val);
    });
    return state;
  }
  return state;
};
