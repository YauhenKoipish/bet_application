import C from "../../../Constants/";

const initialState = [window.location.pathname];

export const history = (state = initialState, action) => {
  if (action.type === C.ROUTING) {
    state.push(window.location.pathname);
    return state;
  }
  return state;
};
