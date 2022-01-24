import React from "react";
import { connect } from "react-redux";

// import { createTitleMarkets } from "../index";
import { getBetBuilderOdd } from "../../../../../../../Server/";
import { isLineBlocked } from "../../../../../../../Services/Shared";

class WinningMargin extends React.Component {
    constructor(props) {
        super(props);
        this.oldChangeKey = 0;
        this.props.goBack.bind(this);
        this.initialState = {
            addClassActive: {
                activeTab: props.activeTab,
                activeTime: 0,

                activeMatch: 0
            },
            keyChange: props.keyChange,
            editMarket: props.editMarket,
            dict: props.dictionary.winningMargin,
            activeTab: this.returnNameTab(props.activeTab),
            markets: props.markets,
            list: "",
            dictOutcome: {
                "{$competitor1}1": 39,
                "{$competitor1}2": 40,
                "{$competitor1}3+": 101,
                "{$competitor1}3": 545, // тест
                "{$competitor1}4+": 624, // тест
                "{$competitor2}1": 41,
                "{$competitor2}2": 42,
                "{$competitor2}3+": 102,
                "{$competitor2}3": 555,
                "{$competitor2}4+": 625,
                "{$competitor1}1-2": 418,
                "{$competitor2}1-2": 419
            },
            event: props.event,
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
        // debugger;
        const tabInfo = {
            markets: new Map(),
            activeMarket: "",
            lineActiveMarket: null,
            activeTeam: event.homeName,
            outcomeId: null
        };
        dictObj.ids.forEach(elem => {
            const line = this.props.findLine(elem, event);
            if (line) {
                if (tabInfo.activeMarket.length === 0) {
                    const market = this.props.markets.get(
                        line.marketId.toString()
                    );
                    tabInfo.activeMarket = dictObj.rusName;
                    state.addClassActive.activeTime = market.outcomeName[0].split(
                        " "
                    )[0];
                    state.addClassActive.activeMarket = state.dict.dict.get(
                        elem
                    )[0][0];
                    state.addClassActive.activeMatch = market.outcomeName[0].split(
                        " "
                    )[2];

                    tabInfo.lineActiveMarket = line;
                    tabInfo.markets.set(
                        elem,
                        this.props.reName(dictObj.dict.get(elem)[0][0])
                    );
                    tabInfo.outcomeId = 39;
                }
            }
        });
        if (tabInfo.activeMarket.length == 0) {
            this.props.goBack();
            return "";
        }
        tabInfo.tab = [
            { send: this.props.reName(state.addClassActive.activeTime) },
            { send: this.props.reName(state.addClassActive.activeMarket) },
            {
                send:
                    this.props.lang.builder.in +
                    " " +
                    this.props.reName(state.addClassActive.activeMatch) +
                    " " +
                    this.returnNameTab(state.addClassActive.activeMatch)
            }
        ];
        return tabInfo;
    }

    createOutcomeList(event, state) {
        const outcomeList = new Map();
        if (state.addClassActive.activeTab === 0) {
            outcomeList.set("{$competitor1}", event.homeName);
            outcomeList.set("{$competitor2}", event.awayName);
        } else if (state.addClassActive.activeTab === 1) {
            // console.log('')
            // debugger;
            outcomeList.set(
                state.dict.dict.get(
                    state.tabInfo.lineActiveMarket.marketId
                )[0][0],
                this.props.reName(
                    state.dict.dict.get(
                        state.tabInfo.lineActiveMarket.marketId
                    )[0][0]
                )
            );
            // outcomeList.set()
        } else if (state.addClassActive.activeTab === 2) {
            const outcomeTeam = this.props.markets.get(
                state.tabInfo.lineActiveMarket.marketId.toString()
            ).outcomeName;
            // debugger;
            for (let i = 0; i < outcomeTeam.length; i++) {
                if (
                    state.addClassActive.activeTime ===
                    outcomeTeam[i].split(" ")[0]
                ) {
                    outcomeList.set(
                        outcomeTeam[i].split(" ")[2],
                        outcomeTeam[i].replace(
                            state.addClassActive.activeTime,
                            ""
                        ) +
                            " " +
                            this.returnNameTab(
                                outcomeTeam[i].split(" ")[2].replace("+", "")
                            )
                    );
                }
            }
        }
        return outcomeList;
    }
    searchLines(dict) {
        const linesMarkets = [...this.props.event.lines.values()].filter(
            line =>
                dict.has(line.marketId) &&
                !isLineBlocked(line, this.props.event)
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
                    props.dictionary.winningMargin,
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
                            this.props.dictionary.oneXTwo,
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
                        this.props.dictionary.oneXTwo,
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
                return "TEAM";
            case 1:
                return "MARKETS";
            default:
                break;
        }
    }

    changeTab(key) {
        console.log(key, "------------------KEY");
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
        if (addClassActive.activeTab !== this.state.addClassActive.activeTab) {
            // debugger;
            this.isUpdate = true;
            this.setState(newState);
        }
    }

    createTab(arraytab) {
        console.log(arraytab);
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
                    {key === 2
                        ? this.props.lang.builder.in +
                          " " +
                          this.props.reName(elem) +
                          " " +
                          this.returnNameTab(elem.replace("+", ""))
                        : this.props.reName(elem)}
                </div>
            );
        });
    }

    returnNameTab(elem) {
        console.log(elem);
        if (elem >= 2 && elem < 5) return " " + this.props.lang.builder.gol;
        if (elem >= 5) return " " + this.props.lang.builder.gols;
        return " " + this.props.lang.builder.golOne;
    }

    changeInformationSend(key) {
        const addClassActive = { ...this.state.addClassActive };
        const tabInfo = { ...this.state.tabInfo };
        let outcomeId = "";

        if (addClassActive.activeTab === 0) {
            addClassActive.activeTime = key;
            tabInfo.outcomeId = this.state.dictOutcome[
                `${key}${addClassActive.activeMatch}`
            ];
        } else if (addClassActive.activeTab === 2) {
            addClassActive.activeMatch = key;
            tabInfo.outcomeId = this.state.dictOutcome[
                `${addClassActive.activeTime}${key}`
            ];
        } else if (addClassActive.activeTab === 1) {
            // debugger;
            // addClassActive.activeMatch = key;
        }

        const newState = {
            ...this.state,
            addClassActive,
            tabInfo,
            outcomeId
        };

        newState.tabInfo.tab = [
            { send: this.props.reName(addClassActive.activeTime) },
            { send: this.props.reName(addClassActive.activeMarket) },
            {
                send:
                    this.props.lang.builder.in +
                    " " +
                    this.props.reName(addClassActive.activeMatch) +
                    " " +
                    this.returnNameTab(
                        addClassActive.activeMatch.replace("+", "")
                    )
            }
        ];
        this.isUpdate = true;
        this.setState(newState);
    }

    getActiveClass(key) {
        // debugger;
        if (
            this.state.addClassActive.activeTab === 0 &&
            this.state.addClassActive.activeTime === key
        ) {
            return " active";
        } else if (
            this.state.addClassActive.activeTab === 1 &&
            this.state.addClassActive.activeMarket === key
        ) {
            return " active";
        } else if (
            this.state.addClassActive.activeTab === 2 &&
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
                        this.state.addClassActive.activeMarket,
                        this.state.addClassActive.activeMatch
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
        console.log(this.state.tabInfo.lineActiveMarket.id, "_______тестируй");
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
            console.log(
                "_______________________________________________________________---------> no send coef"
            );
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
                    debugger;
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
)(WinningMargin);
