import React, { Component } from "react";
import Logo from "../../Components/Header/Components/Logo";

export default class mobilePlugPage extends Component<any, any> {
  elemLogin: any;
  elemPsw: any;
  constructor(props: any) {
    super(props);
    this.elemLogin = props.elemLogin;
    this.elemPsw = props.elemPsw;
  }
  render() {
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
              (this.props.props.isSocketConnect ? "" : " opacity40")
            }
            onClick={
              this.props.isSocketConnect
                ? () => this.props.showModalAuthorizeToken()
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
              onClick={() => this.props.changeValueAuth()}
              // onClick={() => this.props.authorizeSuccsess(true)}
            >
              Sign in
            </div>
          </div>
        </div>
      </div>
    );
  }
}
