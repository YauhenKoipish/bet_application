import C from "../../../../Constants/";

export const saveUser = user => {
    return {
        type: C.SAVE_USER,
        user
    };
};

export const authorizeFail = () => {
    return {
        type: C.AUTORIZE_FAIL
    };
};

export const authorizeSuccsess = data => {
    return {
        type: C.AUTORIZE_SUCCSESS,
        data
    };
};

export const authorizeResponse = response => {
    return {
        type: C.RESPONSE_AUTORIZE,
        response
    };
};

export const logouteAccount = bbGroup => {
    return {
        type: C.LOGOUT_ACCOUNT,
        bbGroup
    };
};
