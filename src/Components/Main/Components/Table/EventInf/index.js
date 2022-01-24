import React, { Component } from "react";
import {
  getDateInFormat,
  getSportIcon,
  getEventIdsFromCurrentTickets,
  getScore
} from "../../../../../Services/Shared";
import Score, { classTeamFeed } from "../../../../Score";
import { connect } from "react-redux";
import {
  addEventToFav,
  removeEventFromFav
} from "../../../../../Actions/Components/Server/CurrentStates/";
import { isDevelop } from "../../../../../Constants/";

const maxMargin = 10;
const minMargin = 0;

const stepFav = 4;

class EventInf extends Component {
  constructor(props) {
    super(props);
    this.startTouchXCoord = null;
    this.containerElem = React.createRef();
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.state = {
      shift: this.isInFav ? 4 : 0
    };
  }

  get favEvents() {
    const eventsByGB = this.props.eventsByGB;
    const favGbEventsFromTickets = getEventIdsFromCurrentTickets();
    const favEventsFromTickets = [...favGbEventsFromTickets]
      .filter(gbId => eventsByGB.has(gbId))
      .map(gbId => eventsByGB.get(gbId));
    return [
      ...this.props.favEventsPrematch,
      ...this.props.favEventsLive,
      ...favEventsFromTickets
    ];
  }

  get isInFav() {
    if (!this.props.event) return false;
    return this.favEvents.includes(this.props.event.id);
  }

  get stylesFavEvent() {
    return {
      marginLeft: "4px"
    };
  }

  addEventToFav() {
    if (!this.props.event) return;
    this.props.addEventToFav(this.props.event.id, this.props.event.status);
  }

  removeEventFromFav() {
    if (!this.props.event) return;
    this.props.removeEventFromFav(this.props.event.id, this.props.event.status);
  }

  getStyleInf() {
    if (!isDevelop) return {};
    return { style: { marginLeft: this.state.shift + "px" } };
  }

  render() {
    const { event, handleRospis, sport } = this.props;
    const liveIcon = getSportIcon("LiveIcon");
    const translationIcon = getSportIcon("TranslationIcon");
    const statIcon = getSportIcon("StatIcon");
    const isLive = isEvLive(event);
    const matchInfo = isLive ? getScore(event) : null;
    return (
      <>
        <div
          ref={this.containerElem}
          className="line__teams"
          onClick={handleRospis}
          {...this.getStyleInf()}
        >
          <div className="line__top">
            <div className="line__names">
              <div className={classTeamFeed(event.homeName, event)}>
                {(isDevelop || this.props.isBookmaker ? event.id + " " : "") +
                  event.homeName}
              </div>
              <div className={classTeamFeed(event.awayName, event)}>
                {event.awayName}
              </div>
            </div>

            {isLive ? (
              <Score event={event} sport={sport} info={matchInfo} />
            ) : (
              ""
            )}
          </div>

          <div className="line__stat">
            <div className="line__info">
              <div className="line__date">
                {!isLive ? (
                  <>
                    {" "}
                    <span>
                      {getDateInFormat("day/month", event.timeSpanStart)}
                    </span>
                    <span>
                      {getDateInFormat("hours:minutes", event.timeSpanStart)}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="line__plus">{getCountLines(event)}</div>
            </div>

            {isDevelop || this.props.isBookmaker ? getProvider(event) : ""}

            <div className="line__buttons">
              {!isLive && event.booked === 2 ? (
                <div className="live">{liveIcon}</div>
              ) : (
                ""
              )}
              {isTranslation(event) ? (
                <div className="translation">{translationIcon}</div>
              ) : (
                ""
              )}

              {this.props.settingApp.isBRStatistic && isStat(event) ? (
                <div
                  className="statistic"
                  onClick={e => showStatistics(event.betRadarOriginalId, e)}
                >
                  {statIcon}
                </div>
              ) : (
                ""
              )}
            </div>
            {matchInfo && matchInfo.isSuspend ? (
              <div className="line__exrta">
                <div>
                  {"(" +
                    matchInfo.homeSuspend +
                    "x" +
                    matchInfo.awaySuspend +
                    ")"}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="block-lines" />
      </>
    );
  }

  getCoordTouch(e) {
    const touch = e.changedTouches[0];
    return {
      x: touch.clientX,
      y: touch.clientY
    };
  }

  handleTouchMove(event) {
    const coords = this.getCoordTouch(event);
    const shift = coords.x - this.startTouchXCoord;
    const diffShifting = shift - this.state.shift;
    const minMarginVal = this.isInFav ? stepFav : minMargin;
    const stateShift =
      diffShifting > maxMargin
        ? maxMargin
        : diffShifting < minMarginVal
        ? minMargin
        : diffShifting;
    if (stateShift === this.state.shift) return;
    this.setState({
      ...this.state,
      shift: stateShift
    });
  }

  handleTouchStart(event) {
    const coords = this.getCoordTouch(event);
    this.startTouchXCoord = coords.x;
  }

  handleTouchEnd(event) {
    if (this.state.shift > stepFav) {
      if (this.isInFav) {
        this.removeEventFromFav();
        this.setState({
          ...this.state,
          shift: 0
        });
      } else {
        this.addEventToFav();
        this.setState({
          ...this.state,
          shift: stepFav
        });
      }
    } else {
      this.setState({
        ...this.state,
        shift: this.isInFav ? stepFav : 0
      });
    }
  }

  componentDidMount() {
    if (!isDevelop) return;
    this.containerElem.current.addEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.containerElem.current.addEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
    this.containerElem.current.addEventListener(
      "touchend",
      this.handleTouchEnd,
      false
    );
  }

  componentWillUnmount() {
    if (!isDevelop) return;
    this.containerElem.current.removeEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.containerElem.current.removeEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
    this.containerElem.current.removeEventListener(
      "touchend",
      this.handleTouchEnd,
      false
    );
  }
}

const mapStateToProps = state => {
  return {
    settingApp: state.mainSetting,
    eventsByGB: state.server.eventsAndLines.eventsByGB,
    favEventsPrematch: state.server.currentStates.favEventsPrematch,
    favEventsLive: state.server.currentStates.favEventsLive,
    isBookmaker: state.isBookmaker
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addEventToFav: (eventId, status) =>
      dispatch(addEventToFav(eventId, status)),
    removeEventFromFav: (eventId, status) =>
      dispatch(removeEventFromFav(eventId, status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventInf);

const isStat = event => {
  if (event.betRadarOriginalId) return true;
  return false;
};

const isTranslation = event => {
  if (event.videoProviderId !== 0) return true;
  return false;
};

export const showStatistics = (id, e) => {
  e.stopPropagation();
  window.open(`https://s5.sir.sportradar.com/abet/ru/match/${id}`);
};

const ColorGenius = "#516bff";

const ColorRadar = "#ff5c16";

const ColorSolution = "#ffa126";

const ColorLSports = "#3EBAE5";

const getProviderColor = event => {
  switch (event.provider) {
    case 1:
      return ColorRadar;
    case 2:
      return ColorSolution;
    case 3:
      return ColorGenius;
    case 4:
      return ColorLSports;
    default:
      return "white";
  }
};

const isEvLive = event => {
  if (event.status === 1) return true;
  return false;
};

const getProviderN = event => {
  switch (event.provider) {
    case 1:
      return "R";
    case 2:
      return "S";
    case 3:
      return "G";
    default:
      return "-";
  }
};

const getProvider = event => {
  return (
    <div
      style={{
        left: 0,
        bottom: 0,
        height: "100%",
        position: "absolute",
        width: "4px",
        background: getProviderColor(event)
      }}
    >
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          bottom: "10px",
          width: "100%"
        }}
      >
        {/* {getProviderN(event)} */}
      </div>
    </div>
  );
};

const getCountLines = event => {
  if (!event || (event.status === 0 && !event.numLinesForPrematch)) return "+0";
  if (event.status === 1 || event.status === 2) return "+" + event.lines.size;
  return "+" + event.numLinesForPrematch;
};
