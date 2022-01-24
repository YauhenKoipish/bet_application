import C from "../../../Constants/";

export const changeStateConnectReplenishmentChanels = val => {
  return {
    type: C.CHANGE_STATE_CONNECT_REPLENISHMENT_CHANELS,
    val
  };
};

export const changeStateConnectWithdrawalChanels = val => {
  return {
    type: C.CHANGE_STATE_CONNECT_WITHDRAWAL_CHANELS,
    val
  };
};

export const changeReplenishmentChanels = chanels => {
  return {
    type: C.CHANGE_REPLENISHMENT_CHANELS,
    chanels
  };
};

export const changeWithdrawalChanels = chanels => {
  return {
    type: C.CHANGE_WITHDRAWAL_CHANELS,
    chanels
  };
};
