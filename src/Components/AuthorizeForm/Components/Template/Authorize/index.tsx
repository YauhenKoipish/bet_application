import React from "react";

import { ReactComponent as Visible } from "../../../../../img/sabImage/visble.svg";
//autocomplete={false}
export default function AuthorizeTmp(state) {
  return (
    <div className="login__enter-form">
      <label
        className={
          "login__label login__label--login " +
          ((state.stateMain.statusAuthorize &&
            state.stateMain.statusAuthorize.requestId === -1) ||
          (state.stateMain.login && state.stateMain.login.error)
            ? "error"
            : "")
        }
      >
        <input
          type="text"
          className={
            "login__input" +
            (state.props.responseAuthorize &&
            state.props.responseAuthorize === -1
              ? " error"
              : "")
          }
          onChange={e => {
            state.saveInfoLogin(e);
          }}
          value={state.stateMain.Login}
        />
        <span className="name_input" style={{ color: "white" }}>
          {state.props.lang.header.authorize.login}
        </span>
        {state.stateMain.login ? (
          <span className="login__mistake">
            {state.stateMain.login.textError
              ? state.stateMain.login.textError[0]
              : ""}
          </span>
        ) : (
          ""
        )}
      </label>
      <label
        className={
          "login__label " +
          ((state.stateMain.statusAuthorize &&
            state.stateMain.statusAuthorize.requestId === -1) ||
          (state.stateMain.password && state.stateMain.password.error)
            ? "error"
            : "")
        }
      >
        <input
          type="password"
          className="login__input"
          onChange={e => state.saveInfoPassword(e)}
          value={state.stateMain.Password}
        />
        <span className="name_input" style={{ color: "white" }}>
          {state.props.lang.header.authorize.psw}
        </span>
        <div className="login__show-pass">
          <Visible />
        </div>
        {state.stateMain.password ? (
          <span className="login__mistake">
            {state.stateMain.password.textError
              ? state.stateMain.password.textError[0]
              : ""}
          </span>
        ) : (
          ""
        )}
      </label>
    </div>
  );
}
