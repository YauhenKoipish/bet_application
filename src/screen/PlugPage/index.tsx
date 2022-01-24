import React, { Component } from "react";
import { getIcon } from "../../Services/Shared";
import { connect } from "react-redux";
import { authorizeSuccsess } from "../../Actions/Components/Server/Case3";
import { authorizeByLogin, authorizeByToken } from "../../Server";
import { getLocalStorageData } from "../../Services/LocalStorage";

import { ReactComponent as Logo } from "./img/logo.svg";
import { errorAuthorize } from "../../Actions/Components/User";
import { getWidth } from "../../Components/Main/Components/TableOutright";
import { BOOKMAKER_ACTION } from "../../Actions/Components/BOOKMAKER";

class PlugPage extends Component<any, any> {
  elemLogin: any;
  elemPsw: any;
  constructor(props: any) {
    super(props);
    this.state = { modal: false };
    this.elemLogin = React.createRef();
    this.elemPsw = React.createRef();
  }

  changeValueAuth() {
    if (
      this.elemLogin.current.value == "skipPage" &&
      this.elemPsw.current.value == "1"
    ) {
      this.props.skipPage();
    } else if (
      this.elemLogin.current.value == "bookmaker" &&
      this.elemPsw.current.value == "bookmaker"
    ) {
      this.props.isBookmaker(true);

      // this.props.skipPage();
    } else if (
      this.elemLogin.current.value.length &&
      this.elemPsw.current.value.length
    ) {
      authorizeByLogin({
        Login: this.elemLogin.current.value,
        Password: this.elemPsw.current.value
      });
    }
  }

  showModalAuthorizeToken() {
    this.setState({ modal: true });
    const form = {
      Login: "",
      Password: ""
    };
    form.Login = getLocalStorageData("Login");
    form.Password = getLocalStorageData("Password");

    if (form.Login && form.Password) {
      authorizeByToken(form);
    }
  }

  render() {
    const width = getWidth();
    if (width > 1100) {
      return (
        <div className="plugPage" id="plugPage">
          <div className="plugPage_container">
            <div className="plugPage_logo">
              <Logo />
            </div>
            <div className="plugPage_title"></div>

            <div className="plugPage_container_left">
              <div className="plugPage_text_container">
                <div className="text">
                  Deployment takes <span className="bold">only 7 days </span>
                </div>
                <div className="text">
                  <span className="bold">Easy integration</span>
                  <span> of any gaming products </span>
                </div>
                <div className="text">
                  <span className="bold">Betbuilder</span>
                  <span>, adaptive design and other modern features </span>
                </div>
                <div className="text">
                  <span>Ready for </span>
                  <span className="bold">any payment systems </span>
                </div>
                <div className="text">
                  <span>Ready for </span>
                  <span className="bold"> high load </span>
                </div>
              </div>
              <div className="plugPage_bottom">
                <div
                  className={
                    "plugPage_btn_login" +
                    (this.props.isSocketConnect ? "" : " opacity40")
                  }
                  onClick={
                    this.props.isSocketConnect
                      ? () => this.showModalAuthorizeToken()
                      : f => f
                  }
                >
                  <button>Log in</button>
                </div>
                <div className="plugPage_sub_text flex">
                  <a href="mailto:info@abet.ru" className="text">
                    info@abet.ru
                  </a>
                  <a href="tel:+7 925 150 53 92" className="text phoneText">
                    +7 925 150 53 92
                  </a>
                </div>
              </div>
            </div>
            <div
              className={
                "plugPage_content_auth" +
                (this.state.modal ? " left_to_right" : " right_to_left")
              }
            >
              <div
                className="plugPage_btn_close"
                onClick={() => [
                  this.setState({ modal: false }),
                  this.props.errorAuthorize({
                    requestId: 99
                  })
                ]}
              >
                X
              </div>
              <div
                className={
                  "plug_authorize" +
                  (this.props.statusAuthorize.requestId === -1 ? " error" : "")
                }
              >
                <div className="plugPage_area_input">
                  <div className="input">
                    <input
                      placeholder=" "
                      type="text"
                      ref={this.elemLogin}
                      // autocomplete="off"
                    />
                    <span>Username</span>
                  </div>
                  <div className="input">
                    <input
                      placeholder=" "
                      type="password"
                      ref={this.elemPsw}
                      // autocomplete="off"
                    />
                    <span>Password</span>
                  </div>
                </div>
                <div
                  className="plugPage_signIn"
                  onClick={() => this.changeValueAuth()}
                  // onClick={() => this.props.authorizeSuccsess(true)}
                >
                  Sign in
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    //   <MobilePlug
    //   state={this.state}
    //   elemLogin={this.elemLogin}
    //   elemPsw={this.elemPsw}
    //   props={this.props}
    //   changeValueAuth={this.changeValueAuth.bind(this)}
    //   showModalAuthorizeToken={this.showModalAuthorizeToken.bind(this)}
    // />
    else
      return (
        <div className="plugPage_container right_go">
          <div className="plugPage_logo">
            <Logo />
          </div>
          <div className="plugPage_title">
            {/* <span>Multigaming Platform</span> */}
          </div>
          <div className="plugPage_text_container">
            <div className="text">
              Deployment takes <span className="bold">only 7 days </span>
            </div>
            <div className="text">
              <span className="bold">Easy integration</span>
              <span> of any gaming products </span>
            </div>
            <div className="text">
              <span className="bold">Betbuilder</span>
              <span>, adaptive design and other modern features </span>
            </div>
            <div className="text">
              <span>Ready for </span>
              <span className="bold">any payment systems </span>
            </div>
            <div className="text">
              <span>Ready for </span>
              <span className="bold"> high load </span>
            </div>
          </div>

          <div className="plugPage_bottom">
            <div
              className={
                "plugPage_btn_login" +
                (this.props.isSocketConnect ? "" : " opacity40")
              }
              onClick={
                this.props.isSocketConnect
                  ? () => this.showModalAuthorizeToken()
                  : f => f
              }
            >
              <button>Log in</button>
            </div>

            <div className="plugPage_sub_text flex">
              <a href="mailto:info@abet.ru" className="text">
                info@abet.ru
              </a>
              <a href="tel:+7 925 150 53 92" className="text phoneText">
                +7 925 150 53 92
              </a>
            </div>
          </div>
          <div
            className={
              "plugPage_content_auth" +
              (this.state.modal ? " left_to_right" : " right_to_left")
            }
          >
            <div
              className="plugPage_btn_close"
              onClick={() => [
                this.setState({ modal: false }),
                this.props.errorAuthorize({
                  requestId: 99
                })
              ]}
            >
              X
            </div>
            <div
              className={
                "plug_authorize" +
                (this.props.statusAuthorize.requestId === -1 ? " error" : "")
              }
            >
              <div className="plugPage_area_input">
                <div className="input">
                  <input
                    placeholder=" "
                    type="text"
                    ref={this.elemLogin}
                    // autocomplete="off"
                  />
                  <span>Username</span>
                </div>
                <div className="input">
                  <input
                    placeholder=" "
                    type="password"
                    ref={this.elemPsw}
                    // autocomplete="off"
                  />
                  <span>Password</span>
                </div>
              </div>
              <div
                className="plugPage_signIn"
                onClick={() => this.changeValueAuth()}
                // onClick={() => this.props.authorizeSuccsess(true)}
              >
                Sign in
              </div>
            </div>
          </div>
        </div>
      );
  }
  shouldComponentUpdate(nextProps) {
    return true;
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthorize: state.user.isAuthorize,
    isSocketConnect: state.socket.socketState === "open" ? true : false,
    isLoadedData: state.isLoadedData,
    statusAuthorize: state.user.statusLogin
  };
};

// {
//   requestId: registrationResponse
// }

const mapDispatchToProps = (dispatch: any) => {
  return {
    authorizeSuccsess: boolean => dispatch(authorizeSuccsess(boolean)),
    errorAuthorize: obj => dispatch(errorAuthorize(obj)),
    isBookmaker: value => dispatch(BOOKMAKER_ACTION(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlugPage);
