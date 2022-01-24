import React from "react";
import { connect } from "react-redux";

import {
    isLineBlocked,
    isOutcomeBlocked
} from "../../../../../../../Services/Shared";
import { getBetBuilderOdd } from "../../../../../../../Server/";

class CorrectScore extends React.Component {
    constructor(props) {
        super(props);
        this.props.goBack.bind(this);
        this.initialState = {
            addClassActive: {
                activeTab: props.activeTab,
                activeTEAMlist: 0,
                activeMARKETSlist: 0
            },
            builderError: props.builderError,
            event: props.event,
            dict: props.dictionary.correctScore,
            activeTab: this.returnNameTab(props.activeTab),
            editMarket: props.editMarket,
            keyChange: props.keyChange,
            markets: props.markets,
            list: "",
            dictOutcome: {
                30993: {
                    "1:0": 1010,
                    "2:0": 1020,
                    "2:1": 1021,
                    "3:0": 1030,
                    "3:1": 1031,
                    "3:2": 1032,
                    "4:0": 1040,
                    "4:1": 1041,
                    "4:2": 1042,
                    "4:3": 1043,
                    "0:0": 3000,
                    "1:1": 3011,
                    "2:2": 3022,
                    "3:3": 3033,
                    "4:4": 3044,
                    "0:1": 2010,
                    "0:2": 2020,
                    "1:2": 2021,
                    "0:3": 2030,
                    "1:3": 2031,
                    "2:3": 2032,
                    "0:4": 2040,
                    "1:4": 2041,
                    "2:4": 2042,
                    "3:4": 2043
                },
                30994: {
                    "1:0": 1010,
                    "2:0": 1020,
                    "2:1": 1021,
                    "0:0": 3000,
                    "1:1": 3011,
                    "2:2": 3022,
                    "0:1": 2010,
                    "0:2": 2020,
                    "1:2": 2021
                }
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
            const line = this.props.findLine(elem, event);
            if (line) {
                if (tabInfo.activeMarket.length === 0) {
                    // debugger;
                    console.log(line);
                    const index = line.outcomeActive.indexOf(1);
                    tabInfo.activeMarket = this.props.reName(
                        dictObj.dict.get(elem)[0][0]
                    );
                    // debugger;
                    state.addClassActive.activeMARKETSlist = this.props.reName(
                        state.dict.dict.get(line.marketId)[0]
                    );

                    state.addClassActive.activeTEAMlist =
                        line.outcomeId[index] === 404
                            ? 1010
                            : line.outcomeId[index];
                    tabInfo.lineActiveMarket = line;
                    tabInfo.markets.set(
                        line.compoundKey,
                        this.props.reName(state.dict.dict.get(line.marketId)[0])
                    );

                    tabInfo.outcomeId =
                        line.outcomeId[index] === 404
                            ? 1010
                            : line.outcomeId[index];
                    // debugger;
                }
            }
        });
        if (tabInfo.activeMarket.length === 0) {
            this.props.goBack();
            return "";
        }

        tabInfo.tab = [
            {
                send: this.getScoreToOutcome(
                    state.addClassActive.activeTEAMlist
                )
            },
            {
                send: this.props.reName(
                    state.dict.dict.get(tabInfo.lineActiveMarket.marketId)[0]
                )
            }
        ];
        return tabInfo;
    }

    createOutcomeList(event, state) {
        const outcomeList = new Map();
        if (state.addClassActive.activeTab === 0) {
            const infoMatrix = new Map();

            infoMatrix.set("home", []);
            infoMatrix.set("draw", []);
            infoMatrix.set("away", []);
            state.tabInfo.lineActiveMarket.outcomeId.forEach((elem, key) => {
                if (
                    elem.toString()[0] === "1" &&
                    isOutcomeBlocked(state.tabInfo.lineActiveMarket, elem)
                ) {
                    infoMatrix.get("home").push({
                        outcome: elem,
                        score: elem.toString()[2] + ":" + elem.toString()[3]
                    });
                } else if (
                    elem.toString()[0] === "2" &&
                    isOutcomeBlocked(state.tabInfo.lineActiveMarket, elem)
                ) {
                    infoMatrix.get("away").push({
                        outcome: elem,
                        score: elem.toString()[2] + ":" + elem.toString()[3]
                    });
                } else if (
                    elem.toString()[0] === "3" &&
                    isOutcomeBlocked(state.tabInfo.lineActiveMarket, elem)
                ) {
                    infoMatrix.get("draw").push({
                        outcome: elem,
                        score: elem.toString()[2] + ":" + elem.toString()[3]
                    });
                }
            });

            infoMatrix.forEach((elem, key) => {
                console.log(key);
                for (let h = 0; h < elem.length; h++)
                    outcomeList.set(
                        elem[h].outcome,
                        this.props.reName(key) + " " + elem[h].score
                    );
            });
        } else if (state.addClassActive.activeTab === 1) {
            const line = [...event.lines.values()].filter(
                line =>
                    state.dict.dict.has(line.marketId) &&
                    !isLineBlocked(line, this.props.event)
            );

            line.forEach(item => {
                outcomeList.set(
                    item.compoundKey,
                    this.props.reName(state.dict.dict.get(item.marketId)[0])
                );
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
                if (status !== 1) {
                    this.props.goBack();
                } else {
                    state.tabInfo = this.props.sendState.tabInfo;
                }
            } else {
                state.tabInfo = this.tabList(
                    props.dictionary.correctScore,
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
                            line.id === state.tabInfo.lineActiveMarket.id &&
                            line.marketId ===
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

                    // искать по значению еще
                    // debugger;
                    if (
                        lineActive &&
                        lineActive.find(
                            line =>
                                line.marketId ===
                                    state.tabInfo.lineActiveMarket.marketId &&
                                line.outcomeActive[
                                    line.outcomeId.indexOf(
                                        state.tabInfo.outcomeId
                                    )
                                ] === 1
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
                            activeTEAMlist: state.addClassActive.activeTEAMlist,
                            activeMARKETSlist:
                                state.addClassActive.activeMARKETSlist,
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
                            this.props.dictionary.correctScore,
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
                        this.props.dictionary.correctScore,
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
        const lines = [];
        dict.forEach((item, key) => {
            const linesMarkets = [...this.props.event.lines.values()].find(
                line =>
                    line.marketId === key &&
                    !isLineBlocked(line, this.props.event) &&
                    line.status === 1
            );
            if (linesMarkets) lines.push(linesMarkets);
        });
        console.log(lines);
        return lines;
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
        // console.log(arraytab);
        // debugger;
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

    changeInformationSend(key) {
        const addClassActive = { ...this.state.addClassActive };

        const tabInfo = { ...this.state.tabInfo };

        let outcomeId = key;

        if (addClassActive.activeTab === 0) {
            addClassActive.activeTEAMlist = key;
            tabInfo.outcomeId = key;
        } else {
            const line = [...this.props.event.lines.values()].find(
                line =>
                    line.compoundKey === key &&
                    !isLineBlocked(line, this.props.event)
            );
            // debugger;
            tabInfo.lineActiveMarket = line;

            addClassActive.activeMARKETSlist = this.props.reName(
                this.state.dict.dict.get(line.marketId)[0]
            );
            if (!line.outcomeId.includes(tabInfo.outcomeId)) {
                // debugger;
                tabInfo.outcomeId = 1010;
                addClassActive.activeTEAMlist = 1010;
            }
        }
        tabInfo.tab = [
            { send: this.getScoreToOutcome(addClassActive.activeTEAMlist) },
            {
                send: this.props.reName(
                    this.state.dict.dict.get(
                        tabInfo.lineActiveMarket.marketId
                    )[0]
                )
            }
        ];

        const newState = {
            ...this.state,
            addClassActive,
            tabInfo,
            outcomeId
        };

        this.isUpdate = true;
        this.setState(newState);
    }

    getActiveClass(key) {
        if (
            this.state.addClassActive.activeTab === 0 &&
            this.state.addClassActive.activeTEAMlist === key
        ) {
            return " active";
        } else if (
            this.state.addClassActive.activeTab === 1 &&
            this.state.tabInfo.lineActiveMarket.compoundKey === key
        ) {
            return " active";
        }

        return "";
    }

    getScoreToOutcome(outcome) {
        // debugger;
        if (outcome.toString()[0] === "1") {
            return (
                this.props.reName("home") +
                " " +
                outcome.toString()[2] +
                ":" +
                outcome.toString()[3]
            );
        } else if (outcome.toString()[0] === "2") {
            return (
                this.props.reName("away") +
                " " +
                outcome.toString()[2] +
                ":" +
                outcome.toString()[3]
            );
        } else if (outcome.toString()[0] === "3") {
            return (
                this.props.lang.draw +
                " " +
                " " +
                outcome.toString()[2] +
                ":" +
                outcome.toString()[3]
            );
        }
    }

    render() {
        // console.log("_________________RENDER_________________");
        // debugger;
        // console.log(
        //     this.getScoreToOutcome(this.state.addClassActive.activeTEAMlist)
        // );

        return (
            <>
                <div className="modal-constructor__tabs">
                    {this.createTab([
                        this.getScoreToOutcome(
                            this.state.addClassActive.activeTEAMlist
                        ),
                        this.state.addClassActive.activeMARKETSlist
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
        console.log("ТЕСТ", this.state.tabInfo.lineActiveMarket.id);
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

        builderError: state.server.builderInfo.builderError
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CorrectScore);
