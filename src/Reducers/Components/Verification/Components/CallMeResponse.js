import C from "../../../../Constants/";

const initialState = null;

export const callMeResponse = (state = initialState, action) => {
  if (action.type === C.UPDATE_CALL_ME_RESPONSE_VERIFICATION) {
    return action.data;
  }
  if (action.type === C.LOGOUT_ACCOUNT) {
    return null;
  }
  return state;
};
