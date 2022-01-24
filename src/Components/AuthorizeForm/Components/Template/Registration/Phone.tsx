import React, { Component } from "react";

import { connect } from "react-redux";

import { maskOrCodeCountry } from "../../codeErrorRegistration";
import { getIcon } from "../../../../../Services/Shared";
import { validateInfo } from "../../../../../Services/Validation";
import {
  checkRegistrationClientPhone,
  checkRegistrationClientSms
} from "../../../../../Server";
import { no_use_phone_registration } from "../../../../../Actions/Components/Registraion/index";
import {
  getLocalStorageData,
  setLocalStorage
} from "../../../../../Services/LocalStorage";
import { countdownTimer } from "../../../../../Services/CountdownTimer";
import { saveStateTimer } from "../../../../../Actions/Components/Timer";
import { sendRegistrationsSMS } from "../../../../../Server/index";

interface MyState {
  phone: boolean;
  codeCountry: string;
  idCountry: string;
  code: string;
  phoneElem: string;
  codeSms: boolean;
  getCode: boolean;
  codeSmsCheked: boolean;
  validDate: boolean;
  openCountry: boolean;
  validPhoneNumber: boolean;
  hideEditValue: boolean;
  confirmSms?: boolean | null;
  code_phone?: string | null;
}

class Phone extends Component<any, MyState> {
  elemPhone: any;
  elemCode: any;
  flgSmsReq: boolean;
  constructor(props) {
    super(props);
    this.flgSmsReq = false;
    this.elemPhone = React.createRef();
    this.elemCode = React.createRef();
    console.log(props.date);
    if (this.props.date.confirmSms) {
      this.state = {
        phone: true,
        codeCountry: "",
        idCountry: props.date.idCountry,
        codeSms: true,
        getCode: false, // показываем кнопку получить код
        codeSmsCheked: true, // делаем getCode false eи тут true  показываем что все ок
        validDate: false,
        openCountry: false,
        validPhoneNumber: this.props.timerSMS ? true : false,
        hideEditValue: this.props.timerSMS ? true : false,
        code: "555", //props.date.code,
        phoneElem: "",
        confirmSms: true,
        code_phone: props.date.code_phone
      };
    } else {
      this.state = {
        phone: true,
        codeCountry: "",
        idCountry: this.props.timerSMS ? props.date.idCountry : "",
        codeSms: this.props.timerSMS ? false : true,
        getCode: this.props.timerSMS ? false : true, // показываем кнопку получить код
        codeSmsCheked: false, // делаем getCode false eи тут true  показываем что все ок
        validDate: false,
        openCountry: false,
        validPhoneNumber: this.props.timerSMS ? true : false,
        hideEditValue: this.props.timerSMS ? true : false,
        code: "555",
        phoneElem: ""
      };
    }
  }

  sendReuestGetConfirmCode() {
    // запуск таймера + смс получение
    setLocalStorage("Timer", this.props.time);

    countdownTimer.setTimer("90", this.props.saveStateTimer);

    setLocalStorage("code_phone", this.elemPhone.current.value);
    setLocalStorage("id_country", this.state.idCountry);

    this.setState({ ...this.state, getCode: false, hideEditValue: true });

    sendRegistrationsSMS(this.elemPhone.current.value.replace(/[^+\d]/g, ""));
  }

  codeConfirm() {
    this.flgSmsReq = true;
    checkRegistrationClientSms(this.elemCode.current.value);
    // this.setState({ ...this.state, codeSmsCheked: true });
  }

  chengeCode(e) {
    if (this.elemCode.current.value.length > 0 && !this.state.codeSms) {
      this.setState({ ...this.state, codeSms: true });
    } else if (this.state.codeSms && this.elemCode.current.value.length == 0) {
      this.setState({ ...this.state, codeSms: false });
    }
  }

  getTmp() {
    return <></>;
    if (!this.state.getCode && this.state.codeSmsCheked) {
      return (
        <div
          className="button confirm"
          onClick={() => this.sendReuestGetConfirmCode()}
        >
          {this.props.lang.header.registration.numberVereficate}
          <span className="icon">{getIcon("confirmOk")}</span>
        </div>
      );
    } else if (this.state.getCode) {
      return (
        <div
          className={
            "button get_confirm_code " +
            (this.state.validPhoneNumber ? "" : " opacity50")
          }
          onClick={
            this.state.validPhoneNumber
              ? () => this.sendReuestGetConfirmCode()
              : f => f
          }
        >
          {this.props.lang.header.registration.getCode}1
        </div>
      );
    } else {
      return (
        <div
          className={"phone_code " + (this.state.codeSms ? "" : " opacity50")}
        >
          <div className="code relative">
            <input
              type="code "
              className={
                this.props.registration.error_code_phone_registration
                  ? "error"
                  : ""
              }
              placeholder="123"
              ref={this.elemCode}
              onChange={e => this.chengeCode(e)}
            />
            <span className="name_input">
              {this.props.lang.header.registration.code}2
            </span>
          </div>
          <div
            className="button"
            // onClick={this.state.codeSms ? () => this.codeConfirm() : f => f}
          >
            <span>Ok</span>
          </div>
        </div>
      );
    }
  }

  selectCountry(e, idCountry) {
    e.stopPropagation();
    const newState = { ...this.state };
    newState.idCountry = idCountry;
    this.elemPhone.current.value = maskOrCodeCountry[idCountry].code;
    newState.openCountry = false;
    this.setState(newState);
  }

  toggleStateCodeCountry(e, openCountry) {
    e.stopPropagation();
    this.setState({ ...this.state, openCountry });
  }

  checkEditIndormation(e) {
    if (!this.state.idCountry) {
      this.elemPhone.current.value = "";
      return "";
    }
    if (this.state.hideEditValue) {
      const codePhone = getLocalStorageData("code_phone");
      const idCountry = getLocalStorageData("id_country");

      this.elemPhone.current.value = codePhone
        ? codePhone
        : "вы удалили данные из хранилища подождите";

      if (idCountry !== this.state.idCountry && idCountry)
        this.setState({ ...this.state, idCountry });

      return "";
    }

    const valueInput = this.elemPhone.current.value;
    const idCountry = this.state.idCountry;
    // функция запрещающая удалять код страны из номера телефона и накидывает маску на поле

    if (valueInput.indexOf(maskOrCodeCountry[idCountry].code) !== 0) {
      this.elemPhone.current.value = maskOrCodeCountry[idCountry].code;
    } else {
      const value = this.elemPhone.current.value.replace(
        maskOrCodeCountry[idCountry].code,
        ""
      ); // номер телефоан без кода для маски

      if (!maskOrCodeCountry[idCountry].mask || !value) {
        // this.elemPhone.current.value = maskOrCodeCountry[idCountry].code;

        checkRegistrationClientPhone(
          this.elemPhone.current.value.replace(/[^+\d]/g, "")
        );

        const validDate = this.validAllDate();
        this.setState({ ...this.state, validPhoneNumber: true, validDate });
        return;
      }

      const phone = validateInfo.replaceValueByMask({
        value,
        mask: maskOrCodeCountry[idCountry].mask
      });
      this.elemPhone.current.value =
        maskOrCodeCountry[idCountry].code + " " + phone; // собираем хначение в форму

      // проверяем валидность и доступность кнопки
      this.checkStateButton(phone, maskOrCodeCountry[idCountry].mask);
    }
  }

  //функция сама вызывает this.setState
  checkStateButton(phone, mask) {
    const validDate = this.validAllDate();
    if (phone.length === mask.length) {
      checkRegistrationClientPhone(phone.replace(/[^+\d]/g, ""));
      this.setState({ ...this.state, validPhoneNumber: true, validDate });
    } else if (this.state.validPhoneNumber) {
      this.setState({ ...this.state, validPhoneNumber: false, validDate });
    }
  }

  validAllDate() {
    const inputValid =
      this.elemPhone.current.value.length != 0
        ? // &&
          // this.elemCode.current.value.length != 0
          true
        : false;

    if (
      inputValid &&
      !this.props.registration.error_code_phone_registration &&
      !this.props.registration.no_use_phone_registration
    ) {
      return true;
    }
    return false;
    // проверка всех данных и актвиация кнопки дальше
  }

  render() {
    const openCountry = !this.state.openCountry;
    return (
      <>
        <div className="modul_phone_registration">
          <div className="phone_code">
            <div
              className="code_drop_down relative"
              onClick={
                this.state.getCode &&
                !this.state.codeSmsCheked &&
                this.props.timerSMS == 0 &&
                getLocalStorageData("Timer") == 0
                  ? e => this.toggleStateCodeCountry(e, openCountry)
                  : f => f
              }
            >
              <span className="name_input">
                {this.state.idCountry
                  ? maskOrCodeCountry[this.state.idCountry].shortName
                  : this.props.lang.header.registration.code}
              </span>
              <div className="flg">
                <img
                  src={
                    this.state.idCountry
                      ? require("../../../Img/contries/" +
                          maskOrCodeCountry[this.state.idCountry].shortName +
                          ".svg")
                      : "#"
                  }
                  alt=""
                />
              </div>
              <span className="icon">{getIcon("tringle")}</span>

              {this.state.openCountry ? (
                <div className="drop_down_code">
                  {Object.keys(maskOrCodeCountry).map((item, index) => (
                    <div
                      className="item_code"
                      onClick={
                        this.state.hideEditValue
                          ? f => f
                          : e => this.selectCountry(e, item)
                      }
                      key={index}
                    >
                      <span className="text">
                        {maskOrCodeCountry[item].code}
                      </span>
                      <span className="short_name">
                        {maskOrCodeCountry[item].shortName}
                      </span>
                      <span className="icon_flg">
                        <img
                          src={require("../../../Img/contries/" +
                            maskOrCodeCountry[item].shortName +
                            ".svg")}
                          alt=""
                        />
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="input_code_phone relative">
              <input
                className={
                  this.state.validPhoneNumber || !this.state.idCountry
                    ? ""
                    : "error"
                }
                placeholder={this.props.lang.header.registration.numberPhone}
                type="tel"
                ref={this.elemPhone}
                onChange={e => this.checkEditIndormation(e)}
              />
              <span className="name_input">
                {this.props.lang.header.registration.numberPhone}
              </span>
            </div>
          </div>

          {this.getTmp()}
        </div>
        {this.state.hideEditValue ? (
          <button
            className={
              "button_resend" +
              (this.props.timerSMS == 0 && getLocalStorageData("Timer") == 0
                ? " active"
                : "")
            }
          >
            {getLocalStorageData("Timer") == 0 &&
            !(!this.state.getCode && this.state.codeSmsCheked) ? (
              <span onClick={() => this.sendReuestGetConfirmCode()}>
                resend
              </span>
            ) : !this.state.getCode && this.state.codeSmsCheked ? (
              ""
            ) : (
              "resend " + getLocalStorageData("Timer")
            )}
          </button>
        ) : (
          ""
        )}
        <div
          className={
            "button_next_step yellow " + (this.state.validDate ? " active" : "")
          }
          onClick={
            this.state.validDate
              ? () =>
                  this.props.addState(
                    {
                      code: this.state.code
                        ? this.state.code
                        : getLocalStorageData("id_country"),
                      // code_phone: this.state.phoneElem
                      //   ? this.state.phoneElem
                      //   : getLocalStorageData("code_phone"),
                      code_phone: this.elemPhone.current.value,
                      confirmSms: true,
                      phone: this.elemPhone.current.value
                    },
                    "phone"
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
    if (this.props.timerSMS != 0) {
      // debugger;
      this.elemPhone.current.value = this.props.date.phone;
    }
    if (this.props.date.confirmSms) {
      this.elemPhone.current.value = this.props.date.code_phone;
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.registration.no_use_phone_registration === true &&
      this.state.validPhoneNumber === true
    ) {
      this.setState({ ...this.state, validPhoneNumber: false });
      return false;
    }

    if (
      !nextProps.registration.error_code_phone_registration &&
      this.flgSmsReq
    ) {
      this.flgSmsReq = false;
      const validDate = this.validAllDate();
      this.setState({
        ...this.state,
        code: this.elemCode.current.value,
        phoneElem: this.elemPhone.current.value,
        codeSmsCheked: true,
        validDate
      });
      this.props.addState(
        {
          code: this.elemCode.current.value,
          code_phone: this.elemPhone.current.value,
          confirmSms: true,
          phone: this.elemPhone.current.value
        },
        "phone"
      );
      return false;
    }
    return true;
  }
}

const mapStateToProps = (state: any) => {
  return {
    registration: state.registration,
    lang: state.user.language_user.dict,
    timerSMS: state.registration.timerSMS,
    time: state.mainSetting.smsRecording
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveStateTimer: number => dispatch(saveStateTimer(number))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);
