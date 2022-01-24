import React, { Component } from "react";
import Claendar from "./Calendar";
import { getDateInFormat } from "../../../../../../Services/Shared";

export default class FilterDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleCloseCalendar = this.closeCalendar.bind(this);
  }

  closeCalendar(e) {
    if (!e.target.closest(".calendar__modal")) {
      this.toggleCalendar();
    }
  }

  addHandlerCloseCalendar() {
    document
      .getElementById("root")
      .addEventListener("click", this.handleCloseCalendar);
  }

  removeHandlerCloseCalendar() {
    document
      .getElementById("root")
      .removeEventListener("click", this.handleCloseCalendar);
  }

  toggleCalendar() {
    if (this.state.isOpen) this.removeHandlerCloseCalendar();
    else this.addHandlerCloseCalendar();
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const activeDate = this.props.activeDate || new Date().getTime();
    const date = getDateInFormat("day/month/fullYear", activeDate);
    const isReverseClickableDate = this.props.isReverseClickableDate || false;
    const isActiveAllDays = this.props.isActiveAllDays || false;
    return (
      <div
        className={
          "user-account__calendar calendar " +
          (this.props.isActive ? " active" : "")
        }
        // onClick={this.props.isActive ? f => f : () => this.props.handleClick()}
      >
        <div
          className="calendar__date active"
          onClick={this.toggleCalendar.bind(this)}
        >
          {date}
        </div>
        {this.props.isActive ? (
          <Claendar
            lang={this.props.lang}
            active={activeDate}
            activeDays={this.props.activeDays}
            handleClick={this.props.setActiveDay}
            isReverseClickableDate={isReverseClickableDate}
            isActiveAllDays={isActiveAllDays}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
