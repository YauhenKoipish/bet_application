import React from "react";

import { connect } from "react-redux";
import {
  authorizeByLogin,
  // forgotPasswordRecovery,
  sendRecoverySMS,
  recoverClientPassword,
  checkRegistrationClientPhone
} from "../../../Server";
import {
  error_code_phone_registration,
  no_use_phone_registration,
  no_use_data_registration,
  no_use_email_registration,
  no_use_login_registration,
  seccuess_registration,
  loader_registration_action
} from "../../../Actions/Components/Registraion";

import { authorize_recover_password } from "../../../Actions/Components/User";
import { setLocalStorage } from "../../../Services/LocalStorage";

import AuthorizeTmp from "./Template/Authorize/";

import Phone from "./Template/RecoverPsw/phone";
import { routsName } from "../../../Router/RouterList";
import { getIcon } from "../../../Services/Shared";

class Login extends React.Component {
  state: any;
  _isBeUpdated: any;
  props: any;
  timer: any;
  btn: any;
  constructor(props: any) {
    super(props);
    this.isUpdate = false;
    this.btn = React.createRef();
    this.state = {
      Login: "",
      Password: "",
      isAuthorize: false,
      statusAuthorize: {},
      reSendPSW: false,
      phoneNumber: "+7",
      codeResend: "",
      newPsw: "",
      newPswRepeat: ""
    };
  }

  get isUpdate() {
    if (this._isBeUpdated) {
      this._isBeUpdated = false;
      return true;
    }
    return false;
  }

  set isUpdate(val) {
    this._isBeUpdated = val;
  }

  shipmentСheck() {
    if (this.state.Login && this.state.Password && !this.props.isAuthorize) {
      authorizeByLogin(this.state);
    }
  }

  setToken() {
    setLocalStorage("Password", this.props.user.token2);
    setLocalStorage("Login", this.props.user.accessToken);
  }

  saveInfoPassword(e) {
    // debugger;
    this.state.Password = e.target.value.replace(" ", "");
    this.setState(this.state);
  }
  saveInfoLogin(e) {
    // debugger;
    this.state.Login = e.target.value.replace(" ", "");
    this.setState(this.state);
  }

  saveNewPSW() {
    if (this.state.newPsw == this.state.newPswRepeat) {
      recoverClientPassword(this.state.newPswRepeat);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.user != this.state.isAuthorize) {
      this.state.isAuthorize = nextProps.user;
    }
    if (nextProps.statusAuthorize != this.state.statusAuthorize) {
      this.state.statusAuthorize = nextProps.statusAuthorize;
    }
    // if (nextProps.responseAuthorize != this.state.statusAuthorize) {
    //     this.state.statusAuthorize = nextProps.statusAuthorize;
    // }
    return true;
  }

  getCodeToNumber() {
    // if (this.state.phoneNumber.length === 12)
    // forgotPasswordRecovery(this.state.phoneNumber);
  }

  reSendPSW() {
    const newState = { ...this.state, reSendPSW: true };

    this.setState(newState);
  }

  codeResend(e) {
    const newState = { ...this.state, codeResend: e.target.value };
    this.setState(newState);
  }

  phoneNumber(e) {
    let phoneNumber = e.target.value;
    checkRegistrationClientPhone(e.target.value.replace(/[^+\d]/g, ""));
    phoneNumber = e.target.value;
    const newState = { ...this.state, phoneNumber };
    clearTimeout(this.timer);
    this.setState(newState);
  }
  goBackHistory() {
    let flag = true;
    if (this.props.historyRoute.length == 1)
      this.props.history.push("/prematch");
    else {
      for (let i = this.props.historyRoute.length - 1; i != 0; i--) {
        if (this.props.historyRoute[i].split("/")[1] != "login") {
          this.props.history.push(this.props.historyRoute[i].toString());
          flag = false;
          break;
        }
      }
    }
    if (flag) {
      this.props.history.push("/prematch");
    }
  }

  sendInfoRecoverPsw() {
    // debugger;
    const newState = {
      ...this.state,
      Login: this.state.phoneNumber,
      Password: this.state.newPswRepeat
    };

    this.props.authorizeByLoginFalse();
    authorizeByLogin(newState);
    this.setState({
      Login: "",
      Password: "",
      isAuthorize: false,
      statusAuthorize: {},
      reSendPSW: false,
      phoneNumber: "+7",
      codeResend: "",
      newPsw: "",
      newPswRepeat: ""
    });
    // this.props.error_code_phone_registration(false);
    // this.props.no_use_phone_registration(false);
    // this.props.no_use_data_registration(false);
    // this.props.no_use_email_registration(false);
    // this.props.no_use_login_registration(false);
    // this.props.seccuess_registration(false);
    // this.props.loader_registration_action(true);
  }

  render() {
    if (this.props.user) {
      this.setToken();
    }
    return this.props.user ? (
      <>{this.goBackHistory()}</>
    ) : (
      <>
        <div className="login__enter ">{this.authorizetmp()}</div>
      </>
    );
  }
  getActualitiTmp() {
    if (!this.props.recoverPSW.sendCodeNumber) {
      return <Phone />;
      // return this.recendPswTmp();
    } else if (this.props.recoverPSW.sendCode) {
      return this.newPswTmp();
    } else if (this.props.recoverPSW.sendNewPSW) return this.succesResendPsw();

    return <Phone />;
    // this.recendPswTmp();
  }

  succesResendPsw() {
    return (
      <div className="login__success">
        <div>{this.props.lang.newPswSuccessSave}</div>
      </div>
    );
  }

  newPswTmp() {
    return (
      <div className="login__new-pass">
        <div className="login__type">
          {this.props.lang.header.recoverPas.title}
        </div>
        <label className="login__label login__label--password">
          {this.props.lang.header.recoverPas.acceptNewPsw}
          <input
            type="password"
            className="login__input"
            value={this.state.newPsw}
            onChange={e => this.newPsw(e)}
          />
          <div className="login__show-pass invisible" />
          <span className="login__mistake" />
        </label>
        <label className="login__label">
          {this.props.lang.acceptNewPassword}
          <input
            type="password"
            className="login__input"
            value={this.state.newPswRepeat}
            onChange={e => this.newPswRepeat(e)}
          />
          <div className="login__show-pass invisible" />
          <span className="login__mistake" />
        </label>

        <div
          className="login__enter-button"
          id="id_enter_event"
          ref={this.btn}
          onClick={() => this.saveNewPSW()}
        >
          {this.props.lang.header.recoverPas.save}
        </div>
        <div className="login__non-exist inactive">
          {this.props.lang.errorAccountCreate}
        </div>
      </div>
    );
  }
  newPswRepeat(e) {
    this.state.newPswRepeat = e.target.value;
    this.setState(this.state);
  }
  newPsw(e) {
    this.state.newPsw = e.target.value;
    this.setState(this.state);
  }

  recendPswTmp = () => {
    return (
      <div className="login__restore">
        <div className="login__type">
          {this.props.lang.header.recoverPas.title}
        </div>
        <label
          className={
            "login__label " +
            (!this.props.registration.no_use_phone_registration ? "error" : "")
          }
        >
          {this.props.lang.numberPhone}
          <input
            type="text"
            className="login__input"
            value={this.state.phoneNumber}
            onChange={e => this.phoneNumber(e)}
          />
          <span className="login__mistake" />
        </label>

        {this.getTmpCode()}
        <div
          className={
            "login__enter-button " +
            (this.props.recoverPSW.sendCode ? "" : "opacity50")
          }
          onClick={
            !this.props.recoverPSW.sendCode ? this.functionButton() : f => f
          }
        >
          {this.props.lang.header.recoverPas.continue}
        </div>
        <div className="login__non-exist">
          {!this.props.recoverPSW.sendCode
            ? this.props.lang.header.recoverPas.accountDateCreate
            : ""}
        </div>
      </div>
    );
  };

  functionButton() {
    if (this.props.recoverPSW.sendCodeNumber) return () => this.sendResendPSW();
    else return () => this.getCodeToNumber();
  }

  sendResendPSW() {
    sendRecoverySMS(this.state.codeResend);
  }

  getTmpCode() {
    if (this.props.recoverPSW.sendCodeNumber)
      return (
        <label
          className={
            "login__label" +
            (this.props.registration.error_code_phone_registration
              ? " error"
              : "")
          }
        >
          {this.props.lang.header.recoverPas.codeAccept}
          <input
            type="text"
            className="login__input"
            value={this.state.codeResend}
            onChange={e => this.codeResend(e)}
          />
          <span className="login__mistake">
            {this.props.registration.error_code_phone_registration
              ? this.props.lang.codeWriteError
              : ""}
          </span>
        </label>
      );
    return "";
  }

  authorizetmp() {
    return (
      <>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <AuthorizeTmp
            props={this.props}
            stateMain={this.state}
            saveInfoLogin={this.saveInfoLogin.bind(this)}
            reSendPSW={this.reSendPSW.bind(this)}
            shipmentСheck={this.shipmentСheck.bind(this)}
            saveInfoPassword={this.saveInfoPassword.bind(this)}
          />
          <button
            type="submit"
            className="login__enter-button"
            onClick={() => this.shipmentСheck()}
          >
            {this.props.lang.header.authorize.signIn}
          </button>
        </form>
        {/* <div className="page">
                    <div className="page__toggle">
                        <label className="toggle">
                            <input className="toggle__input" type="checkbox" />
                            <span className="toggle__label">
                                <span className="toggle__text">
                                    {
                                        this.props.lang.header.authorize
                                            .rememberCheckbox
                                    }
                                </span>
                            </span>
                        </label>
                    </div>
                </div> */}

        <div className="button__footer">
          <div
            className="login__forgot-pass"
            onClick={() =>
              this.props.history.push(
                routsName.getRoutsUrl(
                  routsName.dict["login"],
                  routsName.dict["recoverPassword"]
                )
              )
            }
          >
            {this.props.lang.header.authorize.forgotPswModal}
          </div>
          <div className="login__forgot-login">
            {this.props.lang.header.recoveryUserName.title}
          </div>
        </div>
        {/* <div className="svg_icon_logo_big">
          {getIcon("odds_96_big_authorize")}
        </div> */}
        <div className="button_registration">
          <div className="titile">
            {this.props.lang.header.NotRegisteredYet}
          </div>
          <div
            className="button"
            onClick={() =>
              this.props.history.push(
                routsName.getRoutsUrl("login", "registration")
              )
            }
          >
            <span>{this.props.lang.header.registration.registration}</span>
          </div>
        </div>
      </>
    );
  }
  onFormSubmit(e) {
    e.preventDefault();
    console.log(e, this, "e,this");
    this.shipmentСheck();
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.isAuthorize,
    lang: state.user.language_user.dict,
    statusAuthorize: state.user.statusLogin,
    recoverPSW: state.recoverPSW,
    authorize_recover_password: state.user.authorize_recover_password,
    historyRoute: state.history,
    registration: state.registration
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authorizeByLoginFalse: () => dispatch(authorize_recover_password(false)),

    error_code_phone_registration: boolen =>
      dispatch(error_code_phone_registration(boolen)),
    no_use_phone_registration: boolen =>
      dispatch(no_use_phone_registration(boolen)),
    no_use_data_registration: boolen =>
      dispatch(no_use_data_registration(boolen)),
    no_use_email_registration: boolen =>
      dispatch(no_use_email_registration(boolen)),
    seccuess_registration: boolen => dispatch(seccuess_registration(boolen)),
    no_use_login_registration: boolen =>
      dispatch(no_use_login_registration(boolen)),
    loader_registration_action: boolen =>
      dispatch(loader_registration_action(boolen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
