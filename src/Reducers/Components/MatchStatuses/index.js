import C from "../../../Constants/";

const initialState = null;

export default (state = initialState, action) => {
  if (action.type === C.ADD_MATCH_STATUSES) {
    return action.statuses;
  }
  return state;
};
