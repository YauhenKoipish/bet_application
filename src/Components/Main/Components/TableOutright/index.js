import React, { Component } from "react";
import {
    isTournamentsInSport,
    getEthalonSortId,
    sortCallbackBySortIdAndName3,
    transliterate
} from "../../../../Services/Shared";
import { connect } from "react-redux";
import { route } from "../../../../Actions/Components/Navigation/";
import Preloader from "../../../Preloader/";
import { requestOutrights } from "../../../../Server/";
import Season from "./Components/Season";
// import "./style/long-term.css";
import { routsName } from "../../../../Router/RouterList";

class TableOutright extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            currentEvents: [],
            currentTournaments: new Map(),
            currentSeasons: new Map(),
            openedTournaments: []
        };
        this.state = this.getCurState(this.initialState, props, true);
    }
    deleteElemInArray(elem, array) {
        const index = array.indexOf(elem);
        if (index !== -1) array.splice(index, 1);
    }

    getEventsByFilters(events, filters) {
        if (events.size === 0) return [];
        const validEvents = [];
        const time = new Date().getTime();
        events.forEach(event => {
            if (
                event.status === -1 ||
                event.status === 3 ||
                event.status === 4
            ) {
                if (validEvents.includes(event.id))
                    this.deleteElemInArray(event.id, validEvents);
                return;
            }
            if (!event.isLongTerm) {
                if (validEvents.includes(event.id))
                    this.deleteElemInArray(event.id, validEvents);
                return;
            }

            if (
                filters.status !== null &&
                !filters.status.includes(event.status)
            ) {
                if (validEvents.includes(event.id))
                    this.deleteElemInArray(event.id, validEvents);

                return;
            }
            if (
                filters.sport !== null &&
                !filters.sport.includes(event.sportId)
            ) {
                if (validEvents.includes(event.id))
                    this.deleteElemInArray(event.id, validEvents);

                return;
            }
            if (
                filters.category !== null &&
                !filters.category.includes(event.categoryId)
            ) {
                if (validEvents.includes(event.id))
                    this.deleteElemInArray(event.id, validEvents);

                return;
            }
            if (!validEvents.includes(event.id)) validEvents.push(event.id);
        });
        return validEvents;
    }

    getCurrentTournaments(events, props = this.props) {
        const tournaments = new Map();
        events.forEach(ev => {
            const event = props.events.get(ev);
            if (!event) {
                console.warn(ev);
                return;
            }
            if (tournaments.has(event.tournamentId)) {
                if (
                    !tournaments
                        .get(event.tournamentId)
                        .events.includes(event.id)
                )
                    tournaments.get(event.tournamentId).events.push(event.id);
            } else {
                tournaments.set(event.tournamentId, {
                    events: [event.id],
                    tournamentId: event.tournamentId
                });
            }
        });
        return tournaments;
    }

    getCurrentSeasons(events, props = this.props) {
        const seasons = new Map();
        events.forEach(ev => {
            const event = props.events.get(ev);
            if (!event) {
                console.warn(ev);
                return;
            }
            if (seasons.has(event.seasonName)) {
                if (
                    !seasons
                        .get(event.seasonName)
                        .tournaments.includes(event.tournamentId)
                )
                    seasons
                        .get(event.seasonName)
                        .tournaments.push(event.tournamentId);
            } else {
                seasons.set(event.seasonName, {
                    tournaments: [event.tournamentId],
                    seasonName: event.seasonName
                });
            }
        });
        return seasons;
    }

    getSortedTournaments(tournaments, props = this.props) {
        const ethalonSortId = getEthalonSortId(
            [this.props.sportId],
            "tournaments"
        );
        return [...tournaments.keys()].sort((a, b) => {
            const tournament1 = props.tournaments.get(a);
            const tournament2 = props.tournaments.get(b);
            if (!tournament1 && tournament2) return -1;
            if (tournament1 && !tournament2) return 1;
            if (!tournament1 && !tournament2) return 0;
            const category1 = props.categories.get(tournament1.categoryId);
            const category2 = props.categories.get(tournament2.categoryId);
            if (!category1 && category2) return -1;
            if (category1 && !category2) return 1;
            if (!category1 && !category2) return 0;
            return sortCallbackBySortIdAndName3(
                tournament1.sortId,
                tournament2.sortId,
                category1.name + ". " + tournament1.name,
                category2.name + ". " + tournament2.name,
                ethalonSortId
            );
        });
    }

    getTournamentsPropsForFilter() {
        const props = [];
        const validEvents = this.getEventsByFilters(this.props.events, {
            status: [0],
            sport: this.props.sportIds,
            category: this.props.categoryIds
        });
        const tournaments = this.getCurrentTournaments(validEvents);

        const sortedT = this.getSortedTournaments(tournaments);
        sortedT.forEach(t => {
            const tournament = this.getPropsForTournament(t);
            if (!tournament) return;
            props.push({
                name: this.getTournamentName(t),
                click: this.getClickFuncForTournamentFilter(tournament)
            });
        });
        return props;
    }

    getTournamentName(tId) {
        const t = this.props.tournaments.get(tId);
        if (!t) return "";
        const cat = this.props.categories.get(t.categoryId);
        if (!cat) return "";
        return t.name + " (" + cat.name + ")";
    }

    getClickFuncForTournamentFilter(t) {
        const component = "/" + this.props.rootComponent;
        const sport = this.props.sports.get(t.sportId);
        if (!sport) return f => f;
        const sportN = transliterate(sport.name, true);

        const category = this.props.categories.get(t.categoryId);
        if (!category) return f => f;
        const categoryN = transliterate(category.name, true);

        const tournamentN = transliterate(t.name, true);
        return () =>
            this.props.navigate(
                component + "/" + sportN + "/" + categoryN + "/" + tournamentN
            );
    }

    getPropsForTournament(tId) {
        return this.props.tournaments.get(tId);
    }

    getCurTforFilter() {
        return "Долгосрочные";
    }

    getClickFuncOnFilterAllTournaments() {
        return () =>
            this.props.navigate(
                this.getURLForClickFuncOnFilterAllTournaments()
            );
    }

    getCurSport() {
        return this.props.sportId
            ? this.props.sports.get(this.props.sportId)
            : null;
    }

    getURLForClickFuncOnFilterAllTournaments() {
        const sport = this.props.match.params.sport;
        const category = this.props.match.params.category;
        if (this.props.rootComponent === "categories") {
            const eSport = this.getCurSport();
            if (!isTournamentsInSport(eSport.id))
                return (
                    "/" +
                    this.props.rootComponent +
                    "/" +
                    sport +
                    "/" +
                    routsName.dict.all
                );
            return (
                "/" + this.props.rootComponent + "/" + sport + "/" + category
            );
        }
        return "/" + this.props.rootComponent + "/" + (sport ? sport : "");
    }

    checkIsEventsInStateWithSameFiled(state, deletedEvent, field) {
        if (!deletedEvent) return false;
        return state.currentEvents.some(ev => {
            const event = this.props.events.get(ev);
            if (!event) return true;
            return deletedEvent[field] === event[field];
        });
    }

    deleteEventTournamentInSeasonState(state, deletedEvent) {
        const isMustBeDeleted = this.checkIsEventsInStateWithSameFiled(
            state,
            deletedEvent,
            "seasonName"
        );
        if (!isMustBeDeleted) return;
        const season = state.currentSeasons.get(deletedEvent.seasonName);
        if (season)
            this.deleteElemInArray(
                deletedEvent.tournamentId,
                season.tournaments
            );
        else
            console.warn(
                "не нашел season",
                deletedEvent,
                state.currentTournaments
            );
        if (season && season.tournaments.length === 0) {
            state.currentSeasons.delete(deletedEvent.seasonName);
        }
    }

    deleteEventInTournamentsState(state, deletedEvent) {
        const isMustBeDeleted = this.checkIsEventsInStateWithSameFiled(
            state,
            deletedEvent,
            "tournamentId"
        );
        if (isMustBeDeleted) {
            const tournament = state.currentTournaments.get(
                deletedEvent.tournamentId
            );
            if (tournament)
                this.deleteElemInArray(deletedEvent.id, tournament.events);
            else
                console.warn(
                    "не нашел турнир",
                    deletedEvent,
                    state.currentTournaments
                );
            if (tournament && tournament.events.length === 0) {
                this.deleteEventTournamentInSeasonState(
                    state,
                    deletedEvent.tournamentId
                );
                state.currentTournaments.delete(deletedEvent.tournamentId);
            }
        }
    }

    checkIsDeletedEventsInProps(state, deletedEvent) {
        if (deletedEvent && state.currentEvents.includes(deletedEvent.id)) {
            // console.log("удаляю event " + deletedEvent.id);
            this.deleteEventInTournamentsState(state, deletedEvent);
            this.deleteElemInArray(deletedEvent.id, state.currentEvents);
            return true;
        }
        return false;
    }

    shouldUpdateCurrentEvents(validEvents, state) {
        return validEvents.some(ev => !state.currentEvents.includes(ev));
    }

    addEventsInState(state, validEvents, props = this.props) {
        validEvents.forEach(ev => {
            if (!state.currentEvents.includes(ev)) state.currentEvents.push(ev);
        });
    }

    getCurState(state, props, isReset = false) {
        const events = isReset ? props.events : props.newEvents;
        const deletedEvent = props.deletedEvent;
        const newState = { ...state };

        let isStateChanged = false;
        isStateChanged = this.checkIsDeletedEventsInProps(
            newState,
            deletedEvent
        );

        const validEvents = this.getEventsByFilters(events, {
            status: null,
            sport: null,
            category: this.props.categoryIds
        });
        isStateChanged =
            this.shouldUpdateCurrentEvents(validEvents, newState) ||
            isStateChanged;

        if (!isStateChanged) {
            return state;
        }

        this.addEventsInState(newState, validEvents, props);
        newState.currentTournaments = this.getCurrentTournaments(
            newState.currentEvents,
            props
        );
        newState.currentSeasons = this.getCurrentSeasons(
            newState.currentEvents,
            props
        );
        return newState;
    }

    socketChange(props) {
        if (
            props.socket.socketState === "open" &&
            this.props.socket.socketState !== "open"
        ) {
            this.setState(this.getCurState(this.state, props, true));
        } else if (
            this.socket.socketState === "open" &&
            props.socket.socketState !== "open"
        ) {
            this.setState(this.initialState);
        }
    }

    getAllValidEvents(tIds) {
        const events = new Map();
        tIds.forEach(tId => {
            const eventIds = this.state.currentTournaments.get(tId).events;
            eventIds.forEach(eId => {
                const event = this.props.events.get(eId);
                if (!event) return;
                events.set(event.id, event);
            });
        });
        return events;
    }

    getPropsForSeason(season) {
        return {
            name: season.seasonName,
            key: season.seasonName,
            sportId: this.props.sportId,
            tournaments: [...season.tournaments].map(t =>
                this.state.currentTournaments.get(t)
            )
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        if (this.props.socket !== nextProps.socket) {
            this.socketChange(nextProps);
            return false;
        }
        const newState = this.getCurState(this.state, nextProps);
        if (newState !== this.state) {
            this.setState(newState);
            return false;
        }
        return false;
    }

    render() {
        console.log(this.state);
        return (
            <div className="long-term">
                {/* <Filter
          tournaments={this.getTournamentsPropsForFilter()}
          curT={this.getCurTforFilter()}
          onAllTournaments={this.getClickFuncOnFilterAllTournaments()}
          curSport={this.getCurSport()}
          isRemoveNeedRemoveFilters={true}
        /> */}
                {this.props.isOwnTable &&
                this.state.currentSeasons.size === 0 ? (
                    <Preloader />
                ) : (
                    [...this.state.currentSeasons.values()].map(season => {
                        return <Season {...this.getPropsForSeason(season)} />;
                    })
                )}
            </div>
        );
    }

    componentDidMount() {
        if (this.props.categoryIds) {
            requestOutrights(this.props.categoryIds, 0);
        }
        if (this.props.isHandleEmptyTable) {
            if (this.state.currentSeasons.size === 0) {
                this.props.handleEmptyTable(true);
            } else {
                this.props.handleEmptyTable(false);
            }
        }
    }

    componentDidUpdate() {
        if (this.props.isHandleEmptyTable) {
            if (this.state.currentSeasons.size === 0) {
                this.props.handleEmptyTable(true);
            } else {
                this.props.handleEmptyTable(false);
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        newEvents: state.server.eventsAndLines.newEvents,
        deletedEvent: state.server.eventsAndLines.deletedEvent,
        markets: state.server.entities.markets,
        marketsByNum: state.server.entities.marketsByNum,
        lines: state.server.eventsAndLines.lines,
        linesByCK: state.server.eventsAndLines.linesByCK,
        tournaments: state.server.entities.tournaments,
        categories: state.server.entities.categories,
        sports: state.server.entities.sports,
        timeFilter: state.filters.timeFilter,
        socket: state.socket
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: url => {
            dispatch(route("push", url));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableOutright);

export const getViewColsOutrightsTable = () => {
    const w = window.innerWidth;
    if (w >= 1366) {
        return 4;
    } else if (w >= 768) {
        return 3;
    } else {
        return 2;
    }
};

export const getWidth = () => {
    return window.innerWidth;
};
