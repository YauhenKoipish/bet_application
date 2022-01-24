import C from "../../../../Constants/";

// 0 - плашка, 1 - курьер, 2 - документы, 3 - катать

const initialState = 3;

export const status = (state = initialState, action) => {
  if (action.type === C.UPDATE_VERIFICATION_STATUS) {
    return action.status;
  }
  return state;
};
