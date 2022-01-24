import C from "../../../Constants/";

export const setChangingCoefs = val => {
  return {
    type: C.SET_CHANGING_COEFS,
    val
  };
};

export const setFastBet = val => {
  return {
    type: C.SET_FAST_BET
  };
};

export const saveSetting = obj => {
  return {
    type: C.SET_MAIN_SETTIN,
    value: obj
  };
};
