import C from "../../../../../Constants/";

const initialState = null;

export const deletedEvent = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    return null;
  }
  if (action.type === C.DELETE_EVENT) {
    if (action.event === state) {
      return state;
    }

    return action.event;
  }
  return state;
};
