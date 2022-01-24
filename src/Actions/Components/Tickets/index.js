import C from "../../../Constants/";

export const addEditingTicket = ticket => {
  return {
    type: C.ADD_EDITING_TICKET,
    ticket
  };
};

export const addBetsEditingTicket = bets => {
  return {
    type: C.ADD_BETS_EDITING_TICKET,
    bets
  };
};

export const addStakeEditingTicket = stake => {
  return {
    type: C.ADD_STAKE_EDITING_TICKET,
    stake
  };
};

export const addUnconfirmedBet = (line, outcomeId) => {
  return {
    type: C.ADD_UNCONFIRMED_BET,
    line,
    outcomeId
  };
};

export const deleteUnconfirmedBet = key => {
  return {
    type: C.DELETE_UNCONFIRMED_BET,
    key
  };
};

export const removeUnconfirmedBets = () => {
  return {
    type: C.REMOVE_UNCONFIRMED_BETS
  };
};

export const saveMaxPayEditingTicket = maxPay => {
  return {
    type: C.SAVE_MAX_PAY_EDITING_TICKET,
    maxPay
  };
};

export const addPreloader = (preloaderType, ticketId) => {
  return {
    type: C.ADD_PRELOADER,
    preloaderType,
    ticketId
  };
};

export const removePreloaderTicket = () => {
  return {
    type: C.REMOVE_PRELOADER_TICKET
  };
};

export const doCashout = data => {
  return {
    type: C.DO_CASHOUT,
    data
  };
};

export const saveChangesTicket = data => {
  return {
    type: C.SAVE_CHANGES_TICKET,
    data
  };
};

export const rememberAdvice = () => {
  return {
    type: C.REMEMBER_ADVICE
  };
};

export const calculateBet = data => {
  return {
    type: C.CALCULATE_BET,
    data
  };
};

export const calculateTicket = data => {
  return {
    type: C.CALCULATE_TICKET,
    data
  };
};
