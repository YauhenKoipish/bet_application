import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changePswMyAccount,
  faillchangePsw
} from "../../../../../../Actions/Components/User";
import { changeClientPassword } from "../../../../../../Server";
import { getIcon } from "../../../../../../Services/Shared";
//changePSWmyAccount

interface MyStaet {
  curPsw: string;
  newPsw: string;
  confirmPSW: string;
  error: string;
  errorNewPsw: string;
  errorconfirmPSW: string;
  newPassword: boolean;
  oldPassword: boolean;
  confirmation: boolean;
  checkSend: boolean;
  changePsw: boolean;
}

class Info extends Component<any, MyStaet> {
  _isBeUpdated: boolean;
  constructor(props) {
    super(props);
    this._isBeUpdated = false;
    this.state = {
      curPsw: "",
      newPsw: "",
      confirmPSW: "",
      error: "",
      errorNewPsw: "",
      errorconfirmPSW: "",
      newPassword: false,
      oldPassword: false,
      confirmation: false,
      checkSend: false,
      changePsw: false
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
  changePassword() {
    if (this.state.curPsw.length != 0) {
      changeClientPassword(this.state.curPsw, this.state.newPsw);
    }
  }

  getCurState(state: any = {}, props) {
    // debugger;
    if (props.pswAccount.changePSWmyAccount) {
      const newState = {
        curPsw: "",
        newPsw: "",
        confirmPSW: "",
        error: ""
      };
      this.isUpdate = true;
      this.props.faillchangePsw(false);
      return newState;
    }

    if (props.pswAccount.faillPsw && state.error == "") {
      const newState = { ...this.state, error: "неверные данные" };
      this.isUpdate = true;
      return newState;
    }
    return state;
  }

  statusConfirmInput(state) {
    if (state.curPsw.length == 0) return "Не введен старый пароль";
    if (state.confirmPSW.length < 8) return "";
    if (state.newPsw.length < 8 || state.newPsw.length > 20)
      return "неправильное колличество символов";
    if (state.newPsw.toString() !== state.confirmPSW.toString())
      return "Не совпадают пароли";

    return "";
  }

  statusNewPsw(state) {
    if (state.curPsw.length == 0) return "Не введен старый пароль";
    if (state.newPsw.length < 8) return "";
    if (state.newPsw.length < 8 || state.newPsw.length > 20)
      return "неправильное колличество символов";

    return "";
  }

  saveInfo(e, name) {
    const newState = { ...this.state };
    newState[name] = e.value;

    switch (name) {
      case "confirmPSW":
        newState.errorconfirmPSW = this.statusConfirmInput(newState);
        break;
      case "newPsw":
        newState.errorNewPsw = this.statusNewPsw(newState);
      case "curPsw":
        if (newState.curPsw.length >= 8 && newState.newPsw.length >= 8) {
          newState.errorNewPsw = this.statusNewPsw(newState);
          if (newState.confirmPSW.length > 8 && newState.errorNewPsw.length > 0)
            break;
          newState.errorconfirmPSW = this.statusConfirmInput(newState);
        } else if (
          newState.curPsw.length >= 8 &&
          (newState.confirmPSW === "Не введен старый пароль" ||
            newState.errorNewPsw === "Не введен старый пароль")
        ) {
          newState.errorNewPsw = "";
          newState.errorconfirmPSW = "";
        }

        break;
    }

    newState.checkSend = this.checkStatus(newState);

    this.isUpdate = true;
    this.setState(newState);
  }

  checkStatus(state) {
    if (state.curPsw.length > 0) {
      if (
        state.newPsw.toString() === state.confirmPSW.toString() &&
        state.newPsw.length >= 8 &&
        state.newPsw.length <= 20 &&
        state.errorNewPsw.length === 0 &&
        state.errorconfirmPSW.length === 0
      ) {
        return true;
      }
    }
    return false;
  }

  shouldComponentUpdate(nextProps) {
    if (this.isUpdate) return true;
    const newState = this.getCurState(this.state, nextProps);
    if (newState != this.state) {
      this.setState(newState);
    }
    return false;
  }

  changeTypeInput(e, area) {
    const state = { ...this.state };
    state[area] = !state[area];
    this.isUpdate = true;
    this.setState(state);
  }

  openAreaChangePsw(type) {
    this.isUpdate = true;
    this.setState({ ...this.state, changePsw: type });
  }

  render() {
    return (
      <div className="user-data">
        <div className="user-data__personal">
          <div className="user-data__info">
            <div className="user-data-phone-icon">{getIcon("phone")}</div>
            {/* <span className="user-data__type ">
                        {getIcon("phone")}
                            {this.props.lang.numberPhone}
                        </span> */}
            <div className="user-data__data before_phone">
              {this.props.userInfo.phoneNumber}
            </div>
          </div>
          <div className="user-data__info">
            <div className="user-data-mail-icon">{getIcon("mail")}</div>
            {/* <span className="user-data__type ">
                            {this.props.lang.header.registration.eMail}
                        </span> */}
            <div className="user-data__data before_mail">
              {this.props.userInfo.email}
            </div>
          </div>
          {/* <div className="user-data__info">
            <span className="user-data__type">Id</span>
            <div className="user-data__data">123456</div>
          </div> */}
        </div>

        <div className="user-data__password">
          <div className="user-data__field-set">
            {this.state.changePsw ? (
              <>
                <label
                  className={
                    "user-data__field " +
                    (this.state.error.length > 0 ? "error" : "")
                  }
                >
                  <input
                    type={this.state.oldPassword ? "text" : "password"}
                    value={this.state.curPsw}
                    placeholder={this.props.lang.oldPsw}
                    onChange={e => this.saveInfo(e.target, "curPsw")}
                  />
                  <span className="user-data__type name_input">
                    {this.props.lang.oldPsw}
                  </span>
                  {/* <span
                    className={
                      "user-data__visibility icon" +
                      (this.state.oldPassword ? " visible" : "")
                    }
                    onClick={e => this.changeTypeInput(e, "oldPassword")}
                  /> */}
                  {this.state.error.length > 0 ? (
                    <span className="user-data__additional-info error_text">
                      {this.state.error}
                    </span>
                  ) : (
                    ""
                  )}
                </label>
                <label
                  className={
                    "user-data__field " +
                    (this.state.errorNewPsw.length > 0 ? "error" : "")
                  }
                >
                  <input
                    placeholder={this.props.lang.newPsw}
                    type={this.state.newPassword ? "text" : "password"}
                    value={this.state.newPsw}
                    onChange={e => this.saveInfo(e.target, "newPsw")}
                  />
                  <span className="user-data__type name_input">
                    {this.props.lang.newPsw}
                  </span>
                  {/* <span
                    className={
                      "user-data__visibility icon" +
                      (this.state.newPassword ? " visible" : "")
                    }
                    onClick={e => this.changeTypeInput(e, "newPassword")}
                  /> */}
                  {/* <span className="user-data__additional-info error_text">
                    {this.state.errorNewPsw.length > 0
                      ? this.state.errorNewPsw
                      : this.props.lang.header.registration.writeSize}
                  </span> */}
                </label>
                <label
                  className={
                    "user-data__field " +
                    (this.state.errorconfirmPSW.length > 0 ? "error" : "")
                  }
                >
                  <input
                    type={this.state.confirmation ? "text" : "password"}
                    value={this.state.confirmPSW}
                    placeholder={this.props.lang.reacceptPsw}
                    onChange={e => this.saveInfo(e.target, "confirmPSW")}
                  />
                  <span className="user-data__type name_input">
                    {this.props.lang.reacceptPsw}
                  </span>
                  {/* <span
                    className={
                      "user-data__visibility error_text " +
                      (this.state.confirmation ? " visible" : "")
                    }
                    onClick={e => this.changeTypeInput(e, "confirmation")}
                  /> */}
                  <span className="user-data__additional-info error_text">
                    {this.state.errorconfirmPSW.length > 0
                      ? this.state.errorconfirmPSW
                      : this.props.lang.header.registration.writeSize}
                  </span>
                </label>
              </>
            ) : (
              <div className="area_psw">
                <span className="txt">
                  {this.props.lang.header.authorize.psw}
                </span>
                <button onClick={() => this.openAreaChangePsw(true)}>
                  {this.props.lang.header.authorize.changePsw}
                </button>
              </div>
            )}
          </div>
          {this.state.changePsw ? (
            <>
              {" "}
              <div
                className={
                  "user-data__button" +
                  (this.state.checkSend ? "" : " opacity50")
                }
                onClick={
                  this.state.checkSend ? () => this.changePassword() : f => f
                }
              >
                <button>{this.props.lang.header.recoverPas.save}</button>
              </div>
              <div
                className="button no_style"
                onClick={() => this.openAreaChangePsw(false)}
              >
                {this.props.lang.modal.saveChanges.cancel}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.isUpdate = false;
  }
  componentWillUpdate() {
    if (this.props.pswAccount.changePSWmyAccount)
      this.props.changePswMyAccount();
  }
}

const mapStateToProps = state => {
  return {
    pswAccount: state.recoverPSW,
    userInfo: state.user.isAuthorize,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePswMyAccount: () => {
      dispatch(changePswMyAccount(false));
    },
    faillchangePsw: bool => {
      dispatch(faillchangePsw(bool));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
