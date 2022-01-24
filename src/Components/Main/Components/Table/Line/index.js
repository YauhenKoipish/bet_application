import React, { Component } from "react";
import arrows from "../Event/img/line/arrows.svg";
import Line1x2 from "./Components/Line1x2";
import LineWithSpecifier from "./Components/LineWithSpecifier";

class Line extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { event, markets, marketsByNum, coupon, toggleOutcome } = this.props;
    // console.log("------------------COUPON---------------");
    switch (this.props.filter) {
      case "total":
        return (
          <LineWithSpecifier
            type={this.props.filter}
            event={event}
            markets={markets}
            marketsByNum={marketsByNum}
            arrows={arrows}
            key={"line-total-" + event.id}
          />
        );
      case "handicap":
        return (
          <LineWithSpecifier
            type={this.props.filter}
            event={event}
            markets={markets}
            marketsByNum={marketsByNum}
            arrows={arrows}
            key={"line-handicap-" + event.id}
          />
        );
      case "1x2":
      default:
        return (
          <Line1x2
            event={event}
            markets={markets}
            marketsByNum={marketsByNum}
          />
        );
    }
  }
}

export default Line;

export const isLineInCoupon = (ordinars, line) => {
  return ordinars.some(ord => line && ord.compoundKey === line.compoundKey);
};

export const isLinesInCoupon = (ordinars, lines) => {
  return lines.some(line => isLineInCoupon(ordinars, line));
};
