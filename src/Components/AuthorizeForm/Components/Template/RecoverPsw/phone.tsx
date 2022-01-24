import React from "react";
// import Dropdown from "../Registration/Dropdown";
import reficon from "../../../Img/refresh.svg";
// import { getLocalStorageData } from "../../../../../Services/LocalStorage";
import CalendarRegistration from "../../../../Calendar/";
import { getSportIcon } from "../../../../../Services/Shared";
export default function Phone(state) {
  return (
    <>
      <label
        className={
          "login__label " +
          (state.props.recoverPSW.error_date_recover_psw ||
          state.props.error_code_phone_registration
            ? "error"
            : "")
        }
      >
        {state.props.lang.numberPhone}
        <div className="flex center">
          <span>+</span>
          <input
            type="text"
            className="login__input"
            onChange={e => state.changePhone(e)}
            ref={state.refEl}
            value={state.stateMain.valueInputRef}
            disabled={
              state.props.recoverPSW.stepInputCode || state.props.timerSms != 0
                ? true
                : false
            }
          />
        </div>
        <div
          className={
            "text " +
            (state.stateMain.valueInputRef.length > 5 ||
            state.stateMain.valueInputRef.length == 0
              ? ""
              : "error")
          }
        >
          {state.stateMain.valueInputRef.length > 5 ||
          state.stateMain.valueInputRef.length == 0
            ? ""
            : state.props.lang.header.registration.errors.notValidMask}
        </div>
      </label>

      <div
        className={
          " recover_birthday" +
          (state.props.recoverPSW.error_date_recover_psw ||
          state.props.error_code_phone_registration
            ? " error"
            : "")
        }
      >
        <div className="flex">
          <label
            className={
              "login__label login__label--nationality three-select " +
              (state.stateMain.date ? "gray_color" : "")
            }
            onClick={
              state.stateMain.date
                ? f => f
                : e => state.openSelectCountry("calendar", e)
            }
          >
            <span>{state.props.lang.header.registration.birthday}</span>
            <div className="flex">
              {/* {state.elem.day &&
                            state.elem.month &&
                            state.elem.years ? (
                                <div className="login__country">
                                    {state.elem.day +
                                        "/" +
                                        state.elem.month +
                                        "/" +
                                        state.elem.years}
                                </div>
                            ) : (
                                ""
                            )} */}
              <span className="position_right">
                {state.stateMain.date
                  ? getSportIcon("calendar-active", "#283042")
                  : getSportIcon("calendar", "#40485A")}
              </span>
            </div>
          </label>
          {state.stateMain.date ? (
            <CalendarRegistration
              lang={state.props.lang}
              setValueCalendar={state.setValueCalendar}
            />
          ) : (
            ""
          )}
        </div>
        {!state.stateMain.date ? (
          <span className="error_date"> {state.stateMain.errorTextDate} </span>
        ) : (
          ""
        )}
      </div>
      {state.props.recoverPSW.stepInputCode || state.props.timerSms != 0 ? (
        <>
          <label
            className={
              "login__label " +
              (state.props.recoverPSW.error_date_recover_psw ||
              state.props.error_code_phone_registration
                ? " error"
                : "")
            }
          >
            <span>{state.props.lang.header.recoverPas.codeAccept}</span>
          </label>

          <div className="flex">
            <input
              className={
                "code_recover_psw login__input" +
                (state.props.recoverPSW.error_date_recover_psw ||
                state.props.error_code_phone_registration
                  ? " error"
                  : "")
              }
              ref={state.refCode}
              onChange={e => state.setSmsCode(e)}
            />
            {state.props.timerSms != 0 ||
            state.props.recoverPSW.stepInputCode ? ( //&&
              // state.props.recoverPSW.stepInputCode
              <div
                className={
                  "login__resend recoverPsw" +
                  (state.props.timerSms != 0 ? " opacity50" : "")
                }
                onClick={
                  state.props.timerSms == 0 ? () => state.reSendCode() : f => f
                }
              >
                {state.props.timerSms != 0 ? (
                  state.props.timerSms
                ) : (
                  <img src={reficon} alt="" />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        ""
      )}

      <div
        className={
          "login__enter-button " +
          (state.stateMain.phone && state.stateMain.date
            ? state.props.recoverPSW.stepInputCode
              ? " "
              : state.props.timerSms != 0
              ? "opacity50"
              : ""
            : "opacity50")
        }
        onClick={
          state.stateMain.phone && state.stateMain.date
            ? state.props.recoverPSW.stepInputCode
              ? () => state.func()
              : state.props.timerSms != 0
              ? f => f
              : () => state.func()
            : f => f
        }
      >
        {state.props.lang.header.recoverPas.continue}
      </div>
      {state.props.recoverPSW.error_date_recover_psw ||
      state.props.error_code_phone_registration ? (
        <div className="login__non-exist">
          {!state.props.error_code_phone_registration
            ? state.props.lang.header.recoverPas.errorDate
            : state.props.lang.header.registration.errors.invalidCode}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
