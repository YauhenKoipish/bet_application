import C from "../../../../Constants/";
import { combineReducers } from "redux";

const initialState = 0;

const builderCoef = (state = initialState, action) => {
    if (action.type === C.RESET_STATE) {
        return initialState;
    }
    if (action.type === C.SAVE_COEF_BUILER) {
        const newState = { ...action };
        return newState.coef;
    }
    return state;
};

const builderError = (
    state = {
        errorCode: null,
        errorMsg: null
    },
    action
) => {
    if (action.type === C.ERROR_CODE_BUILDER) {
        if (!state.errorCode) {
            return action.arr;
        }
    }
    if (action.type === C.REMOVE_ERROR_BUILDER) {
        const newState = {
            errorCode: null,
            errorMsg: null
        };
        return newState;
    }
    return state;
};

const initStateBB = {};

const builder = (state = initStateBB, action) => {
    if (action.type === C.EDIT_BUILDER) {
        const newState = { ...state };
        if (newState[action.event.id]) {
            // debugger;
            newState[action.event.id].forEach((element, key) => {
                if (key.split("_")[0] == action.line.compoundKey) {
                    // debugger;
                    newState[action.event.id].get(
                        key
                    ).tabInfo.lineActiveMarket = action.line;
                }
            });
        }
        return newState;
    }

    if (action.type === C.ADD_BB_GROUP) {
        const bbGroup = action.bbGroup;
        const eventProp = action.bbGroup.tabInfo.lineActiveMarket.eventId;

        const outcomeId = action.bbGroup.tabInfo.outcomeId;

        if (eventProp in state) {
            if (
                !state[eventProp].has(
                    `${action.bbGroup.tabInfo.lineActiveMarket.compoundKey}_${outcomeId}`
                )
            )
                state[eventProp].set(
                    `${action.bbGroup.tabInfo.lineActiveMarket.compoundKey}_${outcomeId}`,
                    bbGroup
                );
            return state;
        } else {
            state[eventProp] = new Map();
            // debugger;
            state[eventProp].set(
                `${action.bbGroup.tabInfo.lineActiveMarket.compoundKey}_${outcomeId}`,
                bbGroup
            );
            return state;
        }
    }
    if (action.type === C.REMOVE_ONE_BUILDER) {
        // debugger;
        state[action.removeOne.event].delete(action.removeOne.key);
        return { ...state };
    }
    if (action.type === C.REMOVE_ALL_BUILDER) {
        // debugger;
        return {};
    }
    return state;
};

export default combineReducers({
    builderCoef,
    builder,
    builderError
});
