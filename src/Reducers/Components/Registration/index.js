import C from "../../../Constants/";
import { combineReducers } from "redux";
import { getLocalStorageData } from "../../../Services/LocalStorage";

const error_code_phone_registration = (status = false, action) => {
  if (action.type === C.RESET_STATE_RECOVER_PASSWORD) {
    return false;
  }
  if (action.type === C.ERROR_CODE_PHONE_REGISTRATION) {
    return action.value;
  }
  return status;
};
const no_use_phone_registration = (status = false, action) => {
  if (action.type === C.NO_USE_PHONE_REGISTRATION) {
    return action.value;
  }
  return status;
};
const no_use_data_registration = (status = false, action) => {
  if (action.type === C.NO_USE_DATA_REGISTRATION) {
    return action.value;
  }
  return status;
};
const no_use_email_registration = (status = false, action) => {
  if (action.type === C.NO_USE_EMAIL_REGISTRATION) {
    return action.value;
  }
  return status;
};
const no_use_login_registration = (status = false, action) => {
  if (action.type === C.NO_USE_LOGIN_REGISTRATION) {
    return action.value;
  }
  return status;
};
const close_window_registration = (status = false, action) => {
  if (action.type === C.CLOSE_WINDOW_REDISTRAION) {
    return action.value;
  }
  return status;
};
const seccess_registration = (status = false, action) => {
  if (action.type === C.SECCUESS_REGISTRATION) {
    return action.value;
  }
  return status;
};
const loader_registration = (status = false, action) => {
  if (action.type === C.LOADER_REGISTRATION_ACTION) {
    return action.value;
  }
  return status;
};
const timerSMS = (
  status = getLocalStorageData("Timer") ? getLocalStorageData("Timer") : 0,
  action
) => {
  if (action.type === C.TIMER_REGISTRATION) {
    return action.value;
  }
  return status;
};

export default combineReducers({
  error_code_phone_registration,
  no_use_phone_registration,
  no_use_data_registration,
  no_use_email_registration,
  no_use_login_registration,
  seccess_registration,
  loader_registration,
  close_window_registration,
  timerSMS
});
