import CONSTATNTS from "../../../../Constants";

export const clients = (state = new Map(), action) => {
  if (action.type === CONSTATNTS.SAVE_BOOKMAKER_CLIENTS) {
    const newState = new Map(state);
    newState.set(action.value.id_client, {
      ...action.value
    });

    return newState;
  }

  return state;
};
