import React, { Component } from "react";

interface typeProps {
    lang: any;
    setValueCalendar: any;
}

export default class CalendarRegistration extends Component<typeProps, any> {
    state: {
        day: string;
        month: string;
        year: string;
    };
    dateSetting: any;
    constructor(props) {
        super(props);

        this.dateSetting = this.setValueDataPicker();
        this.state = {
            day: "",
            month: "",
            year: ""
        };
    }

    setValueDataPicker() {
        const day: number[] = [];
        const month: number[] = Object.values(this.props.lang.months);
        const year: number[] = [];
        for (let i = 1; i <= 31; i++) day.push(i);

        for (
            let i = new Date().getFullYear() - 18;
            i !== new Date().getFullYear() - 100;
            i--
        )
            year.push(i);
        return {
            dayConst: 31,
            monthConst: 12,
            yearConst: new Date().getFullYear() - 100,
            day,
            month,
            year
        };
    }

    setDataValue(name, value) {
        const newState = { ...this.state };

        newState[name] = value;
        this.setState(newState);
    }

    render() {
        return (
            <div className="calendar__registration">
                <div className="columnDate">
                    <div className="day element_scroll">
                        {this.dateSetting.day.map(day => (
                            <span
                                className={
                                    "span_text " +
                                    (this.state.day == day ? "active" : "")
                                }
                                key={day}
                                onClick={() => this.setDataValue("day", day)}
                            >
                                {day}
                            </span>
                        ))}
                    </div>
                    <div className="month element_scroll">
                        {this.dateSetting.month.map(month => (
                            <span
                                key={month}
                                className={
                                    "span_text " +
                                    (this.state.month == month ? "active" : "")
                                }
                                onClick={() =>
                                    this.setDataValue("month", month)
                                }
                            >
                                {month}
                            </span>
                        ))}
                    </div>
                    <div className="year element_scroll">
                        {this.dateSetting.year.map(year => (
                            <span
                                key={year}
                                className={
                                    "span_text " +
                                    (this.state.year == year ? "active" : "")
                                }
                                onClick={() => this.setDataValue("year", year)}
                            >
                                {year}
                            </span>
                        ))}
                    </div>
                </div>
                {this.state.day && this.state.month && this.state.year ? (
                    <div
                        className="button_seccuss "
                        onClick={() => this.props.setValueCalendar(this.state)}
                    >
                        Done
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}
