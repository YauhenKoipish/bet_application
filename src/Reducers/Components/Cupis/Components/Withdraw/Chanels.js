import C from "../../../../../Constants/";

const initialState = null;

export const chanels = (state = initialState, action) => {
  if (action.type === C.CHANGE_WITHDRAWAL_CHANELS) {
    return action.chanels;
  }
  return state;
};
