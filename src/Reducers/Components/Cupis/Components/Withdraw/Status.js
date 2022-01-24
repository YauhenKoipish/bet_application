import C from "../../../../../Constants/";

const initialState = null;

export const stateConnection = (state = initialState, action) => {
  if (action.type === C.CHANGE_STATE_CONNECT_WITHDRAWAL_CHANELS) {
    return action.val;
  }
  return state;
};
