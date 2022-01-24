import React from "react";
import { connect } from "react-redux";

import {
  addBetBuilder,
  editBuilderCoupon,
  remvoeOneBuilder,
  removeAll,
  builderRemoveError,
  errorModalBB,
  saveCoefbuilder
} from "../../../../../../Actions/Components/Server/Case15";
import { sendCouponBuilder } from "../../../../../../Actions/Components/Coupon/";

import { showModal } from "../../../../../../Actions/Components/Modal";
import {
  getCoefInTrueFormat,
  getIcon,
  getSportIcon
} from "../../../../../../Services/Shared";
import { getBetBuilderOdd } from "../../../../../../Server/";
import {
  isOutcomeBlocked,
  isLineBlocked,
  additionOfInformationToTheLine,
  getMarket
} from "../../../../../../Services/Shared";

import OneXTwo from "./Components/OneXTwo";
import TimeMatch from "./Components/MatchTime";
import GoalsOddEven from "./Components/GoalsOddEven";
import BothToScore from "./Components/BothToScore";
import DoubleChance from "./Components/DoubleChance";
import TotalGoals from "./Components/TotalGoals";
import TotalCorners from "./Components/TotalCorners";
import WinningMargin from "./Components/WinningMargin";
import CorrectScore from "./Components/CorrectScore";

import TotalCards from "./Components/TotalCards";
import TeamGoalScorer from "./Components/TeamGoalScorer";

import { BetRadarDict } from "./Dict/BR";
// import "./style/modal-constructor.css";
// import "./style/constructor.css";

class Counstructor extends React.Component {
  constructor(props) {
    super(props);
    this.isUpdate = false;
    this.initialState = {
      line_type_radar: this.getEventProviderName(props.event.lineTypeRadar),
      globalBlockBB: props.globalBlockBB,
      event: props.event,
      markets: props.markets,
      closeModalBB: true,
      dictionary: this.selectDictionary(props.event.lineTypeRadar),
      listMarketsModalBB: this.createListMarkets(
        props.event,
        this.selectDictionary(props.event.lineTypeRadar)
      ),
      keyChange: 0,
      openInformation: false,
      editMarket: false,
      activeMarket: 0,
      coef: 0,
      builderCoupon: props.builderCoupon,
      activeTab: 0,
      betStop: false,
      // commonFunction
      goBack: this.goBack.bind(this),
      reName: this.reName.bind(this),
      tmpAddOrCoef: this.tmpAddOrCoef.bind(this),
      closeBB: this.closeBB.bind(this),
      findLine: this.findLine.bind(this),
      findLineSFV: this.findLineSFV.bind(this),
      editBet: this.editBetSend.bind(this)
    };
    this.state = this.getCurState(this.initialState, props, true);
  }

  get isUpdate() {
    if (this._isBeUpdated) {
      this._isBeUpdated = false;
      return true;
    }
    return false;
  }

  set isUpdate(val) {
    this._isBeUpdated = val;
  }

  getEventProviderName(line_type_radar) {
    switch (line_type_radar) {
      case 0:
      case 1:
      case 5:
      case 7:
      case 8:
      case 11:
      case 12:
      case 13:
      case 15:
        return "BR";
      case 19:
        return "SSL";
      case 20:
        return "BG";
    }
    return "BR";
  }
  findLine(key, event) {
    return [...event.lines.values()].find(
      line => line.marketId === key && !isLineBlocked(line, this.props.event)
    );
  }
  findLineSFV(key, value, name) {
    return [...this.props.event.lines.values()].find(line =>
      line.marketId === key &&
      !isLineBlocked(line, this.props.event) &&
      name !== "exact"
        ? line.specifierValue[0] % 1 == value
        : this.props.markets.get(line.marketId.toString()).outcomeName[0] % 1 ==
          value
    );
  }

  findLineList(event, key) {
    return [...event.lines.values()].find(
      line => line.marketId === key && !isLineBlocked(line, event)
    );
  }

  updateStatusLine(state, props) {
    const statickBets =
      this.props.event.id in this.props.builderCoupon
        ? this.props.builderCoupon[this.props.event.id]
        : 0;

    if (statickBets) {
      statickBets.forEach((item, key) => {
        const line = [...props.lines.values()].find(
          line => line.id === item.tabInfo.lineActiveMarket.id
        );
        if (line) {
          this.props.editBuilderCoupon(line, this.state.event);
        }
      });
      return true;
    }

    return false;
  }

  getCurState(state = this.initialState, props, isReset) {
    if (props.newEvents.has(state.event.id)) {
      const statusUpdateLine = this.updateStatusLine(
        state,
        props.newEvents.get(state.event.id)
      );

      // эта функция была переделана под простой диспатч линий пришедших , true нашло обновило , false  не нашло не обновляло
      const listMarketsModalBB = this.createListMarkets(
        props.newEvents.get(state.event.id),
        this.selectDictionary(props.event.lineTypeRadar)
      );

      const betStop = !isLineBlocked(
        [...props.newEvents.get(state.event.id).lines.values()][0],
        props.newEvents.get(state.event.id)
      );

      const newState = {
        ...state,
        betStop,
        event: props.newEvents.get(state.event.id),
        listMarketsModalBB,
        coef: !props.builderCoupon[props.event.id] ? 0 : props.coef
      };
      this.isUpdate = true;
      return newState;
    }
    if (state.globalBlockBB !== props.globalBlockBB) {
      const newState = {
        ...state,
        globalBlockBB: props.globalBlockBB,
        coef: !props.builderCoupon[props.event.id] ? 0 : props.coef
      };
      this.isUpdate = true;
      return newState;
    }

    if (state.coef !== props.coef && state.activeMarket === 0) {
      const newState = {
        ...state,
        coef: !props.builderCoupon[props.event.id] ? 0 : props.coef
      };
      this.isUpdate = true;
      return newState;
    }
    if (props.newEvents.has(state.event.id)) {
      const statusUpdateLine = this.updateStatusLine(
        state,
        props.newEvents.get(state.event.id)
      ); // эта функция была переделана под простой диспатч линий пришедших , true нашло обновило , false  не нашло не обновляло

      const listMarketsModalBB = this.createListMarkets(
        props.newEvents.get(state.event.id),
        this.selectDictionary(props.event.lineTypeRadar)
      );

      const newState = {
        ...state,
        event: props.newEvents.get(state.event.id),
        listMarketsModalBB,
        coef: !props.builderCoupon[props.event.id] ? 0 : props.coef
      };
      this.isUpdate = true;
      return newState;
    }
    if (state.builderCoupon !== props.builderCoupon) {
      this.composeInfoSend();
      const newState = {
        ...state,
        builderCoupon: props.builderCoupon,
        coef: !props.builderCoupon[props.event.id] ? 0 : props.coef
      };

      this.isUpdate = true;
      return newState;
    }
    return state;
  }

  selectDictionary(lineTypeRadar) {
    return BetRadarDict;
  }

  createListMarkets(event, dictionary) {
    const arrSSl = [
      "score_anwtime_grouped",
      "match_goalscorer",
      "last_match_goalscorer"
    ];

    const objSelectMarkets = new Map();
    const sortMap = new Map();
    let flg = true;
    sortMap.set("teamGoalScorer", "teamGoalScorer");
    sortMap.set("oneXTwo", "oneXTwo");
    sortMap.set("doubleChance", "doubleChance");
    sortMap.set("totalGoals", "totalGoals");
    sortMap.set("totalCorners", "totalCorners");
    sortMap.set("totalCards", "totalCards");
    sortMap.set("bothToScore", "bothToScore");
    sortMap.set("correctScore", "correctScore");
    sortMap.set("timeMatch", "timeMatch");
    sortMap.set("winningMargin", "winningMargin");
    sortMap.set("goalsOddEven", "goalsOddEven");
    const builderAddMarkets = this.props.builderCoupon[event.id];
    if (event.matchStatus) {
      if (event.matchStatus != "1st half") {
        flg = false;
      }
    }

    sortMap.forEach((elem, key) => {
      if (dictionary[key])
        for (let i = 0; i < dictionary[key].ids.length; i++) {
          let update = true;
          let line = null;
          if (key == "teamGoalScorer") {
            line = [...event.lines.values()].find(line => {
              const market = getMarket(
                line,
                this.props.markets,
                this.props.marketsByNum
              );
              if (!market) return false;
              return arrSSl.includes(
                market.objectId.toString().split("_out_num")[0]
              );
            });
          } else {
            line = this.findLineList(event, dictionary[key].ids[i]);
          }
          if (!line && key == "teamGoalScorer")
            line = this.findLineList(event, dictionary[key].ids[i]);
          if (builderAddMarkets && elem == "totalCards") {
            if (
              [...builderAddMarkets.values()].find(
                line =>
                  line.tabInfo.lineActiveMarket.marketId ==
                  dictionary[key].ids[i]
              )
            ) {
              update = false;
            }
          }
          if (key == "timeMatch" && !flg) {
          } else {
            if (line && update) {
              additionOfInformationToTheLine(line, this.props.markets);
              objSelectMarkets.set(
                [dictionary[key].name][0],
                dictionary[key].rusName
              );
            }
          }
        }
    });
    if (objSelectMarkets.size == 0)
      objSelectMarkets.set(
        "На данный момент маркетов в досутпе для ББ нет",
        "На данный момент маркетов в досутпе для ББ нет"
      );
    return objSelectMarkets;
  }

  changeStatusInformation() {
    const newState = {
      ...this.state,
      openInformation: !this.state.openInformation
    };
    this.isUpdate = true;
    this.setState(newState);
  }

  openSelecttemplate() {
    const closeModalBB = !this.state.closeModalBB;
    const listMarketsModalBB = this.createListMarkets(
      this.state.event,
      this.state.dictionary
    );
    const newState = {
      ...this.state,
      closeModalBB,
      listMarketsModalBB,
      sendState: false
    };
    this.isUpdate = true;
    this.setState(newState);
  }

  selectMarket(name) {
    switch (name) {
      case "oneXTwo":
        const newStateOneXTwo = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStateOneXTwo);
        break;
      case "timeMatch":
        const newStateTimeMatch = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStateTimeMatch);
        break;
      case "goalsOddEven":
        const newStateGoalsOddEven = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStateGoalsOddEven);
        break;
      case "bothToScore":
        const newStatebothToScore = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStatebothToScore);
        break;

      case "doubleChance":
        const newStatedoubleChance = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStatedoubleChance);
        break;

      case "totalGoals":
        const newStatetotalGoals = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStatetotalGoals);
        break;

      case "totalCorners": // не сделан
        const newStatetotalCorners = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStatetotalCorners);
        break;

      case "winningMargin":
        const newStateWinningMargin = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStateWinningMargin);
        break;
      case "correctScore":
        const newStateCorrectScore = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStateCorrectScore);
        break;
      case "teamGoalScorer":
        const newStateteamGoalScorer = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStateteamGoalScorer);
        break;
      case "totalCards":
        const newStatetatalCards = {
          ...this.state,
          activeMarket: name
        };
        this.isUpdate = true;
        this.setState(newStatetatalCards);
        break;
      default:
        console.log("В работу");
    }
  }

  selectTemplate() {
    switch (this.state.activeMarket) {
      case "oneXTwo":
        return (
          <OneXTwo
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      case "timeMatch":
        return (
          <TimeMatch
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );

      case "goalsOddEven":
        return (
          <GoalsOddEven
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      case "bothToScore":
        return (
          <BothToScore
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      case "doubleChance":
        return (
          <DoubleChance
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      case "totalGoals":
        return (
          <TotalGoals
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      case "totalCorners":
        return (
          <TotalCorners
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );

      case "winningMargin":
        return (
          <WinningMargin
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      case "correctScore":
        return (
          <CorrectScore
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      case "teamGoalScorer":
        return (
          <TeamGoalScorer
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      case "totalCards":
        return (
          <TotalCards
            {...this.state}
            eventBuilder={this.props.builderCoupon}
            getStatusUpdate={this.getStatusUpdate.bind(this)}
            // builderError={this.props.builderError}
          />
        );
      default:
        return this.createselectMarkets();
    }
  }

  closeBB() {
    this.props.builderRemoveError();
    const newState = {
      ...this.state,
      activeMarket: 0,
      editMarket: false,
      activeTab: 0,
      closeModalBB: true,
      coef: !this.props.builderCoupon[this.props.event.id] ? 0 : this.props.coef
    };
    this.isUpdate = true;
    this.setState(newState);
    this.composeInfoSend();
  }

  composeInfoSend() {
    if (this.props.builderCoupon) {
      const mapBets =
        this.props.event.id in this.props.builderCoupon
          ? this.props.builderCoupon[this.props.event.id]
          : 0;
      if (mapBets && mapBets.size !== 0) {
        const arrayBets = [];
        mapBets.forEach((bet, key, i) => {
          if (
            this.props.event.lines.get(bet.tabInfo.lineActiveMarket.id) &&
            this.props.event.lines.get(bet.tabInfo.lineActiveMarket.id)
              .status == 1
          ) {
            arrayBets.push({
              compoundKey: bet.tabInfo.lineActiveMarket.compoundKey,
              lineTypeRadar: this.props.event.lines.get(
                bet.tabInfo.lineActiveMarket.id
              ).lineTypeRadar,
              outcomeId: bet.tabInfo.outcomeId
            });
          }
        });
        if (arrayBets.length != 0) {
          getBetBuilderOdd(this.props.event.id, arrayBets);
        } else {
          this.state.coef = 0;
          this.props.saveCoefbuilder(0);
        }
      }
    }
  }

  changeStateActiveMarket(name, tab, keyChange, bets) {
    const newState = {
      ...this.state,
      activeMarket: name,
      activeTab: tab,
      editMarket: true,
      keyChange: keyChange,
      closeModalBB: false,
      sendState: bets
    };
    this.isUpdate = true;
    this.setState(newState);
  }

  reName(name) {
    console.log(
      name.toString().toLocaleLowerCase(),
      "name.toString().toLocaleLowerCase()"
    );
    switch (name.toString().toLocaleLowerCase()) {
      case "even":
        return this.props.lang.even;
      case "чет":
        return this.props.lang.even;
      case "да":
        return this.props.lang.yes;
      case "yes":
        return this.props.lang.yes;
      case "no":
        return this.props.lang.no;
      case "нет":
        return this.props.lang.no;
      case "odd":
        return this.props.lang.odd;
      case "нечет":
        return this.props.lang.odd;
      case "over":
        return this.props.lang.over;
      case "match":
        return this.props.lang.builder.MainTime;
      case "firsthalf":
        return this.props.lang.firstHalf;
      case "secondhalf":
        return this.props.lang.secondHalf;
      case "under":
        return this.props.lang.under;
      case "exact":
        return this.props.lang.exact;
      case "anytime":
        return this.props.lang.scoreGoal;
      case "first":
        return this.state.event.status == 1
          ? this.props.lang.builder.tabMarketsname.first
          : this.props.lang.builder.tabMarketsname.firstOther;
      case "last":
        return this.props.lang.builder.tabMarketsname.scoreGoallast;
      case "both":
        return this.props.lang.both;
      case "score_anytime_grouped":
        return this.props.lang.scoreGoal;
      case "match_goalscorer":
        return this.state.event.status == 1
          ? this.props.lang.builder.tabMarketsname.first
          : this.props.lang.builder.tabMarketsname.firstOther;
      case "last_match_goalscorer":
        return this.props.lang.builder.tabMarketsname.last;
      case "{$competitor1}":
        return this.state.event.homeName;
      case "{$competitor2}":
        return this.state.event.awayName;
      case " {$competitor1}":
        return this.state.event.homeName;
      case " {$competitor2}":
        return this.state.event.awayName;
      case "draw":
        return this.props.lang.builder.draw;
      case "home":
        return this.state.event.homeName;
      case "away":
        return this.state.event.awayName;
      case "{$competitor1}" +
        "/" +
        this.props.lang.builder.draw.toString().toLocaleLowerCase():
        return this.state.event.homeName + "/" + this.props.lang.builder.draw;
      case "{$competitor1}/{$competitor2}":
        return this.state.event.homeName + "/" + this.state.event.awayName;
      case this.props.lang.builder.draw.toString().toLocaleLowerCase() +
        "/{$competitor2}":
        return this.props.lang.builder.draw + "/" + this.state.event.awayName;
      case "больше":
        return this.props.lang.over;
      case "меньше":
        return this.props.lang.under;
      case "{$competitor1} or draw":
        return this.state.event.homeName + " or draw";

      default:
        return name;
    }
  }

  goBack() {
    this.props.builderRemoveError();
    const activeMarket = 0;
    const listMarketsModalBB = this.createListMarkets(
      this.props.event,
      this.selectDictionary(this.props.event.lineTypeRadar)
    );
    const newState = {
      ...this.state,
      activeMarket,
      listMarketsModalBB,
      activeTab: 0,
      editMarket: false
    };
    this.isUpdate = true;
    this.setState(newState);
  }

  getStatusUpdate(obj) {
    const update = this.chekInfoSend(obj);
    // debugger;
    if (update.boolen) {
      if (obj.builderError.errorCode) {
        this.props.builderRemoveError();
      }
      return true;
    } else {
      const serverError = {
        errorCode: " ",
        errorMsg: update.name
      };
      this.props.errorModalBB(serverError);
      return false;
    }
  }

  chekInfoSend(newBetBB) {
    let bool = {
      boolen: true,
      name: this.props.lang.builder.defaultTexrtError
    };
    // debugger;
    const line = newBetBB.tabInfo.lineActiveMarket;
    const outcomeId = newBetBB.tabInfo.outcomeId;
    const errorOutcome = isOutcomeBlocked(line, outcomeId);
    if (!errorOutcome)
      return { boolen: false, name: this.props.lang.builder.selectNotActual };
    const statickBets =
      this.props.event.id in this.props.builderCoupon
        ? this.props.builderCoupon[this.props.event.id]
        : 0;
    if (!statickBets)
      return { boolen: true, name: this.props.lang.builder.eventNotAdd };

    const lineId_outcomeId = this.getKeyMap(newBetBB);

    statickBets.forEach((element, key) => {
      if (key === lineId_outcomeId) {
        bool = { boolen: false, name: this.props.lang.builder.eventAdd };
      }
    });

    return bool;
  }

  getKeyMap(obj) {
    return `${obj.tabInfo.lineActiveMarket.compoundKey}_${obj.tabInfo.outcomeId}`;
  }

  editBetSend(state, arrayBet, keyChange, otherKey) {
    // const copyArr= {}
    // скопируй блять
    if (!arrayBet.has(keyChange)) {
      arrayBet.delete(otherKey);
    } else arrayBet.delete(keyChange);
    arrayBet.set(
      state.tabInfo.lineActiveMarket.compoundKey +
        "_" +
        state.tabInfo.outcomeId,
      state
    );
    return {
      arrayBet: arrayBet,
      keyChange:
        state.tabInfo.lineActiveMarket.compoundKey +
        "_" +
        state.tabInfo.outcomeId
    };
  }

  saveInformation(data) {
    this.props.addBetBuilder(data);
    this.closeBB();
    // couponBuilderSend();
  }

  filtrsDataCoupon() {
    const newMapBets = new Map();

    function getArrayTab(tab) {
      const array = [];
      for (let key in tab) {
        if (tab[key].send) array.push(tab[key].send);
        else array.push(tab[key].noSend);
      }
      return array;
    }

    [...this.props.builderCoupon[this.props.event.id].keys()].map(
      (betKey, i) => {
        const lineCopounedKey = betKey.split("_")[0];
        const lineId = this.props.lineCK.get(lineCopounedKey);
        const tab = this.props.builderCoupon[this.props.event.id].get(betKey)
          .tabInfo.tab;
        // if (this.props.event.lines.has(+lineId)) {

        const marketId = this.props.event.lines.get(+lineId).marketId;
        let marketName = "";
        // } else debugger; // Линия удаленна ее нет в евенте ошибки обновления Ким!
        for (let key in this.state.dictionary) {
          if (this.state.dictionary[key].dict.get(marketId)) {
            marketName = this.props.lang.builder.markets[
              this.state.dictionary[key].name
            ];
          }
        }
        newMapBets.set(betKey, {
          marketName: marketName,
          tabName: getArrayTab(tab),
          compoundKey: this.props.builderCoupon[this.props.event.id].get(betKey)
            .tabInfo.lineActiveMarket.compoundKey,
          outcomeId: +betKey.split("_")[1]
        });
      }
    );
    return newMapBets;
  }

  couponBuilderSend() {
    if (!this.state.globalBlockBB) {
      const sendBuilderCoupon = {
        event: { ...this.props.event },
        coef: this.props.coef,
        bets: null
      };
      if (
        this.props.builderCoupon[this.props.event.id] &&
        this.props.builderCoupon[this.props.event.id].size >= 2
      ) {
        sendBuilderCoupon.bets = this.filtrsDataCoupon();
        this.props.sendCouponBuilder(sendBuilderCoupon);
        this.props.removeAll(this.props.event.id);
        // this.props.saveCoefbuilder();
        this.state.coef = 0;
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.isUpdate) return true;
    const newState = this.getCurState(this.state, nextProps, false);
    if (newState !== this.state) {
      this.setState(newState);
    }
    return false;
  }

  render() {
    return (
      <div className="constructor">
        {this.getBetsList()}

        {this.createMainButton()}
        <div
          className={
            "constructor__description " +
            (this.state.openInformation ? "opened" : "")
          }
          onClick={() => this.changeStatusInformation()}
        >
          <div className="constructor__title">
            {this.props.lang.builder.howWorkBuilder}
            <div className="constructor__more-button">{getIcon("arrow")} </div>
          </div>

          <div className="constructor__more">
            <div>{this.props.lang.builder.ductionaryService}</div>

            <div className="constructor__instructions">
              <div className="constructor__point">
                <div className="constructor__number">1</div>
                <div>{this.props.lang.builder.submitButtonAddEventMobile}</div>
              </div>
              <div className="constructor__point">
                <div className="constructor__number">2</div>
                <div>{this.props.lang.builder.selectLine}</div>
              </div>
              <div className="constructor__point">
                <div className="constructor__number">3</div>
                <div>{this.props.lang.builder.submitButtonBetSlipMobile}</div>
              </div>
            </div>
          </div>
        </div>

        {!this.state.closeModalBB ? (
          <div className="constructor__modal modal-constructor">
            <div
              className="modal-constructor__wrapper"
              onClick={this.closeBB.bind(this)}
            />

            <div className="modal-constructor__main">
              {this.createTitleMarkets(
                // this.state.listMarketsModalBB.get(this.state.activeMarket)
                this.state.activeMarket
              )}
              {this.selectTemplate()}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  createTitleMarkets(name) {
    // if (!name) name = this.props.lang.builder.selectLine;
    return (
      <div className="modal-constructor__top">
        <div className="modal-constructor__back" onClick={() => this.goBack()}>
          {getIcon("arrow")}
        </div>
        <div className="modal-constructor__name">
          {name
            ? this.props.lang.builder.markets[name]
            : this.props.lang.builder.selectLine}
        </div>
        <div
          className="modal-constructor__close"
          onClick={() => this.closeBB()}
        >
          {getSportIcon("close", "", "#dadada")}
        </div>
      </div>
    );
  }

  removeOne(event, key) {
    // debugger;
    if (this.props.builderCoupon[this.props.event.id].size === 1) {
      // console.log("_________________-");
      this.props.saveCoefbuilder();
    } else {
      this.composeInfoSend();
    }
    // debugger;
    this.props.removeOneBet(event, key);
  }

  removeAll(event) {
    this.props.removeAll(event);
  }

  createModalError() {
    this.props.removeAll(this.props.event.id);
    this.props.createModal({ text: "жду окна" });
  }

  getClassBlockLine(line, tabinfo) {
    const lineStatus = this.state.event.lines.get(line.id);

    if (this.state.event.isBetStop) return "pause";

    if (lineStatus) {
      if (
        lineStatus.status === 0 ||
        !isOutcomeBlocked(lineStatus, tabinfo.tabInfo.outcomeId) // &&
        // isLineBlocked(lineStatus, this.state.event))
      )
        return "pause";
      else if (lineStatus.status === 1) return "";
      else if (lineStatus.status === -1) return "deleted";
    }

    // if(!this.betStop)
    return "deleted";
  }

  getClassBetBuilder(key) {
    // debugger;
    if (key == 0) return " first-half";
    if (key == 1) return " main-time";
    return "";
  }

  getBetsList() {
    if (this.state.event.id in this.props.builderCoupon) {
      const betsCounstructor = this.props.builderCoupon[this.state.event.id];
      if (betsCounstructor.size <= 0) {
        return "";
      }

      return (
        <div className="constructor__bets-list">
          <div
            className="constructor__clear"
            onClick={() => this.removeAll(this.props.event.id)}
          >
            {this.props.lang.builder.clean}
          </div>
          <div className="constructor__wrapper">
            {[...betsCounstructor.values()].map((bets, key) => {
              let flg = false;
              return (
                <div key={key}>
                  <div className="constructor__bet">
                    <div className="constructor__dot">
                      <div className="constructor__stick" />
                    </div>
                    <div
                      className={
                        "constructor__info " +
                        this.getClassBlockLine(
                          bets.tabInfo.lineActiveMarket,
                          bets
                        )
                      }
                    >
                      <div className="constructor__construct">
                        {bets.tabInfo.tab.map((tab, key) => {
                          return (
                            <div
                              className="constructor__column"
                              key={key}
                              onClick={
                                tab.send
                                  ? this.changeStateActiveMarket.bind(
                                      this,
                                      bets.dict.name,
                                      key,
                                      bets.tabInfo.lineActiveMarket
                                        .compoundKey +
                                        "_" +
                                        bets.tabInfo.outcomeId,
                                      bets
                                    )
                                  : f => f
                              }
                            >
                              <div
                                className={
                                  "constructor__name" +
                                  (tab.send ? " clickable" : "")
                                }
                              >
                                {tab.send ? tab.send : tab.noSend}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        className="constructor__close"
                        onClick={() =>
                          this.removeOne(
                            this.props.event.id,
                            this.getKeyMap(bets)
                          )
                        }
                      >
                        {getSportIcon("close")}
                      </div>
                      <div className="constructor__full">
                        {this.props.lang.builder.markets[bets.dict.name]}
                      </div>

                      <div className="constructor__pause constructor__status">
                        <div className="constructor__text">
                          {this.props.lang.lineBlock}
                        </div>
                      </div>
                      <div className="constructor__deleted constructor__status">
                        <div className="constructor__text">
                          {this.props.lang.remvoeLine}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return "";
  }

  createMainButton() {
    return (
      <div className="constructor__buttons">
        <div
          className={
            "constructor__button " +
            (!this.state.globalBlockBB || !this.state.betStop
              ? ""
              : "opacity20")
          }
          onClick={
            !this.state.globalBlockBB || !this.state.betStop
              ? this.openSelecttemplate.bind(this)
              : f => f
            // : this.createModalError.bind(this)
          }
        >
          {this.props.lang.builder.AddEvent}
        </div>
        <div className="constructor__coupon">
          <div
            className={
              "constructor__button " +
              (this.props.builderCoupon[this.props.event.id] &&
              this.props.builderCoupon[this.props.event.id].size >= 2
                ? "active"
                : "opacity20")
            }
            onClick={
              !this.state.globalBlockBB || this.props.coef !== 0
                ? this.couponBuilderSend.bind(this)
                : this.createModalError.bind(this)
            }
          >
            {this.props.lang.builder.inCoupon}
          </div>
          {this.props.builderCoupon[this.state.event.id] &&
          this.props.builderCoupon[this.state.event.id].size != 0 ? (
            <div
              className={
                "constructor__coef" +
                (this.props.builderCoupon[this.props.event.id] &&
                this.props.builderCoupon[this.props.event.id].size >= 2
                  ? " active"
                  : " opacity20")
              }
            >
              <div>{getCoefInTrueFormat(this.state.coef)}</div>
              {/* <span>{this.props.lang.builder.coef}</span> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  createselectMarkets = () => {
    console.log(this.state.listMarketsModalBB);
    return (
      <div className="modal-constructor__body">
        <ul className="modal-constructor__list">
          {[...this.state.listMarketsModalBB.keys()].map((item, i) => (
            <li
              className="SaveInformationBetsBuilder"
              key={i}
              onClick={() => this.selectMarket(item)}
            >
              {/* {this.state.listMarketsModalBB.get(item)} */}
              {this.props.lang.builder.markets[item]}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  getStatusOpacity(data) {
    if (data.editMarket && !data.builderError.errorMsg) return false;
    if (
      data.builderError.errorMsg ||
      this.props.coef == 0 ||
      this.props.coef == 1 ||
      data.addClassActive.activeMatch == this.props.lang.builder.select
    )
      return true;
    return false;
  }

  getStatusFunction(data) {
    if (data.editMarket && !data.builderError.errorMsg)
      return () => this.saveInformation(data);
    if (
      data.builderError.errorMsg ||
      this.props.coef == 0 ||
      this.props.coef == 1 ||
      data.addClassActive.activeMatch == this.props.lang.builder.select
    )
      return f => f;
    return () => this.saveInformation(data);
  }
  tmpAddOrCoef(data = {}) {
    return (
      <div className="modal-constructor__buttons">
        <div
          className={
            "modal-constructor__button " +
            (this.getStatusOpacity(data) ? "opacity20" : "")
          }
          onClick={this.getStatusFunction(data)}
        >
          {/* {data.editMarket ? this.props.lang.editTicket : this.props.lang.builder.add} */}
          {this.props.lang.builder.add}
        </div>
        <div className="modal-constructor__coef">
          <span>{this.props.lang.builder.coef}</span>
          <div>
            {data.builderError.errorCode ||
            data.builderError.errorMsg ||
            data.addClassActive.activeMatch == this.props.lang.builder.select ||
            this.props.coef <= 1
              ? "-"
              : getCoefInTrueFormat(this.props.coef)}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.isUpdate = false;
  }
}

const mapStateToProps = state => {
  return {
    events: state.server.eventsAndLines.events,
    lineCK: state.server.eventsAndLines.linesByCK,
    newEvents: state.server.eventsAndLines.newEvents,
    markets: state.server.entities.markets,
    coef: state.server.builderInfo.builderCoef,
    marketsByNum: state.server.entities.marketsByNum,
    builderCoupon: state.server.builderInfo.builder,
    globalBlockBB: state.coupon.couponBuilder,
    matchStatuses: state.matchStatuses,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBetBuilder: data => dispatch(addBetBuilder(data)),
    sendCouponBuilder: data => dispatch(sendCouponBuilder(data)),
    removeOneBet: (event, key) => dispatch(remvoeOneBuilder(event, key)),
    removeAll: event => dispatch(removeAll(event)),
    createModal: text => dispatch(showModal(text)),
    builderRemoveError: () => dispatch(builderRemoveError()),
    errorModalBB: (errorCode, errorMsg) =>
      dispatch(errorModalBB(errorCode, errorMsg)),
    editBuilderCoupon: (line, event) =>
      dispatch(editBuilderCoupon(line, event)),
    saveCoefbuilder: num => dispatch(saveCoefbuilder(0))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counstructor);
