import React, { Component } from "react";
import {
  isLineBlocked,
  emptyLineTmp,
  getDeltaCoef,
  isOutcomeActive,
  getMarket,
  getOutcomeId,
  getCoef,
  getLineByCK
} from "../../../../../../Services/Shared";
import { DropdownTotal } from "./Dropdown";
import Coef from "./Coef";

export default class LineTotal extends Component {
  constructor(props) {
    super(props);
    this.market = getMarket(
      props.activeSpecifier,
      props.markets,
      props.marketsByNum
    );
  }

  getCoefProps(index) {
    const market = this.market
      ? this.market
      : getMarket(
          this.props.activeSpecifier,
          this.props.markets,
          this.props.marketsByNum
        );
    const outcomeId = getOutcomeId(market, index);
    return {
      toggleOutcome: () =>
        this.props.toggleOutcome(this.props.activeSpecifier, outcomeId),
      isActive: isOutcomeActive(
        this.props.activeSpecifier,
        outcomeId,
        this.props.ordinars
      ),
      coef: getCoef(this.props.activeSpecifier, outcomeId, "-"),
      key:
        this.props.activeSpecifier.id +
        "-" +
        index +
        "-" +
        this.props.activeSpecifier.status
    };
  }

  render() {
    const { lines, activeSpecifier, event } = this.props;

    if (!lines || lines.length === 0 || !activeSpecifier)
      return emptyLineTmp(true);

    return (
      <div
        className={
          "line__table" +
          (isLineBlocked(getLineByCK(activeSpecifier.compoundKey), event)
            ? " opacity"
            : "")
        }
        lineid={activeSpecifier.id}
      >
        <Coef {...this.getCoefProps(0)} />
        <DropdownTotal {...this.props} />
        <Coef {...this.getCoefProps(1)} />
        {/* <div className="line__id">{activeSpecifier.id}</div> */}
      </div>
    );
  }
}

const getValidLines = lines => {
  const linesMap = new Map();
  lines.forEach(line => {
    linesMap.set(line.compoundKey, line);
  });
  return [...linesMap.values()]
    .sort((a, b) => getDeltaCoef(a) - getDeltaCoef(b))
    .slice(0, 5);
};

export const getLinesTotal = (event, getLineType) => {
  const evlines = event.lines;
  const lines = [...evlines.values()].filter(
    line =>
      getLineType(line) === 4 &&
      line.outcomeOdds[0] &&
      line.outcomeOdds[1] &&
      line.specifierValue.length !== 0 &&
      line.status !== 0 &&
      (+line.specifierValue * 10) % 1 === 0
  );
  if (!lines) return null;
  return getValidLines(lines);
};
