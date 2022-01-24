import { connect } from "react-redux";
// import "./Style/left-menu.css";
// import "./Style/sport-left.css";
// import "./Style/line-live.css";
import { openMenu, closeMenu } from "../../Actions/Components/Menu/";
import { route } from "../../Actions/Components/Navigation/";
import {
  saveCurrentSports,
  addSportToFav,
  removeSportFromFav,
  removeTournamentFromFav
} from "../../Actions/Components/Server/CurrentStates/";
import { transliterate } from "../../Services/Shared";
import Menu from "./";
//import { getFlagMenuSelector, createCurrentSportsSelector } from "./Selectors/"

// Костыль ------------------
let lastComponent = null;

const compareComponents = prevVal => {
  return curVal => {
    if (curVal === prevVal) return false;
    if (curVal === "prematch" || curVal === "live") {
      if (lastComponent === curVal) return false;
      lastComponent = curVal;
      return true;
    }
    return false;
  };
};

let isEqualComponents = comp => {
  lastComponent = comp;
  return true;
};
// Костыль -----------------

const getFilterStatus = comp => {
  switch (comp) {
    case "live":
      return 1;
    case "prematch":
    default:
      return 0;
  }
};

let curSports = [];

const getCurrentSports = (isReset, filterStatus, events) => {
  const sports = isReset ? [] : [...curSports];
  if (!events) return sports;
  let isChanged = false;
  events.forEach(event => {
    if (event.status === filterStatus && !sports.includes(event.sportId)) {
      isChanged = true;
      sports.push(event.sportId);
    }
  });
  if (sports.length === 0 && curSports.length !== 0) {
    curSports = sports;
    return sports;
  }
  if (!isChanged) return curSports;
  curSports = sports;
  return sports;
};

const mapStateToProps = (state, props) => {
  const { events, newEvents } = state.server.eventsAndLines;
  const { sports, categories, tournaments } = state.server.entities;
  const {
    favSportsPrematch,
    favTournamentsPrematch
  } = state.server.currentStates;
  const isReset = isEqualComponents(props.match.params.component);
  isEqualComponents = compareComponents(props.match.params.component);
  const menu = state.menu;
  return {
    isOpen: state.menu.isOpen,
    currentSports: getCurrentSports(
      isReset,
      getFilterStatus(lastComponent),
      isReset ? events : newEvents
    ),
    events: events,
    sports: sports,
    categories: categories,
    tournaments: tournaments,
    favSportsPrematch: favSportsPrematch,
    favTournamentsPrematch: favTournamentsPrematch
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
        dispatch(route("push", path + "/" + transliterate(sport, true)));
        dispatch(closeMenu());
      };
    }
  };
};

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

export default MenuContainer;
