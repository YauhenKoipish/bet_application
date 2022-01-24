import C from "../../../Constants/";
import { getWidth } from "../../../Components/Main/Components/TableOutright";

const initialState = {
    isOpen: getWidth() > 1100 ? true : false,
    activeLink: null
};

export const menu = (state = initialState, action) => {
    switch (action.type) {
        case C.OPEN_MENU:
            return {
                ...state,
                isOpen: true
            };
        case C.CLOSE_MENU:
            return {
                ...state,
                isOpen: false
            };
        case C.CHANGE_ACTIVE_MENU:
            // debugger;
            return {
                ...state,
                activeLink: action.value
            };
        default:
            return state;
    }
};
