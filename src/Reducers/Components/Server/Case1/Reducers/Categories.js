import C from "../../../../../Constants/";

const initialState = new Map();

export const categories = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    return new Map();
  }
  if (action.type === C.SAVE_CATEGORY_ENTITY) {
    action.categories.forEach((val, key) => {
      state.set(key, val);
    });
    return new Map(state);
  }
  return state;
};
