import C from "./../../../Constants/";

const initialStateResponse = null;

export const responseEndingBonusOnDeposit = (
  state = initialStateResponse,
  action
) => {
  if (action.type === C.ADD_RESPONSE_ENDING_BONUS_ON_DEPOSIT) {
    return action.response;
  }
  return state;
};
