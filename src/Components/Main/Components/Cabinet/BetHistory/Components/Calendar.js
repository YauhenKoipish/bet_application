import React, { Component } from "react";

Date.prototype.daysInMonth = function() {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        const activeDate = new Date(props.active);
        this.state = {
            activeDate,
            activeMonth: activeDate.getMonth(),
            activeYear: activeDate.getFullYear(),
            activeDay: activeDate.getDate(),
            activeDays: props.activeDays
        };
    }

    setNewActiveDate(date) {
        this.setState({
            ...this.state,
            activeMonth: date.getMonth(),
            activeYear: date.getFullYear()
        });
    }

    isDayInActiveDays(day) {
        if (this.props.isActiveAllDays) {
            return (
                new Date(
                    this.state.activeYear,
                    this.state.activeMonth,
                    day
                ).getTime() >= new Date().getTime() || this.isToday(day)
            );
        }
        return this.state.activeDays.some(time => {
            const date = new Date(time);
            if (
                day === date.getDate() &&
                this.state.activeMonth === date.getMonth() &&
                this.state.activeYear === date.getFullYear()
            )
                return true;
            return false;
        });
    }

    isToday(day) {
        const today = new Date();
        return (
            day === today.getDate() &&
            this.state.activeMonth === today.getMonth() &&
            this.state.activeYear === today.getFullYear()
        );
    }

    isDayActive(day) {
        return (
            day === this.state.activeDate.getDate() &&
            this.state.activeMonth === this.state.activeDate.getMonth() &&
            this.state.activeYear === this.state.activeDate.getFullYear()
        );
    }

    isDayLowerThanToday(day) {
        const today = new Date();
        const todayDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const dayDate = new Date(
            this.state.activeYear,
            this.state.activeMonth,
            day
        );
        if (!this.props.isReverseClickableDate) return dayDate <= todayDate;
        return dayDate >= todayDate;
    }

    getDayClasses(day) {
        const passed = this.isDayLowerThanToday(day) ? " passed" : "";
        const chosen = this.isDayActive(day) ? " chosen" : "";
        const active = this.isDayInActiveDays(day) ? " active" : "";
        return passed + chosen + active;
    }

    getCalendarBody() {
        const days = [];
        let weekDay = this.props.lang.language === "ru" ? 1 : 0;
        let i = 1;
        const daysInMonth =
            new Date(
                this.state.activeYear,
                this.state.activeMonth
            ).daysInMonth() + 1;

        while (i < daysInMonth) {
            const date = new Date(
                this.state.activeYear,
                this.state.activeMonth,
                i
            );
            if (
                date.getDay() === weekDay &&
                date.getMonth() === this.state.activeMonth
            ) {
                days.push(date.getDate());
                i++;
            } else {
                if (date.getMonth() === this.state.activeMonth) days.push("");
            }
            weekDay++;
            if (weekDay > 6) weekDay = 0;
        }

        return days.map((day, i) => (
            <div
                key={i}
                className={this.getDayClasses(day)}
                onClick={
                    this.isDayInActiveDays(day)
                        ? e =>
                              this.props.handleClick(
                                  new Date(
                                      this.state.activeYear,
                                      this.state.activeMonth,
                                      day
                                  ),
                                  e
                              )
                        : f => f
                }
            >
                {day}
            </div>
        ));
    }

    getMonthName(month) {
        switch (month) {
            case 0:
                return this.props.lang.invar;
            case 1:
                return this.props.lang.invar.febriary;
            case 2:
                return this.props.lang.marth;
            case 3:
                return this.props.lang.april;
            case 4:
                return this.props.lang.may;
            case 5:
                return this.props.lang.iun;
            case 6:
                return this.props.lang.iuli;
            case 7:
                return this.props.lang.avgust;
            case 8:
                return this.props.lang.september;
            case 9:
                return this.props.lang.oktouber;
            case 10:
                return this.props.lang.november;
            case 11:
                return this.props.lang.december;
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.active !== this.props.active) {
            this.setState({
                ...this.state,
                activeDate: new Date(nextProps.active)
            });
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="calendar__modal">
                <div className="calendar__header">
                    <div
                        className="calendar__toggle"
                        onClick={this.setNewActiveDate.bind(
                            this,
                            new Date(
                                this.state.activeYear,
                                this.state.activeMonth - 1
                            )
                        )}
                    />
                    <div className="calendar__month">
                        <button>
                            {this.props.lang.months[this.state.activeMonth]}
                        </button>
                        <button>{this.state.activeYear}</button>
                    </div>
                    <div
                        className="calendar__toggle"
                        onClick={this.setNewActiveDate.bind(
                            this,
                            new Date(
                                this.state.activeYear,
                                this.state.activeMonth + 1
                            )
                        )}
                    />
                </div>
                <div className="calendar__day">
                    {this.props.lang.weekDays.map(day => (
                        <div key={day}>{day}</div>
                    ))}
                </div>
                <div className="calendar__body">{this.getCalendarBody()}</div>
            </div>
        );
    }
}
