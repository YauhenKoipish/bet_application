import React, { Component } from "react";
import { connect } from "react-redux";
import FilterCurrent from "./Components/FilterCurrent";
import FilterMain from "./Components/FilterMain";
import Tickets from "../../../../Tickets/";
import FilterDate from "./Components/FilterDate";
import { getTicketsByDate } from "../../../../../Server/";

import { routsName } from "../../../../../Router/RouterList";
import { getIcon, getDateInFormat } from "../../../../../Services/Shared";

class BetHistory extends Component {
  constructor(props) {
    super(props);
    this.sendingTimestamps = [];
    this.state = {
      filters: {
        status: 0,
        eventStatus: null,
        isLongTerm: null,
        timeStart: null,
        timeEnd: null,
        isCashout: null
      },
      date: new Date(),
      closeCalendar: false,
      activeFilterFirst: "current",
      activeFilterSecond: "all",
      openfilterFirst: false,
      openfilterSecondt: false
    };
    this.getTicketsFor2Days();
  }

  getCurrentDayForDate(props = this.props) {
    const maxDay = Math.max(...props.betsTimestamps);
    const date = maxDay && maxDay !== -Infinity ? new Date(maxDay) : new Date();
    return [date.getFullYear(), date.getMonth(), date.getDate()];
  }

  changeFilterSecond(component) {
    if (component === this.state.activeFilterSecond) return;
    switch (component) {
      case "chashout":
        return this.setState({
          ...this.state,
          activeFilterFirst: "current",
          activeFilterSecond: "chashout",
          filters: {
            status: 0,
            eventStatus: null,
            isLongTerm: null,
            timeStart: null,
            timeEnd: null,
            isCashout: true
          },
          openfilterFirst: false,
          openfilterSecondt: false
        });
      case "live":
        return this.setState({
          ...this.state,
          activeFilterFirst: "current",
          activeFilterSecond: "live",
          filters: {
            status: 0,
            eventStatus: 1,
            isLongTerm: null,
            timeStart: null,
            timeEnd: null,
            isCashout: null
          },
          openfilterFirst: false,
          openfilterSecondt: false
        });
      case "all":
        return this.setState({
          ...this.state,
          activeFilterFirst: "current",
          activeFilterSecond: "all",
          filters: {
            status: 0,
            eventStatus: null,
            isLongTerm: null,
            timeStart: null,
            timeEnd: null,
            isCashout: null
          },
          openfilterFirst: false,
          openfilterSecondt: false
        });
      case "longTermBets":
        return this.setState({
          ...this.state,
          activeFilterFirst: "current",
          activeFilterSecond: "longTermBets",
          filters: {
            status: 0,
            eventStatus: null,
            isLongTerm: true,
            timeStart: null,
            timeEnd: null,
            isCashout: null
          },
          openfilterFirst: false,
          openfilterSecondt: false
        });
      case "hourToday":
        return this.setState({
          ...this.state,
          activeFilterFirst: "history",
          activeFilterSecond: "hourToday",
          filters: {
            status: 1,
            eventStatus: null,
            isLongTerm: null,
            timeStart: new Date().getTime() - 24 * 60 * 60 * 1000,
            timeEnd: null,
            isCashout: null
          },
          openfilterFirst: false,
          openfilterSecondt: false
        });
      case "hourTwoDay":
        return this.setState({
          ...this.state,
          activeFilterFirst: "history",
          activeFilterSecond: "hourTwoDay",
          filters: {
            status: 1,
            eventStatus: null,
            isLongTerm: null,
            timeStart: new Date().getTime() - 48 * 60 * 60 * 1000,
            timeEnd: null,
            isCashout: null
          },
          openfilterFirst: false,
          openfilterSecondt: false
        });
      case "selectData":
        const today = new Date(...this.getCurrentDayForDate());
        const closeCalendar = !this.state.closeCalendar;
        return this.setState({
          ...this.state,
          activeFilterFirst: "history",
          activeFilterSecond: "selectData",
          filters: {
            status: 1,
            eventStatus: null,
            isLongTerm: null,
            timeStart: today.getTime(),
            timeEnd: null,
            isCashout: null
          },
          closeCalendar,
          openfilterFirst: false,
          openfilterSecondt: false
        });
    }
  }

  changeFilterFirst(component) {
    if (component === this.state.activeFilterFirst) return;

    switch (component) {
      case "history":
        return this.setState({
          ...this.state,
          activeFilterFirst: "history",
          activeFilterSecond: "hourToday",
          filters: {
            status: 1,
            eventStatus: null,
            isLongTerm: null,
            timeStart: new Date().getTime() - 24 * 60 * 60 * 1000,
            timeEnd: null,
            isCashout: null
          },
          openfilterFirst: false,
          openfilterSecondt: false
        });
      default:
      case "current":
        return this.setState({
          ...this.state,
          activeFilterFirst: "current",
          activeFilterSecond: "all",
          filters: {
            status: 0,
            eventStatus: null,
            isLongTerm: null,
            timeStart: null,
            timeEnd: null,
            isCashout: null
          },
          openfilterFirst: false,
          openfilterSecondt: false
        });
    }
  }

  getFilters() {
    switch (this.state.activeFilterFirst) {
      case "current":
        return (
          <>
            <FilterCurrent
              name={this.props.lang.chashout}
              handleClick={this.changeFilterSecond.bind(this, "chashout")}
              isActive={this.state.activeFilterSecond === "chashout"}
            />
            {this.props.settingApp.isLive ? (
              <FilterCurrent
                name={this.props.lang.header.live}
                handleClick={this.changeFilterSecond.bind(this, "live")}
                isActive={this.state.activeFilterSecond === "live"}
              />
            ) : (
              " "
            )}
            <FilterCurrent
              name={this.props.lang.all}
              handleClick={this.changeFilterSecond.bind(this, "all")}
              isActive={this.state.activeFilterSecond === "all"}
            />
            <FilterCurrent
              name={this.props.lang.long}
              handleClick={this.changeFilterSecond.bind(this, "longTermBets")}
              isActive={this.state.activeFilterSecond === "longTermBets"}
            />
          </>
        );
      case "history":
        return (
          <>
            <FilterCurrent
              name={this.props.lang.hourToday}
              handleClick={this.changeFilterSecond.bind(this, "hourToday")}
              isActive={this.state.activeFilterSecond === "hourToday"}
              className="selectElem"
            />
            <FilterCurrent
              name={this.props.lang.hourTwoDay}
              handleClick={this.changeFilterSecond.bind(this, "hourTwoDay")}
              isActive={this.state.activeFilterSecond === "hourTwoDay"}
              className="selectElem"
            />
            <div
              className={
                "flex " +
                (this.state.activeFilterSecond === "selectData"
                  ? " active "
                  : "")
              }
              onClick={this.changeFilterSecond.bind(this, "selectData")}
            >
              <span
                className={
                  "flex" + (!this.state.closeCalendar ? " relative" : "")
                }
              >
                <div className="icon">
                  {this.state.closeCalendar
                    ? getIcon("calendar-active")
                    : getIcon("calendar")}
                </div>
              </span>

              <FilterDate
                activeDate={new Date(this.state.filters.timeStart)}
                activeDays={this.props.betsTimestamps}
                setActiveDay={this.setActiveDay.bind(this)}
                handleClick={this.changeFilterSecond.bind(this, "selectData")}
                isActive={this.state.closeCalendar}
                className="selectElem"
                lang={this.props.lang}
              />
            </div>
          </>
        );
    }
  }

  getTicketsFor2Days(props = this.props) {
    const today = new Date(...this.getCurrentDayForDate(props)).getTime();
    props.betsTimestamps.forEach(value => {
      const twoDays = 2 * 24 * 60 * 60 * 1000;
      if (today - value <= twoDays)
        this.sendRequestBetHistory(new Date(value), props);
    });
  }

  isDateEqual(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  sendRequestBetHistory(date, props = this.props) {
    const validDate = props.betsTimestamps.find(timestamp =>
      this.isDateEqual(date, new Date(timestamp))
    );
    if (!validDate || this.sendingTimestamps.includes(validDate)) return;
    this.sendingTimestamps.push(validDate);
    getTicketsByDate(validDate);
  }

  setActiveDay(date, e) {
    this.sendRequestBetHistory(date);
    this.setState({
      ...this.state,
      activeFilterFirst: "history",
      activeFilterSecond: "selectData",
      closeCalendar: false,
      date: date,
      filters: {
        status: 1,
        eventStatus: null,
        isLongTerm: null,
        timeStart: date.getTime(),
        timeEnd: date.getTime() + 24 * 60 * 60 * 1000,
        isCashout: null
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.betsTimestamps !== this.props.betsTimestamps) {
      this.getTicketsFor2Days(nextProps);
    }
    return true;
  }

  openTabFiltrs(nameFilters) {
    const newState = { ...this.state };

    if (nameFilters === "First") newState.openfilterSecond = false;
    if (nameFilters === "Second") newState.openfilterFirst = false;
    newState[`openfilter${nameFilters}`] = !newState[
      `openfilter${nameFilters}`
    ];
    this.setState(newState);
  }

  render() {
    return (
      <>
        <div className="user-account__header">
          <div
            className={
              "column__filter" + (!this.state.openfilterFirst ? "" : " active")
            }
          >
            <div className="list_other_info">
              <span
                className="active_filter"
                onClick={() => this.openTabFiltrs("First")}
              >
                {this.props.lang[this.state.activeFilterFirst]}
              </span>
              {getIcon("tringle")}
              <div className="list_swither">
                <FilterMain
                  name={this.props.lang.сurrent}
                  handleClick={this.changeFilterFirst.bind(this, "current")}
                  isActive={this.state.activeFilterFirst === "current"}
                />
                <FilterMain
                  name={this.props.lang.history}
                  handleClick={this.changeFilterFirst.bind(this, "history")}
                  isActive={this.state.activeFilterFirst === "history"}
                />
              </div>
            </div>
          </div>

          <div
            className={
              "column__filter" +
              (!this.state.openfilterSecond ? "" : " active") +
              (this.state.activeFilterFirst === "history" ? " opacity50" : "")
            }
          >
            <div className="list_other_info">
              <span
                className="active_filter"
                onClick={
                  this.state.activeFilterFirst === "history"
                    ? f => f
                    : () => this.openTabFiltrs("Second")
                }
              >
                {this.props.lang[this.state.activeFilterSecond]}
              </span>
              {this.state.activeFilterFirst === "history"
                ? getIcon("tringle", "gray")
                : getIcon("tringle")}
              <div className="list_swither">{this.getFilters()}</div>
            </div>
          </div>
        </div>

        {this.state.activeFilterFirst === "history" ? (
          <div className="line_filters_history">{this.getFilters()}</div>
        ) : (
          ""
        )}

        <div className="user-account__main">
          <Tickets filters={{ ...this.state.filters }} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    betsTimestamps: state.user.info.betsTimestamps,
    lang: state.user.language_user.dict,
    settingApp: state.mainSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BetHistory);
