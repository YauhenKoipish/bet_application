import C from "../../../Constants";
import { combineReducers } from "redux";

// const sendNewPSW = (state = false, action) => {
//     if (action.type === C.SEND_NEW_PSW) {
//         return action.status;
//     }
//     return state;
// };
// const sendCodeNumber = (state = false, action) => {
//     if (action.type === C.SEND_CODE_NUMBER) {
//         return action.status;
//     }
//     return state;
// };
// const sendCode = (state = false, action) => {
//     if (action.type === C.SEND_CODE_RECOVER) {
//         return action.status;
//     }
//     return state;
// };
// const changePSWmyAccount = (state = false, action) => {
//     if (action.type === C.CHANGE_PSW_MY_ACCOUNT) {
//         return action.status;
//     }
//     return state;
// };
// const faillPsw = (state = false, action) => {
//     if (action.type === C.FAIL_CHANGE_PSW) {
//         return action.status;
//     }
//     return state;
// };
const initState = false;

export const error_date_recover_psw = (state = initState, action) => {
    if (action.type === C.RESET_STATE_RECOVER_PASSWORD) {
        return false;
    }
    if (action.type === C.ERROR_RECOVERY_PSW) return action.value;

    return state;
};
export const stepInputCode = (state = initState, action) => {
    if (action.type === C.RESET_STATE_RECOVER_PASSWORD) {
        return false;
    }
    if (action.type === C.INPUT_SMS_CODE_RECOVERY_PSW) return action.value;

    return state;
};
export const saveNewPsw = (state = initState, action) => {
    if (action.type === C.RESET_STATE_RECOVER_PASSWORD) {
        return false;
    }
    if (action.type === C.SAVE_NEW_PSW) return action.value;

    return state;
};
export const validSms = (state = initState, action) => {
    if (action.type === C.RESET_STATE_RECOVER_PASSWORD) {
        return false;
    }
    if (action.type === C.RECOVER_SMS_VALID) return action.value;

    return state;
};
export const successChangePsw = (state = initState, action) => {
    if (action.type === C.RESET_STATE_RECOVER_PASSWORD) {
        return false;
    }
    if (action.type === C.SUCCESS_CHANGE_PSW) return action.value;

    return state;
};

export default combineReducers({
    error_date_recover_psw,
    stepInputCode,
    saveNewPsw,
    validSms,
    successChangePsw
});
