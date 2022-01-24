import React, { Component } from "react";
import { getDateInFormat, TIME_ZONE_OFFSET } from "../../Services/Shared";

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.initialTime = performance.now();
        this.state = {
            time: "00 : 00 : 00"
        };
        this.setTimer();
    }

    setTimer() {
        this.interval = setInterval(
            function() {
                this.setState({
                    time: this.getTime()
                });
            }.bind(this),
            10
        );
    }

    getTime() {
        const date = new Date(performance.now() - this.initialTime).getTime();
        return getDateInFormat(
            "hours : minutes : seconds",
            date + TIME_ZONE_OFFSET
        );
    }

    render() {
        return <h1 style={{ margin: "20px" }}>{this.state.time}</h1>;
    }

    logTimeLoad() {
        const date = getDateInFormat(
            "hours : minutes : seconds : miliseconds",
            new Date(performance.now() - this.initialTime + TIME_ZONE_OFFSET)
        );
        const time = getDateInFormat("hours : minutes", new Date().getTime());
        console.log(
            "=========================================================="
        );
        console.log(
            "===================== ВРЕМЯ ЗАГРУЗКИ ====================="
        );
        console.log("==================  " + date + "  ===================");
        console.log(
            "======================== " + time + " ========================="
        );
        console.log(
            "=========================================================="
        );
    }

    componentWillUnmount() {
        this.logTimeLoad();
        clearInterval(this.interval);
    }
}
