import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSportIcon,
  getMainScore,
  renameMarketName,
  getOutcomeName,
  getEventName,
  getEventNameArray,
  getMarketName,
  getCoef,
  replaceCompetitorsFull,
  isLineBlocked,
  getMarket,
  splitRangNumber,
  getUrlForRospis,
  getEventByGB,
  getArrayFatBet
} from "../../../../Services/Shared";
import BlockedBlock from "./BlockedBlock";
import { changePay } from "../..";
import {
  addOrdinarCoef,
  addSumInputOrdinar,
  setSumInputOrdinar,
  removeSettingSumInputOrdinar,
  removeOrdinarCoef,
  removeSumInputOrdinar,
  removeOrdinarMaxPay,
  toggleOutcome
} from "../../../../Actions/Components/Coupon";
import { requestMaxPayout } from "../../../../Server";
import { route } from "../../../../Actions/Components/Navigation";
import Coef from "../../../Main/Components/Table/Line/Components/Coef";

import Keyboard from "../../../Keyboards/";

import { routsName } from "../../../../Router/RouterList";

class Ordinar extends Component<any, any> {
  inputElem: any;
  payElem: any;
  prevCoef: any;
  timer: any;
  coef: any;

  isBlocked: any;
  isLineDeleted: any;
  constructor(props) {
    super(props);
    this.inputElem = React.createRef();
    this.payElem = React.createRef();
    this.prevCoef = null;
    this.coef = null;
    this.state = {
      isMaxPayShown: false,
      showKeyboard: false,
      fastSum: false
    };
  }

  get key() {
    return this.props.compoundKey + "-" + this.props.outcomeId;
  }

  get maxPay() {
    return this.props.maxPay.ordinars.has(this.key)
      ? this.props.maxPay.ordinars.get(this.key)
      : 0;
    // return 10000;
  }

  get maxSum() {
    const sum = Math.floor(this.maxPay / (this.coef - 1));
    return this.maxPay ? splitRangNumber(!isNaN(sum) ? sum : 0) : 0;
  }

  setInputValue(props) {
    const value = props.settingInputValues.ordinars.get(this.key);
    if (value !== null || value !== undefined) {
      this.inputElem.current.value = value;
      this.changePay();
    }
    this.props.removeSettingSumInputOrdinar(this.key);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.event) {
      // if (nextProps.linesByCK.has(this.props.compoundKey)) {
      //   const line = nextProps.linesByCK.get(this.props.compoundKey);
      //   if (line) {
      //     debugger;
      //     this.props.event = {};
      //     this.props.event = this.props.ordinarInfo.event;

      //     return true;
      //   }
      // }
      return false;
    }
    if (nextProps.inputValues !== this.props.inputValues) {
      return false;
    }
    if (nextProps.width_screen !== this.props.width_screen) {
      return true;
    }
    if (nextProps.settingInputValues.ordinars.has(this.key)) {
      this.setInputValue(nextProps);
    }
    if (this.props.isAuthorize !== nextProps.isAuthorize) {
      this.requestMaxPayout();
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }

    if (
      !this.props.event ||
      [...nextProps.newEvents.values()].some(
        event => event.gbId === this.props.ordinarInfo.event.gbId
      ) ||
      (nextProps.deletedEvent &&
        nextProps.deletedEvent.id === this.props.ordinarInfo.event.id)
    ) {
      return true;
    }
    if (this.props.maxPay !== nextProps.maxPay) {
      return true;
      // this.changePay();
    }
    if (this.props.viewSingleBet !== nextProps.viewSingleBet) {
      return true;
      // this.changePay();
    }
    return false;
  }

  deleteOrdinar() {
    const line = this.props.ordinarInfo.line;
    const outcomeId = this.props.outcomeId;
    this.props.toggleOutcome(line, outcomeId);
  }

  setTimerToDeleteOrdinar() {
    if (this.timer) return;
    this.timer = setTimeout(this.deleteOrdinar.bind(this), 5 * 60 * 1000);
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
        this.props.setSumInputOrdinar(
          this.key,
          splitRangNumber(Math.floor(maxSum))
        );
      }
    }
  }

  changePay() {
    changePay(
      this.inputElem.current,
      this.payElem.current,
      this.coef,
      this.maxPay,
      this.isBlocked
    );

    // debugger;
    // Проверка работы this.inputElem - > на ,value

    const sum =
      +this.props.width_screen <= 1023
        ? this.inputElem.current.textContent.replace(/ /g, "")
        : this.inputElem.current.value.replace(/ /g, "");
    this.props.addSumInputOrdinar(this.key, sum);
  }

  requestMaxPayout() {
    const data = [
      {
        compoundKey: this.props.compoundKey,
        outcomeId: this.props.outcomeId,
        lineTypeRadar: this.props.ordinarInfo.line.lineTypeRadar
      }
    ];
    requestMaxPayout(data, this.key, 1);
  }

  goToRospis() {
    const url = getUrlForRospis(this.props.event.id);
    if (!url) return;
    this.props.navigate(url);
  }

  getDefaultVaule() {
    if (this.props.inputValues.ordinars.has(this.key)) {
      const sum = this.props.inputValues.ordinars.get(this.key);
      return sum ? splitRangNumber(sum) : "";
    }
    return "";
  }

  setSumInput() {
    const sum = this.getDefaultVaule();
    if (!sum) return;
    this.props.setSumInputOrdinar(this.key, sum);
  }

  removeOrdinar() {
    this.props.removeSumInputOrdinar(this.key);
    this.props.removeOrdinar();
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
    const {
      compoundKey,
      outcomeId,
      event,
      removeOrdinar,
      market,
      ordinarInfo,
      addOrdinarCoef
    } = this.props;

    this.isLineDeleted =
      this.props.deletedEvent &&
      this.props.deletedEvent.id === this.props.ordinarInfo.event.id;
    const isMaxPayShown: any = this.state.isMaxPayShown;

    let actualEvent: any =
      event && !this.isLineDeleted ? getEventByGB(event.gbId) : null;

    // if (!actualEvent) debugger;
    const lineId = this.props.linesByCK.get(compoundKey);
    let line: any =
      actualEvent && !this.isLineDeleted ? actualEvent.lines.get(lineId) : null;
    this.prevCoef = this.coef;
    this.coef = actualEvent && line ? getCoef(line, outcomeId, "-") : "-";
    const score: any = getMainScore(actualEvent);

    this.isBlocked = isLineBlocked(line, actualEvent);

    if (!actualEvent) actualEvent = ordinarInfo.event;
    if (!line) {
      this.isLineDeleted = true;
      line = ordinarInfo.line;
    } else if (line.status !== 1 && line.status !== -1) {
      this.isLineDeleted = true;
    }

    const actualMarket = market
      ? market
      : getMarket(line, this.props.markets, this.props.marketsByNum);
    const marketName = actualMarket
      ? renameMarketName(
          line,
          actualMarket,
          getOutcomeName(actualMarket, outcomeId, line, actualEvent),
          replaceCompetitorsFull(actualEvent)
        )
      : "";

    const outcomeName = actualMarket
      ? renameMarketName(
          line,
          actualMarket,
          getMarketName(actualMarket, line, actualEvent),
          replaceCompetitorsFull(actualEvent)
        )
      : "";
    if (!actualMarket) {
      // debugger;
      console.log("ЧТО-ТО ПОШЛО НЕ ТАК");
      console.log("line");
      console.log(line);
    }

    return (
      <div
        className={
          "coupon__item coupon-item " +
          (this.props.viewSingleBet ? "inactive" : "")
        }
        data-lineid={line.id}
      >
        <div className="title_sml">
          <div className="icon">
            {getSportIcon(actualEvent.sportId, "", this.props.gray)}
          </div>
          <div className="name">
            {!actualEvent.isLongTerm
              ? getEventNameArray(actualEvent).map((team, index) => (
                  <span key={index}>
                    {index}.{team}
                  </span>
                ))
              : ""}
          </div>
          <div className="remove_element">
            {" "}
            <div
              className="coupon-item__close"
              onClick={this.removeOrdinar.bind(this)}
            >
              {getSportIcon("close", "", "#dadada")}
            </div>
          </div>
        </div>

        {this.isBlocked ? <BlockedBlock /> : ""}

        <div className="coupon-item__info">
          <div className="coupon-item__main-info">
            <div className="coupon-item__name">{marketName}</div>
            <Coef key={line.compoundKey + "-" + outcomeId} coef={this.coef} />
          </div>
          <div className="coupon-item__description">
            <div className="coupon-item__cause">
              <div className="coupon-item__type">{outcomeName}</div>
              <div
                className="coupon-item__teams"
                onClick={this.goToRospis.bind(this)}
              >
                {getEventName(actualEvent)}
              </div>
            </div>
            <div className="coupon-item__score">
              {score ? score.home + ":" + score.away : ""}
            </div>
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
                  {false ? ( //this.state.showKeyboard
                    <>
                      <Keyboard
                        {...{ device: "mobile" }}
                        elem={this.inputElem}
                        bigKeyboards={this.props.isCouponOpenDefault}
                        close={this.showKeyboards.bind(this)}
                        showFastSum={this.showFastSum.bind(this)}
                        arraySum={
                          this.maxSum && this.props.isAuthorize
                            ? getArrayFatBet(
                                100,
                                this.maxSum.toString().replace(/[^-0-9]/gim, "")
                              )
                            : false
                        }
                      />
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <input className="change__input" ref={this.inputElem} />
                </>
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
              {0}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setSumInput();
    this.props.addOrdinarCoef(this.key, this.coef);
    this.requestMaxPayout();
    this.inputElem.current.oninput = this.changePay.bind(this);
    if (this.isLineDeleted) {
      this.setTimerToDeleteOrdinar();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.coef && this.coef !== "-") {
      this.props.isChangesCoef(this.coef, this.prevCoef);
    }
    this.props.addOrdinarCoef(this.key, this.coef);
    this.changePay();
    if (prevProps.isAuthorize && !this.props.isAuthorize) {
      this.props.removeOrdinarMaxPay(this.key);
      this.setState({
        ...this.state,
        isMaxPayShown: false
      });
    }
    if (this.isLineDeleted) {
      this.setTimerToDeleteOrdinar();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.props.removeOrdinarCoef(this.key);
    this.props.removeOrdinarMaxPay(this.key);
  }
}

const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict,
    events: state.server.eventsAndLines.events,
    newEvents: state.server.eventsAndLines.newEvents,
    deletedEvent: state.server.eventsAndLines.deletedEvent,
    linesByCK: state.server.eventsAndLines.linesByCK,
    markets: state.server.entities.markets,
    marketsByNum: state.server.entities.marketsByNum,
    maxPay: state.coupon.maxPay,
    isAuthorize: state.user.isAuthorize,
    settingInputValues: state.coupon.settingInputValues,
    isCouponOpenDefault: state.coupon.defaultOpen,
    inputValues: state.coupon.inputValues,
    viewSingleBet: state.viewSingleBet,
    balance: state.user.isMainBalance
      ? state.user.info.accountData.balance
      : state.user.info.accountData.bonusBalance,
    yellow: state.mainSetting.yellow,
    gray: state.mainSetting.gray,
    width_screen: state.width_screen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeOrdinarCoef: ordinar => dispatch(removeOrdinarCoef(ordinar)),
    removeSumInputOrdinar: ordinar => dispatch(removeSumInputOrdinar(ordinar)),
    removeOrdinarMaxPay: ordinar => dispatch(removeOrdinarMaxPay(ordinar)),
    addOrdinarCoef: (ordinar, coef) => dispatch(addOrdinarCoef(coef, ordinar)),
    addSumInputOrdinar: (ordinar, sum) =>
      dispatch(addSumInputOrdinar(sum, ordinar)),
    setSumInputOrdinar: (ordinar, sum) =>
      dispatch(setSumInputOrdinar(sum, ordinar)),
    removeSettingSumInputOrdinar: ordinar =>
      dispatch(removeSettingSumInputOrdinar(ordinar)),
    navigate: url => dispatch(route("push", url)),
    toggleOutcome: (line, outcomeId) => dispatch(toggleOutcome(line, outcomeId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ordinar);
