import C from "../../../Constants/";
import { combineReducers } from "redux";
import { DictEn } from "../../../Services/DictEn";

const initialStateBetsTimestamps = [];

const isMainBalance = (state = true, action) => {
  switch (action.type) {
    case C.BONUS_BALANCE_ACCOUNT:
      return true;

    case C.MAIN_BALANCE_ACCOUNT:
      return false;

    default:
      return state;
  }
};

const betsTimestamps = (state = initialStateBetsTimestamps, action) => {
  switch (action.type) {
    case C.SAVE_USER:
      return action.user.betsTimestamps;
    case C.LOGOUT_ACCOUNT:
      return initialStateBetsTimestamps;
    case C.RESET_STATE:
      return initialStateBetsTimestamps;
  }
  return state;
};

const initialStateOperationsTimestamps = [];

const operationsTimestamps = (
  state = initialStateOperationsTimestamps,
  action
) => {
  switch (action.type) {
    case C.SAVE_USER:
      return action.user.operationsTimestamps;
    case C.LOGOUT_ACCOUNT:
      return initialStateOperationsTimestamps;
    case C.RESET_STATE:
      return initialStateOperationsTimestamps;
  }
  return state;
};

const initialStateAccountData = {};

const accountData = (state = initialStateAccountData, action) => {
  switch (action.type) {
    case C.SAVE_USER:
      return action.user.accountData;
    case C.SAVE_BALANCE:
      return action.balance;
    case C.LOGOUT_ACCOUNT:
      return initialStateAccountData;
    case C.RESET_STATE:
      return initialStateAccountData;
  }
  return state;
};

const initialStateTickets = new Map();

const tickets = (state = initialStateTickets, action) => {
  let newTickets;
  let data;
  switch (action.type) {
    case C.SAVE_USER:
      return new Map([...action.user.ticketsData].map(t => [t.ticketId, t]));
    case C.CALCULATE_BET:
      data = action.data;
      newTickets = new Map(state);
      newTickets.forEach(ticket => {
        ticket.bets.forEach(bet => {
          if (bet.betId === data.betId) {
            bet.settlementOdd = data.settlementOdd;
            bet.summary = data.summary;
            bet.status = data.status;
          }
        });
      });
      return newTickets;
    case C.CALCULATE_TICKET:
      data = action.data;
      newTickets = new Map(state);
      const ticket = newTickets.get(data.ticketId);
      if (!ticket) return state;
      ticket.payout = data.payout;
      ticket.units = data.units;
      ticket.bonus = data.bonus;
      ticket.status = data.status;
      ticket.ticketCoef = data.coef;
      ticket.settlementCoef = data.settlementCoef;
      return newTickets;
    case C.LOGOUT_ACCOUNT:
      return initialStateTickets;
    case C.SAVE_TICKETS:
      const newState = new Map(state);
      action.tickets.forEach(t => {
        newState.set(t.ticketId, t);
      });
      return newState;
    case C.RESET_STATE:
      return initialStateTickets;
  }
  return state;
};

const initialStateCurrentOperationsData = new Map();

const currentOperationsData = (
  state = initialStateCurrentOperationsData,
  action
) => {
  switch (action.type) {
    case C.SAVE_USER_OPERATIONS:
      action.operations.forEach(operation =>
        state.set(operation.id, operation)
      );
      return new Map(state);
    case C.SAVE_USER:
      action.user.currentOperationsData.forEach(operation =>
        state.set(operation.id, operation)
      );
      return new Map(state);
    case C.LOGOUT_ACCOUNT:
      return initialStateCurrentOperationsData;
    case C.RESET_STATE:
      return initialStateCurrentOperationsData;
  }
  return state;
};

const initialStateCurrentDateHistoryOperations = null;

const currentDateHistoryOperations = (
  state = initialStateCurrentDateHistoryOperations,
  action
) => {
  switch (action.type) {
    case C.SET_CURRENT_DATE_HISTORY_OPERATIONS:
      return action.date;
    case C.LOGOUT_ACCOUNT:
      return initialStateCurrentDateHistoryOperations;
    case C.RESET_STATE:
      return initialStateCurrentDateHistoryOperations;
  }
  return state;
};

const info = combineReducers({
  betsTimestamps,
  operationsTimestamps,
  accountData,
  tickets,
  currentOperationsData,
  currentDateHistoryOperations
});

const initialStateIsAuthorize = false;

const isAuthorize = (state = initialStateIsAuthorize, action) => {
  switch (action.type) {
    case C.AUTORIZE_SUCCSESS:
      return action.data;

    case C.AUTORIZE_FAIL:
      return false;

    case C.LOGOUT_ACCOUNT:
      return initialStateIsAuthorize;
    case C.RESET_STATE:
      return initialStateIsAuthorize;
  }

  return state;
};

const initialStateResponseAuthorize = 4; // -1 ошибка , 0 зашел, 1 не заходил

const responseAuthorize = (state = initialStateResponseAuthorize, action) => {
  switch (action.type) {
    case C.LOGOUT_ACCOUNT:
      return initialStateResponseAuthorize;
    case C.RESPONSE_AUTORIZE:
      return action.response;
    case C.RESET_STATE:
      return initialStateResponseAuthorize;
  }
  return state;
};

const statusLogin = (status = {}, action) => {
  if (action.type == C.ERROR_ATHORIZE_REQ) {
    return action.status;
  }
  return status;
};
const authorize_recover_password = (status = false, action) => {
  if (action.type == C.AUTHORIZE_RECOVER_PSW) {
    return action.value;
  }
  return status;
};

const language_user = (
  status = {
    isModalShow: true,
    value: "en",
    dict: DictEn
  },
  action
) => {
  if (action.type === C.LANGUAGE_USER) {
    return action;
  }
  return status;
};

const flagRegistrationRedirect = (string = false, action) => {
  if (action.type === C.REDDIRECT_REGISTRATION) {
    return action.link;
  }
  return string;
};

export default combineReducers({
  info,
  isAuthorize,
  responseAuthorize,
  isMainBalance,
  statusLogin,
  authorize_recover_password,
  language_user,
  flagRegistrationRedirect
});
