import C from "../../../Constants/";

const initialState = {
  isOpen: false
};

export const accountMenu = (state = initialState, action) => {
  switch (action.type) {
    case C.OPEN_ACCOUNT_COMPONENTS:
      return {
        isOpen: true
      };
    case C.CLOSE_ACCOUNT_COMPONENTS:
      return {
        isOpen: false
      };
    default:
      return state;
  }
};
