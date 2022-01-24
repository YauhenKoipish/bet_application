import C from "../../../Constants/";

const initialState = {
  isShown: false,
  data: null
};

export const modal = (state = initialState, action) => {
  if (action.type === C.SHOW_MODAL) {
    return {
      isShown: true,
      data: action.data
    };
  } else if (action.type === C.CLOSE_MODAL) {
    return {
      isShown: false,
      data: null
    };
  }

  return state;
};
const initialStateTest = {
  isShown: false
};

export const modalTest = (state = initialStateTest, action) => {
  if (action.type === C.SHOW_MODAL_TEST) {
    return {
      isShown: true
    };
  } else if (action.type === C.CLOSE_MODAL_TEST) {
    return {
      isShown: false
    };
  }

  return state;
};

//false
export const showModal = (state = false, action) => {
  if (action.type === C.MODAL_REGISTRATION_SUCCESS) {
    return action.value;
  }

  return state;
};
