import React, { Component } from "react";
import { connect } from "react-redux";

import { openMenu, closeMenu } from "../../Actions/Components/Menu/";
import { route } from "../../Actions/Components/Navigation/";
import {
    saveCurrentSports,
    addSportToFav,
    removeSportFromFav,
    removeTournamentFromFav,
    addEventToFav,
    removeEventFromFav
} from "../../Actions/Components/Server/CurrentStates/";
import NavBar from "../Header/Components/NavBar";
import Prematch from "./Components/Prematch/Prematch";
import Live from "./Components/Live/Live";
import { transliterate } from "../../Services/Shared";

import { changeActiveItem } from "../../Actions/Components/Menu/";

import { routsName } from "../../Router/RouterList";
import Search from "../../Components/TopNav/Components/Search";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.closeMenu = this.closeMenu.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.isUpdate = false;
        this.xDown = null;
        this.yDown = null;

        this.initialState = {
            currentSports: new Map(),
            // statusFilter: this.getStatusFilter(props.match.params.component),
            favSportsPrematch: props.favSportsPrematch,
            favTournamentsPrematch: props.favTournamentsPrematch,
            favSportsLive: props.favSportsLive,
            favEventsLive: props.favEventsLive
        };
        this.state = this.getCurState(this.initialState, props, true);
    }

    //----------------------------SETTERS-GETTERS-------------------------

    // get path() {
    //   if (this.state.statusFilter) return "/live";
    //   return "/prematch";
    // }

    get statusFilter() {
        return this.getStatusFilter(this.props.match.params.component);
    }

    //----------------------------SETTERS-GETTERS--------------------------

    //-----------------------------touches---------------------------------

    handleTouchEnd(event) {
        if (!this.xDown || !this.yDown) return;
        const xUp = event.changedTouches[0].clientX;
        const yUp = event.changedTouches[0].clientY;

        const xDiff = xUp - this.xDown;
        const yDiff = yUp - this.yDown;
        if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
            if (xDiff > 0) {
                if (this.xDown < 15 && !this.props.menu.isOpen)
                    this.props.toggleMenu(true);
            } else if (this.props.menu.isOpen) {
                this.props.toggleMenu(false);
            }
        }
        this.xDown = null;
        this.yDown = null;
    }

    getTouches(event) {
        return event.touches || event.originalEvent.touches;
    }

    handleTouchStart(event) {
        const firstTouch = this.getTouches(event)[0];
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
    }

    //-----------------------------touches---------------------------------

    closeMenu(event) {
        if (!event.target.closest(".left-menu")) {
            this.props.toggleMenu(false);
        }
    }

    isEventValid(event, statusFilter) {
        if (event.status === -1 || event.status === 3 || event.status === 4)
            return false;
        // if (event.numLinesForPrematch === 0) return false;
        if (event.status !== statusFilter) return false;
        return true;
    }

    deleteEventInSports(event, sports) {
        const events = sports.get(event.sportId);
        if (!events) return;
        const index = events.indexOf(event.id);
        if (index === -1) return;
        events.splice(index, 1);
        if (events.length === 0) {
            this.deleteSport(sports, event.sportId);
        }
    }

    deleteSport(sports, id) {
        sports.delete(id);
    }

    isDeletedEventInSports(event, sports) {
        return [...sports.keys()].some(sportId => event.sportId === sportId);
        // return [...sports.values()].some(events => events.includes(event.id));
    }

    getCurState(
        state = this.initialState,
        props,
        isReset = false,
        flag = false
        // statusFilter = this.statusFilter
    ) {
        const events = isReset ? props.events : props.newEvents;
        let isDeletedEvents = false;

        if (
            !this.props.activeLink ||
            this.props.activeLink !== this.props.location.pathname.split("/")[1]
        ) {
            const namesport = this.props.location.pathname.split("/")[1];
            if (namesport) this.props.changeActiveItem(namesport);
        }

        if (props.deletedEvent) {
            if (
                this.isDeletedEventInSports(
                    props.deletedEvent,
                    state.currentSports
                )
            ) {
                isDeletedEvents = true;
                this.deleteEventInSports(
                    props.deletedEvent,
                    state.currentSports
                );
            }
        }

        const newSports = !isReset ? new Map(state.currentSports) : new Map();
        let isChanges = false;
        events.forEach(event => {
            if (
                !this.isEventValid(
                    event,
                    this.getStatusFilter(props.match.params.component, props)
                )
            )
                return;
            if (!newSports.has(event.sportId)) {
                isChanges = true;
                const val = [event.id];
                const sId = event.sportId;

                newSports.set(sId, val);
            } else {
                if (!newSports.get(event.sportId).includes(event.id)) {
                    isChanges = true;
                    newSports.get(event.sportId).push(event.id);
                }
            }
        });
        if (!this.getStatusFilter(props.match.params.component, props)) {
            props.categories.forEach(cat => {
                if (!cat.isOutright) return;
                if (!newSports.has(cat.sportId)) {
                    isChanges = true;
                    const val = [];
                    const sId = cat.sportId;

                    newSports.set(sId, val);
                }
            });
        }

        if (
            isChanges ||
            (!isChanges && state.currentSports.length !== newSports.length) ||
            isDeletedEvents
        )
            return {
                ...state,
                currentSports: newSports
                // statusFilter: statusFilter
            };

        if (flag)
            return {
                ...state,
                currentSports: newSports
                // statusFilter: statusFilter
            };
        return state;
    }

    checkReset(component) {
        if (this.getStatusFilter(component) !== this.statusFilter) return true;
        return false;
    }

    getStatusInRospis(props) {
        const eventId = props.location.pathname.split("/")[5];
        if (!eventId) return 0;
        const event = props.events.get(eventId);
        if (
            !event ||
            event.status < 0 ||
            event.status === 3 ||
            event.status === 4
        )
            return 0;
        return event.status;
    }

    getStatusFilter(component, props = this.props) {
        switch (component) {
            case "live":
                return 1;
            case "categories":
            case "prematch":
                return 0;
            case "rospis":
                return this.getStatusInRospis(props);
            default:
                return 0;
        }
    }

    get isDataInComponent() {
        if (this.props.sports || !this.props.tournaments || !this.props.events)
            return true;
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

    isReset(nextProps) {
        if (this.checkReset(nextProps.match.params.component)) {
            this.setState(
                this.getCurState(
                    this.state,
                    nextProps,
                    true
                    // this.getStatusFilter(nextProps.match.params.component)
                )
            );
            // this.isUpdate = true;
            return true;
        }
        return false;
    }

    isStateEqual(nextProps) {
        const newState = this.getCurState(
            this.state,
            nextProps,
            false
            // this.getStatusFilter(nextProps.match.params.component)
        );
        if (this.state !== newState) {
            this.setState(newState);
            // this.isUpdate = true;
            return false;
        }
        return true;
    }

    updateFav(nextProps) {
        return {
            ...this.state,
            favSportsPrematch: nextProps.favSportsPrematch,
            favTournamentsPrematch: nextProps.favTournamentsPrematch,
            favSportsLive: nextProps.favSportsLive,
            favEventsLive: nextProps.favEventsLive
        };
    }

    isFavEqual(nextProps) {
        if (
            nextProps.favSportsPrematch !== this.state.favSportsPrematch ||
            nextProps.favTournamentsPrematch !==
                this.state.favTournamentsPrematch ||
            nextProps.favSportsLive !== this.state.favSportsLive ||
            nextProps.favEventsLive !== this.state.favEventsLive
        ) {
            this.setState(this.updateFav(nextProps));
            // this.isUpdate = true;
            return false;
        }
        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.activeLink !== nextProps.activeLink) return true;
        if (this.props.width_screen !== nextProps.width_screen) return true;
        if (this.state !== nextState) return true;
        if (!this.props.menu.isOpen && !nextProps.menu.isOpen) return false;
        if (!this.isFavEqual(nextProps)) return false;

        // if (this.props.menu.isOpen !== nextProps.menu.isOpen) {
        // if (nextProps.match.params.component === "rospis") debugger;
        const newState = this.getCurState(
            this.state,
            nextProps,
            this.props.menu.isOpen !== nextProps.menu.isOpen ||
                this.props.match.params.component !==
                    nextProps.match.params.component,
            nextProps.match.params.component !==
                this.props.match.params.component
        );
        if (this.state !== newState) {
            this.setState(newState);

            return false;
        }

        if (nextProps.menu.isOpen !== this.props.menu.isOpen) return true;

        // }
        // if (!this.isDataInComponent) return false;
        // if (this.isReset(nextProps)) return false;
        // if (!this.isStateEqual(nextProps)) return false;
        return false;
    }

    getSportsByIds(ids) {
        if (!ids) return [];
        if (this.props.sports.size === 0) return [];
        const sports = [];
        ids.forEach(id => {
            if (this.props.sports.has(id))
                sports.push(this.props.sports.get(id));
        });
        return sports;
    }

    getEventsByIds(ids) {
        if (!ids) return null;
        if (this.props.events.size === 0) return [];
        const events = [];
        ids.forEach(id => {
            if (this.props.events.has(id))
                events.push(this.props.events.get(id));
        });
        return events;
    }

    getTournamentsByIds(ids) {
        if (this.props.tournaments.size === 0) return [];
        const tournaments = [];
        ids.forEach(id => {
            if (this.props.tournaments.has(id))
                tournaments.push(this.props.tournaments.get(id));
        });
        return tournaments;
    }

    getFavSports() {
        if (this.statusFilter) {
            return null;
        } else {
            return this.getSportsByIds(this.props.favSportsPrematch);
        }
    }

    getFavTournaments() {
        if (this.statusFilter) {
            return null;
        } else {
            return this.getTournamentsByIds(this.props.favTournamentsPrematch);
        }
    }

    getFavTournamentsProps(tournamentsArr) {
        const tournaments = this.getTournamentsByIds(tournamentsArr);
        const outrights = this.getFavOutrights(tournamentsArr);
        return [...tournaments, ...outrights];
    }

    getFavOutrights(tournaments) {
        const outrights = [];
        tournaments.forEach(t => {
            if (t.match("outright")) {
                const catId = +t.split("_")[1];
                const category = this.props.categories.get(catId);
                if (!category || !category.isOutright) return;
                const sport = this.props.sports.get(category.sportId);
                if (!sport) return;
                outrights.push({
                    id: t,
                    name: "Долгосрочные (" + category.name + ")",
                    sportId: category.sportId,
                    sortId: Infinity,
                    isOutright: true,
                    url:
                        "/categories/" +
                        transliterate(sport.name, true) +
                        "/" +
                        transliterate(category.name, true) +
                        "/" +
                        routsName.dict.dolgosrochnye
                });
            }
        });
        return outrights;
    }

    getPropsForPrematch() {
        return {
            sports: this.getSportsByIds([...this.state.currentSports.keys()]),
            addSportToFav: this.props.addSportPrematchToFav(0),
            removeSportFromFav: this.props.removeSportPrematchFromFav(0),
            removeTournamentFromFav: this.props.removeTournamentPrematchFromFav,
            favSports: this.getSportsByIds(this.state.favSportsPrematch),
            favTournaments: this.getFavTournamentsProps(
                this.state.favTournamentsPrematch
            ),
            route: this.props.navigate(
                routsName.getRoutsUrl(routsName.dict.prematch)
            ),
            navigate: this.props.navigate(),
            navigateFunc: this.props.navigateFunc,
            sportsMap: this.props.sports,
            categoriesMap: this.props.categories
        };
    }

    getFavEventsBySports(currentSports, favSports) {
        const favEventsBySports = new Map(currentSports);
        favEventsBySports.forEach((events, sId) => {
            if (!favSports.includes(sId)) {
                favEventsBySports.delete(sId);
            }
        });
        return favEventsBySports;
    }

    getSportsForLive() {
        return this.getSportsByIds(
            [...this.state.currentSports.keys()].filter(
                sId => !this.state.favSportsLive.includes(sId)
            )
        );
    }

    toggleMenu(url) {
        if (url === "/prematch" || url === "/live") return;
        this.props.toggleMenu(false);
    }

    getPropsForLive() {
        return {
            sports: this.getSportsForLive(),
            eventsBySports: this.state.currentSports,
            favEventsBySports: this.getFavEventsBySports(
                this.state.currentSports,
                this.state.favSportsLive
            ),
            addSportToFav: this.props.addSportPrematchToFav(1),
            removeSportFromFav: this.props.removeSportPrematchFromFav(1),
            addEventToFav: this.props.addEventToFav(1),
            removeEventFromFav: this.props.removeEventFromFav(1),
            favSports: this.getSportsByIds(this.state.favSportsLive),
            favEvents: this.state.favEventsLive,
            navigate: this.props.navigate(),
            sportsMap: this.props.sports,
            route: this.props.navigate(
                routsName.getRoutsUrl(routsName.dict.live)
            ),
            categoriesMap: this.props.categories,
            eventsMap: this.props.events
        };
    }

    getClass() {
        const width = document.body.clientWidth;

        if (width < 1100) return "slideLeft inactive";

        return "";
    }

    getComponentsSearch() {
        const width = document.body.clientWidth;
        if (width < 1100) return false;
        return true;
    }

    render() {
        const statusFilter = this.statusFilter;

        return (
            <div
                className={
                    "left-menu" +
                    (!this.props.menu.isOpen ? this.getClass() : " slideRight")
                }
                id="left-menu-container"
            >
                {
                    <NavBar
                        route={this.props}
                        // handleClickNavBarItem={f => f}
                        handleClickNavBarItem={url =>
                            this.toggleMenu.call(this, url)
                        }
                    />
                }

                <div className="left-menu__sport-list">
                    {statusFilter ? (
                        <Live {...this.getPropsForLive()} />
                    ) : (
                        <>
                            {this.getComponentsSearch() ? (
                                <Search name={this.props.lang.search} />
                            ) : (
                                ""
                            )}
                            <Prematch
                                {...this.getPropsForPrematch()}
                                activeLink={this.props.activeLink}
                            />
                        </>
                    )}
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.props.menu.isOpen)
            document.body.addEventListener("click", this.closeMenu);
        else document.body.removeEventListener("click", this.closeMenu);
    }

    componentDidMount() {
        document.addEventListener("touchstart", this.handleTouchStart, false);
        document.addEventListener("touchend", this.handleTouchEnd, false);
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu,
        newEvents: state.server.eventsAndLines.newEvents,
        deletedEvent: state.server.eventsAndLines.deletedEvent,
        events: state.server.eventsAndLines.events,
        sports: state.server.entities.sports,
        categories: state.server.entities.categories,
        tournaments: state.server.entities.tournaments,
        currentSports: state.server.currentStates.sports,
        favSportsPrematch: state.server.currentStates.favSportsPrematch,
        favSportsLive: state.server.currentStates.favSportsLive,
        favEventsLive: state.server.currentStates.favEventsLive,
        favTournamentsPrematch:
            state.server.currentStates.favTournamentsPrematch,
        width_screen: state.width_screen,
        activeLink: state.menu.activeLink,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleMenu: isOpen => {
            isOpen ? dispatch(openMenu()) : dispatch(closeMenu());
        },
        saveCurrentSports: sports => {
            dispatch(saveCurrentSports(sports));
        },
        addSportPrematchToFav(status) {
            return sportId => dispatch(addSportToFav(sportId, status));
        },
        removeSportPrematchFromFav(status) {
            return sportId => dispatch(removeSportFromFav(sportId, status));
        },
        removeEventFromFav(status) {
            return eventId => dispatch(removeEventFromFav(eventId, status));
        },
        addEventToFav(status) {
            return eventId => dispatch(addEventToFav(eventId, status));
        },
        removeTournamentPrematchFromFav(tId) {
            dispatch(removeTournamentFromFav(tId, 0));
        },
        navigate: component => {
            return sport => {
                const path = component ? component : "/categories";
                dispatch(
                    route("push", path + "/" + transliterate(sport, true))
                );
                dispatch(closeMenu());
            };
        },
        navigateFunc: url => {
            dispatch(route("push", url));
            dispatch(closeMenu());
        },
        changeActiveItem: name => dispatch(changeActiveItem(name))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);

//export default Menu;
