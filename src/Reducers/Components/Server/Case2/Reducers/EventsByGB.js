import C from "../../../../../Constants/";

const initialState = new Map();

export const eventsByGB = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    state.forEach(ev => (ev = null));
    state = null;
    return new Map();
  }
  if (action.type === C.SAVE_EVENTS_BY_GB) {
    action.eventsByGB.forEach((val, key) => {
      if (key) state.set(key, val);
    });
    return state;
  }
  return state;
};
