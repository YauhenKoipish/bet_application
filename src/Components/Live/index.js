import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Table from "../Main/Components/Table/";

import { routsName } from "../../Router/RouterList";
import {
    getFilterArraySportByName,
    getFilterCategoryByName,
    getFilterTournamentByName,
    transliterate,
    sortCallbackBySortIdAndName,
    addBetsWindowStyleWhenSticky,
    addStickyContent,
    getEventIdsFromCurrentTickets
} from "../../Services/Shared";

class Live extends Component {
    getPropsForTable(
        parentProps,
        status,
        isSport = false,
        isCategory = false,
        isTournament = false,
        time = Infinity,
        isTranslation = false,
        isFav = false
    ) {
        const props = { ...parentProps };
        props.filters = {};
        props.filters.status = typeof status === "number" ? [status] : status;
        const sportVal = getFilterArraySportByName(
            props.match.params.sport,
            this.props.sports
        );
        const sport = isSport ? sportVal : null;
        props.filters.sport = sport;

        const categoryVal = getFilterCategoryByName(
            props.match.params.category,
            sportVal,
            this.props.categories
        );
        const category = isCategory ? [categoryVal] : null;
        props.filters.category = category;

        const tournamentVal = getFilterTournamentByName(
            props.match.params.tournament,
            sportVal,
            categoryVal,
            this.props.tournaments,
            props.match.params.category,
            this.props.categories
        );
        const tournament = isTournament ? [tournamentVal] : null;
        props.filters.tournament = tournament;
        props.filters.time = time;
        props.filters.isTranslation = isTranslation;
        props.filters.isFav = isFav;
        const favGbEventsFromTickets = getEventIdsFromCurrentTickets();
        const favEventsFromTickets = [...favGbEventsFromTickets]
            .filter(gbId => this.props.eventsByGB.has(gbId))
            .map(gbId => this.props.eventsByGB.get(gbId));
        props.filters.favEvents = [
            ...this.props.favEventsPrematch,
            ...this.props.favEventsLive,
            ...favEventsFromTickets
        ];
        props.filters.favEvents = [
            ...this.props.favEventsPrematch,
            ...this.props.favEventsLive,
            ...favEventsFromTickets
        ];
        return props;
    }

    isEventValid(event) {
        if (event.status !== 1) {
            return false;
        }
        if (event.numLinesForPrematch === 0) {
            return false;
        }
        return true;
    }

    getValidEvents(events) {
        return [...events.values()].filter(ev => this.isEventValid(ev));
    }

    getSportsFromEvents(events) {
        const sports = [];
        events.forEach(ev => {
            if (!sports.includes(ev.sportId)) {
                sports.push(ev.sportId);
            }
        });
        return sports.sort((a, b) =>
            sortCallbackBySortIdAndName(a, b, null, this.props.sports)
        );
    }

    getValidSports() {
        const events = this.props.events;
        const validEvents = this.getValidEvents(events);
        const sports = this.getSportsFromEvents(validEvents);
        return sports;
    }

    getPrioritySport() {
        const sports = this.getValidSports();
        if (sports.length === 0) return routsName.dict.moi_matchi;
        const sport = this.props.sports.get(sports[0]);
        if (!sport) return routsName.dict.moi_matchi;
        return transliterate(sport.name, true);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname)
            return true;
        if (nextProps.timeFilter !== this.props.timeFilter) return true;
        if (
            (nextProps.favEventsLive !== this.props.favEventsLive ||
                nextProps.favEventsPrematch !== this.props.favEventsPrematch) &&
            nextProps.location.pathname ===
                "/" + routsName.dict.live + "/" + routsName.dict.moi_matchi
        )
            return true;
        if (
            nextProps.tickets !== this.props.tickets &&
            this.props.location.pathname ===
                "/" + routsName.dict.live + "/" + routsName.dict.moi_matchi
        )
            return true;
        return false;
    }

    render() {
        addStickyContent();

        return (
            <React.Fragment>
                <Switch>
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.live,
                            ":sport/:category/:tournamen"
                        )}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(
                                    props,
                                    [1, 2],
                                    true,
                                    true,
                                    true
                                )}
                                rootComponent={routsName.dict.live}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.live,
                            ":sport/:category"
                        )}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(
                                    props,
                                    [1, 2],
                                    true,
                                    true
                                )}
                                rootComponent={routsName.dict.live}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.live,
                            routsName.dict.translyacziya
                        )}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(
                                    props,
                                    [1, 2],
                                    false,
                                    false,
                                    false,
                                    Infinity,
                                    true
                                )}
                                rootComponent={routsName.dict.live}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.live,
                            routsName.dict.moi_matchi
                        )}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(
                                    props,
                                    [0, 1, 2],
                                    false,
                                    false,
                                    false,
                                    Infinity,
                                    false,
                                    true
                                )}
                                rootComponent={routsName.dict.live}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.live,
                            ":sport"
                        )}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(props, [1, 2], true)}
                                rootComponent={routsName.dict.live}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(routsName.dict.live)}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(props, [1, 2])}
                                rootComponent={routsName.dict.live}
                            />
                        )}
                    />
                </Switch>
                {/* // <Redirect
            //   from={routsName.getRoutsUrl(routsName.dict.live)}
            //   to={routsName.getRoutsUrl(routsName.dict.prematch)}
            // /> */}
            </React.Fragment>
        );
    }

    componentDidMount() {
        addBetsWindowStyleWhenSticky();
    }

    componentDidUpdate() {
        addBetsWindowStyleWhenSticky();
    }
}

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        tournaments: state.server.entities.tournaments,
        categories: state.server.entities.categories,
        sports: state.server.entities.sports,
        timeFilter: state.filters.timeFilter,
        favEventsPrematch: state.server.currentStates.favEventsPrematch,
        favEventsLive: state.server.currentStates.favEventsLive,
        events: state.server.eventsAndLines.events,
        tickets: state.user.info.tickets
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Live);
