import React, { useState } from "react";
import { connect } from "react-redux";

import Login from "./Components/Login";
import RecoverPassword from "./Components/RecoverPassword";
import Registration from "./Components/Registration";
import history from "../../Router/History";

import { Switch, Route, Redirect } from "react-router-dom";
import {
  error_code_phone_registration,
  no_use_phone_registration,
  no_use_data_registration,
  no_use_email_registration,
  no_use_login_registration,
  seccuess_registration,
  loader_registration_action
} from "../../Actions/Components/Registraion";

import {
  changePswMyAccount,
  faillchangePsw,
  sendCode,
  sendCodeNumberLogin,
  sendNewPSW,
  flagRegistrationRedirect
} from "../../Actions/Components/User";

// import "./Style/login.css";
// import "./Style/help-popup.css";
import { routsName } from "../../Router/RouterList";

const AuthorizeForm = props => {
  const interval = null;
  const signIn =
    props.history.location.pathname ===
    routsName.getRoutsUrl(routsName.dict["login"], routsName.dict["signin"])
      ? true
      : false;

  const goBackHistory = () => {
    props.error_code_phone_registration(false);
    props.no_use_phone_registration(false);
    props.no_use_data_registration(false);
    props.no_use_email_registration(false);
    props.no_use_login_registration(false);
    props.seccuess_registration(false);

    props.changePswMyAccount(false);
    props.faillchangePsw(false);
    props.sendCode(false);
    props.sendCodeNumberLogin(false);
    props.sendNewPSW(false);

    let flag = true;
    if (props.historyRoute.length == 1) props.history.push("/prematch");
    else {
      for (let i = props.historyRoute.length - 1; i != 0; i--) {
        if (props.historyRoute[i].split("/")[1] != "login") {
          props.history.push(props.historyRoute[i].toString());
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      props.history.push("/prematch");
    }
  };

  const [redirrect, setRedirrect] = useState(props.autorizeReconnect);

  function setState(string) {
    props.flagRegistrationRedirect(string);
    setRedirrect(string);
  }

  console.log(
    routsName.getRoutsUrl(routsName.dict["login"], routsName.dict["signin"]),
    "ROUTE"
  );
  return (
    <div className="login">
      <div className="login__wrapper" onClick={() => goBackHistory()} />
      <div className="login__popup">
        {props.history.location.pathname ===
        routsName.getRoutsUrl(
          routsName.dict["login"],
          routsName.dict["recoverPassword"]
        ) ? (
          ""
        ) : (
          <div className="login__titles-list">
            <div
              className={"login__title " + (signIn ? "active" : "")}
              onClick={() =>
                history.replace(routsName.getRoutsUrl("login", "signin"))
              }
            >
              {props.lang.header.authorize.title}
            </div>
            <div
              className={"login__title " + (!signIn ? "active" : "")}
              onClick={() =>
                history.replace(routsName.getRoutsUrl("login", "registration"))
              }
            >
              {props.lang.header.authorize.regist}
            </div>

            {/* <div className="login__close" /> */}
          </div>
        )}
        <div className="login__body">
          {!props.user ? (
            <>
              <Switch>
                <Route
                  path={routsName.getRoutsUrl(
                    routsName.dict["login"],
                    routsName.dict["signin"]
                  )}
                  component={(propsRoute: any) => (
                    <Login {...propsRoute} isAuthorize={props.user} />
                  )}
                />
                <Route
                  path={routsName.getRoutsUrl(
                    routsName.dict["login"],
                    routsName.dict["recoverPassword"]
                  )}
                  component={(propsRoute: any) => (
                    <RecoverPassword {...propsRoute} isAuthorize={props.user} />
                  )}
                />
                <Route
                  path={routsName.getRoutsUrl(
                    routsName.dict["login"],
                    routsName.dict["registration"]
                  )}
                  component={Registration}
                  interval={interval}
                />
                <Redirect
                  from={routsName.getRoutsUrl(routsName.dict["login"]) + "/"}
                  to={routsName.getRoutsUrl(
                    routsName.dict["login"],
                    routsName.dict["registration"]
                  )}
                />
              </Switch>
            </>
          ) : (
            <>
              {/* {redirrectOrModal() ? (
                                <ModalSuccess callback={setState} />
                            ) : ( */}
              <Redirect
                from={routsName.getRoutsUrl(routsName.dict["login"])}
                to={"/"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );

  function redirrectOrModal() {
    if (props.user) {
      const lastUrl = props.historyRoute[props.historyRoute.length - 1].split(
        "/"
      );
      if (lastUrl.includes("signin")) {
        return false;
      } else {
        if (redirrect) {
          return false;
        }
        return true;
      }
    }
    return true;
  }
};
const mapStateToProps = (state: any) => {
  return {
    historyRoute: state.history,
    lang: state.user.language_user.dict,
    user: state.user.isAuthorize,
    autorizeReconnect: state.user.reconnect,
    flagRegistrationRedirect: state.user.flagRegistrationRedirect
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    error_code_phone_registration: (boolen: boolean) =>
      dispatch(error_code_phone_registration(boolen)),
    no_use_phone_registration: (boolen: boolean) =>
      dispatch(no_use_phone_registration(boolen)),
    no_use_data_registration: (boolen: boolean) =>
      dispatch(no_use_data_registration(boolen)),
    no_use_email_registration: (boolen: boolean) =>
      dispatch(no_use_email_registration(boolen)),
    seccuess_registration: (boolen: boolean) =>
      dispatch(seccuess_registration(boolen)),
    no_use_login_registration: (boolen: boolean) =>
      dispatch(no_use_login_registration(boolen)),
    loader_registration_action: (boolen: boolean) =>
      dispatch(loader_registration_action(boolen)),
    changePswMyAccount: (boolen: boolean) =>
      dispatch(changePswMyAccount(boolen)),
    faillchangePsw: (boolen: boolean) => dispatch(faillchangePsw(boolen)),
    sendCode: (boolen: boolean) => dispatch(sendCode(boolen)),
    sendCodeNumberLogin: (boolen: boolean) =>
      dispatch(sendCodeNumberLogin(boolen)),
    sendNewPSW: (boolen: boolean) => dispatch(sendNewPSW(boolen)),
    flagRegistrationRedirect: string =>
      dispatch(flagRegistrationRedirect(string))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizeForm);
