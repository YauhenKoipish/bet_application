import C from "../../../Constants/";

export const error_code_phone_registration = boolean => {
    return {
        type: C.ERROR_CODE_PHONE_REGISTRATION,
        value: boolean
    };
};
export const loader_registration_action = boolean => {
    return {
        type: C.LOADER_REGISTRATION_ACTION,
        value: boolean
    };
};

export const no_use_phone_registration = boolean => {
    return {
        type: C.NO_USE_PHONE_REGISTRATION,
        value: boolean
    };
};

export const no_use_data_registration = boolean => {
    return {
        type: C.NO_USE_DATA_REGISTRATION,
        value: boolean
    };
};
export const seccuess_registration = boolean => {
    return {
        type: C.SECCUESS_REGISTRATION,
        value: boolean
    };
};
export const close_window = boolean => {
    return {
        type: C.CLOSE_WINDOW_REDISTRAION,
        value: boolean
    };
};

export const no_use_email_registration = boolean => {
    return {
        type: C.NO_USE_EMAIL_REGISTRATION,
        value: boolean
    };
};

export const no_use_login_registration = boolean => {
    return {
        type: C.NO_USE_LOGIN_REGISTRATION,
        value: boolean
    };
};
export const showRegistrationModal = boolean => {
    return {
        type: C.MODAL_REGISTRATION_SUCCESS,
        value: boolean
    };
};
