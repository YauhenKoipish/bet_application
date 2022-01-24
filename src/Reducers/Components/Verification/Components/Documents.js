import C from "../../../../Constants/";

const initialState = [];

export const documents = (state = initialState, action) => {
  if (action.type === C.UPDATE_DOCUMENTS_COMPONENT_VERIFICATION) {
    return action.data;
  }
  if (action.type === C.LOGOUT_ACCOUNT) {
    return [];
  }
  return state;
};
