import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style/menu-scroll.css";
import { route } from "../../Actions/Components/Navigation/";

import { routsName } from "../../Router/RouterList";

import {
    sortCallbackBySortIdAndName,
    getEntityById,
    getSportIcon,
    getSportByName,
    transliterate,
    getEventIdsFromCurrentTickets
} from "../../Services/Shared";

class ScrollMenu extends Component {
    constructor(props) {
        super(props);
        this.scrollElem = React.createRef();
        this.initialState = {
            sports: new Map(),
            timeFilter: props.filters.time,
            statusFilter: props.filters.status
        };
        this.state = this.getCurState(this.initialState, props, true);
    }

    get isDataInComponent() {
        if (this.props.sports || !this.props.events) return true;
        return false;
    }

    get isFavEvents() {
        const favGbEventsFromTickets = getEventIdsFromCurrentTickets();
        const favEventsFromTickets = [...favGbEventsFromTickets]
            .filter(gbId => this.props.eventsByGB.has(gbId))
            .map(gbId => this.props.eventsByGB.get(gbId));
        const favEvents = [
            ...this.props.favEventsPrematch,
            ...this.props.favEventsLive,
            ...favEventsFromTickets
        ];
        if (favEvents.length > 0) return true;
        return false;
    }
    // get isUpdate() {
    //   if (this._isBeUpdated) {
    //     this._isBeUpdated = false;
    //     return true;
    //   }
    //   return false;
    // }

    // set isUpdate(val) {
    //   this._isBeUpdated = val;
    // }

    isEventValid(event, state) {
        const time = new Date().getTime();
        if (event.status === -1 || event.status === 3 || event.status === 4)
            return false;
        // if (event.numLinesForPrematch === 0) return false;

        if (state.statusFilter.includes(event.status)) {
            if (event.status === 1) {
                return true;
            } else if (
                event.timeSpanStart - time > 0 &&
                event.timeSpanStart - time <= state.timeFilter
                // &&  state.timeFilter !== Infinity
            ) {
                return true;
            }
        }
        return false;
    }

    getSortedSports(sports, props) {
        const newSports = [...sports.keys()].sort((a, b) =>
            sortCallbackBySortIdAndName(a, b, null, props.sports)
        );
        const stateSports = new Map();
        newSports.forEach(sport => stateSports.set(sport, sports.get(sport)));
        return stateSports;
    }

    formMapSports(events, sports, state, props) {
        const newSports = new Map(sports);
        let isSportsChanged = false;
        events.forEach(ev => {
            if (!this.isEventValid(ev, state)) return;
            if (!newSports.has(ev.sportId)) {
                newSports.set(ev.sportId, [ev.id]);
                isSportsChanged = true;
            } else {
                if (!newSports.get(ev.sportId).includes(ev.id)) {
                    newSports.get(ev.sportId).push(ev.id);
                    isSportsChanged = true;
                }
            }
        });

        if (state.statusFilter.includes(0)) {
            props.categories.forEach(cat => {
                if (!cat.isOutright) return;
                if (!newSports.has(cat.sportId)) {
                    isSportsChanged = true;
                    const val = [];
                    const sId = cat.sportId;
                    newSports.set(sId, val);
                }
            });
        }

        if (state.timeFilter !== Infinity)
            newSports.forEach((elem, key) => {
                if (elem.length == 0) newSports.delete(key);
            });

        if (isSportsChanged) return newSports;

        return sports;
    }

    getEventsArray(sports) {
        return [...sports.values()].reduce(
            (accum, curVal) => [...accum, ...curVal],
            []
        );
    }

    isDeletedEventInStateSport(event, sports) {
        if (!event || sports.size == 0) return false;
        return [...sports.keys()].includes(event.sportId);
    }

    deleteEventAndReturnStateSport(event, sports) {
        if (!event) return sports;
        const newSports = new Map(sports);
        if (!newSports.has(event.sportId)) return sports;
        const events = newSports.get(event.sportId);
        const eventIndex = events.indexOf(event.id);
        if (eventIndex === -1) return sports;
        ///////////////////////////////////////
        // тут прилага может упасть
        //////////////////////////////////////
        newSports.get(event.sportId).splice(eventIndex, 1);
        if (newSports.get(event.sportId).length === 0) {
            newSports.delete(event.sportId);
        }
        return newSports;
    }

    getCurState(state, props, isReset = false) {
        const events = isReset ? props.events : props.newEvents;
        let sports = isReset ? new Map() : state.sports;
        let isSportsChanged = false;
        const deletedEvent = props.deletedEvent;
        let isDeletedSports = false;
        // debugger;
        if (this.isDeletedEventInStateSport(deletedEvent, sports)) {
            const newSports = this.deleteEventAndReturnStateSport(
                deletedEvent,
                sports
            );
            if (newSports !== sports) {
                isDeletedSports = true;
                if (newSports.size !== sports.size) isSportsChanged = true;
                sports = newSports;
            }
        }
        const stateSports = this.formMapSports(events, sports, state, props);
        if (stateSports !== sports) {
            isSportsChanged = true;
            sports = stateSports;
        }
        if (isSportsChanged || isReset || isDeletedSports) {
            return {
                ...state,
                sports: this.getSortedSports(sports, props)
            };
        }
        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) return true;
        if (
            this.props.favEventsLive !== nextProps.favEventsLive ||
            this.props.favEventsPrematch !== nextProps.favEventsPrematch ||
            this.props.tickets !== nextProps.tickets
        )
            return true;
        if (!this.isDataInComponent) return false;
        if (this.props.active !== nextProps.active) return true;
        const newState = this.getCurState(this.state, nextProps);
        if (newState !== this.state) {
            this.setState(newState);
        }
        return false;
    }

    getActiveTab() {
        const itemName = this.props.active;

        if (!itemName || !this.props.sports) return this.props.lang.allSprots;
        const sport = getSportByName(this.props.sports, itemName);
        if (sport) return sport.id;
        switch (itemName) {
            case routsName.dict.moi_matchi:
                return this.props.lang.myMatch;
            case routsName.dict.translyacziya:
                return this.props.lang.streamOther;
            default:
                return this.props.lang.allSprots;
        }
    }

    getPropsForSport(sportId) {
        const sport = getEntityById(this.props.sports, sportId);
        const { handleClick } = this.props;
        // прокинуть цвет 3им параметром
        return {
            name: sport.name,
            img: getSportIcon(sportId),
            sportId: sportId,
            func: () => handleClick(sport),
            isActive: transliterate(sport.name, true) === this.props.active
        };
    }

    getPropsForMyMathes() {
        return {
            name: this.props.lang.myMatch,
            img: this.isFavEvents ? getSportIcon("faveFill") : getSportIcon(-1),
            sportId: "faveFill",
            func: () =>
                this.props.navigate(
                    "/" +
                        this.props.rootComponent +
                        "/" +
                        routsName.dict.moi_matchi
                    // transliterate(this.props.lang.myMatch, true)
                ),
            isActive:
                this.props.lang.myMatch === this.getActiveTab() ? true : false
        };
    }

    getPropsForTranslation() {
        return {
            name: this.props.lang.streamOther,
            img: getSportIcon(-3),
            sportId: "-3",
            func: () =>
                this.props.navigate(
                    "/" +
                        routsName.dict.live +
                        "/" +
                        routsName.dict.translyacziya
                    // transliterate(this.props.lang.streamOther, true)
                ),
            isActive:
                this.props.lang.streamOther === this.getActiveTab()
                    ? true
                    : false
        };
    }

    getPropsForAllSports() {
        return {
            name: this.props.lang.allSprots,
            img: getSportIcon(-2),
            sportId: "-2",
            func: () => this.props.navigate("/" + this.props.rootComponent),
            isActive:
                this.props.lang.allSprots === this.getActiveTab() ? true : false
        };
    }

    renderOtherComponents() {
        const { ScrollComponent } = this.props;
        // const isFavEvents = this.isFavEvents;

        return (
            <>
                <ScrollComponent {...this.getPropsForMyMathes()} />
                {this.state.statusFilter[0] &&
                this.props.sattingApp.isTranslation ? (
                    <ScrollComponent {...this.getPropsForTranslation()} />
                ) : (
                    ""
                )}
                <ScrollComponent {...this.getPropsForAllSports()} />
            </>
        );
    }

    render() {
        const { ScrollComponent, rootComponent } = this.props;
        return (
            <div className="menu-scroll">
                <ul className="menu-scroll__list" ref={this.scrollElem}>
                    {rootComponent !== "painting"
                        ? this.renderOtherComponents()
                        : ""}
                    {[...this.state.sports.keys()]
                        .filter(sportId =>
                            getEntityById(this.props.sports, sportId)
                        )
                        .map((sportId, i) => (
                            <ScrollComponent
                                {...this.getPropsForSport(sportId)}
                                sportid={sportId}
                                key={i}
                            />
                        ))}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.scrollElem.current.scrollTo(this.props.scrollX, null);
        this.scrollElem.current.onscroll = this.scrollMenu.bind(this);
        // if (this.state.sports.size == 0) {
        //     this.props.navigate("/prematch/mymatches");
        // }
    }

    scrollMenu(e) {
        this.props.onScroll(this.scrollElem.current.scrollLeft);
    }
}

const mapStateToProps = state => {
    return {
        sattingApp: state.mainSetting,
        lang: state.user.language_user.dict,
        newEvents: state.server.eventsAndLines.newEvents,
        events: state.server.eventsAndLines.events,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        deletedEvent: state.server.eventsAndLines.deletedEvent,
        categories: state.server.entities.categories,
        events: state.server.eventsAndLines.events,
        sports: state.server.entities.sports,
        timeFilter: state.filters.timeFilter,
        favEventsPrematch: state.server.currentStates.favEventsPrematch,
        favEventsLive: state.server.currentStates.favEventsLive,
        tickets: state.user.info.tickets
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: url => dispatch(route("push", url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScrollMenu);
