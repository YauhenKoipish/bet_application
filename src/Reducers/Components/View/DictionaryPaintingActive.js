import C from "../../../Constants/";

const initialState = "mobile";

export const dictionaryPaintingActive = (state = initialState, action) => {
    if (action.type === C.CHANGE_VIEW_PAINTING) {
        return action.name;
    }
    return state;
};
