import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getLineType,
  getMarket,
  isLineBlocked,
  emptyLineTmp,
  isOutcomeActive,
  getOutcomeId,
  getLineByCK,
  getCoef
} from "../../../../../../Services/Shared";

import { toggleOutcome } from "../../../../../../Actions/Components/Coupon/";
import { isLineInCoupon } from "../";
import Coef from "./Coef";

class Line1x2 extends Component {
  constructor(props) {
    super(props);
    this.getLineType = getLineTypeFunc(props.markets, props.marketsByNum);
    this.market = getMarket(
      getLine(props.event, this.getLineType),
      props.markets,
      props.marketsByNum
    );
  }

  getOutcomeIndex(num) {
    const count = this.line.outcomeId.length;
    switch (num) {
      case 1:
        return 0;
      case 2:
        return count > 2 ? 1 : -1;
      case 3:
        return count > 2 ? 2 : 1;
      default:
        return -1;
    }
  }

  getCoefProps(num) {
    const market = this.market
      ? this.market
      : getMarket(this.line, this.props.markets, this.props.marketsByNum);
    const outcomeId = getOutcomeId(market, this.getOutcomeIndex(num));
    return {
      toggleOutcome: () => this.props.toggleOutcome(this.line, outcomeId),
      isActive: isOutcomeActive(this.line, outcomeId, this.props.ordinars),
      coef: getCoef(this.line, outcomeId, "-"),
      key: this.line.id + "-" + num + "-" + this.line.status
    };
  }

  isComponentMustBeUpdate(nextProps) {
    if (
      !isLineInCoupon(nextProps.ordinars, this.line) &&
      !isLineInCoupon(this.props.ordinars, this.line)
    )
      return false;
    return true;
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.ordinars !== this.props.ordinars)
      return this.isComponentMustBeUpdate(nextProps);
    return true;
  }

  render() {
    const { event } = this.props;
    this.line = getLine(event, this.getLineType);

    if (!this.line) return emptyLineTmp();
    if (window.debugEvent === event.id) debugger;

    return (
      <div
        className={
          "line__table" +
          (isLineBlocked(getLineByCK(this.line.compoundKey), event)
            ? " opacity"
            : "")
        }
        lineid={this.line.id}
      >
        <Coef {...this.getCoefProps(1)} />
        <Coef {...this.getCoefProps(2)} />
        <Coef {...this.getCoefProps(3)} />
        {/* <div className="line__id">{this.line.id}</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ordinars: state.coupon.ordinars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleOutcome: (line, outcomeId) => {
      dispatch(toggleOutcome(line, outcomeId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Line1x2);

const getFilterVal = sportId => {
  if (
    sportId === 1023 ||
    sportId === 1027 ||
    sportId === 1028 ||
    sportId === 1030 ||
    sportId === 1031 ||
    sportId === 1205 ||
    sportId === 1042 ||
    sportId === 1012 ||
    sportId === 1015 ||
    sportId === 1112 ||
    sportId === 1113 ||
    sportId === 1013 ||
    sportId === 1025 ||
    sportId === 1026 ||
    sportId === 1038 ||
    sportId === 1102 ||
    sportId === 1103 ||
    sportId === 1118 ||
    sportId === 1124 ||
    sportId === 1126 ||
    sportId === 1127
  )
    return 2;
  return 1;
};

const getLineTypeFunc = (markets, marketsByNum) => {
  return line => {
    const market = getMarket(line, markets, marketsByNum);
    if (!market) return null;
    return getLineType(market, line);
  };
};

const getLine = (event, getLineType) => {
  let filterVal = getFilterVal(event.sportId);
  const lines = event.lines;
  let linesV = [...lines.values()].filter(
    line => getLineType(line) === filterVal && line.status !== 0
  );
  if (!linesV) linesV = [];
  let line = linesV.find(line => line.status === 1);
  if (!line) line = linesV[0];
  if (!line) {
    if (filterVal === 2) {
      filterVal = 1;
      linesV = [...lines.values()].filter(
        line => getLineType(line) === filterVal && line.status !== 0
      );
      if (!linesV) linesV = [];
      line = linesV.find(line => line.status === 1);
      if (!line) line = linesV[0];
    } else {
      filterVal = 2;
      linesV = [...lines.values()].filter(
        line => getLineType(line) === filterVal && line.status !== 0
      );
      if (!linesV) linesV = [];
      line = linesV.find(line => line.status === 1);
      if (!line) line = linesV[0];
    }
  }
  if (!line) return null;
  return line;
};
