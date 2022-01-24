import React, { Component } from "react";
import { connect } from "react-redux";
// import "../../style/constructor-mini.css";

import {
  addSumInputBuilder,
  saveMaxPayCoupon,
  setSumInputBuilder,
  sendCouponBuilder
} from "../../../../Actions/Components/Coupon";
import { requestMaxPayout } from "../../../../Server";
import { route } from "../../../../Actions/Components/Navigation";
import {
  getCoefInTrueFormat,
  splitRangNumber,
  getSportIcon,
  isLineBlocked
} from "../../../../Services/Shared";
import { changePay } from "../..";
import BlockedBlock from "./BlockedBlock";
import Coef from "../../../Main/Components/Table/Line/Components/Coef";

import { routsName } from "../../../../Router/RouterList";
import TitleCoupion from "./TmpTitle/TitleCoupion";

class Builder extends Component<any, any> {
  inputElem: any;
  payElem: any;
  coef: any;
  state: any;
  prevCoef: any;
  constructor(props) {
    super(props);
    this.inputElem = React.createRef();
    this.payElem = React.createRef();
    this.coef = null;
    this.state = {
      isMaxPayShown: false,
      isBlocked: this.isBuilderBlockedVal(props),
      isOpenBB: true
    };
  }
  ъ;
  get maxPay() {
    return this.props.maxPay.builder ? this.props.maxPay.builder : 0;
    // return 100000;
  }

  get maxSum() {
    const sum = Math.floor(this.maxPay / (this.coef - 1));
    return this.maxPay ? splitRangNumber(!isNaN(sum) ? sum : 0) : 0;
  }

  getCoef() {
    return !this.state.isBlocked && this.props.serverCoef
      ? this.props.serverCoef
      : "-";
  }

  setInputValue(props) {
    const value = props.settingInputValues.builder;
    if (value !== null || value !== undefined) {
      this.inputElem.current.value = value;
      this.changePay();
    }
    this.props.setSumInputBuilder(null);
  }

  requestMaxPayout() {
    const data = [...this.props.bets.values()].map(ord => {
      const lineId = this.props.linesByCK.get(ord.compoundKey);
      const line = this.props.lines.get(lineId);
      if (!line) return null;
      return {
        compoundKey: ord.compoundKey,
        outcomeId: +ord.outcomeId,
        lineTypeRadar: line.lineTypeRadar
      };
    });
    if (!data || data.length === 0 || !data[0]) return;
    requestMaxPayout(data, "builder", 4);
  }

  changePay() {
    changePay(
      this.inputElem.current,
      this.payElem.current,
      this.coef,
      this.maxPay
    );
    const sum = this.inputElem.current.value.replace(/ /g, "");
    this.props.addSumInputBuilder(sum);
  }

  showMax(e) {
    e.stopPropagation();
    if (!this.props.isAuthorize) {
      // this.props.navigate("/login/signin");
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
        this.props.setSumInputBuilder(splitRangNumber(Math.floor(maxSum)));
      }
    }
  }

  isBuilderBlockedVal(props = this) {
    const event = this.props.events.get(this.props.event.id);
    if (!event) return true;

    const isLineBlockedVal = [...this.props.bets.values()].some(bet => {
      const line = this.getLineByCK(bet.compoundKey);
      return isLineBlocked(line, this.props.events.get(this.props.event.id));
    });

    return isLineBlockedVal;
  }

  getLineByCK(compoundKey) {
    const lineId = this.props.linesByCK.get(compoundKey);
    if (!lineId) return null;
    return this.props.lines.get(lineId);
  }

  isBuilderBlocked(props) {
    if (
      props.deletedEvent &&
      props.deletedEvent.id === props.event.id &&
      !this.state.isBlocked
    ) {
      this.setState({
        ...this.state,
        isBlocked: true
      });
      return;
    }
    if (!props.newEvents.has(props.event.id)) return;

    const isLineBlcoked = [...this.props.bets.values()].some(bet => {
      const line = this.getLineByCK(bet.compoundKey);
      return isLineBlocked(line, props.events.get(props.event.id));
    });
    if (isLineBlcoked !== this.state.isBlocked) {
      this.setState({
        ...this.state,
        isBlocked: isLineBlcoked
      });
      return;
    }
  }

  getDefaultVaule() {
    if (this.props.inputValues.builder) {
      const sum = this.props.inputValues.builder;
      return sum ? splitRangNumber(sum) : "";
    }
    return "";
  }

  setSumInput() {
    const sum = this.getDefaultVaule();
    if (!sum) return;
    this.props.setSumInputBuilder(sum);
  }

  removeBuilder() {
    this.props.addSumInputBuilder(null);
    this.props.removeBuilder();
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.isBuilderBlocked(nextProps);
    if (this.state !== nextState) return true;

    if (nextProps.isBlocked !== this.props.isBlocked) {
      return true;
    }
    if (nextProps.settingInputValues.builder !== null) {
      this.setInputValue(nextProps);
      return false;
    }
    if (nextProps.inputValues !== this.props.inputValues) {
      return false;
    }
    if (this.props.serverCoef !== nextProps.serverCoef) {
      this.prevCoef = this.coef;
      this.coef = nextProps.serverCoef;
      return true;
    }
    if (nextProps.maxPay !== this.props.maxPay) return false;
    return false;
  }

  toggleSingleBEts() {
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
  }

  render() {
    const event = this.props.events.has(this.props.event.id)
      ? this.props.events.get(this.props.event.id)
      : this.props.event;
    const { ordinars, isBlocked } = this.props;
    const isMaxPayShown = this.state.isMaxPayShown;
    this.coef = this.getCoef();
    return (
      <div className="constructor-mini">
        <TitleCoupion
          toggle={this.toggleSingleBEts.bind(this)}
          name={this.props.lang.counstructor}
          isOpen={true}
        />
        <div
          className={
            "constructor-mini__item " + (!this.state.isOpen ? "" : "inactive")
          }
        >
          <div className="constructor__top">
            <div className="constructor-mini__header">
              <div
                className="constructor-mini__close"
                onClick={this.removeBuilder.bind(this)}
              >
                {getSportIcon("close")}
              </div>
              <div className="constructor-mini__type">
                {this.props.lang.counstructor}
              </div>
              <Coef key={"builder"} coef={getCoefInTrueFormat(this.coef)} />
              <div className="constructor-mini__name">
                {event.homeName} – {event.awayName}
              </div>
            </div>

            <div className="constructor-mini__body">
              {this.props.bets && this.props.bets.size !== 0
                ? [...this.props.bets.values()].map((bet, i) => {
                    return (
                      <div className="constructor-mini__bet" key={i}>
                        <div className="constructor__dot">
                          <div className="constructor__stick" />
                        </div>
                        <div className="constructor-mini__info">
                          <div className="constructor-mini__full">
                            {bet.tabName.join(" ")}
                          </div>

                          <div className="constructor-mini__description">
                            {bet.marketName}
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>

          <div className="constructor__bottom">
            <div className="coupon-item__total">
              <div className="coupon-item__sum">
                <div className="coupon-item__text">Сумма</div>
                <div className="coupon-item__input">
                  <input type="text" ref={this.inputElem} />
                  <div
                    className="coupon-item__max"
                    onClick={e => this.showMax.call(this, e)}
                  >
                    {isMaxPayShown && this.maxSum && this.props.isAuthorize
                      ? this.maxSum
                      : "Макс"}
                  </div>
                </div>
              </div>

              <div className="coupon-item__payment">
                <div className="coupon-item__text">Выплата</div>
                <div className="coupon-item__quantity" ref={this.payElem}>
                  0
                </div>
              </div>
            </div>
          </div>
          {this.state.isBlocked ? (
            <BlockedBlock text={this.props.lang.errorMultiBets2} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setSumInput();
    this.requestMaxPayout();
    this.inputElem.current.oninput = this.changePay.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.changePay();
    if (prevProps.isAuthorize && !this.props.isAuthorize) {
      this.props.saveMaxPayCoupon("builder", null);
      this.setState({
        ...this.state,
        isMaxPayShown: false
      });
    }
  }

  componentWillUnmount() {
    // this.props.addSumInputBuilder(null);
    this.props.saveMaxPayCoupon("builder", null);
  }
}

const mapStateToProps = state => {
  return {
    maxPay: state.coupon.maxPay,
    settingInputValues: state.coupon.settingInputValues,
    isAuthorize: state.user.isAuthorize,
    events: state.server.eventsAndLines.events,
    newEvents: state.server.eventsAndLines.newEvents,
    deletedEvent: state.server.eventsAndLines.deletedEvent,
    lines: state.server.eventsAndLines.lines,
    linesByCK: state.server.eventsAndLines.linesByCK,
    serverCoef: state.server.builderInfo.builderCoef,
    inputValues: state.coupon.inputValues,
    balance: state.user.isMainBalance
      ? state.user.info.accountData.balance
      : state.user.info.accountData.bonusBalance,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSumInputBuilder: sum => dispatch(addSumInputBuilder(sum)),
    saveMaxPayCoupon: (requestId, maxPay) =>
      dispatch(saveMaxPayCoupon(requestId, maxPay)),
    navigate: url => dispatch(route("push", url)),
    setSumInputBuilder: sum => {
      dispatch(setSumInputBuilder(sum));
    },
    removeBuilder: () => dispatch(sendCouponBuilder(null))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Builder);
