import React, { Component } from "react";
import { connect } from "react-redux";
import {
  error_code_phone_registration,
  no_use_phone_registration,
  no_use_data_registration,
  no_use_email_registration,
  no_use_login_registration,
  seccuess_registration,
  loader_registration_action,
  close_window,
  showRegistrationModal
} from "../../../Actions/Components/Registraion/";

import { flagRegistrationRedirect } from "../../../Actions/Components/User/";
import { route } from "../../../Actions/Components/Navigation";

import { saveStateTimer } from "../../../Actions/Components/Timer/";
import EmailLoginPsw from "./Template/Registration/EmailLoginPsw";
import Phone from "./Template/Registration/Phone";
import PersonalInfo from "./Template/Registration/PersonalInfo";
import { getIcon } from "../../../Services/Shared";
import { getLocalStorageData } from "../../../Services/LocalStorage";
import { sendRegistrationData, authorizeByLogin } from "../../../Server";

interface MyState {
  step: number;
  registrationSend: boolean;
  validDate: boolean;
  email_login_psw: {
    login: string;
    psw: string;
    mail: string;
  };
  phone: {
    code_phone: string;
    idCountrty: string;
    confirmSms: boolean;
    code: string;
  };
  personalInfo: {
    firstname: string;
    lastName: string;
    country: string;
    countryid: null | number;
    birthday: {
      day: null | number;
      month: null | string;
      year: null | number;
      acceptOld: boolean;
      acceptMsg: boolean;
    };
  };
}

class Registration extends Component<any, MyState> {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      registrationSend: false,
      validDate: true,
      // step 1 state
      email_login_psw: {
        login: "",
        psw: "",
        mail: ""
      },
      //step2
      phone: {
        code_phone: "",
        idCountrty: "",
        confirmSms: false,
        code: ""
      },
      //step 3 state
      personalInfo: {
        firstname: "",
        lastName: "",
        country: "",
        countryid: null,
        birthday: {
          day: null,
          month: null,
          year: null,
          acceptOld: false,
          acceptMsg: true
        }
      }
    };
  }

  setMainState(stateComponents, name) {
    if (this.state.step === 3) {
      // debugger;
      const newState = { ...this.state };
      newState[name] = { ...stateComponents };
      //

      //формируем на регу структуру

      const data = {
        lastName: newState.personalInfo.firstname,
        secondName: newState.personalInfo.lastName,
        otherName: " ",
        birthday: {
          day: newState.personalInfo.birthday.day,
          month: newState.personalInfo.birthday.month,

          year: newState.personalInfo.birthday.year
        },
        nationality: newState.personalInfo.country,
        country_id: newState.personalInfo.countryid,
        phone: newState.phone.code_phone,
        city: "1",
        city_id: "1",
        eMail: newState.email_login_psw.mail,
        login: newState.email_login_psw.login,
        password: newState.email_login_psw.psw,
        currency: "1",
        sms: newState.phone.code,
        promocode: "1",
        pincode: "1"
      };
      // debugger;
      console.log(data);
      sendRegistrationData(data);
      // this.props.seccuess_registration(true);
    } else {
      console.log(stateComponents, "stateComponents");
      const newState = { ...this.state };
      newState.step++;
      newState[name] = { ...stateComponents };
      console.log(newState, "set data");
      this.setState(newState);
    }
  }

  getActualComponent() {
    switch (this.state.step) {
      case 1:
        return (
          <EmailLoginPsw
            {...this.props}
            email_login_psw={this.state.email_login_psw}
            addState={this.setMainState.bind(this)}
          />
        );
      case 2:
        //Если есть таймер собрать пачку данных для стейта

        const dateStateStepTwo = this.state.phone.confirmSms
          ? this.state.phone
          : this.props.timerSMS
          ? {
              phone: getLocalStorageData("code_phone"),
              idCountry: getLocalStorageData("id_country")
            }
          : {};
        return (
          <Phone
            {...this.props}
            date={dateStateStepTwo}
            addState={this.setMainState.bind(this)}
          />
        );
      case 3:
        return (
          <PersonalInfo
            {...this.props}
            addState={this.setMainState.bind(this)}
          />
        );
      default:
        return "load";
    }
  }

  changeStep(param) {
    const step = param;
    this.setState({ ...this.setState, step });
  }

  getFunctionOnButton(param) {
    if (!this.state.registrationSend)
      switch (param) {
        case 1:
          return () => this.changeStep(1);
        case 2:
          return () => this.changeStep(2);
        case 3:
          return () => this.changeStep(3);
        default:
          return f => f;
      }

    return () => this.changeStep(1);
  }

  getTitleStep() {
    switch (this.state.step) {
      case 2:
        return this.props.lang.header.registration.numberPhone;
      case 3:
        return this.props.lang.header.registration.personalDataTitle;
      default:
        return this.props.lang.header.registration.title;
    }
  }

  render() {
    return (
      <div className="registration_modul_slider">
        <div className="title_registration">
          {this.state.step != 1 ? (
            <div
              className="arrow_back_registration "
              onClick={this.getFunctionOnButton(this.state.step - 1)}
            >
              {getIcon("arrowTicket")}
            </div>
          ) : (
            ""
          )}
          <div className="text">{this.getTitleStep()}</div>
          <div className="counter_step">
            <span>{this.state.step}</span>
            <span>{this.props.lang.iz}</span>
            <span>3</span>
          </div>
        </div>
        {this.getActualComponent()}
        {/* {this.state.step != 3 ? (
                    <div className="svg_icon_logo_big">
                        {getIcon("odds_96_big_authorize")}
                    </div>
                ) : (
                    ""
                )} */}
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.registration.seccess_registration) {
      //authorize
      authorizeByLogin({
        Login: this.state.email_login_psw.login,
        Password: this.state.email_login_psw.psw
      });
      this.props.history.push("/");
      this.props.seccuess_registration(true);
      this.props.showRegistrationModal(true);
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    this.props.seccuess_registration(false);
  }
}

const mapStateToProps = (state: any) => {
  return {
    registration: state.registration,
    lang: state.user.language_user.dict,
    autorizeReconnect: state.user.reconnect,
    historyRout: state.history,
    timerSMS: state.registration.timerSMS,
    time: state.mainSetting.smsRecording,
    statusAuthorize: state.user.statusLogin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close_window_registration: boolen => dispatch(close_window(boolen)),
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
      dispatch(loader_registration_action(boolen)),
    flagRegistrationRedirect: string =>
      dispatch(flagRegistrationRedirect(string)),
    navigate: (url: string) => {
      dispatch(route("push", url));
    },
    showRegistrationModal: boolean => dispatch(showRegistrationModal(boolean)),
    saveStateTimer: number => dispatch(saveStateTimer(number))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration as any);
