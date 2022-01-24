import React from "react";
import { connect } from "react-redux";

import TopBar from "./Components/TopBar";
import Counstructor from "./Counstructor/index";
import { route } from "../../../../../Actions/Components/Navigation/";
import { toggleOutcome } from "../../../../../Actions/Components/Coupon/";
import { getExtraLine } from "../../../../../Actions/Components/Server/Case2/";
import {
  transliterate,
  getEntityById,
  sortArray,
  renameMarketName,
  getMarket,
  getMarketName
} from "../../../../../Services/Shared";

import {
  SportSolutionDict,
  BetGeniusDict,
  BetRadarDict
} from "./Counstructor/Dict/BR.js";

import { statisticPrematch, StatisticLive } from "./Components/Statistic";

import MarketGroup from "./Components/MarketGroup";
import {
  setLocalStorage,
  getLocalStorageData
} from "../../../../../Services/LocalStorage";

import { routsName } from "../../../../../Router/RouterList";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.flagTab = 0;

    this.isUpdate = false;
    this.socket = props.socket.socketState;
    // console.log(props.match.params.tab);
    this.initialState = {
      markets: props.markets,
      curEvent: props.match.params.event,
      isExtraLines: false,
      activeTab: props.match.params.tab,
      event: props.events.get(props.match.params.event),
      marketsHide: [],
      activeSport: transliterate(
        props.sports.get(props.events.get(props.match.params.event).sportId)
          .name,
        true
      ),
      activeSportBorder: transliterate(
        props.sports.get(props.events.get(props.match.params.event).sportId)
          .name,
        true
      ),
      allTabsPainting: new Map(
        props.dictPainting[props.dictionaryPaintingActive].groups
      ).get(props.events.get(props.match.params.event).sportId),

      matrixDict: new Map(
        props.dictPainting[props.dictionaryPaintingActive].table
      ),
      statusVideoPlay: 1,
      tabLines: null,

      marketsFav: JSON.parse(
        getLocalStorageData(
          `favBetTablie-${props.events.get(props.match.params.event).sportId}`
        )
      )
        ? JSON.parse(
            getLocalStorageData(
              `favBetTablie-${
                props.events.get(props.match.params.event).sportId
              }`
            )
          )
        : [],

      //бб
      closeWindow: true,
      MarketActive: null,
      activeTemplateModalBuilder: null,

      statusFiltrs: 0,
      activeSportEventsLive: this.getAllEventsLive(
        props.events.get(props.match.params.event).sportId,
        props,
        props.match.params.event
      )
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

  isTabChanged(tab1, tab2) {
    return tab1 !== tab2 ? true : false;
  }

  additionOfInformationToTheLine(line, markets, tmp) {
    const modificatinLine = { ...line };
    const market = markets.get(modificatinLine.marketId.toString());
    // modificatinLine.name = market.name;
    modificatinLine.outcomeTeam = market.outcomeName;

    if (tmp.get((market.id - 30000).toString()) !== undefined) {
      if (market.id === 46) debugger;
      modificatinLine.matrix = tmp.get((market.id - 30000).toString()).data;
    }
    return modificatinLine;
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
        return BetRadarDict;
      case 19:
        return SportSolutionDict;
      case 20:
        return BetGeniusDict;

      default:
        return BetRadarDict;
    }
  }

  changeViewBlock(keyMarket, tab) {
    const painting = this.state.marketsHide;

    if (!painting.includes(keyMarket)) {
      painting.push(keyMarket);
      const newState = {
        ...this.state,
        marketsHide: painting
      };
      this.isUpdate = true;
      this.setState(newState);
    } else {
      painting.splice(painting.indexOf(keyMarket), 1);

      const newState = {
        ...this.state,
        marketsHide: painting
      };
      this.isUpdate = true;
      this.setState(newState);
    }
  }

  changeViewMainBlock(tab) {
    const painting = this.state.tabLines;
    painting.get(tab).opend = !painting.get(tab).opend;

    const newState = {
      ...this.state,
      tabLines: painting
    };
    this.isUpdate = true;
    this.setState(newState);
  }

  filtrMarkets(markets, typeRadar) {
    const mainTab = {};
    for (let key in typeRadar) {
      for (let i = 0; i < typeRadar[key].ids.length; i++) {
        if (markets.get(typeRadar[key].ids[i].toString())) {
          mainTab[typeRadar[key].name] = {};
          mainTab[typeRadar[key].name].name = typeRadar[key].rusName;
        } else {
          console.log("2");
        }
      }
    }
    return mainTab;
  }

  getTabName = (line, market, event) =>
    renameMarketName(line, market, getMarketName(market, line, event));

  sortLineMarkets(
    tab = [{ markets: [], name: "osnovnie", rusName: "Основные", sortId: 1 }],
    event,
    state
  ) {
    const objSort = {
      mainTab: new Map(),
      SSL: new Map(),
      Combine: new Map()
    };
    const arrSSl = {
      Player: [
        "match_goalscorer",
        "last_match_goalscorer",
        "score_anytime_grouped",
        "extra_time_match_goalscorer",
        "player_to_score_and_assist_goal"
      ]
    };
    const combinArr = [];
    for (let i = 0; i < tab.length; i++) {
      event.lines.forEach(line => {
        let flg = tab[i].markets.find(market => {
          if (!combinArr.includes(market)) {
            combinArr.push(market);
          }
          if (
            line.marketId === +market + 30000 ||
            (line.marketId === +market && line.marketId !== 46)
          )
            return true;
          else return false;
        });

        if (flg) {
          if (combinArr.includes(line.marketId)) {
            const index = combinArr.indexOf(line.marketId);
            combinArr.splice(index, 1);
          }
          if (!objSort.mainTab.has(tab[i].name)) {
            objSort.mainTab.set(tab[i].name, {
              line: [],
              rusName: tab[i].rusName,
              names: tab[i].names ? tab[i].names : {},
              opend: true
            });
            objSort.mainTab.get(tab[i].name).line.push(line);
          } else {
            objSort.mainTab.get(tab[i].name).line.push(line);
          }
        } else {
          const market = getMarket(
            line,
            this.props.markets,
            this.props.marketsByNum
          );
          // if (!market) break;
          if (market.objectId.toString().indexOf("_out_num") !== "-1") {
            arrSSl.Player.forEach(elem => {
              if (elem.indexOf(market.objectId.toString()) !== "-1") {
                if (!objSort.mainTab.has("players")) {
                  objSort.mainTab.set("players", {
                    line: [],
                    rusName: "Игроки",
                    opend: true
                  });
                  objSort.mainTab.get("players").line.push(line);
                } else {
                  objSort.mainTab.get("players").line.push(line);
                }
              }
            });
          }
        }
      });
    }
    const compareSPV = (A, B) => {
      if (A.specifierValue[0] === B.specifierValue[0])
        return A.specifierValue[1] - B.specifierValue[1];
      if (A.specifierValue[0] !== B.specifierValue[0])
        return A.specifierValue[0] - B.specifierValue[0];
    };
    // const TabNoMarkets = [...event.lines.values()]
    //     .filter(line => {
    //         const market = line.marketId - 30000;
    //         if (!combinArr.includes(market.toString())) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     })
    //     .sort(compareSPV);

    if (objSort.SSL.has("players")) debugger;

    const newObjSortMarketsOrLines = this.orderArraySort(
      objSort.mainTab, // комбинир,SSL, остальные
      tab, // порядок табов и маркетов в табе
      state
    );

    // поиск для SSL

    return newObjSortMarketsOrLines;
  }

  orderArraySort(tableLine, tableOrderMarkets, state) {
    const sortLine = new Map();
    const compareSPV = (A, B) => {
      if (A.specifierValue[0] === B.specifierValue[0])
        return A.specifierValue[1] - B.specifierValue[1];
      if (A.specifierValue[0] !== B.specifierValue[0])
        return A.specifierValue[0] - B.specifierValue[0];
    };
    tableOrderMarkets.forEach(function(object) {
      if (tableLine.has(object.name)) {
        sortLine.set(object.name, {
          line: [],
          opend: true,
          rusName: object.rusName,
          names: object.names ? object.names : {}
        });
        const objectCurrState = tableLine.get(object.name);

        // проверка на вхождение маркетов избранных

        if (state.marketsFav.length > 0) {
          for (let i = 0; i < object.markets.length; i++) {
            if (state.marketsFav.includes(+object.markets[i] + 30000)) {
              const linePush = objectCurrState.line
                .filter(line => line.marketId === +object.markets[i] + 30000)
                .sort(compareSPV);
              if (linePush.length > 0) {
                sortLine.get(object.name).line = [
                  ...sortLine.get(object.name).line,
                  ...linePush
                ];
              }
            }
          }
        }
        for (let i = 0; i < object.markets.length; i++) {
          if (!state.marketsFav.includes(+object.markets[i] + 30000)) {
            const linePush = objectCurrState.line
              .filter(line => line.marketId === +object.markets[i] + 30000)
              .sort(compareSPV);
            if (linePush.length > 0) {
              sortLine.get(object.name).line = [
                ...sortLine.get(object.name).line,
                ...linePush
              ];
            }
          }
        }
      }
    });
    if (tableLine.has("combiner")) {
      sortLine.set("combiner", {
        line: tableLine.get("combiner").line,
        opend: true,
        rusName: this.props.lang.combinir
      });
    }
    return sortLine;
  }

  getSortTabLine(name, tab) {
    const compareSPV = (A, B) => {
      if (A.specifierValue[0] === B.specifierValue[0])
        return A.specifierValue[1] - B.specifierValue[1];
      if (A.specifierValue[0] !== B.specifierValue[0])
        return A.specifierValue[0] - B.specifierValue[0];
    };
    if (
      name === "sety" ||
      name === "geimy" ||
      name === "pervaya_polovina" ||
      name === "vtoraya_polovina" ||
      name === "periody" ||
      name === "poloviny" ||
      name === "chetverti" ||
      name === "inningi"
    )
      return tab.line.sort(compareSPV);
    else return tab.line;
  }

  TabLinesForm(event, markets, matrixDict, allTabsPainting, state) {
    const getName = tab => {
      console.log(tab);
      //   if (tab.names) {
      //     if (tab.names[this.props.lang.language]) {
      //       return tab.names[this.props.lang.language];
      //     } else if (tab.names.defaultValue) {
      //       return tab.names.defaultValue;
      //     }
      //   } переделал на другое
      return tab.rusName;
    };

    const newState = new Map();
    const objectAllTab = this.sortLineMarkets(allTabsPainting, event, state);
    newState.set("all", {
      rusName: this.props.lang.all,
      lines: [],
      opend: true
    });
    const linesinMarket = new Map();
    objectAllTab.forEach((tab, key, i) => {
      tab.line = this.getSortTabLine(key, tab);
      console.log(this.props.lang.language);
      tab.rusName =
        this.props.lang.language == "en"
          ? tab.rusName.split("@")[0]
          : tab.rusName.split("@")[1];

      newState.set(key, {});
      newState.get(key).rusName = getName(tab);

      newState.get(key).opend = true;
      newState.get(key).name = key;
      tab.line.forEach(line => {
        if (line.status === 1 || line.status === "-1") {
          const lineFilling = this.additionOfInformationToTheLine(
            line,
            markets,
            matrixDict
          );

          if (
            line.marketId === 31509 ||
            line.marketId === 12509 ||
            line.marketId === "full_time_correct_score_reduced" ||
            line.marketId === 31669 ||
            line.marketId === 31774 ||
            line.marketId === 31775 ||
            line.marketId === 31776 ||
            line.marketId === 31670 ||
            line.marketId === 31671 ||
            line.marketId === 31672 ||
            line.marketId === 31774 ||
            line.marketId === 31775 ||
            line.marketId === 31776
          ) {
            lineFilling.matrix = this.createMatrixCorrectScore(line);
          }
          if (
            line.marketId === 38 ||
            line.marketId === 39 ||
            line.marketId === 40
          ) {
            lineFilling.matrix = this.createMatrixGoalScorer(line);
          }

          if (!lineFilling.matrix) {
            // комбинированные
            let colum = 2;
            const width =
              window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
            if (width > 600) {
              colum = 3;
            }
            lineFilling.matrix = this.createMatrixCombine(lineFilling, colum); //[lineFilling.outcomeId]; //this.creatematrixSSL(lineFilling);
          }

          const market = getMarket(
            lineFilling,
            markets,
            this.props.marketsByNum
          );
          let tabMarketName = this.getTabName(lineFilling, market, event);

          if (this.props.settingApp.isTestFeatures)
            tabMarketName = tabMarketName;

          if (linesinMarket.has(tabMarketName)) {
            const flag = [...linesinMarket.get(tabMarketName).values()].find(
              line => line.compoundKey === lineFilling.compoundKey
            );
            if (!flag) {
              linesinMarket.get(tabMarketName).push(lineFilling);
            }
          } else {
            linesinMarket.set(tabMarketName, []);
            linesinMarket.get(tabMarketName).push(lineFilling);
          }
        }
      });
      newState.get(key).lines = new Map(linesinMarket);
      if (newState.get(key).lines.size <= 0) newState.delete(key);
      linesinMarket.clear();
    });
    if (event.sportId === 1023 && this.checkTotalPrivate(event))
      newState.set("betbuilder", {
        rusName: this.props.lang.counstructor,
        lines: []
      });
    return newState;
  }

  creatematrixSSL(line) {
    // home gues
    const matrix = [];
    let j = 0;
    line.outcomeId.forEach((elem, key) => {
      if (matrix[j] && matrix[j].length === 2) j++;
      if (!matrix[j]) matrix.push([]);
      if (line.outcomeActive[key] === 1) matrix[j].push(elem);
    });
    return matrix;
  }
  createMatrixCombine(line, colum) {
    const matrix = [];
    let j = 0;
    line.outcomeId.forEach((elem, key) => {
      if (matrix[j] && matrix[j].length === colum) j++;
      if (!matrix[j]) matrix.push([]);
      matrix[j].push(elem);
    });
    return matrix;
  }
  createMatrixGoalScorer(line) {
    const matrix = [];
    let j = 0;
    // debugger;
    line.outcomeId.forEach((elem, key) => {
      if (key % 2 === 0 && key !== 0) j++;
      if (!matrix[j]) matrix.push([]);
      if (line.outcomeName[key] !== "no goal") matrix[j].push(elem);
    });

    return matrix;
  }

  checkTotalPrivate(event) {
    const linePrivatetotal = [...event.lines.values()].find(
      line =>
        BetRadarDict.totalGoals.dict.has(line.marketId) &&
        BetRadarDict.totalGoals.dict.get(line.marketId)[1][0] !== "both" &&
        BetRadarDict.totalGoals.dict.get(line.marketId)[0][0] !== "exact"
    );
    if (linePrivatetotal) return true;

    return false;
  }

  createMatrixCorrectScore(line) {
    const infoMatrix = new Map();

    infoMatrix.set("home", []);
    infoMatrix.set("draw", []);
    infoMatrix.set("away", []);
    infoMatrix.set("txt", []);

    line.outcomeId.forEach((elem, key) => {
      if (elem.toString()[0] === 1) {
        infoMatrix.get("home").push(elem);
      } else if (elem.toString()[0] === 2) {
        infoMatrix.get("away").push(elem);
      } else if (elem.toString()[0] === 3) {
        infoMatrix.get("draw").push(elem);
      } else {
        infoMatrix.get("txt").push(elem);
      }
    });
    let homeArr = infoMatrix.get("home");
    homeArr = homeArr.sort(sortArray);
    let awatArr = infoMatrix.get("away");
    awatArr = awatArr.sort(sortArray);
    infoMatrix.set("home", homeArr);
    infoMatrix.set("away", awatArr);

    infoMatrix.get("txt").forEach(element => {
      infoMatrix.get("draw").push(element);
    });
    const homeLendth = infoMatrix.get("home").length;
    const drawLength = infoMatrix.get("draw").length;
    const awayLendth = infoMatrix.get("away").length;
    const arr = [homeLendth, drawLength, awayLendth];
    const length = Math.max.apply(Math, arr);
    // debugger;
    // const filtrMatrix = this.sortMatrix(infoMatrix.get("home"));

    const matrix = [];
    let k = 0;

    if (
      this.props.events.get(this.props.match.params.event).sportId === 1034 ||
      this.props.events.get(this.props.match.params.event).sportId === 1035 ||
      this.props.events.get(this.props.match.params.event).sportId === 1033 ||
      this.props.events.get(this.props.match.params.event).sportId === 1014 ||
      this.props.events.get(this.props.match.params.event).sportId === 1017 ||
      this.props.events.get(this.props.match.params.event).sportId === 1019
    )
      for (let i = 0; i < length; i++) {
        // debugger;
        if (!matrix[k]) matrix.push([]);
        matrix[k].push(infoMatrix.get("home")[i]);
        // matrix[k].push(
        //     !infoMatrix.get("draw")[i] ? "" : infoMatrix.get("draw")[i]
        // );
        matrix[k].push(infoMatrix.get("away")[i]);
        k++;
      }
    else
      for (let i = 0; i < length; i++) {
        // debugger;
        if (!matrix[k]) matrix.push([]);
        matrix[k].push(infoMatrix.get("home")[i]);
        matrix[k].push(
          !infoMatrix.get("draw")[i] ? "" : infoMatrix.get("draw")[i]
        );
        matrix[k].push(infoMatrix.get("away")[i]);
        k++;
      }

    return matrix;
  }

  sortMatrix(matrix) {
    const newMatrix = [...matrix];
    for (let i = 0; i < newMatrix.length; i++) {
      newMatrix[i].sort();
    }
    return newMatrix;
  }

  getCurState(state = this.initialState, props, isReset) {
    const events = isReset ? props.events : props.newEvents;

    if (this.isTabChanged(state.activeTab, props.match.params.tab)) {
      const tabLines = this.TabLinesForm(
        events.get(state.curEvent),
        props.markets,
        state.matrixDict,
        state.allTabsPainting,
        state
      );

      const mainMarketsBB = this.filtrMarkets(
        props.markets,
        state.typeRadarDict
      );

      this.isUpdate = true;
      const dictionaryPaintingActive = props.dictionaryPaintingActive;

      const newState = {
        ...state,
        isExtraLines: true,
        activeTab: props.match.params.tab,
        tabLines,
        mainMarketsBB,
        event: props.events.get(state.curEvent),
        dictionaryPaintingActive
      };
      return newState;
    }

    if (props.removeCurEvent && props.removeCurEvent.id === state.event.id) {
      // debugger;
      //Временынй хак сделаю состояние чтоыб менят ьег овызывать рендер вешать и запрещать каке-либо функции и редирект
      // хранить в стейет live  или  prematch
      if (document.getElementById("opacity"))
        document.getElementById("opacity").classList.add("opacity20");
      this.timerRemoveEvent();
      console.log("___________TIMER ON");
    }

    const eventBg = [...events.values()].find(
      ev => ev.gbId === state.event.gbId
    );
    if (state.event.gbId && eventBg) {
      clearTimeout(this.timer);
      if (events.has(state.event.id)) {
        const tabLines = this.TabLinesForm(
          events.get(state.curEvent),
          props.markets,
          state.matrixDict,
          state.allTabsPainting,
          state
        );

        const mainMarketsBB = this.filtrMarkets(
          props.markets,
          state.typeRadarDict
        );

        const dictionaryPaintingActive = props.dictionaryPaintingActive;
        const newState = {
          ...state,
          isExtraLines: true,
          activeTab: props.match.params.tab,
          tabLines,
          mainMarketsBB,
          event: props.events.get(state.curEvent),
          dictionaryPaintingActive
        };
        this.isUpdate = true;
        return newState;
      } else {
        const url =
          "/" +
          routsName.dict.rospis +
          "/" +
          this.props.match.params.sport +
          "/" +
          this.props.match.params.category +
          "/" +
          this.props.match.params.tournament +
          "/" +
          eventBg.id +
          "/" +
          this.props.match.params.tab;
        this.props.navigate(url);
      }
    } else {
      // debugger;
      // this.timerRemoveEvent();
    }
    if (state.dictionaryPaintingActive !== props.dictionaryPaintingActive) {
      const newState = {
        ...state,
        dictionaryPaintingActive: props.dictionaryPaintingActive
      };
      this.isUpdate = true;
      return newState;
    }
    return state;
  }

  timerRemoveEvent() {
    this.timer = setTimeout(() => {
      this.redirectToPrematch();
    }, 5000);
  }

  redirectToPrematch() {
    console.log("redirect");

    this.props.navigate(routsName.getRoutsUrl(routsName.dict.prematch));
  }

  opendAllMarkets(allTabsPainting) {
    allTabsPainting.forEach(item => {
      item.opend = true;
      item.marketOpen = item.indices;
    });

    return allTabsPainting;
  }

  shouldComponentUpdate(nextProps) {
    if (this.isUpdate) return true;

    if (
      this.props.socket.socketState === "open" &&
      this.props.socket.socketState !== nextProps.socket.socketState
    ) {
      const testState = { ...this.initialState };
      this.isUpdate = true;
      this.setState(testState);
    }
    const newState = this.getCurState(this.state, nextProps, false);
    if (newState !== this.state) {
      this.setState(newState);
    }

    // if (nextProps.lang !== this.props.lang) {
    //     debugger;
    //     this.props.getExtraLine(this.state.curEvent);
    // }

    return false;
  }

  changeTab(tab) {
    const url =
      "/" +
      routsName.dict.rospis +
      "/" +
      this.props.match.params.sport +
      "/" +
      this.props.match.params.category +
      "/" +
      this.props.match.params.tournament +
      "/" +
      this.props.match.params.event +
      "/" +
      tab;
    this.props.navigate(url);
  }

  //statistic

  getAllEventsLive(sportId, props, eventActive) {
    const eventSport = [];
    props.events.forEach(event => {
      if (
        event.status === 1 &&
        event.sportId === sportId &&
        eventActive !== event.id
      )
        eventSport.push(event);
    });

    return eventSport;
  }

  changeStatusFiltrs() {
    const newState = {
      ...this.state,
      statusFiltrs: !this.state.statusFiltrs
    };
    this.isUpdate = true;
    this.setState(newState);
  }

  editSportFiltrs(sport) {
    const activeSportEventsLive = this.getAllEventsLive(
      sport.id,
      this.props,
      this.state.event.id
    );

    const newState = {
      ...this.state,
      activeSportEventsLive,
      activeSport: transliterate(sport.name, true)
    };
    this.isUpdate = true;
    this.setState(newState);
  }

  changePainting(event) {
    const sport = getEntityById(this.props.sports, event.sportId);
    if (!sport) return;
    const category = getEntityById(this.props.categories, event.categoryId);
    if (!category) return;
    const tournament = getEntityById(
      this.props.tournaments,
      event.tournamentId
    );
    if (!tournament) return;
    let url =
      "/" +
      routsName.dict.rospis +
      "/" +
      transliterate(sport.name, true) +
      "/" +
      transliterate(category.name, true) +
      "/" +
      transliterate(tournament.name, true) +
      "/" +
      event.id +
      "/" +
      routsName.dict.all;
    this.props.navigate(url);
  }

  changeStatusFiltrs() {
    const newState = {
      ...this.state,
      statusFiltrs: !this.state.statusFiltrs
    };
    this.isUpdate = true;
    this.setState(newState);
  }

  getErrorText(event) {
    return <div className="cap" />; //Матч прерван
  }

  render() {
    const { toggleOutcome } = this.props;
    // if (this.flagTab == 0) debugger;
    // this.flagTab = this.flagTab + 1;

    return (
      <React.Fragment>
        {this.state.isExtraLines || this.state.event.provider === 4 ? (
          <React.Fragment>
            {this.state.event.status === 1 ? (
              <StatisticLive
                activeSpropt={this.state.activeSport}
                event={this.state.event}
                status={this.state.statusFiltrs}
                changeStatus={this.changeStatusFiltrs.bind(this)}
                routerProps={{ ...this.props }}
                activeSportEventsLive={this.state.activeSportEventsLive}
                activeSportBorder={this.state.activeSportBorder}
                editSportFiltrs={this.editSportFiltrs.bind(this)}
                changePainting={this.changePainting.bind(this)}
              />
            ) : (
              statisticPrematch(this.state.event)
            )}

            <div className="painting" style={{ order: 3 }} id="opacity">
              {this.state.event.lines.size === 0 ||
              this.state.tabLines.size === 1 ? (
                this.getErrorText(this.state.event)
              ) : (
                <TopBar
                  tabLines={this.state.tabLines}
                  activeTab={this.state.activeTab}
                  changeTab={this.changeTab.bind(this)}
                />
              )}

              {this.state.activeTab === routsName.dict.betbuilder ? (
                <Counstructor {...this.state} />
              ) : (
                <MarketGroup
                  {...this.state}
                  coupon={this.props.coupon}
                  marketsByNum={this.props.marketsByNum}
                  changeViewBlock={this.changeViewBlock.bind(this)}
                  favMarkets={this.MarketGroup.bind(this)}
                  changeTab={this.changeTab.bind(this)}
                  changeViewMainBlock={this.changeViewMainBlock.bind(this)}
                  dispatchToggle={toggleOutcome}
                  marketsFavArray={this.state.marketsFav}
                />
              )}
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }

  MarketGroup(item) {
    let newState = { ...this.state };
    let marketsFav = [...this.state.marketsFav];

    if (marketsFav.includes(item))
      marketsFav.splice(marketsFav.indexOf(item), 1);
    else marketsFav = [...marketsFav, item];
    newState = { ...newState, marketsFav };
    const tabLines = this.TabLinesForm(
      this.state.event,
      this.props.markets,
      this.state.matrixDict,
      this.state.allTabsPainting,
      newState
    );
    this.isUpdate = true;
    newState.tabLines = tabLines;
    setLocalStorage(
      `favBetTablie-${this.state.event.sportId}`,
      JSON.stringify(marketsFav)
    );
    this.setState(newState);
  }
  componentDidMount() {
    this.isUpdate = false;
    if (!this.props.extraLine.includes(this.props.match.params.event))
      this.props.getExtraLine(this.state.curEvent);
  }
}

const mapStateToProps = state => {
  return {
    settingApp: state.mainSetting,
    events: state.server.eventsAndLines.events,
    eventsByGB: state.server.eventsAndLines.eventsByGB,
    newEvents: state.server.eventsAndLines.newEvents,
    markets: state.server.entities.markets,
    dictPainting: state.paintingDictionary,
    dictionaryPaintingActive: state.dictionaryPaintingActive,
    marketsByNum: state.server.entities.marketsByNum,
    coupon: state.coupon,
    extraLine: state.server.reqExtraLines,
    removeCurEvent: state.server.eventsAndLines.deletedEvent,
    lang: state.user.language_user.dict,
    sports: state.server.entities.sports,
    categories: state.server.entities.categories,
    tournaments: state.server.entities.tournaments,
    socket: state.socket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleOutcome: (line, outcomeId) => {
      dispatch(toggleOutcome(line, outcomeId));
    },
    getExtraLine: id => {
      dispatch(getExtraLine(id));
    },
    navigate: url => dispatch(route("push", url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
