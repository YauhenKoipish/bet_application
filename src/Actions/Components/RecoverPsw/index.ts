import C from "../../../Constants/";

export const error_date_recover_psw = boolean => {
    return {
        type: C.ERROR_RECOVERY_PSW,
        value: boolean
    };
};
export const stepInputCode = boolean => {
    return {
        type: C.INPUT_SMS_CODE_RECOVERY_PSW,
        value: boolean
    };
};
export const saveNewPsw = boolean => {
    return {
        type: C.SAVE_NEW_PSW,
        value: boolean
    };
};
export const recoveryState = boolean => {
    return {
        type: C.RESET_STATE_RECOVER_PASSWORD,
        value: boolean
    };
};
export const smsCodeValid = boolean => {
    return {
        type: C.RECOVER_SMS_VALID,
        value: boolean
    };
};
export const successChangePsw = boolean => {
    return {
        type: C.SUCCESS_CHANGE_PSW,
        value: boolean
    };
};
