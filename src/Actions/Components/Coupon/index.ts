import C from "../../../Constants";

export const sendCouponBuilder = val => {
  return {
    type: C.COUPON_BUILDER,
    val
  };
};

export const changeCouponDefaultOpen = val => {
  return {
    type: C.COUPON_CHANGE_DEFAULT_OPEN,
    defaultOpen: val
  };
};

export const openCoupon = () => {
  // document.querySelector("body").classList.add("overflow");
  let form = document.getElementsByTagName("body")[0];
  if (form) (form as HTMLBodyElement).classList.add("overflow");
  return {
    type: C.OPEN_COUPON,
    isOpen: true
  };
};

export const closeCoupon = () => {
  let form = document.getElementsByTagName("body")[0];
  if (form) (form as HTMLBodyElement).classList.remove("overflow");

  return {
    type: C.CLOSE_COUPON,
    isOpen: false
  };
};

export const toggleOutcome = (line, outcomeId) => {
  return {
    type: C.COUPON_TOGGLE_OUTCOME,
    line,
    outcomeId
  };
};

export const addOrdinarToCoupon = (compoundKey, outcomeId) => {
  return {
    type: C.ADD_ORDINAR_TO_COUPON,
    compoundKey,
    outcomeId
  };
};

export const addOrdinarInfo = (line, event) => {
  return {
    type: C.ADD_ORDINAR_INFO,
    line,
    event
  };
};

export const removeOrdinarInfo = compoundKey => {
  return {
    type: C.REMOVE_ORDINAR_INFO,
    compoundKey
  };
};

export const removeOrdinarFromCoupon = (compoundKey, outcomeId) => {
  return {
    type: C.REMOVE_ORDINAR_FROM_COUPON,
    compoundKey,
    outcomeId
  };
};

export const addExpressCoef = coef => {
  return {
    type: C.ADD_EXPRESS_COEF,
    coef
  };
};

export const removeExpressCoef = () => {
  return {
    type: C.REMOVE_EXPRESS_COEF
  };
};

export const addSystemCoef = coef => {
  return {
    type: C.ADD_SYSTEM_COEF,
    coef
  };
};

export const removeSystemCoef = () => {
  return {
    type: C.REMOVE_SYSTEM_COEF
  };
};

export const addOrdinarCoef = (coef, ordinar) => {
  return {
    type: C.ADD_ORDINAR_COEF,
    coef,
    ordinar
  };
};

export const removeOrdinarCoef = ordinar => {
  return {
    type: C.REMOVE_ORDINAR_COEF,
    ordinar
  };
};

export const addSumInputBuilder = sum => {
  return {
    type: C.ADD_SUM_INPUT_BUILDER,
    sum
  };
};

export const addSumInputExpress = sum => {
  return {
    type: C.ADD_SUM_INPUT_EXPRESS,
    sum
  };
};

export const addSumInputSystem = sum => {
  return {
    type: C.ADD_SUM_INPUT_SYSTEM,
    sum
  };
};

export const addSumInputOrdinar = (sum, ordinar) => {
  return {
    type: C.ADD_SUM_INPUT_ORDINAR,
    ordinar,
    sum
  };
};

export const setSumInputBuilder = sum => {
  return {
    type: C.SET_SUM_INPUT_BUILDER,
    sum
  };
};

export const setSumInputExpress = sum => {
  return {
    type: C.SET_SUM_INPUT_EXPRESS,
    sum
  };
};

export const setSumInputSystem = sum => {
  return {
    type: C.SET_SUM_INPUT_SYSTEM,
    sum
  };
};

export const setSumInputOrdinar = (sum, ordinar) => {
  return {
    type: C.SET_SUM_INPUT_ORDINAR,
    ordinar,
    sum
  };
};

export const removeSettingSumInputOrdinar = ordinar => {
  return {
    type: C.REMOVE_SETTING_SUM_INPUT_ORDINAR,
    ordinar
  };
};

export const removeSumInputOrdinar = ordinar => {
  return {
    type: C.REMOVE_SUM_INPUT_ORDINAR,
    ordinar
  };
};

export const clearCoupon = () => {
  return {
    type: C.CLEAR_COUPON
  };
};

export const saveMaxPayCoupon = (requestId, maxPay) => {
  return {
    type: C.SAVE_MAX_PAY_COUPON,
    requestId,
    maxPay
  };
};

export const removeOrdinarMaxPay = ordinar => {
  return {
    type: C.DELETE_ORDINAR_MAX_PAY,
    ordinar
  };
};

export const sendTicket = () => {
  return {
    type: C.SEND_TICKET
  };
};

export const addMultibetsInfo = data => {
  return {
    type: C.ADD_MULTIBETS_INFO,
    data
  };
};

export const changeSystemRang = rang => {
  return {
    type: C.CHANGE_SYSTEM_RANG,
    rang
  };
};

export const addSendingData = data => {
  return {
    type: C.ADD_SENDING_DATA,
    data
  };
};

export const addResponseTicket = (response, mainResponse) => {
  return {
    type: C.ADD_RESPONSE_TICKET,
    response,
    mainResponse
  };
};

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

export const setCouponSettings = (
  changingCoefs: any,
  fastBet: any,
  changingMaxPay: any
) => {
  return {
    type: C.SET_ALL_SETTINGS_COUPON,
    changingCoefs,
    fastBet,
    changingMaxPay
  };
};

export const acceptChanges = val => {
  return {
    type: C.ACCEPT_CHANGES,
    val
  };
};

export const setTypeSendingTicket = val => {
  return {
    type: C.SET_TYPE_SENDING_TICKET,
    val
  };
};

export const addOrdinarsToCoupon = ordinars => {
  return {
    type: C.ADD_ORDINARS_TO_COUPON,
    ordinars
  };
};

export const rememberOrdinars = ordinars => {
  return {
    type: C.REMEMBER_ORDINARS,
    ordinars
  };
};

export const addUnconfirmedBetWhenEditingTicket = (compoundKey, outcomeId) => {
  return {
    type: C.ADD_UNCONFIRMED_BET_WHEN_EDITING,
    compoundKey,
    outcomeId
  };
};
