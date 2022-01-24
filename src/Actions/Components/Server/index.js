import C from "../../../Constants/";

let socket = (window.socket = null);

export const setStateLoadData = val => {
    return {
        type: C.IS_LOADED_DATA,
        val
    };
};

export const resetState = () => {
    return {
        type: C.RESET_STATE
    };
};
