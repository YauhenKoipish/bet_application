import C from "../../../Constants/";
import { combineReducers } from "redux";
import {
    getDefaultOpenValue,
    stringifyMap,
    parseMap
} from "../../../Services/Shared";
import {
    setLocalStorage,
    getLocalStorageData,
    removeLocalStorageDate
} from "../../../Services/LocalStorage";
const initialStateDefaultOpen = getDefaultOpenValue();

export const defaultOpen = (state = initialStateDefaultOpen, action) => {
    if (action.type === C.COUPON_CHANGE_DEFAULT_OPEN) {
        return action.defaultOpen;
    }
    return state;
};

const initialStateOrdinars = [];

const ordinars = (state = initialStateOrdinars, action) => {
    switch (action.type) {
        case C.ADD_ORDINAR_TO_COUPON: {
            if (!action.compoundKey || action.outcomeId < 0) return state;
            const newOrdinars = [
                ...state,
                {
                    compoundKey: action.compoundKey,
                    outcomeId: action.outcomeId
                }
            ];
            setLocalStorage("coupon", newOrdinars);
            return newOrdinars;
        }
        case C.REMOVE_ORDINAR_FROM_COUPON: {
            if (!action.compoundKey || action.outcomeId < 0) return state;
            const newOrdinars = [...state].filter(ordinar => {
                if (
                    ordinar.compoundKey === action.compoundKey &&
                    ordinar.outcomeId === action.outcomeId
                )
                    return false;
                return true;
            });
            if (newOrdinars.length === 0) {
                removeLocalStorageDate("coupon");
                removeLocalStorageDate("couponInputValues");
            } else setLocalStorage("coupon", newOrdinars);
            return newOrdinars;
        }
        case C.ADD_ORDINARS_TO_COUPON: {
            return action.ordinars;
        }
        case C.ADD_UNCONFIRMED_BET_WHEN_EDITING: {
            if (!action.compoundKey || action.outcomeId < 0) return state;
            const newOrdinars = [...state].filter(ordinar => {
                if (
                    ordinar.compoundKey === action.compoundKey &&
                    ordinar.outcomeId === action.outcomeId
                )
                    return false;
                return true;
            });
            return newOrdinars;
        }
        case C.CLEAR_COUPON: {
            removeLocalStorageDate("coupon");
            return initialStateOrdinars;
        }
        default:
            return state;
    }
};

const initialStateRememberedOrdinars = [];

const rememberedOrdinars = (state = initialStateRememberedOrdinars, action) => {
    switch (action.type) {
        case C.REMEMBER_ORDINARS: {
            return action.ordinars;
        }
        default:
            return state;
    }
};

const initialStateIsOpen = false;

export const isOpen = (state = initialStateIsOpen, action) => {
    if (action.type === C.OPEN_COUPON || action.type === C.CLOSE_COUPON) {
        return action.isOpen;
    }
    return state;
};

const initialStateOrdinarInfo = new Map();

export const ordinarsInfo = (state = initialStateOrdinarInfo, action) => {
    if (action.type === C.ADD_ORDINAR_INFO) {
        state.set(action.line.compoundKey, {
            line: action.line,
            event: action.event
        });
        return state;
    } else if (action.type === C.REMOVE_ORDINAR_INFO) {
        state.delete(action.compoundKey);
        return state;
    } else if (action.type === C.CLEAR_COUPON) {
        return initialStateOrdinarInfo;
    }
    return state;
};

const initialStateCoefs = {
    ordinars: new Map(),
    express: null,
    system: null
};

export const coefs = (state = initialStateCoefs, action) => {
    if (action.type === C.ADD_EXPRESS_COEF) {
        let coef = action.coef;
        if (!coef || coef === "-") coef = 0;
        return {
            ...state,
            express: coef
        };
    } else if (action.type === C.ADD_SYSTEM_COEF) {
        let coef = action.coef;
        if (!coef || coef === "-") coef = 0;
        return {
            ...state,
            system: coef
        };
    } else if (action.type === C.ADD_ORDINAR_COEF) {
        let coef = action.coef;
        if (!coef || coef === "-") coef = 0;
        return {
            ...state,
            ordinars: state.ordinars.set(action.ordinar, coef)
        };
    } else if (action.type === C.REMOVE_ORDINAR_COEF) {
        state.ordinars.delete(action.ordinar);
        return {
            ...state
        };
    } else if (action.type === C.REMOVE_ORDINAR_FROM_COUPON) {
        state.ordinars.delete(action.compoundKey + "-" + action.outcomeId);
        return {
            ...state
        };
    } else if (action.type === C.REMOVE_EXPRESS_COEF) {
        return {
            ...state,
            express: null
        };
    } else if (action.type === C.REMOVE_SYSTEM_COEF) {
        return {
            ...state,
            system: null
        };
    } else if (action.type === C.CLEAR_COUPON) {
        return initialStateCoefs;
    }
    return state;
};

const initialStateInputValuesFromLS = getLocalStorageData("couponInputValues");

const initialStateInputValues = initialStateInputValuesFromLS
    ? {
          ...initialStateInputValuesFromLS,
          ordinars: parseMap(initialStateInputValuesFromLS.ordinars)
      }
    : {
          ordinars: new Map(),
          express: null,
          system: null,
          builder: null
      };

export const inputValues = (state = initialStateInputValues, action) => {
    if (action.type === C.ADD_SUM_INPUT_BUILDER) {
        const newState = {
            ...state,
            builder: action.sum
        };
        saveInputValuesToLocalStorage(newState);
        return newState;
    }
    if (action.type === C.ADD_SUM_INPUT_EXPRESS) {
        const newState = {
            ...state,
            express: action.sum
        };
        saveInputValuesToLocalStorage(newState);
        return newState;
    } else if (action.type === C.ADD_SUM_INPUT_SYSTEM) {
        const newState = {
            ...state,
            system: action.sum
        };
        saveInputValuesToLocalStorage(newState);

        return newState;
    } else if (action.type === C.ADD_SUM_INPUT_ORDINAR) {
        const ordinars = state.ordinars;
        if (action.sum) ordinars.set(action.ordinar, action.sum);
        else if (ordinars.has(action.ordinar)) ordinars.delete(action.ordinar);
        saveInputValuesToLocalStorage(state);

        return {
            ...state
        };
    } else if (action.type === C.REMOVE_SUM_INPUT_ORDINAR) {
        state.ordinars.delete(action.ordinar);
        saveInputValuesToLocalStorage(state);

        return {
            ...state
        };
    } else if (action.type === C.REMOVE_ORDINAR_FROM_COUPON) {
        console.warn("Remove_ORDINAR_FROM_)COUPON");
        // debugger;

        state.ordinars.delete(action.compoundKey + "-" + action.outcomeId);
        saveInputValuesToLocalStorage(state);

        return {
            ...state
        };
    } else if (action.type === C.CLEAR_COUPON) {
        removeLocalStorageDate("couponInputValues");
        return {
            ordinars: new Map(),
            express: null,
            system: null,
            builder: null
        };
    }
    return state;
};

const initialStateSettingInputValues = {
    ordinars: new Map(),
    express: null,
    system: null,
    builder: null
};

export const settingInputValues = (
    state = initialStateSettingInputValues,
    action
) => {
    if (action.type === C.SET_SUM_INPUT_BUILDER) {
        return {
            ...state,
            builder: action.sum
        };
    }
    if (action.type === C.SET_SUM_INPUT_EXPRESS) {
        return {
            ...state,
            express: action.sum
        };
    } else if (action.type === C.SET_SUM_INPUT_SYSTEM) {
        return {
            ...state,
            system: action.sum
        };
    } else if (action.type === C.SET_SUM_INPUT_ORDINAR) {
        const ordinars = state.ordinars;
        ordinars.set(action.ordinar, action.sum);
        return {
            ...state
        };
    } else if (action.type === C.REMOVE_SETTING_SUM_INPUT_ORDINAR) {
        state.ordinars.delete(action.ordinar);
        return {
            ...state
        };
    }
    return state;
};

const initialStateMaxPay = {
    ordinars: new Map(),
    express: null,
    system: null,
    builder: null
};

export const maxPay = (state = initialStateMaxPay, action) => {
    if (action.type === C.SAVE_MAX_PAY_COUPON) {
        switch (action.requestId) {
            case "builder":
                return { ...state, builder: action.maxPay };
            case "express":
                return { ...state, express: action.maxPay };
            case "system":
                return { ...state, system: action.maxPay };
            default:
                state.ordinars.set(action.requestId, action.maxPay);
                return { ...state };
        }
    } else if (action.type === C.DELETE_ORDINAR_MAX_PAY) {
        state.ordinars.delete(action.ordinar);
        return { ...state };
    }
    return state;
};

const initialStateMultibetsInfo = {
    isBlocked: false,
    isExceedMaxCount: false,
    isOrdinarsFromOneEvent: false
};

export const multibetsInfo = (state = initialStateMultibetsInfo, action) => {
    if (action.type === C.ADD_MULTIBETS_INFO) {
        return action.data;
    }
    return state;
};

const initialStateSystem = {
    rang: null
};

export const system = (state = initialStateSystem, action) => {
    if (action.type === C.CHANGE_SYSTEM_RANG) {
        return {
            ...state,
            rang: action.rang
        };
    }
    return state;
};

const initialStateSendingData = null;

export const sendingData = (state = initialStateSendingData, action) => {
    if (action.type === C.ADD_SENDING_DATA) {
        return action.data;
    }
    return state;
};

const initStateBuilder = null;

export const couponBuilder = (state = initStateBuilder, action) => {
    if (action.type === C.COUPON_BUILDER) {
        return action.val;
    }
    if (action.type === C.CLEAR_COUPON) {
        return null;
    }
    return state;
};

const couponSettingsFromLS = getLocalStorageData("couponSettings");

const initialStateSettings = couponSettingsFromLS
    ? {
          ...couponSettingsFromLS,
          fastBet: null,
          changingMaxPay: couponSettingsFromLS.hasOwnProperty("changingMaxPay")
              ? couponSettingsFromLS.changingMaxPay
              : false
      }
    : {
          changingCoefs: 0,
          fastBet: null,
          changingMaxPay: false
      };

export const settings = (state = initialStateSettings, action) => {
    if (action.type === C.SET_CHANGING_COEFS) {
        const newState = {
            ...state,
            changingCoefs: action.val
        };
        setLocalStorage("couponSettings", newState);
        return newState;
    } else if (action.type === C.SET_FAST_BET) {
        const newState = {
            ...state,
            fastBet: action.val
        };
        setLocalStorage("couponSettings", newState);
        return newState;
    } else if (action.type === C.SET_ALL_SETTINGS_COUPON) {
        const newState = {
            ...state,
            fastBet: action.fastBet,
            changingCoefs: action.changingCoefs,
            changingMaxPay: action.changingMaxPay
        };
        setLocalStorage("couponSettings", newState);
        return newState;
    }
    return state;
};

const initialStateIsAcceptedChanges = true;

export const isAcceptedChanges = (
    state = initialStateIsAcceptedChanges,
    action
) => {
    if (action.type === C.ACCEPT_CHANGES) {
        return action.val;
    } else if (action.type === C.SET_ALL_SETTINGS_COUPON) {
        return true;
    }
    return state;
};

const initialStateSendingTicketType = null;

export const sendingTicketType = (
    state = initialStateSendingTicketType,
    action
) => {
    if (action.type === C.SET_TYPE_SENDING_TICKET) {
        return action.val;
    }
    return state;
};

const saveInputValuesToLocalStorage = state => {
    const savingState = { ...state };
    savingState.ordinars = stringifyMap(savingState.ordinars);
    setLocalStorage("couponInputValues", savingState);
};

export default combineReducers({
    defaultOpen,
    isOpen,
    ordinars,
    ordinarsInfo,
    coefs,
    inputValues,
    maxPay,
    multibetsInfo,
    system,
    sendingData,
    settingInputValues,
    couponBuilder,
    settings,
    isAcceptedChanges,
    sendingTicketType,
    rememberedOrdinars
});
