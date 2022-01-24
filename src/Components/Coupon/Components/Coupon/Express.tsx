import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCoefInTrueFormat,
  splitRangNumber,
  getArrayFatBet
} from "../../../../Services/Shared";
import { changePay } from "../..";
import {
  addSumInputExpress,
  addExpressCoef,
  removeExpressCoef,
  saveMaxPayCoupon,
  setSumInputExpress
} from "../../../../Actions/Components/Coupon";
import { requestMaxPayout } from "../../../../Server";
import { route } from "../../../../Actions/Components/Navigation";
import Coef from "../../../Main/Components/Table/Line/Components/Coef";

import Keyboard from "../../../Keyboards/";
import { routsName } from "../../../../Router/RouterList";

class Express extends Component<any, any> {
  props: any;
  state: any;
  inputElem: any;
  prevCoef: any;
  payElem: any;
  coef: any;
  currentCoefClass: any;

  constructor(props) {
    super(props);
    this.inputElem = React.createRef();
    this.payElem = React.createRef();
    this.coef = null;
    this.state = {
      isMaxPayShown: false
    };
  }

  get maxPay() {
    return this.props.maxPay.express ? this.props.maxPay.express : 0;
    // return 100000;
  }

  get maxSum() {
    const sum = Math.floor(this.maxPay / (this.coef - 1));
    return this.maxPay ? splitRangNumber(!isNaN(sum) ? sum : 0) : 0;
  }

  setInputValue(props) {
    const value = props.settingInputValues.express;
    if (value !== null || value !== undefined) {
      this.inputElem.current.value = value;
      this.changePay();
    }
    this.props.setSumInputExpress(null);
  }

  requestMaxPayout() {
    const data = this.props.ordinars.map(ord => {
      return {
        compoundKey: ord.compoundKey,
        outcomeId: ord.outcomeId,
        lineTypeRadar: this.props.ordinarsInfo.get(ord.compoundKey).line
          .lineTypeRadar
      };
    });
    requestMaxPayout(data, "express", 2);
  }

  changePay() {
    changePay(
      this.inputElem.current,
      this.payElem.current,
      this.coef,
      this.maxPay
    );
    const sum =
      +this.props.width_screen <= 1023
        ? this.inputElem.current.textContent.replace(/ /g, "")
        : this.inputElem.current.value.replace(/ /g, "");
    this.props.addSumInputExpress(sum);
  }

  showMax(e) {
    e.stopPropagation();
    if (!this.props.isAuthorize) {
      this.props.navigate(
        routsName.getRoutsUrl(routsName.dict.login, routsName.dict.signin)
      );
      return;
    }
    if (this.props.isAuthorize && this.maxPay) {
      if (!this.state.isMaxPayShown)
        this.setState({
          ...this.state,
          isMaxPayShown: true
        });
      else {
        const maxSum = Math.min(
          +this.maxSum.replace(/ /g, ""),
          this.props.balance
        );
        this.props.setSumInputExpress(splitRangNumber(Math.floor(maxSum)));
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isBlocked !== this.props.isBlocked) {
      return true;
    }
    // if (nextProps.inputValues !== this.props.inputValues) {
    //   return false;
    // }
    if (nextProps.settingInputValues.express !== null) {
      this.setInputValue(nextProps);
      return false;
    }
    if (nextProps.maxPay !== this.props.maxPay) {
      this.changePay();
      return false;
    }
    return true;
  }

  getDefaultVaule() {
    if (this.props.inputValue) {
      const sum = this.props.inputValue;
      return sum ? splitRangNumber(sum) : "";
    }
    return "";
  }

  setSumInput() {
    const sum = this.getDefaultVaule();
    if (!sum) return;
    this.props.setSumInputExpress(sum);
  }

  showKeyboards() {
    const newState = { ...this.state };
    newState.showKeyboard = !this.state.showKeyboard;

    this.setState(newState);
  }

  showFastSum() {
    const newState = { ...this.state };
    newState.fastSum = !this.state.fastSum;

    this.setState(newState);
  }

  render() {
    const { ordinars, isBlocked } = this.props;
    const isMaxPayShown = this.state.isMaxPayShown;

    this.coef = !isBlocked ? getCoef(ordinars) : "-";
    return (
      <div className="coupon__item coupon-item">
        <div className="coupon-item__info">
          <div className="coupon-item__main-info">
            <div className="coupon-item__other">
              <span>
                {this.props.lang.language === "ru"
                  ? this.props.lang.express
                  : this.props.lang["express" + ordinars.length]}
              </span>
            </div>
            <Coef
              key={"express" + ordinars.length}
              test={true}
              coef={this.coef}
            />
          </div>
        </div>

        <div className="coupon-item__total">
          <div className="coupon-item__sum">
            <div className="coupon-item__text">{this.props.lang.sum}</div>
            <div className="coupon-item__input">
              {false ? ( //+this.props.width_screen <= 1023
                <>
                  <div
                    className="change__input"
                    data-value={"1 2 3"}
                    ref={this.inputElem}
                    onClick={() => this.showKeyboards()}
                  />
                  {false ? ( // this.state.showKeyboard
                    <>
                      <Keyboard
                        {...{ device: "mobile" }}
                        elem={this.inputElem}
                        close={this.showKeyboards.bind(this)}
                        showFastSum={this.showFastSum.bind(this)}
                        fastSum={
                          this.state.fastSum ? getArrayFatBet(100, 10000) : ""
                        }
                      />
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <input className="change__input" ref={this.inputElem} />
              )}
              {/* <span className="remove_input_value">Х</span> */}
              <div
                className="coupon-item__max"
                onClick={e => this.showMax.call(this, e)}
              >
                {isMaxPayShown && this.maxSum && this.props.isAuthorize
                  ? this.maxSum
                  : this.props.lang.max}
              </div>
            </div>
          </div>

          <div className="coupon-item__payment">
            <div className="coupon-item__text">{this.props.lang.payout}</div>
            <div className="coupon-item__quantity" ref={this.payElem}>
              0
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setSumInput();
    this.props.addExpressCoef(this.coef);
    this.requestMaxPayout();
    this.inputElem.current.oninput = this.changePay.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.props.addExpressCoef(this.coef);
    if (prevProps.ordinars.length !== this.props.ordinars.length) {
      // debugger;
      this.requestMaxPayout();
    }
    this.changePay();
    if (prevProps.isAuthorize && !this.props.isAuthorize) {
      this.props.saveMaxPayCoupon("express", null);
      this.setState({
        ...this.state,
        isMaxPayShown: false
      });
    }
  }

  componentWillUnmount() {
    this.props.removeExpressCoef();
    // this.props.addSumInputExpress(null);
    this.props.saveMaxPayCoupon("express", null);
  }
}

const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict,
    maxPay: state.coupon.maxPay,
    settingInputValues: state.coupon.settingInputValues,
    isAuthorize: state.user.isAuthorize,
    inputValue: state.coupon.inputValues.express,
    width_screen: state.width_screen,
    balance: state.user.isMainBalance
      ? state.user.info.accountData.balance
      : state.user.info.accountData.bonusBalance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addExpressCoef: coef => dispatch(addExpressCoef(coef)),
    addSumInputExpress: sum => dispatch(addSumInputExpress(sum)),
    removeExpressCoef: () => dispatch(removeExpressCoef()),
    saveMaxPayCoupon: (requestId, maxPay) =>
      dispatch(saveMaxPayCoupon(requestId, maxPay)),
    navigate: url => dispatch(route("push", url)),
    setSumInputExpress: sum => dispatch(setSumInputExpress(sum))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Express);

const getCoef = ordinars => {
  const coefs = ordinars.map(ord => ord.coef);
  const eCoef = coefs.reduce((accum, curVal) => accum * parseFloat(curVal), 1);
  return getCoefInTrueFormat(eCoef);
};
