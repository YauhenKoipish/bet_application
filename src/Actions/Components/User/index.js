import C from "../../../Constants/";

import { getLocalStorageData } from "../../../Services/LocalStorage";

export const saveTickets = tickets => {
  return {
    type: C.SAVE_TICKETS,
    tickets
  };
};
export const authorize_recover_password = boolean => {
  return {
    type: C.AUTHORIZE_RECOVER_PSW,
    value: boolean
  };
};

export const saveBalanceToState = balance => {
  return {
    type: C.SAVE_BALANCE,
    balance
  };
};

export const saveOperationsToState = operations => {
  return {
    type: C.SAVE_USER_OPERATIONS,
    operations
  };
};

export const setCurrentDateHistoryOperations = date => {
  return {
    type: C.SET_CURRENT_DATE_HISTORY_OPERATIONS,
    date
  };
};

export const errorAuthorize = data => {
  return {
    type: C.ERROR_ATHORIZE_REQ,
    status: data
  };
};

export const sendCodeNumberLogin = data => {
  return {
    type: C.SEND_CODE_NUMBER,
    status: data
  };
};
export const sendCode = data => {
  return {
    type: C.SEND_CODE_RECOVER,
    status: data
  };
};
export const errorMassageCode = data => {
  return {
    type: C.ERROR_MSG_REGISTRATION,
    value: true
  };
};
export const changePswMyAccount = data => {
  return {
    type: C.CHANGE_PSW_MY_ACCOUNT,
    status: data
  };
};
export const faillchangePsw = data => {
  return {
    type: C.FAIL_CHANGE_PSW,
    status: data
  };
};

export const sendNewPSW = data => {
  return {
    type: C.SEND_NEW_PSW,
    status: data
  };
};

export const setLanguage = (lang, dict) => {
  return {
    type: C.LANGUAGE_USER,
    value: lang,
    isModalShow: getLocalStorageData("Language") ? false : true,
    dict
  };
};

export const flagRegistrationRedirect = string => {
  return {
    type: C.REDDIRECT_REGISTRATION,
    link: string
  };
};
