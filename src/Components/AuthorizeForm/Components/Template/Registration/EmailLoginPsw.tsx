import React, { Component } from "react";
import { connect } from "react-redux";
import { validateInfo } from "../../../../../Services/Validation";

import { arrayValid } from "../../codeErrorRegistration";

import {
  no_use_email_registration,
  no_use_login_registration
} from "../../../../../Actions/Components/Registraion/index";
import {
  checkRegistrationClienLogin,
  checkRegistrationClienMail
} from "../../../../../Server";

import { getIcon } from "../../../../../Services/Shared";

interface MyState {
  validDate: boolean;
  1: string;
  2: string;
  3: string;
  typePsw: string;
}
class EmailLoginPsw extends Component<any, MyState> {
  elemEmail: any;
  elemLogin: any;
  elemPsw: any;
  nameValid: number;
  constructor(props) {
    super(props);
    this.nameValid = 0;
    this.elemEmail = React.createRef();
    this.elemLogin = React.createRef();
    this.elemPsw = React.createRef();
    this.state = {
      validDate: false,
      1: "",
      2: "",
      3: "",
      typePsw: "text"
    };
  }

  checkInputAreaValue(state) {
    const valueInput =
      this.elemEmail.current.value &&
      this.elemLogin.current.value &&
      this.elemPsw.current.value
        ? true
        : false;
    const stateError = !state[1] && !state[2] && !state[3] ? true : false;
    if (valueInput && stateError) {
      //nextstep accept
      return true;
    }
    return false;
  }

  reqTestarea() {
    if (!this.nameValid) return "";
    switch (this.nameValid) {
      case 1:
        checkRegistrationClienMail(this.elemEmail.current.value);
        break;
      case 2:
        checkRegistrationClienLogin(this.elemLogin.current.value);
        break;

      default:
        break;
    }
  }

  callbackFunc(value: { isValid: boolean; errors: number[] }) {
    const newState = { ...this.state };
    if (!value.isValid && this.nameValid !== 0) {
      newState[this.nameValid] = value.errors[value.errors.length - 1];
    } else {
      newState[this.nameValid] = "";
      this.props.no_use_login_registration(false);
      if (
        this.elemEmail.current.value.length > 3 ||
        this.elemLogin.current.value.length > 6
      ) {
        //req test email or login
        this.reqTestarea();
      }
    }
    newState.validDate = this.checkInputAreaValue(newState);
    this.setState(newState);
  }

  changeInputValue(nameChangeInput: number) {
    // 1 - email 2 login 3 - psw
    this.nameValid = nameChangeInput;
    switch (nameChangeInput) {
      case 1:
        validateInfo.composeValidation(
          {
            errorNameValidateValueMail: this.props.lang.header.registration
              .errors.emailValid,
            specificSymbol: arrayValid,
            value: this.elemEmail.current.value
          },
          this.callbackFunc.bind(this),
          validateInfo.validateValueMail
        );

        break;
      case 2:
        validateInfo.composeValidation(
          {
            errorNameValidateValueSpecificSymbol: this.props.lang.header
              .registration.errors.login,
            errorNameValidateValueLength: this.props.lang.header.registration
              .errors.login,
            errorNameValidateValueSpace: this.props.lang.header.registration
              .errors.login,
            errorNameValidateValueLogin: this.props.lang.header.registration
              .errors.login,
            specificSymbol: arrayValid,
            value: this.elemLogin.current.value,
            startLength: 6,
            endLength: 25
          },
          this.callbackFunc.bind(this),
          validateInfo.validateValueSpecificSymbol,
          validateInfo.validateValueLength,
          validateInfo.validateValueLogin,
          validateInfo.validateValueSpace
        );
        break;
      case 3:
        validateInfo.composeValidation(
          {
            errorNameValidateValueSpecificSymbol: this.props.lang.header
              .registration.errors.passwordError,
            errorNameValidateValueLength: this.props.lang.header.registration
              .errors.passwordError,
            errorNameValidateValueSpace: this.props.lang.header.registration
              .errors.passwordError,
            specificSymbol: arrayValid,
            value: this.elemPsw.current.value,
            startLength: 8,
            endLength: 25
          },
          this.callbackFunc.bind(this),
          validateInfo.validateValueSpecificSymbol,
          validateInfo.validateValueLength,
          validateInfo.validateValueSpace
        );

        break;
      default:
        break;
    }
  }

  setFocus(activeElement = document.activeElement, e) {
    if (activeElement === this.elemEmail.current) {
      this.elemEmail.current.classList.add("focus");
      this.elemLogin.current.classList.remove("focus");
      this.elemPsw.current.classList.remove("focus");
    }
    if (activeElement === this.elemLogin.current) {
      this.elemLogin.current.classList.add("focus");
      this.elemEmail.current.classList.remove("focus");
      this.elemPsw.current.classList.remove("focus");
    }
    if (activeElement === this.elemPsw.current) {
      this.elemPsw.current.classList.add("focus");
      this.elemEmail.current.classList.remove("focus");
      this.elemLogin.current.classList.remove("focus");
    }
  }

  changeTypePsw() {
    if (this.state.typePsw === "text") {
      this.setState({ ...this.state, typePsw: "password" });
    } else {
      this.setState({ ...this.state, typePsw: "text" });
    }
  }

  render() {
    return (
      <>
        <div
          className="modul_login_registration"
          onClick={e => this.setFocus(document.activeElement, e)}
        >
          <div className={"input" + (this.state[1] ? " error" : "")}>
            <div className=" relative">
              <input
                type="code"
                ref={this.elemEmail}
                placeholder={this.props.lang.header.registration.eMail}
                onChange={e => this.changeInputValue(1)}
              />
              <span className="name_input">
                {this.props.lang.header.registration.eMail}
              </span>
              <span className="error">{this.state[1]}</span>
            </div>
          </div>
          <div className={"input" + (this.state[2] ? " error" : "")}>
            <div className=" relative">
              <input
                type="login"
                ref={this.elemLogin}
                placeholder={this.props.lang.header.registration.logIn}
                onChange={e => this.changeInputValue(2)}
              />
              <span className="name_input">
                {this.props.lang.header.registration.logIn}
              </span>
              <span className="error">{this.state[2]}</span>
            </div>
          </div>

          <div className={"input" + (this.state[3] ? " error" : "")}>
            <div className=" relative">
              <input
                type={this.state.typePsw}
                ref={this.elemPsw}
                placeholder={this.props.lang.header.registration.psw}
                onChange={e => this.changeInputValue(3)}
              />
              <span className="name_input">
                {this.props.lang.header.registration.psw}
              </span>
              <span className="icon" onClick={() => this.changeTypePsw()}>
                {getIcon(this.state.typePsw === "text" ? "eyes" : "eyes-close")}
              </span>
              <span className="error">{this.state[3]}</span>
            </div>
          </div>
        </div>
        <div
          className={
            "button_next_step yellow" + (this.state.validDate ? " active" : "")
          }
          onClick={
            this.state.validDate
              ? () =>
                  this.props.addState(
                    {
                      login: this.elemLogin.current.value,
                      psw: this.elemPsw.current.value,
                      mail: this.elemEmail.current.value
                    },
                    "email_login_psw"
                  )
              : f => f
          }
        >
          {this.props.lang.next}
        </div>
      </>
    );
  }

  componentDidMount() {
    this.elemEmail.current.value = this.props.email_login_psw.mail;
    this.elemLogin.current.value = this.props.email_login_psw.login;
    this.elemPsw.current.value = this.props.email_login_psw.psw;
    const newState = { ...this.state };

    newState.validDate = this.checkInputAreaValue(this.state);
    if (newState.validDate) {
      this.setState(newState);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.registration.no_use_email_registration && !this.state[1]) {
      const newState = { ...this.state };
      newState[1] = this.props.lang.header.registration.errors.emailError;
      this.setState(newState);
      return false;
    }

    if (
      !nextProps.registration.no_use_login_registration &&
      this.props.registration.no_use_login_registration
    ) {
      validateInfo.composeValidation(
        {
          errorNameValidateValueSpecificSymbol: this.props.lang.header
            .registration.errors.login,
          errorNameValidateValueLength: this.props.lang.header.registration
            .errors.login,
          errorNameValidateValueSpace: this.props.lang.header.registration
            .errors.login,
          errorNameValidateValueLogin: this.props.lang.header.registration
            .errors.login,
          specificSymbol: arrayValid,
          value: this.elemLogin.current.value,
          startLength: 6,
          endLength: 25
        },
        this.callbackFunc.bind(this),
        validateInfo.validateValueSpecificSymbol,
        validateInfo.validateValueLength,
        validateInfo.validateValueLogin,
        validateInfo.validateValueSpace
      );
    }

    if (nextProps.registration.no_use_login_registration && !this.state[2]) {
      const newState = { ...this.state };
      newState[2] = this.props.lang.header.registration.errors.loginUsed;
      this.setState(newState);
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    this.props.no_use_email_registration(false);
    this.props.no_use_login_registration(false);
  }
}
const mapStateToProps = (state: any) => {
  return {
    registration: state.registration,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    no_use_email_registration: boolen =>
      dispatch(no_use_email_registration(boolen)),
    no_use_login_registration: boolen =>
      dispatch(no_use_login_registration(boolen))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailLoginPsw);
