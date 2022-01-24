import { combineReducers } from "redux";
import { case1 } from "./Case1/";
import { case2 } from "./Case2/";
import builderInfo from "./Case15/";
import { currentStates } from "./CurrentStates/";
// const initialState = [];
import C from "./../../../Constants/";

export const reqExtraLines = (state = [], action) => {
    if (action.type === C.RESET_STATE) {
        return [];
    }
    if (action.type === C.GET_EXTRALINE) {
        state.push(action.id);
        return state;
    }
    return state;
};

export const extralinesArrayNeedToRequest = (state = [], action) => {
    if (action.type === C.RESET_STATE) {
        return [];
    }
    if (action.type === C.SAVE_EXTRALINES_ARRAY_NEED_TO_REQUEST) {
        return action.array;
    }
    return state;
};

export const server = combineReducers({
    entities: case1,
    eventsAndLines: case2,
    currentStates,
    builderInfo,
    reqExtraLines,
    extralinesArrayNeedToRequest
});
