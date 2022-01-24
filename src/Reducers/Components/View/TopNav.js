import C from "../../../Constants/";
import { getValTopNavView } from "../../../Services/Shared";

const initialState = {
    rospis: getValTopNavView()
};

export const topNav = (state = initialState, action) => {
    if (action.type === C.CHANGE_VIEW_TOP_NAV) {
        return {
            ...state,
            rospis: action.val
        };
    }
    return state;
};
