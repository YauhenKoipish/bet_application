import React, { Component } from "react";
import { closeCoupon } from "../../Actions/Components/Coupon";
import {
  validateInput,
  splitRangNumber,
  getIcon,
  getSportIcon
} from "../../Services/Shared";
import { connect } from "react-redux";
// import "./style/bets-window.css";
// import "./style/coupon-item.css";
// import "./style/coupon.css";
// import "./style/coupon-open.css";
import CouponContent from "./Components/Coupon";
import Settings from "./Components/Settings";
import { MIN_SUM_INPUT } from "./Components/Coupon";
import Header from "./Components/Header";
import Bets from "./Components/Bets";

class Coupon extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: "coupon"
    };
  }

  getContent() {
    switch (this.state.activeComponent) {
      case "settings":
        return <Settings />;
      case "bets":
        return <Bets />;
      case "coupon":
      default:
        return (
          <CouponContent
            changeActiveComponent={this.changeActiveComponent.bind(this)}
          />
        );
    }
  }

  changeActiveComponent(component) {
    if (this.props.editingTicket && component === "coupon") {
      component = "bets";
    }
    if (component === this.state.activeComponent) return;
    this.setState({
      ...this.state,
      activeComponent: component
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.editingTicket !== this.props.editingTicket) {
      return false;
    }
    return true;
  }

  render() {
    if (this.props.search.data && !this.props.isCouponOpenDefault) return "";
    return (
      <div
        className={
          "bets-window" +
          (!this.props.isOpen && !this.props.isCouponOpenDefault
            ? " inactive"
            : "")
        }
      >
        <div
          className={"bets-window__title"}
          onClick={() => this.props.closeCoupon()}
        >
          <span>{this.props.lang.coupon}</span>
          <span className="close_icon">{getSportIcon("close")}</span>
        </div>
        {
          <Header
            closeCoupon={this.props.closeCoupon}
            changeActiveComponent={this.changeActiveComponent.bind(this)}
            activeComponent={this.state.activeComponent}
            lang={this.props.lang}
            count={this.props.count}
          />
        }
        <div className="bets-window__main">{this.getContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict,
    isOpen: state.coupon.isOpen,
    isCouponOpenDefault: state.coupon.defaultOpen,
    search: state.search,
    editingTicket: state.tickets.editingTicket,
    count: state.coupon.ordinars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCoupon: () => dispatch(closeCoupon())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupon);

export const changePay = (
  inputElem,
  payElem,
  coefArg,
  maxPay,
  isBlocked = false
) => {
  validateInput(inputElem, splitRangNumber);
  if (isBlocked) {
    payElem.innerHTML = 0;
    return 0;
  }
  // debugger;// Проверка работы this.inputElem - > на ,value
  // let value = FEAUTER_KEYBOARDS
  //     ? parseInt(inputElem.textContent//.replace(/ /g, ""))
  //     : parseInt(inputElem.value//.replace(/ /g, ""));
  let value = +inputElem.textContent;
  if (isNaN(value)) value = 0;
  if (value < MIN_SUM_INPUT && value !== 0) {
    payElem.innerHTML = 0;
    inputElem.classList.add("error-border");
    return 0;
  } else inputElem.classList.remove("error-border");
  const coef = coefArg && coefArg !== "-" ? coefArg : 0;
  let pay = coef * value;
  let maxSum = maxPay ? Math.floor(maxPay / (coef - 1)) : Infinity;
  if (isNaN(maxSum)) maxSum = 0;
  if (value > maxSum) {
    inputElem.classList.add("error-border");
    pay = coef * maxSum;
  } else {
    inputElem.classList.remove("error-border");
  }
  // let validPay = splitRangNumber(pay);
  const validPay = splitRangNumber(Math.floor(pay * 100) / 100);
  // debugger;
  payElem.innerHTML = validPay;
  return Math.floor(pay);
};
