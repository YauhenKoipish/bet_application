import C from "../../../Constants/";

export const route = (method, nextUrl) => {
  return {
    type: C.ROUTING,
    payload: {
      method: method,
      nextUrl: nextUrl
    }
  };
};

export const saveCurrentUrl = url => {
  return {
    type: C.SAVE_CURRENT_URL,
    url
  };
};
