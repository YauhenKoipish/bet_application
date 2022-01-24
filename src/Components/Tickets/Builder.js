import React, { Component } from "react";
import {
  getDateInFormat,
  getMainScore,
  getFullTime,
  getUrlForRospis,
  getCoefInTrueFormat,
  getSportIcon,
  splitRangNumber
} from "../../Services/Shared";
import { connect } from "react-redux";
import { route } from "../../Actions/Components/Navigation/";

class Builder extends Component {
  constructor(props) {
    super(props);
  }
  getDate(ordinar) {
    return (
      <>
        <div>
          {getDateInFormat("day/month", ordinar.eventStartTime * 1000, true)}
        </div>
        <div>
          {getDateInFormat(
            "hours:minutes",
            ordinar.eventStartTime * 1000,
            true
          )}
        </div>
      </>
    );
  }

  isTimeInSport(sportId) {
    if (
      sportId === 1023 ||
      sportId === 1028 ||
      sportId === 1019 ||
      sportId === 1021 ||
      sportId === 1016 ||
      sportId === 1027
    )
      return true;
    return false;
  }

  getScore(ordinar) {
    const eventId = this.props.eventsByGB.get(ordinar.gbEventId);
    if (!eventId) return "";
    const event = this.props.events.get(eventId);
    if (!event) return "";
    const scoreObj = getMainScore(event);
    const score = scoreObj ? scoreObj.home + ":" + scoreObj.away : "";
    const recievedTime = getFullTime(event);
    const time =
      this.isTimeInSport(event.sportId) && recievedTime ? recievedTime : "";

    return (
      <>
        <div>{score}</div>
        <div>{time}</div>
      </>
    );
  }

  goToRospis() {
    const ordinarKey = [...this.props.bets.keys()][0];
    const ordinar = this.props.bets.get(ordinarKey);
    const url = getUrlForRospis(this.props.eventsByGB.get(ordinar.gbEventId));
    if (!url) return;
    this.props.navigate(url);
  }

  render() {
    const ordinarKey = [...this.props.bets.keys()][0];
    const ordinar = this.props.bets.get(ordinarKey);
    const homeAwayName = this.props.getHomeAwayName(ordinar);
    return (
      <div className="bets__bet bet">
        <div className="constructor__top">
          <div className="constructor-mini__header">
            <div className="constructor-mini__type">
              {this.props.lang.counstructor}
              <span className="abs">
                {[...this.props.bets.values()].length}
              </span>
            </div>
            <div className={"constructor-mini__coef"}>
              {getCoefInTrueFormat(this.props.ticketCoef)}
            </div>
          </div>

          <div className="bet__description">
            <div className="icon">{getSportIcon(this.props.sportId)}</div>
            <div className="bet__left">
              <div className="bet__teams" onClick={this.goToRospis.bind(this)}>
                {homeAwayName}
              </div>
            </div>

            <div className="bet__right">
              <div className="bet__additional">
                {ordinar.eventStatus
                  ? this.getScore(ordinar)
                  : this.getDate(ordinar)}
              </div>
            </div>
          </div>

          <div className="constructor-mini__body">
            {[...this.props.bets.values()].map((bet, i) => {
              console.log(bet);
              return (
                <div className="constructor-mini__bet" key={i}>
                  <div className="constructor__dot">
                    <div className="constructor__stick" />
                  </div>
                  <div className="constructor-mini__info">
                    <div className="constructor-mini__full">
                      {this.props.getOutcomeName(bet)}
                    </div>

                    <div className="constructor-mini__description">
                      {this.props.getMarketName(bet)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventsByGB: state.server.eventsAndLines.eventsByGB,
    lines: state.server.eventsAndLines.lines,
    linesByCK: state.server.eventsAndLines.linesByCK,
    markets: state.server.entities.markets,
    marketsByNum: state.server.entities.marketsByNum,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url => dispatch(route("push", url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Builder);
