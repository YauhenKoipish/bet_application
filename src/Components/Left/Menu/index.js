import React, { Component } from "react";
import { connect } from "react-redux";
// import "../Style/left-menu.css";
// import "../Style/sport-left.css";
import { openMenu, closeMenu } from "../../../Actions/Components/Menu/";
import { route } from "../../../Actions/Components/Navigation/";
import {
    saveCurrentSports,
    addSportToFav,
    removeSportFromFav,
    removeTournamentFromFav
} from "../../../Actions/Components/Server/CurrentStates/";
import FavSports from "./FavSports";
import Sports from "./Sports";
import NavBar from "../../Header/Components/NavBar";
import { transliterate } from "../../../Services/Shared";
import { routsName } from "../../../Router/RouterList";
class Menu extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.closeMenu = this.closeMenu.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.xDown = null;
        this.yDown = null;
        this.setPath(this.getRootPath(props.location.pathname));
    }

    closeMenu(event) {
        if (!event.target.closest(".left-menu")) {
            this.props.toggleMenu(false);
        }
    }

    getRootPath(path) {
        return "/" + path.split("/")[1];
    }

    setPath(path) {
        switch (path) {
            case "/" + routsName.dict["live"]:
                this.path = "/" + routsName.dict["live"];
                break;
            case "/":
            default:
                this.path = "/" + routsName.dict["prematch"];
                break;
        }
    }

    getPath(path) {
        switch (path) {
            case "/" + routsName.dict["live"]:
                return "/" + routsName.dict["live"];
            case "/" + routsName.dict["prematch"]:
                return "/" + routsName.dict["prematch"];
            default:
                return this.path;
        }
    }

    getComponentFilterValue() {
        switch (this.path) {
            case "/" + routsName.dict["live"]:
                return 1;
            case "/" + routsName.dict["prematch"]:
            default:
                return 0;
        }
    }

    componentDidUpdate() {
        if (this.props.menu.isOpen)
            document.body.addEventListener("click", this.closeMenu);
        else document.body.removeEventListener("click", this.closeMenu);
    }

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

    componentDidMount() {
        document.addEventListener("touchstart", this.handleTouchStart, false);
        document.addEventListener("touchend", this.handleTouchEnd, false);
    }

    checkCurrentSports(path) {
        let isReset = false;
        if (this.getPath(path) !== this.path) {
            isReset = true;
            this.setPath(path);
        }
        const newSports = this.formSports(
            isReset ? this.props.events : this.props.newEvents,
            isReset
        );
        if (newSports !== this.props.currentSports) {
            this.props.saveCurrentSports(newSports);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (!this.props.sports || !this.props.tournaments || !this.props.events)
            return false;
        this.checkCurrentSports(this.getRootPath(nextProps.location.pathname));
        if (
            nextProps.currentSports !== this.props.currentSports ||
            nextProps.menu.isOpen !== this.props.menu.isOpen ||
            (nextProps.favSportsPrematch !== this.props.favSportsPrematch &&
                nextProps.sports) ||
            (nextProps.favTournamentsPrematch !==
                this.props.favTournamentsPrematch &&
                nextProps.tournaments)
        ) {
            return true;
        } else return false;
    }

    formSports(events, isReset = false) {
        if (events) {
            const { currentSports } = this.props;
            const newSports = !isReset ? [...currentSports] : [];
            let isChanges = false;
            events.forEach(event => {
                if (
                    event.status === this.getComponentFilterValue() &&
                    !newSports.includes(event.sportId)
                ) {
                    isChanges = true;
                    newSports.push(event.sportId);
                }
            });
            if (isChanges) return newSports;
            else return currentSports;
        }
    }

    getSportsByIds(ids) {
        if (!ids) return null;
        if (this.props.sports.size === 0) return null;
        const sports = [];
        ids.forEach(id => {
            if (this.props.sports.has(id))
                sports.push(this.props.sports.get(id));
        });
        return sports;
    }

    getTournamentsByIds(ids) {
        if (this.props.tournaments.size === 0) return null;
        const tournaments = [];
        ids.forEach(id => {
            if (this.props.tournaments.has(id))
                tournaments.push(this.props.tournaments.get(id));
        });
        return tournaments;
    }

    getFavSports() {
        if (this.getComponentFilterValue()) {
            return null;
        } else {
            return this.getSportsByIds(this.props.favSportsPrematch);
        }
    }

    getFavTournaments() {
        if (this.getComponentFilterValue()) {
            return null;
        } else {
            return this.getTournamentsByIds(this.props.favTournamentsPrematch);
        }
    }

    render() {
        return (
            <div
                className={
                    "left-menu" + (!this.props.menu.isOpen ? " inactive" : "")
                }
            >
                {<NavBar route={this.props} />}
                <div className="left-menu__sport-list">
                    {
                        <FavSports
                            isLive={this.getComponentFilterValue()}
                            sports={this.getFavSports()}
                            tournaments={this.getFavTournaments()}
                            removeSport={this.props.removeSportPrematchFromFav}
                            removeTournament={
                                this.props.removeTournamentPrematchFromFav
                            }
                            navigate={this.props.navigate(this.path)}
                            sportsMap={this.props.sports}
                            categoriesMap={this.props.categories}
                        />
                    }
                    {
                        <Sports
                            sports={this.getSportsByIds(
                                this.props.currentSports
                            )}
                            onPlus={this.props.addSportPrematchToFav}
                            onMinus={this.props.removeSportPrematchFromFav}
                            favSports={this.props.favSportsPrematch}
                            navigate={this.props.navigate(this.path)}
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu,
        newEvents: state.server.eventsAndLines.newEvents,
        events: state.server.eventsAndLines.events,
        sports: state.server.entities.sports,
        categories: state.server.entities.categories,
        tournaments: state.server.entities.tournaments,
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
        saveCurrentSports: sports => {
            dispatch(saveCurrentSports(sports));
        },
        addSportPrematchToFav(sportId) {
            dispatch(addSportToFav(sportId));
        },
        removeSportPrematchFromFav(sportId) {
            dispatch(removeSportFromFav(sportId));
        },
        removeTournamentPrematchFromFav(tId) {
            dispatch(removeTournamentFromFav(tId));
        },
        navigate: path => {
            return sport => {
                dispatch(
                    route("push", path + "/" + transliterate(sport, true))
                );
                dispatch(closeMenu());
            };
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
