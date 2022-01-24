import React, { Component } from "react";
import {
  splitRangNumber,
  getCoef,
  renameMarketName,
  getMarket,
  replaceCompetitorsFull,
  getOutcomeName,
  isLineBlocked,
  getMarketName,
  getEventName,
  isEventLongTerm
} from "../../Services/Shared";
import { connect } from "react-redux";
import CashoutHistory from "./CashoutHistory";
import Pay from "./Pay";
import TicketInfo from "./TicketInfo";
import BonusAndLoyality from "./BonusAndLoyality";
import Ordinar from "./Ordinar";
import Express from "./Express";
import System from "./System";
import Builder from "./Builder";
import ButtonCashout from "./ButtonCashout";
import ServiceIcons from "./ServiceIcons";
import Stake from "./Stake";
import ButtonTicketTop from "./ButtonTicketTop";
import Block from "./Block";
import PartCashout from "./PartCashout";
import Advice from "./Advice";
import { showStatistics } from "../Main/Components/Table/EventInf/";
import {
  addEditingTicket,
  addStakeEditingTicket,
  addBetsEditingTicket,
  doCashout,
  addPreloader,
  saveChangesTicket,
  rememberAdvice
} from "../../Actions/Components/Tickets/";
import { requestMaxPayout } from "../../Server/";
import { MIN_SUM_INPUT } from "../Coupon/Components/Coupon/";


class Ticket extends Component {
  constructor(props) {
    super(props);
    this.inputElem = React.createRef();
    this.payElem = React.createRef();
    this.isEdited =
      props.editingTicket && props.ticketId === props.editingTicket.id;
    this.initialState = {
      cashout: !this.props.status ? this.getCashout(props) : null,
      stake: props.stake,
      isMaxPayShown: false,
      isButtonSaveChangesActive: false,
      isBlocked: false,
      isOpenPartCashout: false,
      isOpen: false
    };
    this.state = this.getCurState(this.initialState, props);

    this.currentBetsSize = this.isEdited
      ? props.editingTicket.bets.size
      : props.bets.size;
    this.handleClosePartCashout = e => this.closePartCashout.call(this, e);
  }

  get isCashoutHistory() {
    return this.props.cashoutRecords && this.props.cashoutRecords.length > 0
      ? true
      : false;
  }

  get wasEdited() {
    return this.props.parentTicketId ? true : false;
  }

  get isStatistic() {
    if (this.props.type !== 1) return false;
    const ordinarKey = [...this.props.bets.keys()][0];
    const ordinar = this.props.bets.get(ordinarKey);
    const event = this.getEventByGB(ordinar.gbEventId, this.props);
    if (!event || !event.betRadarOriginalId) return false;
    return true;
  }

  get isOpenIcon() {
    return false;
  }

  get maxPay() {
    if (this.isEdited && this.props.maxPay) return this.props.maxPay;
    return 0;
  }

  get maxSum() {
    const coef = this.isEdited ? this.coef : this.props.ticketCoef;
    if (this.maxPay) return Math.floor(this.maxPay / (coef - 1));
    return 0;
  }

  get coef() {
    const bets = this.isEdited
      ? this.props.editingTicket.bets
      : this.props.bets;
    return [...bets.values()].reduce(
      (accum, bet) => (accum *= bet.acceptedOdd),
      1
    );
  }

  get sum() {
    const inputVal = +this.inputElem.current.value.replace(/ /g, "");
    return inputVal === Math.floor(this.state.cashout)
      ? this.state.cashout
      : inputVal;
  }

  get pay() {
    if (!this.coef) return 0;
    if (this.isEdited)
      return Math.floor(+this.props.editingTicket.stake * this.coef);
    if (!this.inputElem.current) return 0;
    return Math.floor(
      +this.inputElem.current.value.replace(/ /g, "") * this.coef
    );
  }

  get editingTicketType() {
    if (!this.isEdited) return this.props.type;
    return this.props.editingTicket.bets.size > 1 ? 2 : 1;
  }

  get stake() {
    if (this.props.status) {
      return (
        this.props.cashoutRecords.reduce(
          (accum, val) => (accum += val.stake),
          0
        ) + this.props.stake
      );
    } else {
      return this.isEdited ? this.props.cashout : this.props.stake;
    }
  }

  handleClickFullCashout() {
    if (this.props.preloader) return;
    this.props.addPreloader("cashout", this.props.ticketId);
    this.doCashout(this.state.cashout);
  }

  handleClickPartCashout(sum) {
    if (this.props.preloader) return;
    this.props.addPreloader("partCashout", this.props.ticketId);
    this.doCashout(sum);
  }

  doCashout(sum) {
    const cashoutSum =
      sum === Math.floor(this.state.cashout) ? this.state.cashout : sum;
    const cashout = {
      ticketId: this.props.ticketId,
      outputStake: cashoutSum,
      remainingStake: this.state.cashout - cashoutSum
    };

    this.props.doCashout(cashout);
  }

  handleSavingChanges() {
    if (!this.state.isButtonSaveChangesActive) return;
    if (this.props.preloader) return;
    this.props.addPreloader("savingChanges", this.props.ticketId);
    this.saveChanges();
  }

  handleClickMainButton() {
    if (!this.isEdited) this.handleClickFullCashout();
    else this.handleSavingChanges();
  }

  getBets(bets) {
    const newBets = new Map();
    bets.forEach((bet, key) => {
      const newBet = { ...bet };
      if (!this.props.status && !newBet.status)
        this.updateBetNames(newBet, this.props);
      newBets.set(key, newBet);
    });
    return newBets;
  }

  getEventByGB(gbId, props) {
    const eventId = props.eventsByGB.get(gbId);
    if (!eventId) return null;
    const event = props.events.get(eventId);
    return event;
  }

  getLineByCK(compoundKey, props) {
    const lineId = props.linesByCK.get(compoundKey);
    if (!lineId) return null;
    const line = props.lines.get(lineId);
    return line;
  }

  getOutcomeOddId(ordinar, line) {
    if (!line) return -1;
    return line.outcomeId.indexOf(ordinar.outcomeId);
  }

  getCashout(props) {
    if (
      props.status ||
      props.accountType ||
      !props.stake ||
      props.type === 3 ||
      props.type === 4
    )
      return 0;
    let cashoutStake = 0;
    let coef = 1;
    let coefCashout = 1.7;

    let isCashoutAvailable = true;
    const newOdds = [];
    const oldOdds = [];
    // количество не расчитанных событий
    let unsettledBetsNum = 0;

    let isPrematch = true;

    let i = -1;
    for (let ordinar of this.props.bets.values()) {
      i++;
      if (!ordinar.status) {
        let event = this.getEventByGB(ordinar.gbEventId, props);
        if (!event) {
          return 0;
        }
        let line = this.getLineByCK(ordinar.compoundKey, props);
        if (!line) {
          return 0;
        }

        if (event.status) {
          isPrematch = false;
          if (event.status === 3 || event.status === 4) {
            return 0;
          }
        }

        newOdds[i] = 0;

        const outcomeOddId = this.getOutcomeOddId(ordinar, line);

        if (outcomeOddId === -1) {
          return 0;
        }

        if (line.outcomeOdds.length > outcomeOddId)
          newOdds[i] = line.outcomeOdds[outcomeOddId];
        oldOdds[i] = ordinar.acceptedOdd;

        if (line.status !== 1 || !line.outcomeActive[outcomeOddId]) {
          return 0;
        }
        coef *= oldOdds[i] / newOdds[i];
        coefCashout *= newOdds[i];
        unsettledBetsNum++;
      } else if (ordinar.status === 1) {
        coef *= ordinar.settlementOdd;
        isPrematch = false;
      }
    }
    if (isPrematch) {
      if (coef < 1) cashoutStake = coef * props.stake * 0.95;
      else cashoutStake = props.stake;
    } else if (!unsettledBetsNum) cashoutStake = 0;
    else
      cashoutStake =
        props.stake *
        coef *
        Math.pow(coefCashout, -0.125) *
        Math.pow(0.99, unsettledBetsNum);
    return Math.floor(cashoutStake * 100) / 100;
  }

  requestMaxPayout() {
    if (this.isSendingMaxPay) return;
    let isValid = true;
    const data = [...this.props.editingTicket.bets.values()].map(bet => {
      const line = this.getLineByCK(bet.compoundKey, this.props);
      if (!line) {
        isValid = false;
        return {};
      }
      return {
        compoundKey: bet.compoundKey,
        outcomeId: bet.outcomeId,
        lineTypeRadar: line.lineTypeRadar
      };
    });
    if (isValid)
      requestMaxPayout(data, "editingTicket", data.length > 1 ? 2 : 1);
  }

  getComponent() {
    switch (this.props.type) {
      case 1:
        if (this.isEdited && this.props.editingTicket.bets.size > 1) {
          return (
            <Express
              {...this.props}
              isEdited={this.isEdited}
              bets={this.props.editingTicket.bets}
              deleteBet={this.deleteBet.bind(this)}
              changeBetOutcome={this.changeBetOutcome.bind(this)}
              pay={this.pay}
              getMarketName={this.getMarketName.bind(this)}
              getOutcomeName={this.getOutcomeName.bind(this)}
              getHomeAwayName={this.getHomeAwayName.bind(this)}
            />
          );
        }
        return (
          <Ordinar
            {...this.props}
            isEdited={this.isEdited}
            bets={
              this.isEdited
                ? this.props.editingTicket.bets
                : this.getBets(this.props.bets)
            }
            changeBetOutcome={this.changeBetOutcome.bind(this)}
            pay={this.pay}
            getMarketName={this.getMarketName.bind(this)}
            getOutcomeName={this.getOutcomeName.bind(this)}
            getHomeAwayName={this.getHomeAwayName.bind(this)}
          />
        );
      case 2:
        return (
          <Express
            {...this.props}
            isEdited={this.isEdited}
            bets={
              this.isEdited
                ? this.props.editingTicket.bets
                : this.getBets(this.props.bets)
            }
            deleteBet={this.deleteBet.bind(this)}
            changeBetOutcome={this.changeBetOutcome.bind(this)}
            pay={this.pay}
            getMarketName={this.getMarketName.bind(this)}
            getOutcomeName={this.getOutcomeName.bind(this)}
            getHomeAwayName={this.getHomeAwayName.bind(this)}
          />
        );
      case 3:
        return (
          <System
            {...this.props}
            getMarketName={this.getMarketName.bind(this)}
            getOutcomeName={this.getOutcomeName.bind(this)}
            getHomeAwayName={this.getHomeAwayName.bind(this)}
          />
        );
      case 4:
        return (
          <Builder
            {...this.props}
            stateMain={this.state}
            getMarketName={this.getMarketName.bind(this)}
            getOutcomeName={this.getOutcomeName.bind(this)}
            getHomeAwayName={this.getHomeAwayName.bind(this)}
          />
        );
    }
  }

  isEventInBets(bets, event) {
    if (!event) return false;
    return [...bets.values()].some(bet => bet.gbEventId === event.gbId);
  }

  isNewEventsInBets(props, bets) {
    return [...props.newEvents.values()].some(ev =>
      this.isEventInBets(bets, ev)
    );
  }

  shouldUpdateState(props) {
    return (
      this.isNewEventsInBets(props, props.bets) ||
      this.isEventInBets(props.bets, props.deletedEvent)
    );
  }

  shouldUpdateStateEditedTicket(bets, props) {
    return (
      this.isNewEventsInBets(props, bets) ||
      this.isEventInBets(bets, props.deletedEvent)
    );
  }

  isBlockedLineInBets(bets, props) {
    return [...bets.values()].some(bet => {
      const line = this.getLineByCK(bet.compoundKey, props);
      if (!line) return true;
      const event = this.getEventByGB(bet.gbEventId, props);
      if (!event) return true;
      if (isLineBlocked(line, event)) return true;
      return false;
    });
  }

  getCurStateForEditedTicket(state, props) {
    const isUpdate = this.shouldUpdateStateEditedTicket(
      props.editingTicket.bets,
      props
    );
    if (!isUpdate) return state;
    const cashout = this.getCashout(props);
    this.updateBetsCoef(props.editingTicket.bets);
    this.props.addBetsEditingTicket(props.editingTicket.bets);
    if (Math.floor(cashout) !== this.props.editingTicket.stake) {
      this.changeStake(Math.floor(cashout).toString());
    }
    const isBlockedLineInBets = this.isBlockedLineInBets(
      props.editingTicket.bets,
      props
    );
    return {
      ...state,
      cashout,
      isBlocked: !cashout || isBlockedLineInBets
    };
  }

  getCurState(state, props) {
    if (this.isEdited) return this.getCurStateForEditedTicket(state, props);

    const isUpdate = this.shouldUpdateState(props);
    if (!isUpdate) return state;
    const cashout = this.getCashout(props);
    if (state.cashout !== cashout) {
      return {
        ...state,
        cashout
      };
    }
    return state;
  }

  editTicket() {
    if (!this.props.editingTicket || !this.isEdited) {
      const bets = this.getBets(this.props.bets);
      this.updateBetsCoef(bets);
      const ticket = {
        id: this.props.ticketId,
        stake: this.state.cashout,
        bets
      };
      this.props.addEditingTicket(ticket);
    } else this.props.addEditingTicket(null);
  }

  showMaxPay() {
    if (!this.maxSum) return;
    if (!this.state.isMaxPayShown) {
      this.setState({
        ...this.state,
        isMaxPayShown: true
      });
    } else {
      const maxSum = Math.min(+this.maxSum, this.props.balance);
      this.changeStake(Math.floor(maxSum).toString());
    }
  }

  setOpacityButtonSaveChanges(value) {
    if (this.state.isButtonSaveChangesActive !== value) {
      this.setState({
        ...this.state,
        isButtonSaveChangesActive: value
      });
    }
  }

  updateBetCoef(bet, props) {
    const line = this.getLineByCK(bet.compoundKey, props);
    bet.acceptedOdd = getCoef(line, bet.outcomeId, "-");
  }

  updateBetNames(bet, props) {
    const line = this.getLineByCK(bet.compoundKey, props);
    if (!line) return;
    const event = this.getEventByGB(bet.gbEventId, props);
    if (!event) return;
    const market = getMarket(line, props.markets, props.marketsByNum);
    const marketName = renameMarketName(
      line,
      market,
      market.name,
      replaceCompetitorsFull(event)
    );
    if (marketName) bet.marketName = marketName;
    const outcomeName = renameMarketName(
      line,
      market,
      getOutcomeName(market, bet.outcomeId, line),
      replaceCompetitorsFull(event)
    );
    if (outcomeName) bet.outcomeName = outcomeName;
  }

  changeBetOutcome(betId, outcomeId) {
    const bets = new Map(this.props.editingTicket.bets);
    const bet = bets.get(betId);
    if (!bet || outcomeId === bet.outcomeId) return;
    bet.outcomeId = outcomeId;

    this.updateBetCoef(bet, this.props);
    this.updateBetNames(bet, this.props);

    this.props.addBetsEditingTicket(bets);
    // this.changeStake(this.props.editingTicket.stake);
  }

  validateStake(sum) {
    if (isNaN(sum)) sum = 0;
    const coef = this.coef && this.coef !== "-" ? this.coef : 0;
    let maxSum = this.maxPay ? Math.floor(this.maxPay / (coef - 1)) : Infinity;
    if (isNaN(maxSum)) maxSum = 0;
    if (
      sum < MIN_SUM_INPUT ||
      sum < Math.floor(this.state.cashout) ||
      sum > maxSum
    ) {
      this.inputElem.current.classList.add("error-border");
      this.setOpacityButtonSaveChanges(false);
      return;
    } else {
      this.setOpacityButtonSaveChanges(true);
      this.inputElem.current.classList.remove("error-border");
    }
  }

  changeStake(stake) {
    // const coef = this.isEdited ? this.coef : this.props.ticketCoef;
    const sum = stake
      .toString()
      .replace(/ /g, "")
      .replace(/^0/, "")
      .replace(/[^0-9]/g, "");
    this.props.addStakeEditingTicket(sum);
    // this.props.addSumInputExpress(sum);
  }

  // getBetKey(bet) {
  //   return bet.line.compoundKey + "-" + bet.outcomeId;
  // }
  // getBetValue(bet) {
  //   const event = this.props.events.get(bet.line.eventId);
  //   const market = getMarket(
  //     bet.line,
  //     this.props.markets,
  //     this.props.marketsByNum
  //   );
  //   const outcomeName = renameMarketName(
  //     bet.line,
  //     market,
  //     getOutcomeName(market, bet.outcomeId, bet.line),
  //     replaceCompetitorsFull(event)
  //   );
  //   const marketName = renameMarketName(
  //     bet.line,
  //     market,
  //     market.name,
  //     replaceCompetitorsFull(event)
  //   );
  //   return {
  //     key: this.getBetKey(bet),
  //     line: bet.line,
  //     outcomeId: bet.outcomeId,
  //     compoundKey: bet.line.compoundKey,
  //     isUnconfirmed: true,
  //     gbEventId: event.gbId,
  //     eventStatus: event.status,
  //     eventStartTime: event.timeSpanStart,
  //     acceptedOdd: getCoef(bet.line, bet.outcomeId, "-"),
  //     marketName,
  //     outcomeName,
  //     eventHomeName: event.homeName,
  //     eventAwayName: event.awayName
  //   };
  // }

  // addBetWithSameLine(key, unconfirmedBet) {
  //   const bet = this.props.editingTicket.bets.get(key);
  //   if (bet.outcomeId === unconfirmedBet.outcomeId) {
  //     if (bet.isUnconfirmed) {
  //       this.props.editingTicket.bets.delete(key);
  //       this.props.addBetsEditingTicket(this.props.editingTicket.bets);
  //     }
  //     return;
  //   } else {
  //     const market = getMarket(
  //       unconfirmedBet.line,
  //       this.props.markets,
  //       this.props.marketsByNum
  //     );
  //     const event = this.props.events.get(unconfirmedBet.line.eventId);
  //     bet.outcomeId = unconfirmedBet.outcomeId;
  //     bet.acceptedOdd = getCoef(
  //       unconfirmedBet.line,
  //       unconfirmedBet.outcomeId,
  //       "-"
  //     );
  //     bet.marketName = renameMarketName(
  //       unconfirmedBet.line,
  //       market,
  //       market.name,
  //       replaceCompetitorsFull(event)
  //     );
  //     bet.outcomeName = renameMarketName(
  //       unconfirmedBet.line,
  //       market,
  //       getOutcomeName(market, unconfirmedBet.outcomeId, unconfirmedBet.line),
  //       replaceCompetitorsFull(event)
  //     );
  //     this.props.editingTicket.bets.set(key, bet);
  //     this.props.addBetsEditingTicket(this.props.editingTicket.bets);
  //   }
  // }

  // getNewBetKey(lastKey) {
  //   if (lastKey.toString().match(/unconfirmed\_/)) {
  //     return "unconfirmed_" + (+lastKey.replace(/unconfirmed\_/, "") + 1);
  //   } else {
  //     return "unconfirmed_1";
  //   }
  // }

  // saveNewBet(props) {
  //   const unconfirmedBet = props.unconfirmedBet;
  //   const bets = this.props.editingTicket.bets;

  //   const sameLine = [...bets.keys()].find(
  //     key => bets.get(key).compoundKey === unconfirmedBet.line.compoundKey
  //   );
  //   if (sameLine) return this.addBetWithSameLine(sameLine, unconfirmedBet);

  //   const sameEvent = [...bets.keys()].find(key => {
  //     const event = this.props.events.get(unconfirmedBet.line.eventId);
  //     if (!event) return false;
  //     return bets.get(key).gbEventId === event.gbId;
  //   });
  //   if (sameEvent) return;
  //   if (bets.size >= 20) return;

  //   const lastKey = getLastKeyInMap(bets);
  //   const newKey = this.getNewBetKey(lastKey);
  //   bets.set(newKey, this.getBetValue(unconfirmedBet));

  //   this.props.addBetsEditingTicket(bets);
  // }

  deleteBet(id) {
    this.props.editingTicket.bets.delete(id);
    this.props.addBetsEditingTicket(this.props.editingTicket.bets);
  }

  updateBetsCoef(bets) {
    bets.forEach(bet => {
      this.updateBetCoef(bet, this.props);
    });
  }

  startEditTicket() {
    // const newBets = this.getBets(this.state.bets);
    // this.updateBetsCoef(newBets);
    // const newState = { ...this.state, bets: newBets };
    // this.setState(newState);
    this.requestMaxPayout();
    this.changeStake(Math.floor(this.state.cashout).toString());
  }

  endEditTicket() {
    this.setState({
      ...this.state,
      isMaxPayShown: false,
      isBlocked: false
    });
    // this.inputElem.current.value = splitRangNumber(
    //   Math.floor(this.props.stake)
    // );
    this.inputElem.current.classList.remove("error-border");
  }

  saveChanges() {
    const cashout = {
      ticketId: this.props.ticketId,
      outputStake: this.state.cashout,
      remainingStake: 0
    };

    const ticket = new Map();

    const getExpress = () => {
      return {
        sum: this.editingTicketType === 2 ? this.sum : 0
      };
    };

    const getSystem = () => {
      return {
        sum: 0,
        rang: 0
      };
    };

    const getOrdinars = () => {
      return [...this.props.editingTicket.bets.values()].map(bet => {
        const line = this.getLineByCK(bet.compoundKey, this.props);
        if (!line) debugger;
        const event = this.getEventByGB(bet.gbEventId, this.props);
        return {
          compoundKey: bet.compoundKey,
          outcomeId: bet.outcomeId,
          outcomeOdds: bet.acceptedOdd,
          sum: this.editingTicketType === 1 ? this.sum : 0,
          lineTypeRadar: line.lineTypeRadar,
          line,
          event
        };
      });
    };

    ticket.set("express", getExpress());
    ticket.set("system", getSystem());
    ticket.set("ordinars", getOrdinars());

    this.props.saveChangesTicket({
      ticket,
      cashout
    });
  }

  togglePartCashout(event) {
    if (this.state.isOpenPartCashout === false) {
      if (event.target.closest(".bets-window")) {
        document.querySelector(".bets-window").classList.add("modal-overflow");
      }
      this.addHandleClickCloseCashout();
    } else {
      if (
        document
          .querySelector(".bets-window")
          .classList.contains("modal-overflow")
      ) {
        document
          .querySelector(".bets-window")
          .classList.remove("modal-overflow");
      }
      this.removeHandleClickCloseCashout();
    }
    this.setState({
      ...this.state,
      isOpenPartCashout: !this.state.isOpenPartCashout
    });
  }

  closePartCashout(e) {
    if (!e.target.closest(".modal-cashout__modal")) {
      e.stopPropagation();
      this.togglePartCashout();
    }
  }

  addHandleClickCloseCashout() {
    document
      .getElementById("root")
      .addEventListener("click", this.handleClosePartCashout);
  }

  removeHandleClickCloseCashout() {
    document
      .getElementById("root")
      .removeEventListener("click", this.handleClosePartCashout);
  }

  toggleTicket() {
    if (!this.props.status) return;
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  }

  showStatistics(e) {
    if (this.props.type !== 1) return;
    const ordinarKey = [...this.props.bets.keys()][0];
    const ordinar = this.props.bets.get(ordinarKey);
    const event = this.getEventByGB(ordinar.gbEventId, this.props);
    if (!event || !event.betRadarOriginalId) return;
    showStatistics(event.betRadarOriginalId, e);
  }

  // ---------------- ПЕРЕВОД

  getMarketName(ordinar) {
    if (!ordinar) return "";
    const event = {
      homeName: ordinar.eventHomeName,
      awayName: ordinar.eventAwayName
    };
    const market = getMarket(
      ordinar,
      this.props.markets,
      this.props.marketsByNum
    );
    const line = { ...ordinar, outcomeId: market ? market.outcomeId : [] };
    const marketName = market
      ? renameMarketName(
          line,
          market,
          getMarketName(market, line, event),
          replaceCompetitorsFull(event)
        )
      : "";
    return marketName ? marketName : ordinar.marketName;
  }

  getOutcomeName(ordinar) {
    if (!ordinar) return "";
    const event = {
      homeName: ordinar.eventHomeName,
      awayName: ordinar.eventAwayName
    };
    const market = getMarket(
      ordinar,
      this.props.markets,
      this.props.marketsByNum
    );
    const line = { ...ordinar, outcomeId: market ? market.outcomeId : [] };
    const outcomeName = market
      ? renameMarketName(
          line,
          market,
          getOutcomeName(market, ordinar.outcomeId, line, event),
          replaceCompetitorsFull(event)
        )
      : "";
    return outcomeName ? outcomeName : ordinar.outcomeName;
  }

  getHomeAwayName(ordinar) {
    if (!ordinar) return "";
    const event = {
      homeName: ordinar.eventHomeName,
      awayName: ordinar.eventAwayName,
      isLongTerm: isEventLongTerm(ordinar.typeRadar),
      seasonName: ordinar.tournamentName
    };
    const homeAwayName = getEventName(event);
    // return homeAwayName;
    return [event.homeName, event.awayName];
  }

  // ----------------

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cashoutRecords !== nextProps.cashoutRecords) {
      return true;
    }
    if (this.props.isRememberedAdvice !== nextProps.isRememberedAdvice)
      return true;
    if (this.props.maxPay !== nextProps.maxPay) {
      return true;
    }
    if (
      this.props.editingTicket !== nextProps.editingTicket &&
      (this.props.editingTicket === null || nextProps.editingTicket === null)
    ) {
      return true;
    }
    if (this.props.editingTicket !== nextProps.editingTicket && this.isEdited) {
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    const newState = this.getCurState(this.state, nextProps);
    if (newState !== this.state) {
      this.setState(newState);
    }
    if (nextProps.lang !== this.props.lang) {
      return true;
    }
    return false;
  }

  render() {
    const { cashout, isBlocked, isOpenPartCashout, isOpen } = this.state;
    const { isFilterCashout = null, isRememberedAdvice } = this.props;
    const isTicketValid =
      isFilterCashout === null ||
      (isFilterCashout && cashout) ||
      (!isFilterCashout && !cashout);
    if (!isTicketValid) return "";

    this.isEdited =
      this.props.editingTicket &&
      this.props.ticketId === this.props.editingTicket.id;
    return (
      <div
        className={
          "bets__item" +
          (this.props.accountType ? " bonus-bet " : "") +
          (cashout || this.isEdited ? " cashout-button" : "") +
          (this.isEdited ? " editing" : "") +
          (this.props.status ? " history" : "") +
          (this.props.status && !isOpen ? " minimized" : "")
        }
        //editing
      >
        {isBlocked ? (
          <Block text="Одна или несколько ставок заблокированы" />
        ) : (
          ""
        )}
        {this.props.editingTicket && !this.isEdited ? (
          <div className="bets__not-active" />
        ) : (
          ""
        )}
        <div className="bets__main-row">
          <TicketInfo
            timestamp={this.props.timestamp}
            ticketId={this.props.ticketId}
          />
          <div className="bets__main-part">
            {this.getComponent()}

            {this.props.status &&
            (this.props.bonusBalance || this.props.points) ? (
              <BonusAndLoyality
                bonus={this.props.bonusBalance}
                loyality={this.props.points}
              />
            ) : (
              ""
            )}
          </div>

          <div className="bets__conclusion bet-aside">
            <Stake
              stake={
                this.isEdited
                  ? this.props.editingTicket.stake
                  : this.state.stake
              }
              cashout={this.state.cashout}
              isEdited={this.isEdited}
              inputElem={this.inputElem}
              onClickMaxPay={this.showMaxPay.bind(this)}
              status={this.props.status}
              cashoutRecords={this.props.cashoutRecords}
              maxPayText={
                this.state.isMaxPayShown && this.maxSum
                  ? splitRangNumber(this.maxSum)
                  : this.props.lang.max
              }
              changeStake={e => this.changeStake.call(this, e.target.value)}
              lang={this.props.lang}
            />
            {
              <Pay
                {...this.props}
                coef={this.props.ticketCoef}
                isEdited={this.isEdited}
                refElem={this.payElem}
                pay={this.pay}
                lang={this.props.lang}
              />
            }
          </div>

          <div className="bets__service bet-service">
            <ServiceIcons
              wasEdited={this.wasEdited}
              isCashoutHistory={this.isCashoutHistory}
              isStatistic={this.isStatistic}
              isBRStatistic={this.props.settingApp.isBRStatistic}
              isOpenIcon={this.isOpenIcon}
              handleClickShowStatistic={this.showStatistics.bind(this)}
            />
            {
            (this.props.status || cashout || this.isEdited) ? (
              <ButtonTicketTop
                text={
                  this.isEdited
                    ? this.props.lang.cancel
                    : this.props.lang.editTicket
                }
                handleClick={this.editTicket.bind(this)}
                status={this.props.status}
                toggleTicket={this.toggleTicket.bind(this)}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {this.isCashoutHistory ? (
          <CashoutHistory cashoutRecords={this.props.cashoutRecords} />
        ) : (
          ""
        )}
        {this.isEdited && !isRememberedAdvice ? (
          <Advice
            type={this.props.type}
            handleClick={this.props.rememberAdvice}
          />
        ) : (
          ""
        )}
        <ButtonCashout
          ticketId={this.props.ticketId}
          isEdited={this.isEdited}
          cashout={cashout}
          isButtonSaveChangesActive={
            this.state.isButtonSaveChangesActive && !isBlocked
          }
          handleClickMainButton={this.handleClickMainButton.bind(this)}
          handleClickPartCashout={this.togglePartCashout.bind(this)}
        >
          { isOpenPartCashout ? (
            <PartCashout
              cashout={this.state.cashout}
              handleClickPartCashout={this.handleClickPartCashout.bind(this)}
              ticketId={this.props.ticketId}
              closePartCashout={this.togglePartCashout.bind(this)}
            />
          ) : (
            ""
          )}
        </ButtonCashout>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.isEdited) this.validateStake(this.props.editingTicket.stake);
    if (
      this.isEdited &&
      this.currentBetsSize !== this.props.editingTicket.bets.size
    ) {
      this.currentBetsSize = this.props.editingTicket.bets.size;
      this.requestMaxPayout();
    }
    if (this.state.stake !== this.props.stake) {
      this.setState({
        cashout: !this.props.status ? this.getCashout(this.props) : null,
        stake: this.props.stake
      });
      this.inputElem.current.value = splitRangNumber(Math.floor(this.stake));
    }
    if (!prevProps.editingTicket && this.isEdited) {
      return this.startEditTicket();
    } else if (
      !this.isEdited &&
      prevProps.editingTicket &&
      this.props.ticketId === prevProps.editingTicket.id
    ) {
      this.endEditTicket();
    }
    if (this.state.cashout !== prevState.cashout && this.isEdited) {
      this.inputElem.current.value = splitRangNumber(
        Math.floor(this.state.cashout)
      );
    }

    // if (this.isEdited) this.changePay(this.props.editingTicket.stake);
  }

  componentDidMount() {
    if (this.isEdited) {
      this.validateStake(this.props.editingTicket.stake);
      this.requestMaxPayout();
    }

    // if (this.props.type < 3 && this.inputElem.current)
    //   this.inputElem.current.oninput = this.changePay.bind(this);
  }
}

const mapStateToProps = state => {
  return {
    settingApp: state.mainSetting,
    lang: state.user.language_user.dict,
    events: state.server.eventsAndLines.events,
    eventsByGB: state.server.eventsAndLines.eventsByGB,
    newEvents: state.server.eventsAndLines.newEvents,
    deletedEvent: state.server.eventsAndLines.deletedEvent,
    lines: state.server.eventsAndLines.lines,
    linesByCK: state.server.eventsAndLines.linesByCK,
    markets: state.server.entities.markets,
    marketsByNum: state.server.entities.marketsByNum,
    editingTicket: state.tickets.editingTicket,
    unconfirmedBet: state.tickets.unconfirmedBets,
    maxPay: state.tickets.maxPay,
    preloader: state.tickets.preloader,
    isRememberedAdvice: state.tickets.isRememberedAdvice,
    balance: state.user.isMainBalance
      ? state.user.info.accountData.balance
      : state.user.info.accountData.bonusBalance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addEditingTicket: ticket => dispatch(addEditingTicket(ticket)),
    addStakeEditingTicket: stake => dispatch(addStakeEditingTicket(stake)),
    addBetsEditingTicket: bets => dispatch(addBetsEditingTicket(bets)),
    doCashout: data => dispatch(doCashout(data)),
    addPreloader: (type, ticketId) => dispatch(addPreloader(type, ticketId)),
    saveChangesTicket: data => dispatch(saveChangesTicket(data)),
    rememberAdvice: () => dispatch(rememberAdvice())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ticket);
