import C from "../../../Constants/";

export const openAccount = () => {
  return {
    type: C.OPEN_ACCOUNT_COMPONENTS
  };
};

export const closeAccount = () => {
  return {
    type: C.CLOSE_ACCOUNT_COMPONENTS
  };
};
