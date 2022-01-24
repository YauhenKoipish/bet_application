import CONSTATNTS from "../../../../Constants";

export const group = (state = new Map(), action) => {
  if (action.type === CONSTATNTS.SAVE_BOOKMAKER_GROUP) {
    const newState = new Map(state);
    if (newState.has(action.value.id)) {
      newState.delete(action.value.id);
      return newState;
    }

    newState.set(action.value.id, action.value);
    return newState;
  }

  return state;
};
