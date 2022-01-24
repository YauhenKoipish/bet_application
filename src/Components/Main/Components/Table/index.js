import React, { Component } from "react";
import { connect } from "react-redux";
import { route } from "../../../../Actions/Components/Navigation/";
import {
  sortCallbackBySortIdAndName3,
  transliterate,
  sortCallbackByProp,
  isArraysEqual,
  getUrlForRospis,
  isTournamentsInSport,
  getEthalonSortId
} from "../../../../Services/Shared";
import Tournament from "./Tournament/";
import Filter from "./Filter/";
import EmptyTable from "./EmptyTable/";
// import "./style/main-table.css";
// import "./style/dropdown.css";
// import "./style/line.css";
import { isDevelop } from "../../../../Constants/";
import { routsName } from "../../../../Router/RouterList";
let MAX_TOURNAMENTS_ON_PAGE;

class Table extends Component {
  constructor(props) {
    super(props);
    this.HEIGHT_TO_BOTTOM_BLOCK_ON_SCROLL = 100;
    this.STEP_TOURNAMENTS_ON_PAGE = 9;
    MAX_TOURNAMENTS_ON_PAGE = props.infinityCountEvents ? Infinity : 9;
    this.tableElem = React.createRef();
    this.isUpdate = false;
    this.funcLoadMoreEvents = this.loadMoreEvents.bind(this);
    this.initialState = {
      currentEvents: [],
      currentTournaments: new Map(),
      shownEvents: [],
      shownTournaments: [],
      filters: props.filters,
      openedTournaments: []
    };
    this.state = this.getCurState(this.initialState, props, true);
  }

  get isUpdate() {
    if (this._isBeUpdated) {
      this._isBeUpdated = false;
      this.isBlockScroll = false;
      return true;
    }
    return false;
  }

  set isUpdate(val) {
    this._isBeUpdated = val;
    this.isBlockScroll = val;
  }

  removeNullEvents(events) {
    return events.filter(ev => {
      if (!this.props.events.has(ev)) console.log("не нашел " + ev);
      return this.props.events.has(ev);
    });
  }

  isArraysEqual(arr1, arr2) {
    return arr1.every(el => arr2.includes(el));
  }

  getEventsByFilters(events, filters) {
    if (events.size === 0) return [];
    const validEvents = [];

    events.forEach(event => {
      if (event.id == "0015109681") debugger;
      if (!this.isEventValid(event, filters)) {
        if (validEvents.includes(event.id))
          this.deleteElemInArray(event.id, validEvents);
        return;
      }
      if (!validEvents.includes(event.id)) validEvents.push(event.id);
    });
    return validEvents;
  }

  isEventValid(event, filters) {
    const time = new Date().getTime();

    if (event.status === -1 || event.status === 3 || event.status === 4) {
      return false;
    }
    // if (event.numLinesForPrematch === 0) {
    // return false;
    // }
    if (filters.isTranslation && event.videoProviderId === 0) {
      return false;
    }
    if (filters.isFav && !filters.favEvents.includes(event.id)) {
      return false;
    }
    if (
      filters.time !== Infinity &&
      (event.timeSpanStart - time < 0 ||
        event.timeSpanStart - time > filters.time)
    ) {
      return false;
    }
    if (!filters.status.includes(event.status)) {
      return false;
    }
    if (filters.sport !== null && !filters.sport.includes(event.sportId)) {
      return false;
    }
    if (
      filters.category !== null &&
      !filters.category.includes(event.categoryId)
    ) {
      return false;
    }
    if (
      filters.tournament !== null &&
      !filters.tournament.includes(event.tournamentId)
    ) {
      return false;
    }
    return true;
  }

  deleteElemInArray(elem, array) {
    const index = array.indexOf(elem);
    if (index !== -1) array.splice(index, 1);
  }

  checkIsEventsInStateWithSameTournament(state, deletedEvent) {
    if (!deletedEvent) return false;
    return state.currentEvents.some(ev => {
      const event = this.props.events.get(ev);
      if (!event) return true;
      return deletedEvent.tournamentId === event.tournamentId;
    });
  }

  deleteEventInTournamentsState(state, deletedEvent) {
    const isMustBeDeleted = this.checkIsEventsInStateWithSameTournament(
      state,
      deletedEvent
    );
    if (isMustBeDeleted) {
      const tournament = state.currentTournaments.get(
        deletedEvent.tournamentId
      );
      if (tournament)
        this.deleteElemInArray(deletedEvent.id, tournament.events);
      else
        console.warn("не нашел турнир", deletedEvent, state.currentTournaments);
      if (tournament && tournament.events.length === 0) {
        state.currentTournaments.delete(deletedEvent.tournamentId);
        this.deleteElemInArray(
          deletedEvent.tournamentId,
          state.shownTournaments
        );
      }
    }
  }

  checkIsDeletedEventsInProps(state, deletedEvent) {
    if (deletedEvent && state.currentEvents.includes(deletedEvent.id)) {
      // console.log("удаляю event " + deletedEvent.id);
      this.deleteEventInTournamentsState(state, deletedEvent);
      this.deleteElemInArray(deletedEvent.id, state.currentEvents);
      this.deleteElemInArray(deletedEvent.id, state.shownEvents);
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

  getCurrentTournaments(events, props = this.props) {
    const tournaments = new Map();
    events.forEach(ev => {
      const event = props.events.get(ev);
      if (!event) {
        return;
      }
      if (tournaments.has(event.tournamentId)) {
        if (!tournaments.get(event.tournamentId).events.includes(event.id))
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

  // getEthalonSortId(tIds, props) {
  //   const sortIds = [...tIds]
  //     .map(tId => props.tournaments.get(tId).sortId)
  //     .filter(sortId => sortId !== 0);
  //   return Math.min(...sortIds);
  // }

  getTournamentForSort(t, props) {
    const tournament = props.tournaments.get(t);
    if (!tournament) return t;
    const category = props.categories.get(tournament.categoryId);
    if (!category) return t;
    const name = category.name + ". " + t.name;

    return {
      ...tournament,
      name
    };
  }

  getSortedTournaments(tournaments, props = this.props) {
    const ethalonSortId = getEthalonSortId(
      this.props.filters.sport,
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

  getShownTournaments(state, props = this.props) {
    const sortedTournaments = this.getSortedTournaments(
      state.currentTournaments,
      props
    ).slice(0, MAX_TOURNAMENTS_ON_PAGE);

    return sortedTournaments;
  }

  getShownEvents(state) {
    let shownEvents = [];
    state.shownTournaments.forEach(t => {
      state.currentTournaments.get(t).events.forEach(event => {
        shownEvents.push(event);
      });
    });
    return shownEvents;
  }

  deleteEventsWhichChangedStatus(state, events, props) {
    // debugger;
    if (state.currentEvents.length === 0) return false;
    let isChanged = false;
    events.forEach(ev => {
      if (
        state.currentEvents.includes(ev.id) &&
        !this.isEventValid(ev, props.filters)
      ) {
        this.deleteElemInArray(ev.id, state.currentEvents);
        isChanged = true;
      }
    });
    return isChanged;
  }

  getCurState(state, props, isReset = false) {
    const events = isReset ? props.events : props.newEvents;
    const deletedEvent = props.deletedEvent;
    const newState = { ...state };

    // debugger;
    let isStateChanged = false;
    isStateChanged = this.checkIsDeletedEventsInProps(newState, deletedEvent);

    const validEvents = this.getEventsByFilters(events, props.filters);
    isStateChanged =
      this.shouldUpdateCurrentEvents(validEvents, newState) || isStateChanged;

    isStateChanged =
      isStateChanged ||
      this.deleteEventsWhichChangedStatus(newState, events, props);

    if (!isStateChanged) {
      return state;
    }

    this.addEventsInState(newState, validEvents, props);
    newState.currentTournaments = this.getCurrentTournaments(
      newState.currentEvents,
      props
    );

    newState.shownTournaments = this.getShownTournaments(newState, props);
    newState.shownEvents = this.getShownEvents(newState);
    return newState;
  }

  //  rospis/bejsbol/avstraliya/abl/0015021083/main
  handleClickRospis(eId) {
    const url = getUrlForRospis(eId).replace(" ", "_");

    if (!url) return;
    this.props.navigate(url);
  }

  getPropsForTournament(tId) {
    return this.props.tournaments.get(tId);
  }

  getPropsForEventsInT(tId) {
    if (!tId) return [];
    const tournament = this.state.currentTournaments.get(tId);
    if (!tournament) return [];
    let events = tournament.events;
    events = events.sort((a, b) =>
      sortCallbackByProp(a, b, "timeSpanStart", this.props.events)
    );
    const eventsForT = [];
    events.forEach(ev => {
      if (this.props.events.has(ev)) eventsForT.push(this.props.events.get(ev));
    });
    return eventsForT;
  }

  getTournamentName(tId) {
    const t = this.props.tournaments.get(tId);
    if (!t) return "";
    const cat = this.props.categories.get(t.categoryId);
    if (!cat) return "";
    return (
      t.name +
      " (" +
      cat.name +
      ")" +
      (isDevelop || this.props.isBookmaker ? "sortId - " + t.sortId : "")
    );
  }

  toggleTournament(tId) {
    const openedT = [...this.state.openedTournaments];
    if (openedT.includes(tId)) {
      openedT.splice(openedT.indexOf(tId), 1);
    } else {
      openedT.push(tId);
    }
    this.setState({
      ...this.state,
      openedTournaments: openedT
    });
  }

  checkIsOpenTournament(tId) {
    return !this.state.openedTournaments.includes(tId);
  }

  loadMoreEvents() {
    if (MAX_TOURNAMENTS_ON_PAGE === Infinity) return;
    const elem = this.tableElem.current;
    if (elem) {
      const heightToBottomBlock =
        elem.getBoundingClientRect().bottom - window.innerHeight;
      if (heightToBottomBlock < this.HEIGHT_TO_BOTTOM_BLOCK_ON_SCROLL) {
        MAX_TOURNAMENTS_ON_PAGE += this.STEP_TOURNAMENTS_ON_PAGE;
        if (this.state.currentTournaments.size < MAX_TOURNAMENTS_ON_PAGE)
          MAX_TOURNAMENTS_ON_PAGE = Infinity;

        const newState = { ...this.state };
        newState.shownTournaments = this.getShownTournaments(
          newState,
          this.props
        );
        newState.shownEvents = this.getShownEvents(newState);
        this.setState(newState);
      }
    }
  }

  changeFilterLines(val) {
    this.isUpdate = true;
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        lines: val
      }
    });
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

  getTournamentsPropsForFilter() {
    const props = [];
    const isCategory = this.props.rootComponent === "categories" ? true : false;
    const validEvents = this.getEventsByFilters(this.props.events, {
      ...this.state.filters,
      tournament: null,
      category: isCategory ? this.state.filters.category : null
    });

    const tournaments = this.getCurrentTournaments(validEvents);
    // validEvents.forEach(ev => this.updateCurrentTournaments(tournaments, ev));

    const sortedT = this.getSortedTournaments(tournaments);
    sortedT.forEach(t => {
      const tournament = this.getPropsForTournament(t);
      if (!tournament) return;
      props.push({
        name: this.getTournamentName(t),
        click: this.getClickFuncForTournamentFilter(tournament)
      });
    });
    this.addOutrightsToFilter(props);
    return props;
  }

  getClickFuncForOutrightTournamentFilter(cat, root) {
    if (!cat) return f => f;

    const component = "/" + root;
    const sport = this.props.sports.get(cat.sportId);
    if (!sport) return f => f;
    const sportN = transliterate(sport.name, true);

    const categoryN = transliterate(cat.name, true);

    const tournamentN = routsName.dict.dolgosrochnye;
    return () =>
      this.props.navigate(
        component + "/" + sportN + "/" + categoryN + "/" + tournamentN
      );
  }

  addOutrightsToFilter(filterProps) {
    if (
      this.props.rootComponent !== "categories" &&
      this.props.rootComponent !== "prematch"
    )
      return;
    const validCategories = this.getValidCategoriesForOutrightFilter(
      filterProps
    );
    if (!validCategories || validCategories.length === 0) return;
    validCategories.forEach(cat => {
      filterProps.push({
        name: this.props.lang.long + "(" + cat.name + ")",
        click: this.getClickFuncForOutrightTournamentFilter(
          cat,
          this.props.rootComponent
        )
      });
    });
  }

  getValidCategoriesForOutrightFilter() {
    if (
      this.state.filters.category === null ||
      this.props.rootComponent === "prematch"
    ) {
      if (!this.state.filters.sport) return null;
      return [...this.props.categories.values()].filter(
        cat => cat.isOutright && this.state.filters.sport.includes(cat.sportId)
      );
    }
    return [...this.props.categories.values()].filter(
      cat => cat.isOutright && this.state.filters.category.includes(cat.id)
    );
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
      return "/" + this.props.rootComponent + "/" + sport + "/" + category;
    }
    return "/" + this.props.rootComponent + "/" + (sport ? sport : "");
  }

  getClickFuncOnFilterAllTournaments() {
    return () =>
      this.props.navigate(this.getURLForClickFuncOnFilterAllTournaments());
  }

  getCurSport() {
    return this.props.filters.sport && this.props.filters.sport.length !== 0
      ? this.props.sports.get(this.props.filters.sport[0])
      : null;
  }

  getCurTforFilter() {
    if (
      !this.state.filters.tournament ||
      this.state.filters.tournament.length === 0
    )
      return "";
    if (
      (this.props.rootComponent === "categories" ||
        this.props.rootComponent === "prematch") &&
      !this.props.match.params.tournament &&
      this.props.match.params.category &&
      this.props.isOutrights
    ) {
      const category = this.props.categories.get(
        this.props.filters.category[0]
      );
      if (!category) return "";
      return this.props.lang.long + "(" + category.name + ")";
    }
    return this.getTournamentName(this.state.filters.tournament[0]);
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isNeedShowEmptyTable !== this.props.isNeedShowEmptyTable) {
      return true;
    }
    if (
      nextState !== this.state &&
      !isArraysEqual(nextState.shownEvents && this.state.shownEvents)
    ) {
      // console.log("UPDATE");
      return true;
    }
    // console.log(this.props.socket);
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
    // this.curTime = performance.now();
    const { isNeedShowEmptyTable = true, isOutrights = false } = this.props;
    const isLineFilter =
      isOutrights && this.state.shownTournaments.length === 0;
    return (
      <React.Fragment>
        <Filter
          changeFilterLines={this.changeFilterLines.bind(this)}
          tournaments={this.getTournamentsPropsForFilter()}
          curT={this.getCurTforFilter()}
          onAllTournaments={this.getClickFuncOnFilterAllTournaments()}
          curSport={this.getCurSport()}
          isLineFilter={isLineFilter}
        />
        <div
          className={
            "main-table" +
            (this.props.filters.status.includes(1) ? " live" : "")
          }
          ref={this.tableElem}
        >
          {this.state.shownTournaments.length !== 0 ? (
            this.state.shownTournaments.map((t, i) => (
              <Tournament
                tournament={this.getPropsForTournament(t)}
                name={this.getTournamentName(t)}
                events={this.getPropsForEventsInT(t)}
                handleRospis={this.handleClickRospis.bind(this)}
                toggleTournament={this.toggleTournament.bind(this, t)}
                isOpen={this.checkIsOpenTournament(t)}
                key={i}
                color={this.props.yellow}
              />
            ))
          ) : isNeedShowEmptyTable ? (
            <EmptyTable text={this.props.lang.notEvent} />
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    window.onscroll = this.loadMoreEvents.bind(this);
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
    socket: state.socket,
    lang: state.user.language_user.dict,
    yellow: state.mainSetting.yellow,
    isBookmaker: state.isBookmaker
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => {
      dispatch(route("push", url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
