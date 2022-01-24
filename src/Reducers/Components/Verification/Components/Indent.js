import C, { isCupis } from "../../../../Constants/";

const initialStateBets = {
    bindingFailSource: null,
    identStatus: null,
    personalDataStatus: 3,
    isCanPlay: true,
    isCanTopup: true,
    isCanWithdraw: true,
    isIdentificationInitiated: true,
    scriptFlag: "OpenAccount",
    callMe: null
};

const initialState = {
    bindingFailSource: null,
    identStatus: null,
    personalDataStatus: null,
    isCanPlay: null,
    isCanTopup: null,
    isCanWithdraw: null,
    isIdentificationInitiated: null,
    scriptFlag: null,
    callMe: null
};

export const ident = (
    state = isCupis ? initialState : initialStateBets,
    action
) => {
    if (action.type === C.UPDATE_INDENT_COMPONENT_VERIFICATION) {
        // return { ...action.data, isCanPlay: true }; // сделать action.data
        // return action.data; // сделать action.data
        return state;
    }
    if (action.type === C.LOGOUT_ACCOUNT) {
        // return { ...action.data, isCanPlay: true }; // сделать action.data
        return initialState; // сделать action.data
    }
    return state;
};
