import React, { Component } from "react";
import { TIME_ZONE_OFFSET } from "../../../../Services/Shared";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: props.remaining
    };
  }

  setRemaining() {
    const diffRemaining = this.state.remaining - 1000;
    const newRemaining = diffRemaining <= 0 ? 0 : diffRemaining;
    this.setState({
      ...this.state,
      remaining: newRemaining
    });
  }

  setTimer() {
    if (!this.state.remaining) return;
    this.removeTimer();
    this.timer = setTimeout(this.setRemaining.bind(this), 1000);
  }

  removeTimer() {
    clearTimeout(this.timer);
  }

  getDaysName(day) {
    const lastFigure = parseInt(
      day.toString().substr(day.toString().length - 1, 1)
    );
    if (lastFigure === 1) return "день";
    if (lastFigure > 1 && lastFigure < 5) return "дня";
    if (lastFigure >= 5 || lastFigure === 0) return "дней";
  }

  getInfoByRemaining(remaining) {
    const startDate = new Date(0 + TIME_ZONE_OFFSET);
    const date = new Date(remaining + TIME_ZONE_OFFSET);
    const days = date.getDate() - startDate.getDate();
    const daysName = this.getDaysName(days);
    const hours = date.getHours() - startDate.getHours();
    const minutes = date.getMinutes() - startDate.getMinutes();
    return {
      days,
      daysName,
      hours,
      minutes
    };
  }

  render() {
    const { days, daysName, hours, minutes } = this.getInfoByRemaining(
      this.state.remaining
    );
    return (
      <div className="bonus__countdown">
        <span>осталось </span>
        <div className="bonus__days">
          <span>{days}</span>
          <span>{daysName}</span>
        </div>
        <div className="bonus__time">
          <div>
            <span>{hours}</span>
            <span>ч</span>
          </div>
          <span>:</span>
          <div>
            <span>{minutes}</span>
            <span>мин</span>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setTimer();
  }

  componentDidUpdate() {
    this.setTimer();
  }

  componentWillUnmount() {
    this.removeTimer();
  }
}
