import CONSTATNTS from "../../../Constants";

export const BOOKMAKER_ACTION = value => ({
  type: CONSTATNTS.BOOKMAKER_ADMIN,
  value
});

export const BOOKMAKER_EDIT_STSATUS_EVENT = event => ({
  type: CONSTATNTS.BOOKMAKER_EDIT_STSATUS_EVENT,
  value: event
});
export const saveBookmakerGroup = value => ({
  type: CONSTATNTS.SAVE_BOOKMAKER_GROUP,
  value
});
export const saveClientsBookmaker = value => ({
  type: CONSTATNTS.SAVE_BOOKMAKER_CLIENTS,
  value
});
