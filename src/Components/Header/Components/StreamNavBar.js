import React, { Component } from "react";
// import "../Style/main-nav.css";
import { connect } from "react-redux";
import { route } from "../../../Actions/Components/Navigation/";

import { routsName } from "../../../Router/RouterList";

class StreamNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      openClass: null
    };
  }

  checkUrl(address) {
    if (this.props.location.pathname.includes(address)) return "active";
    else return "";
  }

  openMenu() {
    if (!this.state.menuOpen) {
      this.setState({
        ...this.state,
        menuOpen: true,
        openClass: "open"
      });
    } else return "";
  }

  closeMenu() {
    if (this.state.menuOpen) {
      this.setState({
        ...this.state,
        menuOpen: false,
        openClass: null
      });
    } else return "";
  }

  // Вызывается после удаления компонента из DOM
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, false);
  }

  // Вызывается до рендера
  componentWillMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      false
    );
  }

  handleClickOutside(evt) {
    if (evt.target.closest("li") || !evt.target.closest(".tv__nav-list")) {
      this.closeMenu();
      return "";
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="tv__burger" onClick={() => this.openMenu()} />
        <ul className={"tv__nav-list " + this.state.openClass}>
          {/* {this.props.settingApp.isLive ? ( */}
          <li
            className={this.checkUrl("allevent")}
            onClick={() =>
              this.props.navigate(
                routsName.getRoutsUrl(
                  routsName.dict.mobile,
                  routsName.dict.allevent
                )
              )
            }
          >
            {this.props.lang.stream}
          </li>

          <li
            className={this.checkUrl("promo")}
            onClick={() =>
              this.props.navigate(
                routsName.getRoutsUrl(
                  routsName.dict.mobile,
                  routsName.dict.promo
                )
              )
            }
          >
            {this.props.lang.specOffer}
          </li>
          <li
            className={this.checkUrl("streaminfo")}
            onClick={() =>
              this.props.navigate(
                routsName.getRoutsUrl(
                  routsName.dict.mobile,
                  routsName.dict.streaminfo
                )
              )
            }
          >
            {this.props.lang.document}
          </li>
          <li className="close" onClick={() => this.closeMenu()} />
        </ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict,
    settingApp: state.mainSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => dispatch(route("push", url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamNavBar);
