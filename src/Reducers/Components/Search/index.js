import C from "../../../Constants/";
import { combineReducers } from "redux";

const initialStateIsOpen = false;

export const isOpen = (state = initialStateIsOpen, action) => {
    if (action.type === C.OPEN_SEARCH) {
        return true;
    } else if (action.type === C.CLOSE_SEARCH) {
        return false;
    }
    return state;
};

const initialStateData = null;

export const data = (state = initialStateData, action) => {
    if (action.type === C.CHANGE_SEARCH_RESULT) {
        return action.data;
    } else if (
        action.type === C.OPEN_SEARCH ||
        action.type === C.CLOSE_SEARCH
    ) {
        return null;
    }
    return state;
};

export default combineReducers({
    isOpen,
    data
});
