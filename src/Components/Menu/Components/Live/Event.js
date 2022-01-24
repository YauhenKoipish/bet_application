import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSportIcon,
  transliterate,
  getDateInFormat,
  getScore
} from "../../../../Services/Shared";
import Score, { classTeamFeed } from "../../../Score/";
import { route } from "../../../../Actions/Components/Navigation/";
import { closeMenu } from "../../../../Actions/Components/Menu";
import { routsName } from "../../../../Router/RouterList";

class Event extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.newEvents.has(this.props.eventId)) {
      return true;
    }
    if (nextProps.isInFav !== this.props.isInFav) {
      return true;
    }
    if (nextProps.eventId !== this.props.eventId) {
      return true;
    }
    return false;
  }

  handleClickFav(ev) {
    ev.stopPropagation();
    const { isInFav, addEventToFav, removeEventFromFav } = this.props;
    isInFav ? removeEventFromFav() : addEventToFav();
  }

  handleClickEvent(ev) {
    const favIcon = ev.target.closest("line-live__fav");
    if (!favIcon) {
      const event = this.props.events.get(this.props.eventId);
      if (!event) return;
      const sport = this.props.sports.get(event.sportId);
      if (!sport) return;
      const category = this.props.categories.get(event.categoryId);
      if (!category) return;
      const tournament = this.props.tournaments.get(event.tournamentId);
      if (!tournament) return;
      this.props.closeMenu();
      const url =
        "/" +
        routsName.dict.rospis +
        "/" +
        transliterate(sport.name, true) +
        "/" +
        transliterate(category.name, true) +
        "/" +
        transliterate(tournament.name, true) +
        "/" +
        event.id +
        "/" +
        routsName.dict.all;
      this.props.navigate(url);
    }
  }

  render() {
    const { eventId, key, events, isInFav, sports, isFav } = this.props;
    const event = events.get(eventId);
    if (!event) {
      return "";
    }
    const homeName = event.homeName;
    const awayName = event.awayName;
    const matchInfo = getScore(event);

    return (
      <div
        className="line-live__teams"
        key={key}
        onClick={ev => this.handleClickEvent.call(this, ev)}
      >
        <div className="line-live__team-name">
          <div className={classTeamFeed(homeName, event, "active")}>
            {getHomeCards(matchInfo)}
            {homeName}
          </div>
          <div className={classTeamFeed(awayName, event, "active")}>
            {getAwayCards(matchInfo)}
            {awayName}
          </div>
        </div>
        {event.status === 1 ? (
          <Score
            event={event}
            sport={sports.get(event.sportId)}
            info={matchInfo}
          />
        ) : event.status === 0 ? (
          <div className="line-live__score">
            <div className="line-live__column">
              <div>{getDateInFormat("hours:minutes", event.timeSpanStart)}</div>
              <div>{getDateInFormat("day/month", event.timeSpanStart)}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        {isFav ? (
          <div
            className="line-live__fav"
            onClick={ev => this.handleClickFav.call(this, ev)}
          >
            {isInFav
              ? getSportIcon("favSmallFull", "svg")
              : getSportIcon("favSmall", "svg")}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.server.eventsAndLines.events,
    sports: state.server.entities.sports,
    categories: state.server.entities.categories,
    tournaments: state.server.entities.tournaments,
    newEvents: state.server.eventsAndLines.newEvents,
    sports: state.server.entities.sports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => dispatch(route("push", url)),
    closeMenu: () => dispatch(closeMenu())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);

const getHomeCards = matchInfo => {
  if (!matchInfo) return "";
  if (!matchInfo.homeRedCards) return "";
  return <span className="red-card">{matchInfo.homeRedCards}</span>;
};

const getAwayCards = matchInfo => {
  if (!matchInfo) return "";
  if (!matchInfo.awayRedCards) return "";
  return <span className="red-card">{matchInfo.awayRedCards}</span>;
};
