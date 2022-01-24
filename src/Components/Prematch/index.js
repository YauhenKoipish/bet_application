import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route} from "react-router-dom";
import Table from "../Main/Components/Table/";
import {
    getFilterArraySportByName,
    getFilterCategoryByName,
    getFilterTournamentByName,
    addStickyContent,
    addBetsWindowStyleWhenSticky,
    getEventIdsFromCurrentTickets,
    isTournamentsInSport,
    isFewEventsInSport
} from "../../Services/Shared";

import TableOutright from "../Main/Components/TableOutright/";
import TableWithOutrights from "../Main/Components/MergeTables/TableWithOutrights";

import { routsName } from "../../Router/RouterList";
class Prematch extends Component {
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
        return props;
    }

    getAllCategoriesInSport(props) {
        const sportVal = getFilterArraySportByName(
            props.match.params.sport,
            this.props.sports
        );

        const categories = [];
        this.props.categories.forEach(category => {
            if (sportVal.includes(category.sportId)) {
                categories.push(category.id);
            }
        });
        return categories;
    }

    getPropsForOutrightTable(props) {
        const sportVal = getFilterArraySportByName(
            props.match.params.sport,
            this.props.sports
        );
        const categoryVal = !props.match.params.category
            ? this.getAllCategoriesInSport(props)
            : [
                  getFilterCategoryByName(
                      props.match.params.category,
                      sportVal,
                      this.props.categories
                  )
              ];
        return {
            ...props,
            sportIds: sportVal,
            categoryIds: categoryVal
        };
    }

    getTableOnlyForSport(props) {
        const sportVal = getFilterArraySportByName(
            props.match.params.sport,
            this.props.sports
        );

        if (
            sportVal.every(
                sportId =>
                    isTournamentsInSport(sportId) &&
                    !isFewEventsInSport(sportId)
            )
        )
            return (
                <Table
                    {...this.getPropsForTable(
                        props,
                        0,
                        true,
                        false,
                        false,
                        this.props.timeFilter.active.val
                    )}
                    rootComponent="prematch"
                />
            );
        return (
            <TableWithOutrights
                Table={propsT => (
                    <Table
                        {...this.getPropsForTable(
                            props,
                            0,
                            true,
                            false,
                            false,
                            this.props.timeFilter.active.val
                        )}
                        rootComponent="prematch"
                        {...propsT}
                        infinityCountEvents={true}
                    />
                )}
                TableOutright={propsT => (
                    <TableOutright
                        {...this.getPropsForOutrightTable(props)}
                        rootComponent="prematch"
                        {...propsT}
                    />
                )}
            />
        );
    }

    shouldComponentUpdate(nextProps) {
        if (
            ((nextProps.favEventsLive !== this.props.favEventsLive ||
                nextProps.favEventsPrematch !== this.props.favEventsPrematch) &&
                nextProps.location.pathname ===
                    "/" +
                        routsName.dict.prematch +
                        "/" +
                        routsName.dict.moi_matchi) ||
            nextProps.timeFilter !== this.props.timeFilter ||
            nextProps.location.pathname !== this.props.location.pathname ||
            (nextProps.tickets !== this.props.tickets &&
                this.props.location.pathname ===
                    "/" +
                        routsName.dict.prematch +
                        "/" +
                        routsName.dict.moi_matchi)
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
                            routsName.dict.prematch,
                            ":sport/:category",
                            routsName.dict.dolgosrochnye
                        )}
                        component={props => (
                            <TableWithOutrights
                                Table={propsT => (
                                    <Table
                                        {...this.getPropsForTable(
                                            props,
                                            0,
                                            true,
                                            true,
                                            true,
                                            this.props.timeFilter.active.val
                                        )}
                                        rootComponent="prematch"
                                        {...propsT}
                                        infinityCountEvents={true}
                                    />
                                )}
                                TableOutright={propsT => (
                                    <TableOutright
                                        {...this.getPropsForOutrightTable(
                                            props
                                        )}
                                        rootComponent="prematch"
                                        {...propsT}
                                    />
                                )}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.prematch,
                            ":sport/:category/:tournament"
                        )}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(
                                    props,
                                    0,
                                    true,
                                    true,
                                    true,
                                    this.props.timeFilter.active.val
                                )}
                                rootComponent="prematch"
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.prematch,
                            ":sport/:category"
                        )}
                        component={props => (
                            <TableWithOutrights
                                Table={propsT => (
                                    <Table
                                        {...this.getPropsForTable(
                                            props,
                                            0,
                                            true,
                                            true,
                                            false,
                                            this.props.timeFilter.active.val
                                        )}
                                        rootComponent="prematch"
                                        infinityCountEvents={true}
                                    />
                                )}
                                TableOutright={propsT => (
                                    <TableOutright
                                        {...this.getPropsForOutrightTable(
                                            props
                                        )}
                                        rootComponent="prematch"
                                        {...propsT}
                                    />
                                )}
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.prematch,
                            routsName.dict.moi_matchi
                        )}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(
                                    props,
                                    [0, 1],
                                    false,
                                    false,
                                    false,
                                    Infinity,
                                    false,
                                    true
                                )}
                                rootComponent="prematch"
                            />
                        )}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.prematch,
                            ":sport"
                        )}
                        component={props => this.getTableOnlyForSport(props)}
                    />
                    <Route
                        path={routsName.getRoutsUrl(routsName.dict.prematch)}
                        component={props => (
                            <Table
                                {...this.getPropsForTable(
                                    props,
                                    0,
                                    false,
                                    false,
                                    false,
                                    this.props.timeFilter.active.val
                                )}
                                rootComponent="prematch"
                            />
                        )}
                    />
                </Switch>
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
        tickets: state.user.info.tickets
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Prematch);
