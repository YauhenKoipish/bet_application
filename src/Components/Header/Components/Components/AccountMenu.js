import React from "react";
import { connect } from "react-redux";
import {
  bonusBalance,
  mainBalance
} from "../../../../Actions/Components/Balance/";
import { logout } from "../../../../Server/";
// import "../../Style/double-block.css";
// import "../../Style/user.css";

import {
  removeLocalStorageDate,
  getLocalStorageData,
  setLocalStorage
} from "../../../../Services/LocalStorage";
import { splitRangNumber, getIcon } from "../../../../Services/Shared";
import { ReactComponent as Visible } from "../../Image/user-info/visible.svg";
import { ReactComponent as Unvis } from "../../Image/user-info/invisible.svg";
import replenishment from "../../Image/replenishment-button/replenishment.svg";
import userIconWhite from "../../Image/user-info/user-icon-white.svg";
// import visible from "../../Image/user-info/visible.svg";
// import unvis from "../../Image/user-info/invisible.svg";
import { route } from "../../../../Actions/Components/Navigation/";
import BonusOnDeposit from "./BonusOnDeposit";

import { routsName } from "../../../../Router/RouterList";

class AccountMenu extends React.Component {
  constructor(props) {
    super(props);
    this.update = false;
    this.state = {
      accountMenu: {
        isOpen: false
      },
      balanceActive: this.props.isMainBalance,
      isShowbalanse: false,
      isBonusOnDeposit: this.isBonusOnDeposit(props),
      balanceMain: this.props.user.info.accountData.balance,
      balanceBonus: this.props.user.info.accountData.bonusBalance
    };
    this.funcHandleClickOutside = this.handleClickOutside.bind(this);
  }
  isBonusOnDeposit(props) {
    return (
      props.balanceData.bonusDepositRemainingTime ||
      props.rolled ||
      props.deposit
    );
  }

  logOut = () => {
    removeLocalStorageDate("Password");
    removeLocalStorageDate("Login");
    this.props.closeAccount(0);
    this.toggleAccount();
    this.props.authorizeFail();
    logout();
  };

  checkStatus() {
    this.setState({
      ...this.state
    });
  }

  toggleAccount() {
    const newState = { ...this.state };
    newState.accountMenu.isOpen = !this.state.accountMenu.isOpen;
    this.update = true;
    this.setState(newState);
    // this.checkStatus();
  }

  mainBalance() {
    if (this.props.isMainBalance) {
      this.props.toggleBalance(this.state.balanceActive);
      this.state.balanceActive = !this.state.balanceActive;
      this.update = true;
      this.checkStatus();
    } else {
      console.log("Main");
    }
  }

  bonusBalance() {
    if (!this.porps.isMainBalance) {
      this.props.toggleBalance(this.state.balanceActive);
      this.state.balanceActive = !this.state.balanceActive;
      this.update = true;
      this.checkStatus();
    } else {
      //dispatch
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.funcHandleClickOutside, false);
  }

  componentWillMount() {
    document.addEventListener("click", this.funcHandleClickOutside, false);
  }

  handleClickOutside(event) {
    if (event.target.closest(".user__balance")) return;
    if (event.target.closest(".modal")) return;
    if (event.target.closest(".user-info__icon")) {
      this.toggleAccount();
      return "";
    }
    if (!event.target.closest(".user-info__menu")) {
      const accountMenu = JSON.parse(JSON.stringify(this.state.accountMenu));
      accountMenu.isOpen = false;
      const newState = {
        ...this.state,
        accountMenu
      };
      if (this.state.accountMenu !== newState.accountMenu)
        this.setState(newState);
    }
  }

  redirect(component) {
    this.props.navigate(
      routsName.getRoutsUrl(routsName.dict.kabinet) + "/" + component
    );
    this.toggleAccount();
  }

  changeBalance(balance) {
    if (this.props.isMainBalance === balance) return;
    this.props.toggleBalance(balance);
    this.update = true;
  }

  isShowBalanse() {
    const newState = {
      ...this.state,
      isShowbalanse: !this.state.isShowbalanse
    };
    this.setState(newState);
  }

  changeUrlEvent(url) {
    this.props.navigate(url);
    this.toggleAccount();
  }

  removeDeposit() {
    this.setState({
      ...this.state,
      isBonusOnDeposit: false
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.balanceData !== this.props.balanceData) {
      const newIsBonusOnDeposit = this.isBonusOnDeposit(nextProps);
      if (newIsBonusOnDeposit !== this.state.isBonusOnDeposit) {
        this.setState({
          ...this.state,
          isBonusOnDeposit: newIsBonusOnDeposit
        });
      }
    }

    if (this.state.accountMenu.isOpen == true) {
      return true;
    }

    if (this.update) return true;
    this.checkStatusUpdate(nextProps);
    return false;
  }

  checkStatusUpdate(next) {
    if (
      this.state.balanceMain != next.user.info.accountData.balance ||
      this.state.balanceBonus != next.user.info.accountData.bonusBalance
    ) {
      const balanceMain = next.user.info.accountData.balance;
      const balanceBonus = next.user.info.accountData.bonusBalance;
      const newState = { ...this.state, balanceBonus, balanceMain };
      this.setState(newState);
      this.update = true;
    } else if (next.accountMenu.isOpen != this.state.accountMenu.isOpen) {
      return true;
    } else this.update = false;
  }

  render() {
    return (
      <React.Fragment>
        <div className="user__money">
          <>
            <span
              className={
                "user__balance double-block " +
                (this.props.isMainBalance ? "active" : "")
              }
              onClick={() => this.changeBalance(true)}
            >
              <div className="double-block__header">
                {this.props.lang.header.balance}
              </div>
              <span className="double-block__main">
                {!this.state.isShowbalanse && this.props.user.info.accountData
                  ? splitRangNumber(
                      Math.floor(this.props.user.info.accountData.balance)
                    )
                  : "******"}
              </span>
            </span>
            {this.props.settingApp.isBonus ? (
              <span
                className={
                  "user__balance bonus-icon double-block " +
                  (!this.props.isMainBalance ? "active" : "")
                }
                onClick={() => this.changeBalance(false)}
              >
                <span className="double-block__header">
                  {this.props.lang.bonusScore}
                </span>
                <span className="double-block__main">
                  {!this.state.isShowbalanse && this.props.user.info.accountData
                    ? splitRangNumber(
                        Math.floor(
                          this.props.user.info.accountData.bonusBalance
                        )
                      )
                    : "******"}
                </span>
              </span>
            ) : (
              ""
            )}
          </>
        </div>

        <div className="user__replenishment replenishment-button">
          <div
            className="replenishment-button__button"
            onClick={() =>
              this.changeUrlEvent(
                "/" +
                  routsName.dict.kabinet +
                  "/" +
                  routsName.dict.moj_schet +
                  "/" +
                  routsName.dict.popolnenie
              )
            }
          >
            {getIcon("replenishment")}
          </div>
        </div>
        <div
          className={
            "user__icon user-info " +
            (this.state.accountMenu.isOpen ? "open" : "")
          }
        >
          <div className="user-info__icon ">{getIcon("user-icon")}</div>
          <div className="user-info__menu">
            <div className="user-info__icon">{getIcon("user-icon")}</div>
            <div className="user-info__top">
              <div className="user-info__money">
                <div
                  className={
                    "user-info__line " +
                    (this.props.isMainBalance ? "active" : "")
                  }
                  onClick={() => this.changeBalance(true)}
                >
                  <div>{this.props.lang.header.balance}</div>
                  <div>
                    {!this.state.isShowbalanse &&
                    this.props.user.info.accountData
                      ? splitRangNumber(
                          Math.floor(this.props.user.info.accountData.balance)
                        )
                      : "******"}
                  </div>
                </div>
                {this.props.settingApp.isBonus ? (
                  <div
                    className={
                      "user-info__line bonus-icon " +
                      (!this.props.isMainBalance ? "active" : "")
                    }
                    onClick={() => this.changeBalance(false)}
                  >
                    <div>{this.props.lang.header.bonus}</div>
                    <div>
                      {!this.state.isShowbalanse &&
                      this.props.user.info.accountData
                        ? splitRangNumber(
                            Math.floor(
                              this.props.user.info.accountData.bonusBalance
                            )
                          )
                        : "******"}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="user-info__buttons">
                <div
                  className="user-info__deposit button"
                  onClick={() =>
                    this.changeUrlEvent(
                      "/" +
                        routsName.dict.kabinet +
                        "/" +
                        routsName.dict.moj_schet +
                        "/" +
                        routsName.dict.popolnenie
                    )
                  }
                >
                  {this.props.lang.deposit}
                </div>
                <div
                  className="user-info__hide button"
                  onClick={() => this.isShowBalanse()}
                >
                  {!this.state.isShowbalanse ? <Visible /> : <Unvis />}
                  {/* <img
                    src={!this.state.isShowbalanse ? visible : unvis}
                    alt=""
                    clas
                  /> */}
                </div>
              </div>
            </div>
            {this.state.isBonusOnDeposit ? (
              <BonusOnDeposit
                removeDeposit={this.removeDeposit.bind(this)}
                toggleAccount={this.toggleAccount.bind(this)}
              />
            ) : (
              ""
            )}
            {this.listMenu()}
          </div>
        </div>
      </React.Fragment>
    );
  }

  generateColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  changeTheme(color) {
    if (!color) color = this.generateColor();
    document.documentElement.style.setProperty("--headerBaseBg-color", color);
    setLocalStorage(
      "Theme",
      getLocalStorageData("Theme") === "default" ? "oherTheme" : "default"
    );
    this.update = true;
    this.setState({ ...this.state });
  }

  listMenu() {
    return (
      <nav className="user-info__nav user-nav">
        <ul className="user-nav__list">
          <li
            className="user-nav__item"
            onClick={this.redirect.bind(this, routsName.dict["moi_stavki"])}
          >
            {this.props.lang.myBets}
          </li>
          <li
            className="user-nav__item"
            onClick={this.redirect.bind(this, routsName.dict["moj_akkaunt"])}
          >
            {this.props.lang.header.account}
          </li>
          <li
            className="user-nav__item"
            onClick={this.redirect.bind(this, routsName.dict["moj_schet"])}
          >
            {this.props.lang.header.money}
          </li>
          <li className="user-nav__item" onClick={e => this.logOut(e)}>
            {this.props.lang.header.logOut}
          </li>
          {/* <li className="user-nav__item">
            <label className="toggle">
              <input
                className="toggle__input"
                type="checkbox"
                onChange={() =>
                  this.changeTheme(
                    getLocalStorageData("Theme") === "default"
                      ? null
                      : "#0c1855"
                  )
                }
              />
              <span className="toggle__label">
                <span className="toggle__text">
                  {getLocalStorageData("Theme") === "default"
                    ? "Получить Любой новый цвет Header"
                    : "Вернуть default"}{" "}
                </span>
              </span>
            </label>
          </li> */}
        </ul>
      </nav>
    );
  }

  componentDidMount() {
    this.update = false;
  }
  componentDidUpdate() {
    this.update = false;
  }
}

const mapStateToProps = state => {
  return {
    isMainBalance: state.user.isMainBalance,
    balanceData: state.user.info.accountData,
    lang: state.user.language_user.dict,
    settingApp: state.mainSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleBalance: balanceActive => {
      if (balanceActive) {
        dispatch(bonusBalance());
      } else {
        dispatch(mainBalance());
      }
    },
    navigate: url => dispatch(route("push", url))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
