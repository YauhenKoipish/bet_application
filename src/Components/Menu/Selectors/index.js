import {
  createSelector
} from "reselect";

// ------------------OPEN_MENU-----------------------
const isOpenMenu = state => state.menu.isOpen;

export const getFlagMenuSelector = createSelector(
  isOpenMenu,
  isOpenMenu => isOpenMenu
);
// ------------------OPEN_MENU-----------------------

// -----------------CURRENT_SPORTS-------------------

const getSportsByIds = (ids, sports) => {
  if (!ids) return null;
  if (sports.size === 0) return null;
  const sportsArr = [];
  ids.forEach(id => {
    const sportById = getSportById(id, sports);
    if (sportById) sportsArr.push(sportById);
  });
  return sportsArr;
};

const getSportById = (id, sports) => {
  if (!id) return null;
  if (sports.size === 0) return null;
  if (sports.has(id)) return sports.get(id);
  return null;
};

const getTournamentsByIds = (ids, tournaments) => {
  if (!ids) return null;
  if (tournaments.size === 0) return null;
  const tournamentsArr = [];
  ids.forEach(id => {
    const tournamentsById = getTournamentsById(id, tournaments);
    if (tournamentsById) tournamentsArr.push(tournamentsById);
  });
  return tournamentsArr;
};

const getTournamentsById = (id, tournaments) => {
  if (!id) return null;
  if (tournaments.size === 0) return null;
  if (tournaments.has(id)) return tournaments.get(id);
  return null;
};

const getSports = state => state.server.entities.sports;

const getSportsKeys = state => state.server.entities.sports.keys();

const getCategories = state => state.server.entities.categories;

const getTournaments = state => state.server.entities.tournaments;

const getEvents = state => state.server.eventsAndLines.events;

const getNewEvents = state => state.server.eventsAndLines.newEvents;

const getComponent = (_, props) => props.match.params.component;

export const getSportsSelector = createSelector(
  getSports,
  sports => sports
);

//const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
//
//export const createCurrentSportsSelector = (isReset, filterStatus, sports) => {
//    const getNewCurrentSports = createGetNewCurrentSports(isReset, filterStatus);
//    return createDeepEqualSelector(
//        getNewCurrentSports,
//        (currentSports) => {
//            const sportsArray = [];
//            currentSports.forEach(sportId => {
//                const sport = getSportById(sportId, sports)
//                if(sport)
//                    sportsArray.push(sport);
//            })
//            return sportsArray;
//        }
//    );
// }

//export const getCurrentSportsSelector = createSelector();

// -----------------CURRENT_SPORTS-------------------

//export const MenuSelector = createSelector(
//    [getVisibilityFilter, getTodos],
//    (visibilityFilter, todos) => {
//        switch (visibilityFilter) {
//            case "SHOW_COMPLETED":
//                return todos.filter(todo => todo.completed);
//            case "SHOW_ACTIVE":
//                return todos.filter(todo => !todo.completed);
//            default:
//                return todos;
//        }
//    }
//);

//constructor(props) {
//    super(props);
//    this.props = props;
//    this.closeMenu = this.closeMenu.bind(this);
//    this.handleTouchStart = this.handleTouchStart.bind(this);
//    this.handleTouchEnd = this.handleTouchEnd.bind(this);
//    this.xDown = null;
//    this.yDown = null;
//    this.setPath(this.getRootPath(props.location.pathname));
//}
//
//closeMenu(event) {
//    if (!event.target.closest(".left-menu")) {
//        this.props.toggleMenu(false);
//    }
//}
//
//getRootPath(path) {
//    return "/" + path.split("/")[1];
//}
//
//setPath(path) {
//    switch (path) {
//        case "/live":
//            this.path = "/live";
//            break;
//        case "/prematch":
//        default:
//            this.path = "/prematch";
//            break;
//    }
//}
//
//getPath(path) {
//    switch (path) {
//        case "/live":
//            return "/live";
//        case "/prematch":
//            return "/prematch";
//        default:
//            return this.path;
//    }
//}
//
//getComponentFilterValue() {
//    switch (this.path) {
//        case "/live":
//            return 1;
//        case "/prematch":
//        default:
//            return 0;
//    }
//}
//
//componentDidUpdate() {
//    if (this.props.menu.isOpen)
//        document.body.addEventListener("click", this.closeMenu);
//    else document.body.removeEventListener("click", this.closeMenu);
//}
//
//handleTouchEnd(event) {
//    if (!this.xDown || !this.yDown) return;
//    const xUp = event.changedTouches[0].clientX;
//    const yUp = event.changedTouches[0].clientY;
//
//    const xDiff = xUp - this.xDown;
//    const yDiff = yUp - this.yDown;
//    if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
//        if (xDiff > 0) {
//            if (this.xDown < 15 && !this.props.menu.isOpen)
//                this.props.toggleMenu(true);
//        } else if (this.props.menu.isOpen) {
//            this.props.toggleMenu(false);
//        }
//    }
//    this.xDown = null;
//    this.yDown = null;
//}
//
//getTouches(event) {
//    return event.touches || event.originalEvent.touches;
//}
//
//handleTouchStart(event) {
//    const firstTouch = this.getTouches(event)[0];
//    this.xDown = firstTouch.clientX;
//    this.yDown = firstTouch.clientY;
//}
//
//componentDidMount() {
//    document.addEventListener("touchstart", this.handleTouchStart, false);
//    document.addEventListener("touchend", this.handleTouchEnd, false);
//}
//
//checkCurrentSports(path) {
//    let isReset = false;
//    if (this.getPath(path) !== this.path) {
//        isReset = true;
//        this.setPath(path);
//    }
//    const newSports = this.formSports(isReset ? this.props.events : this.props.newEvents, isReset);
//    if (newSports !== this.props.currentSports) {
//        this.props.saveCurrentSports(newSports);
//    }
//}
//
//shouldComponentUpdate(nextProps) {
//    if(!this.props.sports || !this.props.tournaments || !this.props.events) return false;
//    this.checkCurrentSports(
//        this.getRootPath(nextProps.location.pathname)
//    );
//    if (
//        nextProps.currentSports !== this.props.currentSports ||
//        nextProps.menu.isOpen !== this.props.menu.isOpen ||
//        (nextProps.favSportsPrematch !== this.props.favSportsPrematch && nextProps.sports) ||
//        (nextProps.favTournamentsPrematch !== this.props.favTournamentsPrematch && nextProps.tournaments)
//    ) {
//        return true;
//    } else return false;
//}
//
//formSports(events, isReset = false) {
//    if (events) {
//        const { currentSports } = this.props;
//        const newSports = !isReset ? [...currentSports] : [];
//        let isChanges = false;
//        events.forEach(event => {
//            if (
//                event.status === this.getComponentFilterValue() &&
//                !newSports.includes(event.sportId)
//            ) {
//                isChanges = true;
//                newSports.push(event.sportId);
//            }
//        });
//        if (isChanges) return newSports;
//        else return currentSports;
//    }
//}
//
//getSportsByIds(ids) {
//    if (!ids) return null;
//    if (this.props.sports.size === 0) return null;
//    const sports = [];
//    ids.forEach(id => {
//        if(this.props.sports.has(id))
//            sports.push(this.props.sports.get(id));
//    });
//    return sports;
//}
//
//getTournamentsByIds(ids){
//    if (this.props.tournaments.size === 0) return null;
//    const tournaments = [];
//    ids.forEach(id => {
//        if(this.props.tournaments.has(id))
//            tournaments.push(this.props.tournaments.get(id));
//    });
//    return tournaments;
//}
//
//
//getFavSports(){
//    if(this.getComponentFilterValue()){
//        return null;
//    }else{
//        return this.getSportsByIds(this.props.favSportsPrematch);
//    }
//}
//
//getFavTournaments(){
//    if(this.getComponentFilterValue()){
//        return null;
//    }else{
//        return this.getTournamentsByIds(this.props.favTournamentsPrematch);
//    }
//}
