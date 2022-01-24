import C from "../../../Constants/";
import { combineReducers } from "redux";
import {
  getLocalStorageData,
  setLocalStorage
} from "../../../Services/LocalStorage";

const initialStateEditingTicket = null;

export const editingTicket = (state = initialStateEditingTicket, action) => {
  if (action.type === C.ADD_EDITING_TICKET) {
    return action.ticket;
  }
  if (action.type === C.ADD_STAKE_EDITING_TICKET) {
    return { ...state, stake: action.stake };
  }
  if (action.type === C.ADD_BETS_EDITING_TICKET) {
    return { ...state, bets: action.bets };
  }
  if (action.type === C.LOGOUT_ACCOUNT || action.type === C.RESET_STATE) {
    return null;
  }
  return state;
};

const initialStateUnconfirmedBets = null;

export const unconfirmedBets = (
  state = initialStateUnconfirmedBets,
  action
) => {
  if (action.type === C.ADD_UNCONFIRMED_BET) {
    return {
      line: action.line,
      outcomeId: action.outcomeId
    };
  }
  if (action.type === C.ADD_EDITING_TICKET) {
    if (action.id === null) return initialStateUnconfirmedBets;
    return state;
  }
  if (action.type === C.LOGOUT_ACCOUNT || action.type === C.RESET_STATE) {
    return null;
  }
  return state;
};

const initialStateMaxPay = null;

export const maxPay = (state = initialStateMaxPay, action) => {
  if (action.type === C.SAVE_MAX_PAY_EDITING_TICKET) {
    return action.maxPay;
  }
  if (action.type === C.ADD_EDITING_TICKET) {
    if (action.id === null) return initialStateMaxPay;
    return state;
  }
  if (action.type === C.LOGOUT_ACCOUNT || action.type === C.RESET_STATE) {
    return null;
  }
  return state;
};

const initialStatePreloader = null;

export const preloader = (state = initialStatePreloader, action) => {
  if (action.type === C.ADD_PRELOADER) {
    return { type: action.preloaderType, ticketId: action.ticketId };
  }
  if (action.type === C.ADD_EDITING_TICKET) {
    if (action.id === null) return initialStatePreloader;
    return state;
  }
  if (
    action.type === C.LOGOUT_ACCOUNT ||
    action.type === C.RESET_STATE ||
    action.type === C.REMOVE_PRELOADER_TICKET
  ) {
    return null;
  }
  return state;
};

const initialStateIsRememberedAdvice =
  getLocalStorageData("isRememberedAdviceOrdinarToExpress") || false;

export const isRememberedAdvice = (
  state = initialStateIsRememberedAdvice,
  action
) => {
  if (action.type === C.REMEMBER_ADVICE) {
    setLocalStorage("isRememberedAdviceOrdinarToExpress", true);
    return true;
  }
  return state;
};

export default combineReducers({
  editingTicket,
  unconfirmedBets,
  maxPay,
  preloader,
  isRememberedAdvice
});
