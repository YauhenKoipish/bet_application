import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style/list-match.css";
import {
    transliterate,
    sortCallbackBySortIdAndName2,
    getSportByName,
    getFilterArraySportByName,
    isTournamentsInSport,
    getEthalonSortId,
    getUniqueArr,
    isArraysEqual
} from "../../../../Services/Shared";
import {
    addTournamentToFav,
    removeTournamentFromFav
} from "../../../../Actions/Components/Server/CurrentStates/";
import { openMenu, closeMenu } from "../../../../Actions/Components/Menu/";
import { route } from "../../../../Actions/Components/Navigation/";
import Category from "./Category";
import { Redirect } from "react-router-dom";
import { routsName } from "../../../../Router/RouterList";

class Sport extends Component {
    constructor(props) {
        super(props);
        this.isUpdate = false;
        this.initialState = {
            categories: new Map(),
            openCategory: null,
            statusFilter: this.getStatusFilter(this.rootPath),
            sportFilter: this.getSportFilter(props.match.params.sport),
            eventsWithCurrentSport: []
        };
        this.state = this.getCurState(this.props.sports, this.props.events);
    }

    //----------------------------SETTERS-GETTERS-------------------------

    get path() {
        if (this.state.statusFilter) return "/" + routsName.diect["live"];
        return "/prematch";
    }

    get rootPath() {
        return this.props.location.pathname.split("/")[1];
    }

    get ethalonSortId() {
        const sortIds = [...this.state.categories.values()]
            .map(cat => cat.category.sortId)
            .filter(sortId => sortId !== 0);
        return Math.min(...sortIds);
    }

    //----------------------------SETTERS-GETTERS-------------------------

    // getRootPath(path) {
    //     return path.split("/")[1];
    // }

    getSportFilter(match = this.props.match.params.sport) {
        if (!match) return [];
        return getFilterArraySportByName(match, this.props.sports);
    }

    getSportName() {
        return this.props.match.params.sport;
    }

    getGroupCategories(events, state) {
        const categories = new Map();
        let valueCategoryMap = {};
        events.forEach(event => {
            if (event.status === state.statusFilter) {
                if (categories.has(event.categoryId)) {
                    valueCategoryMap = categories.get(event.categoryId);
                    if (
                        !valueCategoryMap.tournaments.includes(
                            event.tournamentId
                        )
                    )
                        valueCategoryMap.tournaments.push(event.tournamentId);
                } else {
                    valueCategoryMap = {
                        categoryId: event.categoryId,
                        category: this.getCategoryById(event.categoryId),
                        tournaments: [event.tournamentId]
                    };
                }
                categories.set(event.categoryId, valueCategoryMap);
            }
        });
        this.props.categories.forEach(cat => {
            if (!state.sportFilter.includes(cat.sportId) || !cat.isOutright)
                return;
            if (!categories.has(cat.id)) {
                valueCategoryMap = {
                    categoryId: cat.id,
                    category: cat,
                    tournaments: []
                };
                categories.set(cat.id, valueCategoryMap);
            }
        });
        return categories;
    }

    getCategoryById(id) {
        if (this.props.categories.has(id)) return this.props.categories.get(id);
        else return null;
    }

    getTornamentById(id) {
        if (this.props.tournaments.has(id))
            return this.props.tournaments.get(id);
        else return null;
    }

    compareArrays(arr1, arr2) {
        if (JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort()))
            return true;
        else return false;
    }

    getStateWithNewCategories(categories, state, eventsWithCurrentSport) {
        let isNew = false;
        const stateCat = new Map(state.categories);
        categories.forEach(category => {
            if (!stateCat.has(category.categoryId)) {
                isNew = true;
                stateCat.set(category.categoryId, category);
            } else {
                if (
                    !this.compareArrays(
                        stateCat.get(category.categoryId).tournaments,
                        category.tournaments
                    )
                ) {
                    isNew = true;
                    stateCat.get(
                        category.categoryId
                    ).tournaments = getUniqueArr([
                        ...category.tournaments,
                        ...stateCat.get(category.categoryId).tournaments
                    ]);
                }
            }
        });
        if (isNew) {
            return {
                ...state,
                categories: stateCat,
                eventsWithCurrentSport: [
                    ...state.eventsWithCurrentSport,
                    eventsWithCurrentSport
                ]
            };
        } else return state;
    }

    getCurState(
        sports,
        events,
        sportName = this.props.match.params.sport,
        isReset = true,
        state = this.initialState
    ) {
        // const sport = sports.get(state.sportFilter);
        if (state.sportFilter.every(sportId => !sports.get(sportId)))
            return state;
        const eventsWithCurrentSport = [...events.values()].filter(event =>
            state.sportFilter.includes(event.sportId)
        );
        const categories = this.getGroupCategories(
            eventsWithCurrentSport,
            state
        );
        if (!isReset)
            return this.getStateWithNewCategories(
                categories,
                state,
                eventsWithCurrentSport
            );
        return {
            categories: categories,
            sportFilter: this.getSportFilter(sportName),
            eventsWithCurrentSport
        };
    }

    getSportByMatchParams(sports) {
        return getSportByName(sports, this.props.match.params.sport);
    }

    get isDataInComponent() {
        if (
            this.props.sports ||
            !this.props.tournaments ||
            !this.props.categories ||
            !this.props.events
        )
            return true;
        return false;
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

    getRootPath() {
        return "/categories/" + this.props.match.params.sport;
    }

    getStatusFilter(component) {
        switch (component) {
            case "live":
                return 1;
            case "prematch":
                return 0;
            default:
                if (!this.state) return 0;
                return this.state.statusFilter;
        }
    }

    checkReset(sport) {
        const sportIds = this.getSportFilter(sport);
        if (!isArraysEqual(sportIds, this.state.sportFilter)) return true;
        return false;
    }

    isReset(nextProps) {
        if (this.checkReset(nextProps.match.params.sport)) {
            this.setState(
                this.getCurState(
                    nextProps.sports,
                    nextProps.events,
                    nextProps.match.params.sport,
                    true,
                    this.initialState
                )
            );
            this.isUpdate = true;
            return true;
        }
        return false;
    }

    isFavSportsEqual(nextProps) {
        if (
            nextProps.favTournamentsPrematch !==
            this.props.favTournamentsPrematch
        ) {
            this.forceUpdate();
        }
    }

    isEventInFiltredEvents(eventId) {
        return [...this.state.eventsWithCurrentSport.values()].some(
            event => event.id === eventId
        );
    }

    isEventsInFiltredEvents(events) {
        return [...events.values()].some(event =>
            this.isEventInFiltredEvents(event.id)
        );
    }

    isChangedCategories(nextProps) {
        if (!this.isEventsInFiltredEvents(nextProps.newEvents)) return false;
        const state = this.getCurState(
            nextProps.sports,
            nextProps.newEvents,
            nextProps.match.params.sport,
            false,
            this.state
        );
        if (state !== this.state) {
            this.isUpdate = true;
            this.setState(state);
            return true;
        }
        return false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) return true;
        if (this.isReset(nextProps)) return false;
        if (!this.isDataInComponent) return false;
        this.isFavSportsEqual(nextProps);
        if (this.isChangedCategories(nextProps)) return false;
        return false;
    }

    getPropsForCategory(category) {
        return {
            name: category.category.name,
            key: category.categoryId,
            id: category.categoryId,
            isOutright: !!category.category.isOutright,
            isOpen:
                this.state.openCategory === category.categoryId ? true : false,
            tournaments: this.getPropsForTournaments(
                category.tournaments,
                category.category
            ),
            routeOutright: this.props
                .navigate(
                    this.getRootPath() +
                        "/" +
                        transliterate(category.category.name, true)
                )
                .bind(this, routsName.dict.dolgosrochnye),
            route: this.props
                .navigate(this.getRootPath())
                .bind(this, category.category.name),
            openCategory: this.openCategory.bind(this, category.categoryId),
            getFuncOnFav: this.getFuncOnFav.bind(this),
            checkIsTournamentInFav: this.checkIsTournamentInFav.bind(this)
        };
    }

    openCategory(catId) {
        this.isUpdate = true;
        this.setState({
            ...this.state,
            openCategory: catId === this.state.openCategory ? null : catId
        });
    }

    checkIsTournamentInFav(tId) {
        return this.props.favTournamentsPrematch.includes(tId);
    }

    getFuncOnFav(tId) {
        if (this.checkIsTournamentInFav(tId))
            return this.props.removeTournamentPrematchFromFav.bind(this, tId);
        else return this.props.addTournamentPrematchToFav.bind(this, tId);
    }

    getTournamentsByIds(ids) {
        if (this.props.tournaments.size === 0) return null;
        const tournaments = [];
        ids.forEach(id => {
            tournaments.push(this.props.tournaments.get(id));
        });
        return tournaments;
    }

    getPropsForTournaments(tournaments, category) {
        const tournamentsProps = [];
        tournaments.forEach(tournamentId => {
            const tournament = this.getTornamentById(tournamentId);
            if (!tournament) return;
            tournamentsProps.push({
                tournamentId: tournamentId,
                props: {
                    toFavFunc: this.getFuncOnFav(tournamentId),
                    key: tournamentId,
                    name: tournament.name,
                    isInFav: this.checkIsTournamentInFav(tournamentId),
                    route: this.props
                        .navigate(
                            this.getRootPath() +
                                "/" +
                                transliterate(category.name, true)
                        )
                        .bind(this, tournament.name)
                }
            });
        });
        return tournamentsProps;
    }

    render() {
        // console.log("render");
        if (this.state.categories.size === 0) {
            return <Redirect to={"/" + routsName.dict.prematch} />;
        }
        const sportIds = this.getSportFilter();
        const isMustRedirect = sportIds.every(
            sportId => !isTournamentsInSport(sportId)
        );
        if (isMustRedirect) {
            const sportName = transliterate(
                this.props.sports.get(sportIds[0]).name,
                true
            );
            return (
                <Redirect
                    to={
                        "/" +
                        routsName.dict.categories +
                        "/" +
                        sportName +
                        "/" +
                        routsName.dict.all
                    }
                />
            );
        }
        const ethalonSortId = getEthalonSortId(sportIds, "categories");
        return (
            <div className="list-match">
                {[...this.state.categories.values()]
                    .sort((a, b) =>
                        sortCallbackBySortIdAndName2(
                            a,
                            b,
                            "category",
                            null,
                            ethalonSortId
                        )
                    )
                    .map((category, i) => (
                        <Category {...this.getPropsForCategory(category)} />
                    ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        newEvents: state.server.eventsAndLines.newEvents,
        events: state.server.eventsAndLines.events,
        sports: state.server.entities.sports,
        tournaments: state.server.entities.tournaments,
        categories: state.server.entities.categories,
        currentSports: state.server.currentStates.sports,
        favSportsPrematch: state.server.currentStates.favSportsPrematch,
        favTournamentsPrematch:
            state.server.currentStates.favTournamentsPrematch
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleMenu: isOpen => {
            isOpen ? dispatch(openMenu()) : dispatch(closeMenu());
        },
        addTournamentPrematchToFav(tId) {
            dispatch(addTournamentToFav(tId, 0));
        },
        removeTournamentPrematchFromFav(sportId) {
            dispatch(removeTournamentFromFav(sportId, 0));
        },
        navigate: path => {
            return subStr => {
                dispatch(
                    route("push", path + "/" + transliterate(subStr, true))
                );
            };
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sport);
