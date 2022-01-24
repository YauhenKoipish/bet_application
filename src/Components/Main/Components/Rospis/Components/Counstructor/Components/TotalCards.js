import React from "react";
import { connect } from "react-redux";

import {
    isLineBlocked,
    isOutcomeBlocked
} from "../../../../../../../Services/Shared";
import { getBetBuilderOdd } from "../../../../../../../Server/";

class TotalCards extends React.Component {
    constructor(props) {
        super(props);
        this.props.goBack.bind(this);
        this.initialState = {
            keyChange: props.keyChange,
            addClassActive: {
                activeTab: props.activeTab,
                activeOverUnderExatct: 0,
                activeValue: 0,
                activeTeam: 0,
                activeMarkets: 0
            },
            event: props.event,
            dict: props.dictionary.totalCards,
            activeTab: this.returnNameTab(props.activeTab),
            editMarket: props.editMarket,
            markets: props.markets,
            list: "",
            dictOutcome: new Map([
                [
                    30308,
                    {
                        under: 5,
                        over: 4
                    }
                ]
            ]),
            tabInfo: {
                outcomeId: 1
            },
            builderError: props.builderError
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

    tabList(
        dictObj,
        event = this.initialState.event,
        state = this.initialState
    ) {
        const tabInfo = {
            markets: new Map(),
            activeMarket: "",
            lineActiveMarket: null,
            activeTeam: event.homeName
        };

        dictObj.ids.forEach(elem => {
            const line = [...event.lines.values()].filter(
                line =>
                    line.marketId === elem &&
                    !isLineBlocked(line, this.props.event) &&
                    isOutcomeBlocked(line, 4) &&
                    +line.specifierValue[0] % 1 === 0.5
            );
            line.sort(function(a, b) {
                return a.specifierValue[0] - b.specifierValue[0];
            });
            // debugger;
            if (line) {
                if (tabInfo.activeMarket.length === 0) {
                    // debugger;
                    if (line.length == 0) {
                        this.props.goBack();
                        return "";
                    } else {
                        const market = this.props.markets.get(
                            line[0].marketId.toString()
                        );
                        tabInfo.activeMarket = dictObj.rusName;
                        state.addClassActive.activeOverUnderExatct = this.props.reName(
                            market.outcomeName[0].split(" ")[0]
                        );
                        state.addClassActive.activeValue =
                            line[0].specifierValue[0];
                        state.addClassActive.activeTeam = dictObj.dict.get(
                            elem
                        )[1][0];
                        state.addClassActive.activeMarkets = dictObj.dict.get(
                            elem
                        )[2][0];
                        tabInfo.lineActiveMarket = line[0];
                        // debugger;
                        tabInfo.outcomeId = this.getOutcome(
                            state,
                            tabInfo.lineActiveMarket.marketId,
                            state.addClassActive.activeOverUnderExatct
                        );
                    }
                }
            }
            tabInfo.markets.set(
                elem,
                this.props.reName(dictObj.dict.get(elem)[2][0])
            );
        });
        tabInfo.tab = [
            {
                send: this.props.reName(
                    state.addClassActive.activeOverUnderExatct
                )
            },
            { send: state.addClassActive.activeValue },
            { send: this.props.reName(state.addClassActive.activeTeam) },
            { send: this.props.reName(state.addClassActive.activeMarkets) }
        ];
        return tabInfo;
    }

    filtrsSFV(state, stateValue, marketId, event) {
        const newMapValue = new Map();
        // debugger;
        //связать поиск линий от маркета изменяя маркет
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
                (state.addClassActive.activeOverUnderExatct !== "exact"
                    ? line.specifierValue[0] % 1 === stateValue
                    : line.outcomeTeam[0] % 1 === stateValue)
        );
        // debugger;
        line.sort(function(a, b) {
            return a.specifierValue[0] - b.specifierValue[0];
        });
        // переделать по проходу массива
        if (state.addClassActive.activeOverUnderExatct !== "exact") {
            for (let i = 0; i < line.length; i++) {
                newMapValue.set(line[i].compoundKey, line[i].specifierValue[0]);
            }
        } else {
            let arr = [];
            for (let i = 0; i < line[0].outcomeTeam.length; i++) {
                arr.push(line[0].outcomeTeam[i]);
            }
            newMapValue.set(line[0].compoundKey, arr);
        }
        return newMapValue;
    }

    createOutcomeList(event, state) {
        let outcomeList = new Map();
        if (state.addClassActive.activeTab === 0) {
            outcomeList.set("over", this.props.lang.over);
            // outcomeList.set("exact", "Ровно");
            outcomeList.set("under", this.props.lang.under);
        } else if (state.addClassActive.activeTab === 1) {
            const stateValue =
                state.addClassActive.activeOverUnderExatct !== "exact"
                    ? 0.5
                    : 0;
            let marketId = state.tabInfo.lineActiveMarket.marketId;
            outcomeList = this.filtrsSFV(state, stateValue, marketId, event);
        } else if (state.addClassActive.activeTab === 2) {
            state.dict.dict.forEach((elem, key) => {
                if (elem[2][0] === state.addClassActive.activeMarkets) {
                    if (
                        elem[0][0] ===
                            state.addClassActive.activeOverUnderExatct ||
                        elem[0][1] ===
                            state.addClassActive.activeOverUnderExatct
                    ) {
                        // проверка самого маркета

                        const line = [...event.lines.values()].find(
                            line =>
                                line.marketId === +key &&
                                !isLineBlocked(line, event)
                        );
                        if (line)
                            outcomeList.set(
                                elem[1][0],
                                this.props.reName(elem[1][0])
                            );
                    }
                }
            });
        } else if (state.addClassActive.activeTab === 3) {
            state.dict.dict.forEach((elem, key) => {
                if (elem[1][0] === state.addClassActive.activeTeam) {
                    if (
                        elem[0][0] ===
                            state.addClassActive.activeOverUnderExatct ||
                        elem[0][1] ===
                            state.addClassActive.activeOverUnderExatct
                    ) {
                        // debugger;
                        outcomeList.set(
                            elem[2][0],
                            this.props.reName(elem[2][0])
                        );
                    }
                }
            });
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
                    props.dictionary.totalCards,
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
                            line.marketId ==
                                state.tabInfo.lineActiveMarket.marketId
                    )
                    // JSON.stringify(linesMarkets) !==
                    // JSON.stringify(state.linesMarkets)
                ) {
                    const lineActive = [
                        ...props.newEvents
                            .get(this.state.event.id)
                            .lines.values()
                    ].filter(
                        line =>
                            state.dict.dict.has(line.marketId) &&
                            !isLineBlocked(
                                line,
                                props.newEvents.get(this.state.event.id)
                            )
                    );

                    console.log(
                        lineActive,
                        "__________________UPDATE КУДА ИДЕМ"
                    );

                    if (
                        lineActive &&
                        lineActive.find(
                            line =>
                                line.marketId ==
                                state.tabInfo.lineActiveMarket.marketId
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
                        const newState = { ...state };
                        newState.addClassActive = {
                            activeTab: state.addClassActive.activeTab,
                            // activeOverUnderExatct: 0,
                            activeOverUnderExatct:
                                state.addClassActive.activeOverUnderExatct,
                            activeValue: state.addClassActive.activeValue,
                            activeTeam: state.addClassActive.activeTeam,
                            activeMarkets: 0
                        };

                        newState.linesMarkets = [
                            ...props.newEvents
                                .get(this.state.event.id)
                                .lines.values()
                        ].filter(
                            line =>
                                state.dict.dict.has(line.marketId) &&
                                !isLineBlocked(
                                    line,
                                    props.newEvents.get(this.state.event.id)
                                )
                        );
                        newState.tabInfo = this.tabList(
                            this.props.dictionary.totalCards,
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
                        this.props.dictionary.totalCards,
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
            line =>
                dict.has(line.marketId) &&
                !isLineBlocked(line, this.props.event)
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
                        (this.state.addClassActive.activeTab === key
                            ? "active"
                            : "")
                    }
                    onClick={() => this.changeTab(key)}
                    key={key}
                >
                    {this.props.reName(elem)}
                </div>
            );
        });
    }

    getOutcome(state, market, name) {
        return state.dictOutcome.get(market)[name];
    }

    changeInformationSend(key, elem) {
        const addClassActive = { ...this.state.addClassActive };
        let tabInfo = { ...this.state.tabInfo };
        let outcomeId = "";

        if (
            addClassActive.activeTab === 0 &&
            addClassActive.activeOverUnderExatct !== key
        ) {
            addClassActive.activeOverUnderExatct = key;

            let marketId = null;
            let newMarketId = null;
            this.state.dict.dict.forEach((elem, key) => {
                if (elem[2][0] === addClassActive.activeMarkets) {
                    if (elem[1][0] === addClassActive.activeTeam) {
                        newMarketId = key;
                        if (
                            elem[0][0] ===
                                addClassActive.activeOverUnderExatct ||
                            elem[0][1] === addClassActive.activeOverUnderExatct
                        )
                            marketId = key;
                    }
                }
            });
            if (!marketId) {
                this.state.dict.dict.forEach((elem, marketIdKey) => {
                    if (elem[0][0] === addClassActive.activeOverUnderExatct) {
                        if (elem[1][0] === addClassActive.activeTeam) {
                            if (!marketId) {
                                marketId = marketIdKey;
                                addClassActive.activeMarkets = elem[2][0];
                            }
                        }
                    }
                });
            }
            let line = [...this.props.event.lines.values()].filter(
                line =>
                    line.marketId === +marketId &&
                    !isLineBlocked(line, this.props.event) &&
                    line.specifierValue[0] === addClassActive.activeValue
            );
            if (!line) {
                line = [...this.props.event.lines.values()].filter(
                    line =>
                        line.marketId === +marketId &&
                        !isLineBlocked(line, this.props.event)
                );
                line.sort(function(a, b) {
                    return a.specifierValue[0] - b.specifierValue[0];
                });

                tabInfo.lineActiveMarket = line[0];
                addClassActive.activeValue =
                    addClassActive.activeOverUnderExatct !== "exact"
                        ? line[0].specifierValue[0]
                        : line[0].outcomeTeam[0];

                tabInfo.lineActiveMarket = line[0];
            }

            tabInfo.outcomeId = this.getOutcome(
                this.state,
                tabInfo.lineActiveMarket.marketId,
                addClassActive.activeOverUnderExatct
            );
        } else if (
            addClassActive.activeTab === 1 &&
            addClassActive.activeValue !== key
        ) {
            // debugger;
            const line = [...this.props.event.lines.values()].find(
                line =>
                    line.compoundKey === key &&
                    !isLineBlocked(line, this.props.event)
            );
            addClassActive.activeValue =
                addClassActive.activeOverUnderExatct !== "exact"
                    ? line.specifierValue[0]
                    : elem; // продумать передачу второго параметра
            tabInfo.lineActiveMarket = line;
            tabInfo.outcomeId = this.getOutcome(
                this.state,
                tabInfo.lineActiveMarket.marketId,
                addClassActive.activeOverUnderExatct
            );
        } else if (
            addClassActive.activeTab === 2 &&
            addClassActive.activeTeam !== key
        ) {
            addClassActive.activeTeam = key;
            let marketId = null;
            this.state.dict.dict.forEach((elem, key) => {
                if (elem[2][0] === addClassActive.activeMarkets) {
                    if (elem[1][0] === addClassActive.activeTeam) {
                        marketId = key;
                    }
                }
            });

            if (!marketId) debugger;
            const line = [...this.props.event.lines.values()].filter(
                line =>
                    line.marketId === marketId &&
                    !isLineBlocked(line, this.props.event)
            );
            line.sort(function(a, b) {
                return a.specifierValue[0] - b.specifierValue[0];
            });

            tabInfo.lineActiveMarket = line[0];

            addClassActive.activeValue =
                addClassActive.activeOverUnderExatct != "exact"
                    ? line[0].specifierValue[0]
                    : line[0].outcomeTeam[0];
            tabInfo.outcomeId = this.getOutcome(
                this.state,
                tabInfo.lineActiveMarket.marketId,
                addClassActive.activeOverUnderExatct
            );
        } else if (addClassActive.activeTab === 3) {
            addClassActive.activeMarkets = key;

            // debugger;
            let market = null;
            this.state.dict.dict.forEach((elem, keyMarket) => {
                if (elem[2][0] === key) {
                    if (elem[1][0] === addClassActive.activeTeam) {
                        if (
                            elem[0][0] ===
                                addClassActive.activeOverUnderExatct ||
                            elem[0][1] === addClassActive.activeOverUnderExatct
                        ) {
                            market = keyMarket;
                        }
                    }
                }
            });
            if (!market) debugger;

            let line = [...this.props.event.lines.values()].find(
                line =>
                    (line.marketId === +market &&
                        !isLineBlocked(line, this.props.event) &&
                        line.specifierValue[0] ===
                            addClassActive.activeValue) ||
                    line.outcomeTeam.includes(addClassActive.activeValue)
            );

            if (!line) {
                line = [...this.props.event.lines.values()].filter(
                    line =>
                        line.marketId === +market &&
                        !isLineBlocked(line, this.props.event) &&
                        (addClassActive.activeOverUnderExatct !== "exact"
                            ? line.specifierValue[0] % 1 == 0.5
                            : line.outcomeTeam[0] % 1 === 0)
                );
                line.sort(function(a, b) {
                    return a.specifierValue[0] - b.specifierValue[0];
                });
                line = line[0];
                addClassActive.activeValue =
                    addClassActive.activeOverUnderExatct !== "exact"
                        ? line.specifierValue[0]
                        : line.outcomeTeam[0];
            } else {
                if (addClassActive.activeOverUnderExatct === "exact") {
                    if (
                        !line.outcomeTeam.includes(addClassActive.activeValue)
                    ) {
                        addClassActive.activeValue = line.outcomeTeam[0];
                    }
                } else {
                    if (
                        !line.specifierValue.includes(
                            addClassActive.activeValue
                        )
                    ) {
                        addClassActive.activeValue = line.specifierValue[0];
                    }
                }
            }
            tabInfo.lineActiveMarket = line;
        }
        const newState = {
            ...this.state,
            addClassActive,
            tabInfo
        };
        tabInfo.tab = [
            { send: this.props.reName(addClassActive.activeOverUnderExatct) },
            { send: addClassActive.activeValue },
            { send: this.props.reName(addClassActive.activeTeam) },
            { send: this.props.reName(addClassActive.activeMarkets) }
        ];

        this.isUpdate = true;
        this.setState(newState);
    }

    getActiveClass(key) {
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
                        {this.state.addClassActive.activeOverUnderExatct !==
                            "exact" || this.state.addClassActive.activeTab !== 1
                            ? [...this.state.list.keys()].map((key, i) => (
                                  <li
                                      className={
                                          "SaveInformationBetsBuilder" +
                                          this.getActiveClass(key)
                                      }
                                      key={i}
                                      onClick={() =>
                                          this.changeInformationSend(key)
                                      }
                                  >
                                      {this.state.list.get(key)}
                                  </li>
                              ))
                            : [...this.state.list.keys()].map((key, i) => {
                                  return this.state.list
                                      .get(key)
                                      .map((elem, k) => (
                                          <li
                                              className={
                                                  "SaveInformationBetsBuilder" +
                                                  this.getActiveClass(key)
                                              }
                                              key={k}
                                              onClick={() =>
                                                  this.changeInformationSend(
                                                      key,
                                                      elem.replace("+", "")
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
        console.log(this.state.tabInfo.lineActiveMarket.id);
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
            this.state.addClassActive.activeTab ===
                prevState.addClassActive.activeTab
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
        builderError: state.server.builderInfo.builderError,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TotalCards);
