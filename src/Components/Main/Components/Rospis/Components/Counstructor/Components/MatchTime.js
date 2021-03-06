import React from "react";
import { connect } from "react-redux";

import { isLineBlocked } from "../../../../../../../Services/Shared";
import { getBetBuilderOdd } from "../../../../../../../Server/";
import { getState } from "../../../../../../..";

class TimeMatch extends React.Component {
  constructor(props) {
    super(props);
    this.props.goBack.bind(this);
    this.initialState = {
      addClassActive: {
        activeTab: props.activeTab,
        activeTime: 0,
        activeMatch: 0
      },
      builderError: props.builderError,
      dict: props.dictionary.timeMatch,
      activeTab: this.returnNameTab(props.activeTab),
      editMarket: props.editMarket,
      keyChange: props.keyChange,
      markets: props.markets,
      list: "",
      event: props.event,
      dictOutcome: {
        "{$competitor1}/{$competitor1}": 28,
        "{$competitor1}/draw": 6,
        "{$competitor1}/{$competitor2}": 7,
        "draw/{$competitor1}": 29,
        "draw/draw": 30,
        "draw/{$competitor2}": 8,
        "{$competitor2}/{$competitor1}": 31,
        "{$competitor2}/draw": 49,
        "{$competitor2}/{$competitor2}": 32
      },
      tabInfo: {
        outcomeId: 1
      }
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

  tabList(dictObj, event = this.initialState.event, state = this.initialState) {
    // debugger;
    const tabInfo = {
      markets: new Map(),
      activeMarket: "",
      lineActiveMarket: null,
      activeTeam: event.homeName
      // outcomeId :
    };
    dictObj.ids.forEach(elem => {
      const line = this.props.findLine(elem, event);
      if (line) {
        if (tabInfo.activeMarket.length === 0) {
          if (line.length == 0) {
            this.props.goBack();
            return "";
          } else {
            const market = this.props.markets.get(line.marketId.toString());
            tabInfo.activeMarket = dictObj.rusName;

            // debugger
            state.addClassActive.activeTime =
              this.props.lang.language == "en"
                ? market.outcomeName[0].split("&")[1]
                : market.outcomeName[0].split("/")[0];

            state.addClassActive.activeMatch =
              this.props.lang.language == "en"
                ? market.outcomeName[0].split("&")[1]
                : market.outcomeName[0].split("/")[1];

            tabInfo.lineActiveMarket = line;
            tabInfo.markets.set(
              elem,
              this.props.reName(dictObj.dict.get(elem)[0][0])
            );
            tabInfo.outcomeId = state.dictOutcome[market.outcomeName[0]];
          }
        }
      }
    });
    if (tabInfo.activeMarket.length === 0) {
      this.props.goBack();
      return "";
    }
    tabInfo.tab = [
      { noSend: this.props.lang.builder.firstTime },
      { send: this.props.reName(state.addClassActive.activeTime) },
      { noSend: "/" },
      { send: this.props.reName(state.addClassActive.activeMatch) },
      { noSend: this.props.lang.mainTime }
    ];
    return tabInfo;
  }

  createOutcomeList(event, state) {
    const outcomeList = new Map();
    if (state.addClassActive.activeTab === 0) {
      outcomeList.set("{$competitor1}", event.homeName);
      outcomeList.set("draw", this.props.lang.draw);
      outcomeList.set("{$competitor2}", event.awayName);
    } else if (state.addClassActive.activeTab === 1) {
      outcomeList.set("{$competitor1}", event.homeName);
      outcomeList.set("draw", this.props.lang.draw);
      outcomeList.set("{$competitor2}", event.awayName);
    }
    return outcomeList;
  }

  getCurState(state = this.initialState, props, isReset) {
    if (isReset) {
      if (this.props.sendState) {
        state.addClassActive = this.props.sendState.addClassActive;
        state.addClassActive.activeTab = this.props.activeTab;
        const status = this.props.event.lines.get(
          this.props.sendState.tabInfo.lineActiveMarket.id
        ).status;
        if (status != 1) {
          this.props.goBack();
        } else {
          state.tabInfo = this.props.sendState.tabInfo;
        }
      } else {
        state.tabInfo = this.tabList(
          props.dictionary.timeMatch,
          props.event,
          state
        );
      }
      state.list = this.createOutcomeList(props.event, state);
      return state;
    }
    if (props.builderError !== state.builderError) {
      const newState = {
        ...state,
        builderError: props.builderError
      };
      this.isUpdate = true;
      return newState;
    }
    if (props.newEvents.has(this.props.event.id)) {
      const linesMarkets = [
        ...props.newEvents.get(this.props.event.id).lines.values()
      ].filter(
        line =>
          this.state.dict.dict.has(line.marketId) &&
          !isLineBlocked(line, this.props.event)
      );

      if (linesMarkets.length === 0) {
        this.props.goBack();
      } else {
        if (
          linesMarkets.find(
            line =>
              line.id == state.tabInfo.lineActiveMarket.id &&
              line.marketId == state.tabInfo.lineActiveMarket.marketId
          )
          // JSON.stringify(linesMarkets) !==
          // JSON.stringify(state.linesMarkets)
        ) {
          const lineActive = [
            ...props.newEvents.get(this.state.event.id).lines.values()
          ].filter(
            line =>
              state.dict.dict.has(line.marketId) &&
              !isLineBlocked(line, props.newEvents.get(this.state.event.id))
          );

          console.log(lineActive, "__________________UPDATE ???????? ????????");

          if (
            lineActive &&
            lineActive.find(
              line => line.marketId == state.tabInfo.lineActiveMarket.marketId
            )
          ) {
            console.log(
              "__-_________________-________ ?????????????? update",
              lineActive
            );
            const newState = { ...state, linesMarkets };

            // newState.tabInfo = this.tabList(
            //     this.props.dictionary.oneXTwo,
            //     props.newEvents.get(this.props.event.id),
            //     newState
            // );

            newState.list = this.createOutcomeList(
              props.newEvents.get(this.props.event.id),
              state
            );
            console.log(newState);
            this.isUpdate = true;
            return newState;
          } else {
            const newState = { ...state };

            newState.addClassActive = {
              activeTab: state.addClassActive.activeTab,
              // activeOverUnderExatct: 0,
              activeTime: state.addClassActive.activeTime,
              activeMatch: state.addClassActive.activeMatch,
              activeMarkets: 0
            };
            newState.linesMarkets = [
              ...props.newEvents.get(this.state.event.id).lines.values()
            ].filter(
              line =>
                state.dict.dict.has(line.marketId) &&
                !isLineBlocked(line, props.newEvents.get(this.state.event.id))
            );
            newState.tabInfo = this.tabList(
              this.props.dictionary.teamGoalScorer,
              props.newEvents.get(this.props.event.id),
              newState
            );

            newState.list = this.createOutcomeList(
              props.newEvents.get(this.props.event.id),
              state
            );
            this.isUpdate = true;
            return newState;
          }
        } else {
          const newState = { ...state };
          newState.linesMarkets = this.searchLines(state.dict.dict);
          newState.tabInfo = this.tabList(
            this.props.dictionary.timeMatch,
            props.newEvents.get(this.props.event.id),
            newState
          );
          newState.list = this.createOutcomeList(
            props.newEvents.get(this.props.event.id),
            state
          );
          this.isUpdate = true;
          return newState;
        }
      }
    }
    return state;
  }
  searchLines(dict) {
    const linesMarkets = [...this.props.event.lines.values()].filter(
      line => dict.has(line.marketId) && !isLineBlocked(line, this.props.event)
    );
    return linesMarkets;
  }
  shouldComponentUpdate(nextProps) {
    if (this.isUpdate) return true;
    if (nextProps.coef !== this.props.coef) return true;
    const newState = this.getCurState(this.state, nextProps, false);
    if (newState !== this.state) {
      this.setState(newState);
    }
    return false;
  }

  returnNameTab(key) {
    switch (key) {
      case 0:
        return "TEAM";
      case 1:
        return "MARKETS";
      default:
        break;
    }
  }

  changeTab(key) {
    const addClassActive = { ...this.state.addClassActive };
    addClassActive.activeTab = key;
    const activeTab = this.returnNameTab(key);
    // debugger;
    const newState = {
      ...this.state,
      addClassActive,
      activeTab
    };
    const list = this.createOutcomeList(this.props.event, newState);
    newState.list = list;
    if (newState.activeTab !== this.state.activeTab) {
      // debugger;
      this.isUpdate = true;
      this.setState(newState);
    }
  }

  createTab(arraytab) {
    // debugger;

    const arr = [this.props.lang.firstHalf, this.props.lang.mainTineFull];
    return arraytab.map((elem, key) => {
      return (
        <div
          className={
            "modal-constructor__tab " +
            (this.state.addClassActive.activeTab === key ? "active" : "")
          }
          onClick={() => this.changeTab(key)}
          key={key}
        >
          <span className="opacity50"> {arr[key]} </span>
          {this.props.reName(elem)}
        </div>
      );
    });
  }

  changeInformationSend(key) {
    const addClassActive = { ...this.state.addClassActive };
    // debugger;
    const tabInfo = { ...this.state.tabInfo };
    let outcomeId = "";

    if (addClassActive.activeTab === 0) {
      addClassActive.activeTime = key;
      tabInfo.outcomeId = this.state.dictOutcome[
        `${key}/${addClassActive.activeMatch}`
      ];
    } else {
      addClassActive.activeMatch = key;
      tabInfo.outcomeId = this.state.dictOutcome[
        `${addClassActive.activeTime}/${key}`
      ];
    }
    const newState = {
      ...this.state,
      addClassActive,
      tabInfo,
      outcomeId
    };

    newState.tabInfo.tab = [
      { noSend: this.props.lang.builder.firstTime },
      { send: this.props.reName(addClassActive.activeTime) },
      { noSend: "/" },
      { send: this.props.reName(addClassActive.activeMatch) },
      { noSend: this.props.lang.mainTime }
    ];
    this.isUpdate = true;
    this.setState(newState);
  }

  getActiveClass(key) {
    if (
      this.state.addClassActive.activeTab === 0 &&
      this.state.addClassActive.activeTime === key
    ) {
      return " active";
    } else if (
      this.state.addClassActive.activeTab === 1 &&
      this.state.addClassActive.activeMatch === key
    ) {
      return " active";
    }

    return "";
  }

  render() {
    console.log("_________________RENDER_________________");
    return (
      <>
        <div className="modal-constructor__tabs">
          {this.createTab([
            this.state.addClassActive.activeTime,
            this.state.addClassActive.activeMatch
          ])}
        </div>

        <div className="modal-constructor__body">
          <ul className="modal-constructor__list">
            {[...this.state.list.keys()].map((key, i) => (
              <li
                className={
                  "SaveInformationBetsBuilder" + this.getActiveClass(key)
                }
                key={i}
                onClick={() => this.changeInformationSend(key)}
              >
                {this.state.list.get(key)}
              </li>
            ))}
          </ul>
        </div>
        {this.props.tmpAddOrCoef(this.state)}
        {this.createErrorMSG()}
      </>
    );
  }
  createErrorMSG() {
    if (this.state.builderError.errorCode) {
      return (
        <div className="modal-constructor__error">
          {this.state.builderError.errorCode + " "}

          {this.state.builderError.errorMsg}
        </div>
      );
    } else {
      return "";
    }
  }

  componentDidMount() {
    const mapBets =
      this.props.event.id in this.props.eventBuilder
        ? this.props.eventBuilder[this.props.event.id]
        : 0;

    const boolen = this.props.getStatusUpdate(this.state); // ????????????????
    if (boolen) {
      if (this.state.editMarket) {
        const editInfo = this.props.editBet(
          this.state,
          mapBets,
          this.state.keyChange,
          this.oldChangeKey
        );
        this.oldChangeKey = editInfo.keyChange;
        const arrayBets = this.composeInfoSend(editInfo.arrayBet);
        //?????????? ?? ?????????????????? ?????? ????????????????????????
        getBetBuilderOdd(this.props.event.id, arrayBets);
      } else {
        if (mapBets) {
          const arrayBets = this.composeInfoSend(mapBets);
          arrayBets.push(this.selectedBet());
          getBetBuilderOdd(this.props.event.id, arrayBets);
        } else {
          const arrayBets = [];
          arrayBets.push(this.selectedBet());
          getBetBuilderOdd(this.props.event.id, arrayBets);
        }
      }
    }
  }

  selectedBet() {
    // debugger;
    console.log("Line", this.state.tabInfo.lineActiveMarket.id);
    return {
      compoundKey: this.state.tabInfo.lineActiveMarket.compoundKey,
      lineTypeRadar: this.props.event.lines.get(
        this.state.tabInfo.lineActiveMarket.id
      ).lineTypeRadar,
      outcomeId: this.state.tabInfo.outcomeId
    };
  }

  composeInfoSend(mapBets) {
    const arrayBets = [];
    mapBets.forEach((bet, key, i) => {
      // debugger;
      arrayBets.push({
        compoundKey: bet.tabInfo.lineActiveMarket.compoundKey,
        lineTypeRadar: this.props.event.lines.get(
          this.state.tabInfo.lineActiveMarket.id
        ).lineTypeRadar,
        outcomeId: bet.tabInfo.outcomeId
      });
    });
    return arrayBets;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.builderError !== prevState.builderError) {
      return "";
    }
    if (
      this.state !== prevState &&
      this.state.addClassActive.activeTab === prevState.addClassActive.activeTab
    ) {
      const mapBets =
        this.props.event.id in this.props.eventBuilder
          ? this.props.eventBuilder[this.props.event.id]
          : 0;
      const boolen = this.props.getStatusUpdate(this.state);
      if (boolen) {
        if (this.state.editMarket) {
          const editInfo = this.props.editBet(
            this.state,
            mapBets,
            this.state.keyChange,
            this.oldChangeKey
          );
          this.oldChangeKey = editInfo.keyChange;
          const arrayBets = this.composeInfoSend(editInfo.arrayBet);
          //?????????? ?? ?????????????????? ?????? ????????????????????????
          getBetBuilderOdd(this.props.event.id, arrayBets);
        } else {
          if (mapBets) {
            const arrayBets = this.composeInfoSend(mapBets);
            arrayBets.push(this.selectedBet());
            getBetBuilderOdd(this.props.event.id, arrayBets);
          } else {
            const arrayBets = [];
            arrayBets.push(this.selectedBet());
            getBetBuilderOdd(this.props.event.id, arrayBets);
          }
        }
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    events: state.server.eventsAndLines.events,
    newEvents: state.server.eventsAndLines.newEvents,
    markets: state.server.entities.markets,
    coef: state.server.builderInfo.builderCoef,
    marketsByNum: state.server.entities.marketsByNum,
    lang: state.user.language_user.dict,
    builderError: state.server.builderInfo.builderError
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeMatch);
