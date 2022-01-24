import React, { Component } from "react";
import {
  getSportIcon,
  getCoefInTrueFormat,
  splitRangNumber,
  getArrayFatBet
} from "../../../../Services/Shared";
import { connect } from "react-redux";
import { changePay } from "../..";
import {
  addSumInputSystem,
  addSystemCoef,
  removeSystemCoef,
  saveMaxPayCoupon,
  changeSystemRang,
  setSumInputSystem
} from "../../../../Actions/Components/Coupon";
import { requestMaxPayout } from "../../../../Server";
import { route } from "../../../../Actions/Components/Navigation";
import Coef from "../../../Main/Components/Table/Line/Components/Coef";

import Keyboard from "../../../Keyboards/";
import { routsName } from "../../../../Router/RouterList";

class System extends Component<any, any> {
  coef: any;
  initialState: {
    rangVal: any;
    isOpen: boolean;
    isMaxPayShown: boolean;
  };
  coefs: any;
  inputElem: any;
  payElem: any;
  constructor(props) {
    super(props);
    this.coef = null;
    this.initialState = {
      rangVal: null,
      isOpen: false,
      isMaxPayShown: false
    };
    this.state = this.initialState;
    this.inputElem = React.createRef();
    this.payElem = React.createRef();
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
    const value = props.settingInputValues.system;
    if (value !== null || value !== undefined) {
      this.inputElem.current.value = value;
      this.changePay();
    }
    this.props.setSumInputSystem(null);
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
    requestMaxPayout(data, "system", 3);
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
    this.props.addSumInputSystem(sum);
  }

  getCoef(ordinars) {
    const coefs: any = ordinars.map((ord: any) => parseFloat(ord.coef));
    const rang = this.getRang();
    this.coefs = [];
    this.getCoefsArray(coefs, rang, 0, 0, new Array(rang));

    // Разобрать Ошибку ТУТ
    // debugger;
    const sCoef =
      this.coefs.length > 0
        ? this.coefs.reduce((a, b) => a + b) / this.coefs.length
        : 0;

    return getCoefInTrueFormat(sCoef);
  }

  getCoefsArray = (arr, n, i, ur, arrCoef) => {
    // debugger;
    let t = arr.length - n + (i + 1);
    if (t > arr.length) t = arr.length;
    if (ur < n) {
      return (() => {
        for (i; i < t; i++) {
          arrCoef[ur] = arr[i];
          this.getCoefsArray(arr, n, i + 1, ur + 1, arrCoef);
        }
      })();
    } else {
      let proizv = 1;
      for (let a = 0; a < arrCoef.length; a++) {
        proizv = proizv * arrCoef[a];
      }
      this.coefs.push(proizv);
    }
  };

  getRang() {
    return this.state.rangVal
      ? this.state.rangVal < this.props.ordinars.length - 1
        ? this.state.rangVal
        : this.props.ordinars.length - 1
      : this.props.ordinars.length - 1;
  }

  getRangArray(curRang, maxRang) {
    let counter = 1;
    return [...new Array(maxRang - 3)].map(() => {
      if (curRang === ++counter) counter++;
      return counter;
    });
  }

  setRangValue(val, event) {
    event.stopPropagation();
    if (this.props.ordinars.length < 4) return;
    this.setState({
      ...this.state,
      rangVal: val,
      isOpen: false
    });
  }

  toggleSystem() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
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
        this.props.setSumInputSystem(splitRangNumber(Math.floor(maxSum)));
      }
    } else {
      console.log(this.maxPay, "Проверь чему равно"); // ghdjthm
    }
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
    this.props.setSumInputSystem(sum);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isBlocked !== this.props.isBlocked) {
      return true;
    }
    // if (nextProps.inputValues !== this.props.inputValues) {
    //   return false;
    // }
    if (nextProps.settingInputValues.system !== null) {
      this.setInputValue(nextProps);
      return false;
    }
    if (nextProps.maxPay !== this.props.maxPay) {
      this.changePay();
      return false;
    }
    return true;
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
    const { isOpen, isMaxPayShown } = this.state;
    this.coef = !isBlocked ? this.getCoef(ordinars) : "-";
    const rang = this.getRang();
    const rangArray = this.getRangArray(rang, ordinars.length);
    const iz = this.props.lang.iz;
    return (
      <div className="coupon__item coupon-item">
        <div className="coupon-item__info">
          <div className="coupon-item__main-info">
            <div
              className="coupon-item__other"
              onClick={this.toggleSystem.bind(this)}
            >
              <span>
                {this.props.lang.systemBet +
                  " " +
                  rang +
                  " " +
                  iz +
                  " " +
                  ordinars.length}
              </span>
              {ordinars.length > 3 ? getSportIcon("arrowsUpDown") : ""}
              <div
                className={"coupon-item__dropdown" + (isOpen ? " open" : "")}
              >
                <div
                  className="coupon-item__item active"
                  onClick={this.toggleSystem.bind(this)}
                >
                  {this.props.lang.systemBet} {rang} {this.props.lang.iz}{" "}
                  {ordinars.length}
                </div>
                {rangArray.map((rangVal, i) => (
                  <div
                    className="coupon-item__item"
                    key={i}
                    onClick={e => this.setRangValue.call(this, rangVal, e)}
                  >
                    {this.props.lang.systemBet} {rangVal} {this.props.lang.iz}{" "}
                    {ordinars.length}
                  </div>
                ))}
              </div>
            </div>
            <Coef key={"system" + ordinars.length} coef={this.coef} />
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
            <div className="coupon-item__text">
              {this.props.lang.betsHistoryTable.repli}
            </div>
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

    this.props.addSystemCoef(this.coef);
    this.props.changeSystemRang(this.getRang());
    this.requestMaxPayout();
    this.inputElem.current.oninput = this.changePay.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.props.addSystemCoef(this.coef);
    this.props.changeSystemRang(this.getRang());
    if (prevProps.ordinars.length !== this.props.ordinars.length) {
      this.requestMaxPayout();
    }
    this.changePay();
    if (prevProps.isAuthorize && !this.props.isAuthorize) {
      this.props.saveMaxPayCoupon("system", null);
      this.setState({
        ...this.state,
        isMaxPayShown: false
      });
    }
  }

  componentWillUnmount() {
    this.props.removeSystemCoef();
    this.props.changeSystemRang(null);
    this.props.saveMaxPayCoupon("system", null);
  }
}
const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict,
    maxPay: state.coupon.maxPay,
    settingInputValues: state.coupon.settingInputValues,
    isAuthorize: state.user.isAuthorize,
    inputValue: state.coupon.inputValues.system,
    balance: state.user.isMainBalance
      ? state.user.info.accountData.balance
      : state.user.info.accountData.bonusBalance,
    width_screen: state.width_screen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSystemCoef: coef => dispatch(addSystemCoef(coef)),
    addSumInputSystem: sum => dispatch(addSumInputSystem(sum)),
    removeSystemCoef: () => dispatch(removeSystemCoef()),
    saveMaxPayCoupon: (requestId, maxPay) =>
      dispatch(saveMaxPayCoupon(requestId, maxPay)),
    navigate: url => dispatch(route("push", url)),
    changeSystemRang: rang => dispatch(changeSystemRang(rang)),
    setSumInputSystem: sum => dispatch(setSumInputSystem(sum))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
