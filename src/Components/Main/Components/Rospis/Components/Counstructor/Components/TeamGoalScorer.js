import React from "react";
import { connect } from "react-redux";

import { isLineBlocked, getMarket } from "../../../../../../../Services/Shared";
import { getBetBuilderOdd } from "../../../../../../../Server/";

const arrSSl = [
    "last_match_goalscorer",

    "score_anytime_grouped",
    "match_goalscorer"
];

class TeamGoalScorer extends React.Component {
    constructor(props) {
        super(props);
        this.props.goBack.bind(this);
        this.initialState = {
            addClassActive: {
                activeTab: props.activeTab,
                activeTime: props.sendState
                    ? props.sendState.addClassActive.activeTime
                    : 0,
                activeMatch: props.sendState
                    ? props.sendState.addClassActive.activeMatch
                    : 0,
                activeMarket: props.sendState
                    ? props.sendState.addClassActive.activeMarket
                    : 0
            },
            dict: props.dictionary.teamGoalScorer,
            activeTab: this.returnNameTab(props.activeTab),
            editMarket: props.editMarket,
            keyChange: props.keyChange,
            markets: props.markets,
            list: "",
            event: props.event,
            dictOutcome: {
                "{$competitor1}1": 39,
                "{$competitor1}2": 40,
                "{$competitor1}3+": 101,
                "{$competitor2}1": 41,
                "{$competitor2}2": 42,
                "{$competitor2}3+": 102
            },
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

    sortTeam(line) {
        const sortTeam = {
            home: [],
            away: []
        };

        const arr_players = [];

        line.outcomeActive.forEach((elem, index) => {
            if (elem == 1)
                if (line.outcomeTeam[index] == 1) {
                    sortTeam.home.push({
                        index: line.outcomeName[index],
                        coef: line.outcomeOdds[index]
                    });
                } else if (line.outcomeTeam[index] == 2) {
                    sortTeam.away.push({
                        index: line.outcomeName[index],
                        coef: line.outcomeOdds[index]
                    });
                }
        });

        sortTeam.home = sortTeam.home.sort(function(a, b) {
            return a.coef - b.coef;
        });
        sortTeam.away = sortTeam.away.sort(function(a, b) {
            return a.coef - b.coef;
        });
        // sortodds.forEach((coef, key) => {
        //     const index = line.outcomeOdds.indexOf(coef);

        //     // debugger;
        //     if (
        //         line.outcomeTeam[index] === 1 &&
        //         line.outcomeActive[index] === 1
        //     ) {
        //         sortTeam.home.push(line.outcomeName[index]);
        //     } else if (
        //         line.outcomeTeam[index] === 2 &&
        //         line.outcomeActive[index] === 1
        //     ) {
        //         sortTeam.away.push(line.outcomeName[index]);
        //     }
        // });

        if (sortTeam.home.length == 0) debugger;
        return sortTeam;
    }

    tabList(
        dictObj,
        event = this.initialState.event,
        state = this.initialState
    ) {
        // debugger;
        const tabInfo = {
            markets: new Map(),
            activeMarket: "",
            lineActiveMarket: null,
            activeTeam: event.homeName,
            outcomeId: null
        };
        dictObj.ids.forEach(elem => {
            let line = [...event.lines.values()].find(line => {
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
            if (!line) line = this.props.findLine(elem, event);

            if (line) {
                if (tabInfo.activeMarket.length === 0) {
                    // debugger;
                    tabInfo.lineSortTeam = this.sortTeam(line);
                    tabInfo.activeMarket = dictObj.rusName;
                    state.addClassActive.activeTime = "home";
                    const market = getMarket(
                        line,
                        this.props.markets,
                        this.props.marketsByNum
                    );

                    if (
                        state.dict.dict.has(
                            market.objectId.toString().split("_out_num")[0]
                        )
                    ) {
                        state.addClassActive.activeMarket = state.dict.dict.get(
                            market.objectId.toString().split("_out_num")[0]
                        )[0][0];
                    } else {
                        state.addClassActive.activeMarket = state.dict.dict.get(
                            market.objectId
                        )[0][0];
                    }

                    state.addClassActive.activeMatch = this.props.lang.builder.select;
                    // tabInfo.lineSortTeam.home[0];
                    // state.builderError.errorMsg = "Выберете игрока";
                    tabInfo.lineActiveMarket = line;
                    tabInfo.markets.set(
                        elem,
                        this.props.reName(dictObj.dict.get(elem)[0][0])
                    );
                    tabInfo.outcomeId =
                        tabInfo.lineActiveMarket.outcomeId[
                            tabInfo.lineActiveMarket.outcomeName.indexOf(
                                state.addClassActive.activeMatch
                            )
                        ];
                }
            }
        });
        if (tabInfo.activeMarket.length === 0) {
            this.props.goBack();
            return "";
        }

        tabInfo.tab = [
            { send: this.props.reName(state.addClassActive.activeTime) },
            { send: this.props.reName(state.addClassActive.activeMatch) },
            { send: this.props.reName(state.addClassActive.activeMarket) },
            { noSend: this.props.lang.mainTime }
        ];

        return tabInfo;
    }

    createOutcomeList(event, state) {
        const outcomeList = new Map();
        if (state.addClassActive.activeTab === 0) {
            outcomeList.set("home", event.homeName);
            outcomeList.set("away", event.awayName);
        } else if (state.addClassActive.activeTab === 1) {
            state.tabInfo.lineSortTeam[state.addClassActive.activeTime].forEach(
                (elem, key) => {
                    outcomeList.set(elem.index, elem.index);
                }
            );
        } else if (state.addClassActive.activeTab === 2) {
            // debugger;
            const array = [];
            let linetest = [...event.lines.values()].find(
                line => line.marketId == 10349
            );
            console.log(linetest);
            state.dict.dict.forEach((elem, key) => {
                let line = [...event.lines.values()].find(line => {
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
                if (!line) line = this.props.findLine(key, event);
                if (line) {
                    const market = getMarket(
                        line,
                        this.props.markets,
                        this.props.marketsByNum
                    );

                    if (
                        state.dict.dict.has(
                            market.objectId.toString().split("_out_num")[0]
                        )
                    ) {
                        let lines = [...event.lines.values()].filter(line => {
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

                        lines.forEach(line => {
                            const market = getMarket(
                                line,
                                this.props.markets,
                                this.props.marketsByNum
                            );
                            outcomeList.set(
                                market.objectId.toString().split("_out_num")[0],
                                this.props.reName(
                                    market.objectId
                                        .toString()
                                        .split("_out_num")[0]
                                )
                            );
                        });
                    } else {
                        outcomeList.set(
                            market.objectId,
                            this.props.reName(elem[0][0])
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
                    props.dictionary.teamGoalScorer,
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
            let linesMarkets = [
                ...props.newEvents.get(this.props.event.id).lines.values()
            ].filter(line => {
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
            if (linesMarkets.length == 0)
                linesMarkets = [
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
                    ].filter(line => {
                        if (
                            this.state.dict.dict.has(line.marketId) &&
                            !isLineBlocked(line, this.props.event)
                        ) {
                            const market = getMarket(
                                line,
                                this.props.markets,
                                this.props.marketsByNum
                            );
                            if (!market) return false;

                            return arrSSl.includes(
                                market.objectId.toString().split("_out_num")[0]
                            );
                        }
                        return false;
                    });

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
                            activeTime: state.addClassActive.activeTime,
                            activeMatch: state.addClassActive.activeMatch,
                            activeMarkets: 0
                        };
                        newState.linesMarkets = [
                            ...props.newEvents
                                .get(this.state.event.id)
                                .lines.values()
                        ].filter(line => {
                            if (
                                this.state.dict.dict.has(line.marketId) &&
                                !isLineBlocked(line, this.props.event)
                            ) {
                                const market = getMarket(
                                    line,
                                    this.props.markets,
                                    this.props.marketsByNum
                                );
                                if (!market) return false;

                                return arrSSl.includes(
                                    market.objectId
                                        .toString()
                                        .split("_out_num")[0]
                                );
                            }
                            return false;
                        });

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
            }
        }
        return state;
    }
    searchLines(dict) {
        const linesMarkets = [...this.props.event.lines.values()].filter(
            line => {
                if (
                    dict.has(line.marketId) &&
                    !isLineBlocked(line, this.props.event)
                ) {
                    const market = getMarket(
                        line,
                        this.props.markets,
                        this.props.marketsByNum
                    );
                    if (!market) return false;

                    return arrSSl.includes(
                        market.objectId.toString().split("_out_num")[0]
                    );
                }
                return false;
            }
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
        arraytab.push(this.props.lang.mainTime);
        return arraytab.map((elem, key) => {
            console.log(key);
            return (
                <div
                    className={
                        "modal-constructor__tab " +
                        (this.state.addClassActive.activeTab === key
                            ? "active"
                            : key == 3
                            ? " opacity50"
                            : "")
                    }
                    onClick={key != 3 ? () => this.changeTab(key) : f => f}
                    key={key}
                >
                    {this.props.reName(elem)}
                </div>
            );
        });
    }

    changeInformationSend(key) {
        const addClassActive = { ...this.state.addClassActive };
        const tabInfo = { ...this.state.tabInfo };
        let outcomeId = tabInfo.outcomeId;
        if (
            addClassActive.activeTab === 0 &&
            addClassActive.activeTime != key
        ) {
            addClassActive.activeTime = key;
            addClassActive.activeMatch = this.props.lang.builder.select;
            //tabInfo.lineSortTeam[key][0];

            tabInfo.outcomeId =
                tabInfo.lineActiveMarket.outcomeId[
                    tabInfo.lineActiveMarket.outcomeName.indexOf(
                        addClassActive.activeMatch
                    )
                ];
        } else if (
            addClassActive.activeTab === 1 &&
            addClassActive.activeMatch != key
        ) {
            addClassActive.activeMatch = key;

            tabInfo.outcomeId =
                tabInfo.lineActiveMarket.outcomeId[
                    tabInfo.lineActiveMarket.outcomeName.indexOf(
                        addClassActive.activeMatch
                    )
                ];
        } else if (addClassActive.activeTab === 2) {
            let line = [...this.state.event.lines.values()].filter(line => {
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
            console.log(key);
            if (line.length == 0) {
                line = this.props.findLine(key, this.state.event);
                tabInfo.lineSortTeam = this.sortTeam(line);
                addClassActive.activeMarket = this.state.dict.dict.get(
                    key
                )[0][0];
                tabInfo.lineActiveMarket = line;
                tabInfo.outcomeId =
                    tabInfo.lineActiveMarket.outcomeId[
                        tabInfo.lineActiveMarket.outcomeName.indexOf(
                            addClassActive.activeMatch
                        )
                    ];
            } else {
                line.forEach(elem => {
                    const market = getMarket(
                        elem,
                        this.props.markets,
                        this.props.marketsByNum
                    );
                    if (
                        market.objectId.toString().split("_out_num")[0] == key
                    ) {
                        tabInfo.lineSortTeam = this.sortTeam(elem);
                        addClassActive.activeMarket = this.state.dict.dict.get(
                            key
                        )[0][0];
                        tabInfo.lineActiveMarket = elem;
                        tabInfo.outcomeId =
                            tabInfo.lineActiveMarket.outcomeId[
                                tabInfo.lineActiveMarket.outcomeName.indexOf(
                                    addClassActive.activeMatch
                                )
                            ];
                    }
                });
            }
        }
        const newState = {
            ...this.state,
            addClassActive,
            tabInfo,
            outcomeId
        };
        // if (newState.addClassActive.activeMatch != "Выбрать")
        //     newState.builderError = null;
        newState.tabInfo.tab = [
            { send: this.props.reName(addClassActive.activeTime) },
            { send: this.props.reName(addClassActive.activeMatch) },
            { send: this.props.reName(addClassActive.activeMarket) },
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
        } else if (
            this.state.addClassActive.activeTab === 2 &&
            this.state.addClassActive.activeMarket ===
                this.state.dict.dict.get(key)[0][0]
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

                        this.state.addClassActive.activeMatch,
                        this.state.addClassActive.activeMarket
                    ])}
                </div>

                <div className="modal-constructor__body">
                    <ul className="modal-constructor__list">
                        {[...this.state.list.keys()].map((key, i) => (
                            <li
                                className={
                                    "SaveInformationBetsBuilder" +
                                    this.getActiveClass(key)
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
        if (
            this.state.addClassActive.activeMatch ==
            this.props.lang.builder.select
        )
            return;
        const mapBets =
            this.props.event.id in this.props.eventBuilder
                ? this.props.eventBuilder[this.props.event.id]
                : 0;

        const boolen = this.props.getStatusUpdate(this.state); // проверка
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
        console.log("Teстируй", this.state.tabInfo.lineActiveMarket.id);
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
            console.log(
                "_______________________________________________________________---------> no send coef"
            );
            return "";
        }
        if (
            this.state.addClassActive.activeMatch ==
            this.props.lang.builder.select
        )
            return;
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
        lang: state.user.language_user.dict,
        builderError: state.server.builderInfo.builderError
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamGoalScorer);
