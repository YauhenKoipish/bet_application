import React from "react";
import { connect } from "react-redux";
import {
  isLineBlocked,
  isOutcomeBlocked
} from "../../../../../../../Services/Shared";
import { getBetBuilderOdd } from "../../../../../../../Server/";

class TotalGoal extends React.Component {
  constructor(props) {
    super(props);
    this.props.goBack.bind(this);
    this.initialState = {
      addClassActive: {
        activeTab: props.activeTab,
        activeOverUnderExatct: 0,
        activeValue: 0,
        activeTeam: 0,
        activeMarkets: 0
      },
      keyChange: props.keyChange,
      editMarket: props.editMarket,
      dict: props.dictionary.totalGoals,
      activeTab: this.returnNameTab(props.activeTab),
      markets: props.markets,
      list: "",
      builderError: props.builderError,
      event: props.event,
      // allLineMarkets: this.seacrh
      dictOutcome: new Map([
        [
          30003,
          {
            over: 4,
            under: 5
          }
        ],
        [
          30233,
          {
            over: 4,
            under: 5
          }
        ],
        [
          30234,
          {
            over: 4,
            under: 5
          }
        ],
        [
          30232,
          {
            0: 33,
            1: 34,
            2: 35,
            3: 36,
            4: 37,
            5: 114,
            "6+": 115
          }
        ],
        [
          31749,
          {
            0: 33,
            1: 34,
            2: 35,
            3: 36,
            4: 37,
            5: 114,
            6: 116
          }
        ],
        [
          30238,
          {
            0: 33,
            1: 34,
            2: 35,
            3: 36,
            "4+": 65
          }
        ],
        [
          30237,
          {
            0: 33,
            1: 34,
            2: 35,
            "3+": 120
          }
        ],
        [
          30235,
          {
            0: 33,
            1: 34,
            2: 35,
            3: 36,
            4: 37,
            5: 114,
            6: 116,
            7: 117,
            8: 118,
            "9+": 119
          }
        ],
        [
          30240,
          {
            0: 33,
            1: 34,
            2: 35,
            3: 36,
            "4+": 65
          }
        ],
        [
          30239,
          {
            0: 33,
            1: 34,
            2: 35,
            "3+": 120
          }
        ],
        [30253, { under: 5, over: 4 }],
        [
          30269,
          {
            0: 33,
            1: 34,
            2: 35,
            "3+": 120
          }
        ],
        [30264, { under: 5, over: 4 }]
      ]),
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
    const tabInfo = {
      markets: new Map(),
      activeMarket: "",
      lineActiveMarket: null,
      activeTeam: event.homeName
    };
    dictObj.ids.forEach(elem => {
      const line = [...event.lines.values()].filter(
        line => line.marketId === elem && !isLineBlocked(line, this.props.event) //&&
        // isOutcomeBlocked(line, 4) &&
        // line.specifierValue[0] % 1 === 0.5
      );
      line.sort(function(a, b) {
        return a.specifierValue[0] - b.specifierValue[0];
      });

      if (line.length > 0 && tabInfo.activeMarket.length === 0) {
        const market = this.props.markets.get(line[0].marketId.toString());

        if (dictObj.dict.get(line[0].marketId)[0] == "exact") {
          tabInfo.activeMarket = dictObj.rusName;
          state.addClassActive.activeOverUnderExatct = "exact";
          state.addClassActive.activeValue = market.outcomeName[0];
          state.addClassActive.activeTeam = dictObj.dict.get(elem)[1][0];
          state.addClassActive.activeMarkets = dictObj.dict.get(elem)[2][0];
          tabInfo.lineActiveMarket = line[0];
          tabInfo.outcomeId = state.dictOutcome.get(elem)[
            state.addClassActive.activeValue
          ];
        } else {
          // debugger;
          const lineOberOrUnder = [...event.lines.values()].filter(
            line =>
              line.marketId === elem &&
              !isLineBlocked(line, this.props.event) &&
              isOutcomeBlocked(line, 4) &&
              line.specifierValue[0] % 1 === 0.5
          );
          lineOberOrUnder.sort(function(a, b) {
            return a.specifierValue[0] - b.specifierValue[0];
          });
          console.log(lineOberOrUnder, "_____LINE после обновления");

          if (lineOberOrUnder.length > 0) {
            // повторная фильтрация

            tabInfo.activeMarket = dictObj.rusName;
            state.addClassActive.activeOverUnderExatct = this.props.reName(
              market.outcomeName[0].split(" ")[0]
            );
            state.addClassActive.activeValue =
              lineOberOrUnder[0].specifierValue[0];
            state.addClassActive.activeTeam = dictObj.dict.get(elem)[1][0];
            state.addClassActive.activeMarkets = dictObj.dict.get(elem)[2][0];
            tabInfo.lineActiveMarket = lineOberOrUnder[0];
            tabInfo.outcomeId = state.dictOutcome.get(elem)[
              state.addClassActive.activeOverUnderExatct
            ];
          }
        }
      }
      tabInfo.markets.set(
        elem,
        this.props.reName(dictObj.dict.get(elem)[2][0])
      );
    });
    if (tabInfo.activeMarket.length === 0) {
      this.props.goBack();
      return "";
    }
    tabInfo.tab = [
      { send: this.props.reName(state.addClassActive.activeOverUnderExatct) },
      { send: state.addClassActive.activeValue },
      { send: this.props.reName(state.addClassActive.activeTeam) },
      { send: this.props.reName(state.addClassActive.activeMarkets) }
    ];
    return tabInfo;
  }

  filtrsSFV(state, stateValue, marketId, event = this.props.event) {
    const newMapValue = new Map();
    const line = [...event.lines.values()].filter(
      line =>
        line.marketId === +marketId &&
        !isLineBlocked(line, event) &&
        isOutcomeBlocked(
          line,
          state.dictOutcome.get(marketId)[
            state.addClassActive.activeOverUnderExatct
          ]
        ) &&
        (state.addClassActive.activeOverUnderExatct != "exact"
          ? line.specifierValue[0] % 1 === stateValue
          : this.props.markets.get(line.marketId.toString()).outcomeName[0] %
              1 ===
            stateValue)
    );
    line.sort(function(a, b) {
      return a.specifierValue[0] - b.specifierValue[0];
    });
    if (state.addClassActive.activeOverUnderExatct !== "exact") {
      for (let i = 0; i < line.length; i++) {
        newMapValue.set(line[i].compoundKey, line[i].specifierValue[0]);
      }
    } else {
      let arr = [];
      const lineEx = [...event.lines.values()].filter(
        line =>
          line.marketId === +marketId &&
          !isLineBlocked(line, event) &&
          this.props.markets.get(line.marketId.toString()).outcomeName[0] %
            1 ===
            stateValue
      );

      const market = this.props.markets.get(lineEx[0].marketId.toString());
      for (let i = 0; i < market.outcomeName.length; i++) {
        arr.push(market.outcomeName[i]);
      }
      newMapValue.set(lineEx[0].compoundKey, arr);
    }
    return newMapValue;
  }

  validItemList(line, num) {
    const index = line.outcomeActive.indexOf(1);
    if (num == -1 || index > num) return false;
    return true;
  }

  getListElemExact(line, type, state) {
    switch (type) {
      case "BR":
        switch (state.addClassActive.activeTeam) {
          case "both":
            switch (state.addClassActive.activeMarkets) {
              case "match":
                return this.validItemList(line, 5);
              case "firstHalf":
              case "secondHalf":
                return this.validItemList(line, 2);
              default:
                console.log(state.addClassActive.activeMarkets);
                break;
            }
          case "home":
          case "away":
            switch (state.addClassActive.activeMarkets) {
              case "match":
                return this.validItemList(line, 2);
              case "firstHalf":
              case "secondHalf":
                return this.validItemList(line, 2);
              default:
                console.log(state.addClassActive.activeMarkets);
                break;
            }

          default:
            return false;
        }
      case "BG":
        switch (state.addClassActive.activeTeam) {
          case "both":
            switch (state.addClassActive.activeMarkets) {
              case "match":
                return this.validItemList(line, 6);
              case "firstHalf":
              case "secondHalf":
                return this.validItemList(line, 4);
              default:
                console.log(state.addClassActive.activeMarkets);
                break;
            }
          case "home":
          case "away":
            switch (state.addClassActive.activeMarkets) {
              case "match":
                return this.validItemList(line, 2);
              case "firstHalf":
              case "secondHalf":
                return this.validItemList(line, 2);
              default:
                console.log(state.addClassActive.activeMarkets);
                break;
            }

          default:
            return false;
        }
      case "SSL":
        switch (state.addClassActive.activeTeam) {
          case "both":
            switch (state.addClassActive.activeMarkets) {
              case "match":
                return this.validItemList(line, 6);

              case "firstHalf":
              case "secondHalf":
                return this.validItemList(line, 3);
              default:
                console.log(state.addClassActive.activeMarkets);
                break;
            }
          case "home":
          case "away":
            switch (state.addClassActive.activeMarkets) {
              case "match":
                return this.validItemList(line, 3);
              case "firstHalf":
              case "secondHalf":
                return this.validItemList(line, 2);
              default:
                console.log(state.addClassActive.activeMarkets);
                break;
            }

          default:
            return false;
        }

      default:
        return false;
    }
  }

  createOutcomeList(event, state) {
    let outcomeList = new Map();
    if (state.addClassActive.activeTab === 0) {
      const isTime = new Map();

      const te = [...event.lines.values()].find(line => line.marketId == 30235);
      console.log(te);
      state.dict.dict.forEach((elem, key) => {
        if (
          elem[2][0] === state.addClassActive.activeMarkets &&
          elem[1][0] === state.addClassActive.activeTeam
        ) {
          const line = this.props.findLine(key, event);

          if (line) {
            for (let i = 0; i < elem[0].length; i++) {
              if (!isTime.has([elem[0][i]])) {
                if (elem[0][i] == "exact") {
                  /* определить поставщика понять сколько должно быть проверить оуткомактив если не входит не рисую если входит рисую*/
                  console.log(line);
                  const arrayValue = this.getListElemExact(
                    line,
                    this.props.line_type_radar,
                    state
                  );
                  if (arrayValue)
                    isTime.set(elem[0][i], this.props.reName(elem[0][i]));
                } else {
                  isTime.set(elem[0][i], this.props.reName(elem[0][i]));
                }
              }
            }
          }
        }
      });
      if (isTime.has("over")) {
        outcomeList.set("over", this.props.lang.over);
      }
      if (isTime.has("exact")) {
        outcomeList.set("exact", this.props.lang.exact);
      }
      if (isTime.has("under")) {
        outcomeList.set("under", this.props.lang.under);
      }
    } else if (state.addClassActive.activeTab === 1) {
      const stateValue =
        state.addClassActive.activeOverUnderExatct !== "exact" ? 0.5 : 0;
      let marketId = state.tabInfo.lineActiveMarket.marketId;
      if (state.addClassActive.activeOverUnderExatct != "exact")
        outcomeList = this.filtrsSFV(state, stateValue, marketId, event);
      else
        outcomeList = this.filterListExact(state, stateValue, marketId, event);
    } else if (state.addClassActive.activeTab === 2) {
      // debugger;
      state.dict.dict.forEach((elem, key) => {
        const line = this.props.findLine(key, event);
        if (line)
          if (elem[2][0] === state.addClassActive.activeMarkets) {
            if (
              elem[0][0] === state.addClassActive.activeOverUnderExatct ||
              elem[0][1] === state.addClassActive.activeOverUnderExatct
            ) {
              outcomeList.set(elem[1][0], this.props.reName(elem[1][0]));
            }
          }
      });
    } else if (state.addClassActive.activeTab === 3) {
      state.dict.dict.forEach((elem, key) => {
        if (elem[1][0] === state.addClassActive.activeTeam) {
          if (
            elem[0][0] === state.addClassActive.activeOverUnderExatct ||
            elem[0][1] === state.addClassActive.activeOverUnderExatct
          ) {
            console.log(key);
            const line = [...this.props.event.lines.values()].find(
              line =>
                line.marketId == key &&
                !isLineBlocked(line, this.props.event) &&
                (state.addClassActive.activeOverUnderExatct != "exact"
                  ? line.specifierValue[0] % 1 == 0.5
                  : this.props.markets.get(line.marketId.toString())
                      .outcomeName[0] %
                      1 ==
                    0)
            );
            if (line) {
              console.log(key, "Я нашел эти линии");
              console.log(line);
              outcomeList.set(elem[2][0], this.props.reName(elem[2][0]));
            }
          }
        }
      });
    }
    console.log(outcomeList, "LIST outcome");
    return outcomeList;
  }

  filterListExact(state, stateValue, marketId, event) {
    const creteOucome = new Map();
    // debugger;

    const baseOucome = this.props.line_type_radar;
    switch (baseOucome) {
      case "SSL":
        return this.getOutcomeSSL(state, stateValue, marketId, event);
      case "BR":
        return this.getOutcomeBR(state, stateValue, marketId, event);
      case "BG":
        return this.getOutcomeBG(state, stateValue, marketId, event);
      default:
        return new Map();
    }
  }

  paramsCreateOtcome(state, stateValue, marketId, event, valueArrLength = 6) {
    const createoutcomeList = new Map();
    createoutcomeList.set(state.tabInfo.lineActiveMarket.compoundKey, []);
    for (let i = 0; i <= valueArrLength; i++) {
      const active = state.tabInfo.lineActiveMarket.outcomeActive[i];

      if (active) {
        createoutcomeList
          .get(state.tabInfo.lineActiveMarket.compoundKey)
          .push(i);
      }
    }
    return createoutcomeList;
  }

  getOutcomeSSL(state, stateValue, marketId, event) {
    console.log("CreateOutcomeSSL");
    switch (state.addClassActive.activeTeam) {
      case "both":
        switch (state.addClassActive.activeMarkets) {
          case "match":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              6
            );
          case "firstHalf":
          case "secondHalf":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              3
            );
          default:
            console.log(state.addClassActive.activeMarkets);
            break;
        }
      case "home":
      case "away":
        switch (state.addClassActive.activeMarkets) {
          case "match":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              3
            );
          case "firstHalf":
          case "secondHalf":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              2
            );
          default:
            console.log(state.addClassActive.activeMarkets);
            break;
        }

      default:
        return new Map();
    }
  }
  getOutcomeBR(state, stateValue, marketId, event) {
    console.log("CreateOutcomeBR");
    switch (state.addClassActive.activeTeam) {
      case "both":
        switch (state.addClassActive.activeMarkets) {
          case "match":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              5
            );
          case "firstHalf":
          case "secondHalf":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              2
            );
          default:
            console.log(state.addClassActive.activeMarkets);
            break;
        }
      case "home":
      case "away":
        switch (state.addClassActive.activeMarkets) {
          case "match":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              2
            );
          case "firstHalf":
          case "secondHalf":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              2
            );
          default:
            console.log(state.addClassActive.activeMarkets);
            break;
        }

      default:
        return new Map();
    }
  }
  getOutcomeBG(state, stateValue, marketId, event) {
    console.log("CreateOutcomeBG");
    switch (state.addClassActive.activeTeam) {
      case "both":
        switch (state.addClassActive.activeMarkets) {
          case "match":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              6
            );
          case "firstHalf":
          case "secondHalf":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              4
            );
          default:
            console.log(state.addClassActive.activeMarkets);
            break;
        }
      case "home":
      case "away":
        switch (state.addClassActive.activeMarkets) {
          case "match":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              3
            );
          case "firstHalf":
          case "secondHalf":
            return this.paramsCreateOtcome(
              state,
              stateValue,
              marketId,
              event,
              2
            );
          default:
            console.log(state.addClassActive.activeMarkets);
            break;
        }

      default:
        return new Map();
    }
  }

  searchLines(dict) {
    const linesMarkets = [...this.props.event.lines.values()].filter(
      line => dict.has(line.marketId) && !isLineBlocked(line, this.props.event)
    );

    return linesMarkets;
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
          props.dictionary.totalGoals,
          props.event,
          state
        );
      }
      state.linesMarkets = this.searchLines(state.dict.dict);
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
              !isLineBlocked(line, props.newEvents.get(this.state.event.id)) &&
              this.getListElemExact(
                line,
                this.props.line_type_radar,
                this.state
              )
          );

          console.log(lineActive, "__________________UPDATE КУДА ИДЕМ");

          if (
            lineActive &&
            lineActive.find(
              line =>
                line.marketId == state.tabInfo.lineActiveMarket.marketId &&
                !isLineBlocked(line, props.newEvents.get(this.state.event.id))
            )
          ) {
            console.log(
              "__-_________________-________ простой update",
              lineActive
            );
            const newState = { ...state, linesMarkets };

            newState.list = this.createOutcomeList(
              props.newEvents.get(this.props.event.id),
              state
            );
            console.log(newState);
            this.isUpdate = true;
            return newState;
          } else {
            console.log("___________UPDATE CHANGE TAB INFO");
            const newState = { ...state };
            newState.addClassActive = {
              activeTab: state.addClassActive.activeTab,
              // activeOverUnderExatct: 0,
              activeValue: 0,
              activeTeam: state.addClassActive.activeTeam,
              activeMarkets: 0
            };

            newState.linesMarkets = [
              ...props.newEvents.get(this.state.event.id).lines.values()
            ].filter(
              line =>
                state.dict.dict.has(line.marketId) &&
                !isLineBlocked(line, props.newEvents.get(this.state.event.id))
            );
            //тестовое удаление
            newState.tabInfo = this.tabList(
              this.props.dictionary.totalGoals,
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
          console.log("global sliv");
          const newState = { ...state };
          newState.linesMarkets = this.searchLines(state.dict.dict);
          newState.tabInfo = this.tabList(
            this.props.dictionary.totalGoals,
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
        return "OverUnderExact";
      case 1:
        return "SCFValue";
      case 2:
        return "TEAM";
      case 3:
        return "MARKETS";
      default:
        break;
    }
  }

  changeTab(key) {
    const addClassActive = { ...this.state.addClassActive };
    addClassActive.activeTab = key;
    const activeTab = this.returnNameTab(key);
    const newState = {
      ...this.state,
      addClassActive,
      activeTab
    };
    const list = this.createOutcomeList(this.props.event, newState);
    newState.list = list;
    if (newState.activeTab !== this.state.activeTab) {
      this.isUpdate = true;
      this.setState(newState);
    }
  }

  createTab(arraytab) {
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
          {this.props.reName(elem)}
        </div>
      );
    });
  }

  getActiveOutcome(array, line) {
    let outcome = 0;
    for (let key = 0; key < array.length; key++) {
      if (line.outcomeActive[key] != 0) {
        outcome = array[key];
        break;
      }
    }
    return outcome;
  }

  changeInformationSend(key, elem) {
    const addClassActive = { ...this.state.addClassActive };
    let tabInfo = { ...this.state.tabInfo };

    if (
      addClassActive.activeTab === 0 &&
      addClassActive.activeOverUnderExatct !== key
    ) {
      addClassActive.activeOverUnderExatct = key;

      let marketId = null;
      let newMarketId = null;
      this.state.dict.dict.forEach((elem, key) => {
        if (elem[2][0] === addClassActive.activeMarkets) {
          // newMarketId = key;
          if (elem[1][0] === addClassActive.activeTeam) {
            newMarketId = key;
            if (
              elem[0][0] === addClassActive.activeOverUnderExatct ||
              elem[0][1] === addClassActive.activeOverUnderExatct
            ) {
              let lineTest = this.props.findLine(key, this.state.event);

              if (lineTest) {
                console.log(lineTest);
                marketId = key;
                // addClassActive.activeMarkets = elem[2][0];
              }
            }
          }
        }
      });
      if (!marketId) {
        this.state.dict.dict.forEach((elem, marketIdKey) => {
          if (elem[0][0] === addClassActive.activeOverUnderExatct) {
            if (elem[1][0] === addClassActive.activeTeam) {
              if (!marketId) {
                let line = this.props.findLine(marketIdKey, this.state.event);
                if (line) {
                  marketId = marketIdKey;
                  addClassActive.activeMarkets = elem[2][0];
                }
              }
            }
          }
        });
      }

      let line = [...this.props.event.lines.values()].filter(
        line =>
          line.marketId === +marketId &&
          !isLineBlocked(line, this.props.event) &&
          (addClassActive.activeOverUnderExatct !== "exact"
            ? line.specifierValue[0] % 1 == 0.5
            : this.props.markets.get(line.marketId.toString()).outcomeName[0] %
                1 ===
              0)
      );

      line.sort(function(a, b) {
        return a.specifierValue[0] - b.specifierValue[0];
      });

      const lineSelect = line.find(line =>
        addClassActive.activeOverUnderExatct !== "exact" &&
        !isLineBlocked(line, this.props.event)
          ? line.specifierValue[0] === addClassActive.activeValue
          : this.props.markets.get(line.marketId.toString()).outcomeName[0] ===
            addClassActive.activeValue
      );
      if (lineSelect) line[0] = lineSelect;

      tabInfo.lineActiveMarket = line[0];
      // debugger;
      addClassActive.activeValue =
        addClassActive.activeOverUnderExatct !== "exact"
          ? line[0].specifierValue[0]
          : this.getActiveOutcome(
              this.props.markets.get(line[0].marketId.toString()).outcomeName,
              line[0]
            );

      tabInfo.lineActiveMarket = line[0];
      // debugger;
      if (addClassActive.activeOverUnderExatct !== "exact") {
        tabInfo.outcomeId = this.state.dictOutcome.get(
          tabInfo.lineActiveMarket.marketId
        )[addClassActive.activeOverUnderExatct];
      } else {
        // debugger;
        tabInfo.outcomeId = this.state.dictOutcome.get(
          tabInfo.lineActiveMarket.marketId
        )[addClassActive.activeValue];
      }
    } else if (
      addClassActive.activeTab === 1 &&
      addClassActive.activeValue !== key
    ) {
      // debugger;
      //Допроверить
      const line = [...this.props.event.lines.values()].find(
        line =>
          line.compoundKey === key && !isLineBlocked(line, this.props.event)
      );

      addClassActive.activeValue =
        addClassActive.activeOverUnderExatct !== "exact"
          ? line.specifierValue[0]
          : elem; // продумать передачу второго параметра
      tabInfo.lineActiveMarket = line;

      if (addClassActive.activeOverUnderExatct !== "exact") {
        tabInfo.outcomeId = this.state.dictOutcome.get(
          tabInfo.lineActiveMarket.marketId
        )[addClassActive.activeOverUnderExatct];
      } else {
        // debugger;
        tabInfo.outcomeId = this.state.dictOutcome.get(
          tabInfo.lineActiveMarket.marketId
        )[addClassActive.activeValue];
      }
    } else if (
      addClassActive.activeTab === 2 &&
      addClassActive.activeTeam !== key
    ) {
      addClassActive.activeTeam = key;
      let marketId = null;
      this.state.dict.dict.forEach((elem, key) => {
        if (elem[2][0] === addClassActive.activeMarkets) {
          if (elem[1][0] === addClassActive.activeTeam) {
            if (
              elem[0][0] === addClassActive.activeOverUnderExatct ||
              elem[0][1] == addClassActive.activeOverUnderExatct
            ) {
              let line = this.props.findLine(key, this.state.event);
              if (line) {
                marketId = key;
              }
            }
          }
        }
      });

      if (!marketId) debugger;
      // debugger;

      const line = [...this.props.event.lines.values()].filter(
        line =>
          line.marketId === marketId &&
          !isLineBlocked(line, this.props.event) &&
          (addClassActive.activeOverUnderExatct != "exact"
            ? line.specifierValue[0] % 1 === 0.5
            : this.props.markets.get(line.marketId.toString()).outcomeName[0] %
                1 ===
              0)
      );
      line.sort(function(a, b) {
        return a.specifierValue[0] - b.specifierValue[0];
      });

      tabInfo.lineActiveMarket = line[0];

      addClassActive.activeValue =
        addClassActive.activeOverUnderExatct != "exact"
          ? line[0].specifierValue[0]
          : this.props.markets.get(line[0].marketId.toString()).outcomeName[0];

      if (addClassActive.activeOverUnderExatct !== "exact") {
        tabInfo.outcomeId = this.state.dictOutcome.get(
          tabInfo.lineActiveMarket.marketId
        )[addClassActive.activeOverUnderExatct];
      } else {
        // debugger;
        tabInfo.outcomeId = this.state.dictOutcome.get(
          tabInfo.lineActiveMarket.marketId
        )[addClassActive.activeValue];
      }
    } else if (addClassActive.activeTab === 3) {
      addClassActive.activeMarkets = key;

      // debugger;
      let market = null;
      this.state.dict.dict.forEach((elem, keyMarket) => {
        if (elem[2][0] === key) {
          if (elem[1][0] === addClassActive.activeTeam) {
            if (
              elem[0][0] === addClassActive.activeOverUnderExatct ||
              elem[0][1] === addClassActive.activeOverUnderExatct
            ) {
              // debugger;
              let line = this.props.findLine(keyMarket, this.state.event);
              if (line) market = keyMarket;
            }
          }
        }
      });
      if (!market) debugger;
      let line = [...this.props.event.lines.values()].find(
        line =>
          line.marketId == market &&
          !isLineBlocked(line, this.props.event) &&
          (line.specifierValue[0] == addClassActive.activeValue ||
            this.props.markets
              .get(line.marketId.toString())
              .outcomeName.includes(addClassActive.activeValue))
      );
      console.log(line);
      console.log(market);

      if (!line) {
        line = [...this.props.event.lines.values()].filter(
          line =>
            line.marketId === +market &&
            !isLineBlocked(line, this.props.event) &&
            (addClassActive.activeOverUnderExatct !== "exact"
              ? line.specifierValue[0] % 1 == 0.5
              : this.props.markets.get(line.marketId.toString())
                  .outcomeName[0] %
                  1 ===
                0)
        );
        line.sort(function(a, b) {
          return a.specifierValue[0] - b.specifierValue[0];
        });
        line = line[0];
        addClassActive.activeValue =
          addClassActive.activeOverUnderExatct !== "exact"
            ? line.specifierValue[0]
            : this.props.markets.get(line.marketId.toString()).outcomeName[0];
      } else {
        if (addClassActive.activeOverUnderExatct === "exact") {
          if (
            !this.props.markets
              .get(line.marketId.toString())
              .outcomeName.includes(addClassActive.activeValue)
          ) {
            addClassActive.activeValue = this.props.markets.get(
              line.marketId.toString()
            ).outcomeName[0];
          }
        } else {
          if (!line.specifierValue.includes(addClassActive.activeValue)) {
            addClassActive.activeValue = line.specifierValue[0];
          }
        }
      }
      tabInfo.lineActiveMarket = line;
    }
    tabInfo.tab = [
      { send: this.props.reName(addClassActive.activeOverUnderExatct) },
      { send: addClassActive.activeValue },
      { send: this.props.reName(addClassActive.activeTeam) },
      { send: this.props.reName(addClassActive.activeMarkets) }
    ];
    const newState = {
      ...this.state,
      addClassActive,
      tabInfo
    };

    this.isUpdate = true;
    this.setState(newState);
  }

  getActiveClass(key) {
    // debugger;
    if (
      this.state.addClassActive.activeTab === 0 &&
      this.state.addClassActive.activeOverUnderExatct === key
    ) {
      return " active";
    } else if (
      this.state.addClassActive.activeTab === 1 &&
      this.state.tabInfo.lineActiveMarket.compoundKey === key
    ) {
      return " active";
    } else if (
      this.state.addClassActive.activeTab === 2 &&
      this.state.addClassActive.activeTeam === key
    ) {
      return " active";
    } else if (
      this.state.addClassActive.activeTab === 3 &&
      this.state.addClassActive.activeMarkets === key
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
            this.state.addClassActive.activeOverUnderExatct,
            this.state.addClassActive.activeValue,
            this.state.addClassActive.activeTeam,
            this.state.addClassActive.activeMarkets
          ])}
        </div>

        <div className="modal-constructor__body">
          <ul className="modal-constructor__list">
            {this.state.addClassActive.activeOverUnderExatct !== "exact" ||
            this.state.addClassActive.activeTab !== 1
              ? [...this.state.list.keys()].map((key, i) => (
                  <li
                    className={
                      "SaveInformationBetsBuilder" + this.getActiveClass(key)
                    }
                    key={i}
                    onClick={() => this.changeInformationSend(key)}
                  >
                    {this.state.list.get(key)}
                  </li>
                ))
              : [...this.state.list.keys()].map((key, i) => {
                  return this.state.list.get(key).map((elem, k) => (
                    <li
                      className={
                        "SaveInformationBetsBuilder" + this.getActiveClass(key)
                      }
                      key={k}
                      onClick={() =>
                        this.changeInformationSend(
                          key,
                          //   elem.replace("+", "")
                          elem
                        )
                      }
                    >
                      {elem}
                    </li>
                  ));
                })}
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
    // debugger;
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
        //поиск и изменения уже добавленного
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
    console.log("state line", this.state.tabInfo.lineActiveMarket.id);
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
          //поиск и изменения уже добавленного
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
    lang:state.user.language_user.dict,
    builderError: state.server.builderInfo.builderError
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TotalGoal);
//
