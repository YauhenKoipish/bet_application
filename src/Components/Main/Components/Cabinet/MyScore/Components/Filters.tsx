import React, { Component } from "react";
import { connect } from "react-redux";
import { route } from "../../../../../../Actions/Components/Navigation";
import FilterCurrent from "../../BetHistory/Components/FilterCurrent";
import FilterDate from "../../BetHistory/Components/FilterDate";
import { setCurrentDateHistoryOperations } from "../../../../../../Actions/Components/User";
import { routsName } from "../../../../../../Router/RouterList";
import { setLocalStorage } from "../../../../../../Services/LocalStorage";
import { changeTheme } from "../../../../../../Services/ThemeSetting";
class Filters extends Component<any, any> {
  constructor(props) {
    super(props);
    if (!props.currentDate) {
      this.setCurrentDate();
    }
  }

  setCurrentDate() {
    const minTime = Math.max(...this.props.operationsTimestamps);
    if (!minTime) return;
    this.props.setCurrentDateHistoryOperations(new Date(minTime));
  }

  getActiveTab() {
    return this.props.location.pathname.split("/")[3];
  }

  setTheme(nameTheme) {
    setLocalStorage("Theme", nameTheme);
    changeTheme(nameTheme, this.props.settingApp);
  }

  render() {
    const activeTab = this.getActiveTab();
    return (
      <>
        <div className="user-account__filters">
          <div className="balance_score">
            <span>{this.props.lang.header.balance}</span>
            <span>
              {Math.trunc(+this.props.balance ? this.props.balance : 0)}
            </span>
          </div>
          <div className="user-account__choice">
            {activeTab === "istoriya" && this.props.currentDate ? (
              <FilterDate
                lang={this.props.lang}
                activeDate={this.props.currentDate.getTime()}
                activeDays={this.props.operationsTimestamps}
                setActiveDay={date =>
                  this.props.setCurrentDateHistoryOperations(date)
                }
              />
            ) : (
              ""
            )}
          </div>
        </div>

        <div
          className="btn_change_theme"
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          {Object.keys(this.props.settingApp.theme).map(nameTheme => {
            return (
              <button
                className="change_theme"
                style={{ color: nameTheme["base-1"] }}
                onClick={() => this.setTheme(nameTheme)}
                key={nameTheme}
              >
                {nameTheme}
              </button>
            );
          })}
        </div>

        <div className="user-account__main-filter score">
          {/* <FilterCurrent
           name={this.props.lang.header.balance}
           handleClick={() => this.props.navigate(routsName.dict.balans)}
           isActive={activeTab === routsName.dict["balans"]}
         /> */}
          <FilterCurrent
            name={this.props.lang.replenishmnt}
            handleClick={() => this.props.navigate(routsName.dict.popolnenie)}
            isActive={activeTab === routsName.dict["popolnenie"]}
          />
          <FilterCurrent
            name={this.props.lang.conclusion}
            handleClick={() => this.props.navigate(routsName.dict.vyvod)}
            isActive={activeTab === routsName.dict["vyvod"]}
          />
          {/* <FilterCurrent
            name={this.props.lang.history}
            handleClick={() => this.props.navigate(routsName.dict.istoriya)}
            isActive={activeTab === routsName.dict["istoriya"]}
          /> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    balance: state.user.info.accountData.balance,
    operationsTimestamps: state.user.info.operationsTimestamps,
    currentDate: state.user.info.currentDateHistoryOperations,
    lang: state.user.language_user.dict,
    settingApp: state.mainSetting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigate: url =>
      dispatch(
        route(
          "push",
          "/" +
            routsName.dict.kabinet +
            "/" +
            routsName.dict.moj_schet +
            "/" +
            url
        )
      ),
    setCurrentDateHistoryOperations: date =>
      dispatch(setCurrentDateHistoryOperations(date))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
