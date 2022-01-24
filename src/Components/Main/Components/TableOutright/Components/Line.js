import React, { Component } from "react";
import {
  getCoefInTrueFormat,
  getSportIcon,
  getMarketName,
  getOutcomeName,
  renameMarketName,
  getMarket
} from "../../../../../Services/Shared";
import Coef from "../../Table/Line/Components/Coef";
import { toggleOutcome } from "../../../../../Actions/Components/Coupon/";
import TableHeader from "../../TableHeader/";
import { connect } from "react-redux";
import { isLineInCoupon } from "../../Table/Line/";

class Line extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      isOpen: true
    };
  }

  toggleTournament() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  isComponentMustBeUpdate(nextProps) {
    if (
      !isLineInCoupon(nextProps.ordinars, this.props.line) &&
      !isLineInCoupon(this.props.ordinars, this.props.line)
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
    const { line, seasonName, view, sportId, event } = this.props;
    const { isOpen } = this.state;
    if (!line || line.outcomeActive.every(oId => !oId)) return "";
    const COUNT_COLS = view.cols;
    const length = [...line.outcomeActive].filter(out => out).length;
    let countCols = line.outcomeId.length < COUNT_COLS ? length : COUNT_COLS;
    const countRows = Math.ceil(length / countCols);
    const diff = countCols * countRows - length;
    if (countRows <= diff) {
      countCols = length > countCols ? countCols - 1 : length;
    }
    const market = getMarket(line, this.props.markets, this.props.marketsByNum);
    const marketName = renameMarketName(
      line,
      market,
      getMarketName(market, line, event)
    );
    return (
      <>
        <TableHeader
          handleClick={this.toggleTournament.bind(this)}
          name={
            (seasonName ? seasonName : "") +
            (marketName ? ". " + marketName : "")
          }
          isArrow={true}
          isOpen={isOpen}
          icon={getSportIcon(sportId)}
        />
        {isOpen ? (
          <div className="painting__elem" lineid={line.id}>
            {getContentSimpleLine(
              line,
              countCols,
              countRows,
              this.props.toggleOutcome,
              this.props.ordinars,
              market,
              event
            )}
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.server.eventsAndLines.events,
    eventsByGB: state.server.eventsAndLines.eventsByGB,
    lines: state.server.eventsAndLines.lines,
    linesByCK: state.server.eventsAndLines.linesByCK,
    markets: state.server.entities.markets,
    marketsByNum: state.server.entities.marketsByNum,
    ordinars: state.coupon.ordinars,
    view: state.view.outrightsTable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleOutcome: (line, outcomeId) => dispatch(toggleOutcome(line, outcomeId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Line);

const getContentSimpleLine = (
  line,
  countCols,
  countRows,
  handleClick,
  ordinars,
  market,
  event
) => {
  const renderData = getRenderData(line, countCols, countRows, market, event);
  return renderData.map((row, i) => {
    return (
      <div className="painting_line_container" key={i}>
        <div className="painting__line">
          {row.map((col, i) => {
            return (
              <div
                className={
                  "painting__item " +
                  (line &&
                  col &&
                  ordinars.find(
                    ord =>
                      ord.compoundKey === line.compoundKey &&
                      ord.outcomeId === col.outcomeId
                  )
                    ? "active"
                    : "") +
                  (col && !col.isOutcomeActive ? " opacity50" : "")
                }
                key={i}
                onClick={col ? () => handleClick(line, col.outcomeId) : f => f}
              >
                {col ? (
                  <>
                    <div className="painting__team">{col.name}</div>
                    <Coef
                      {...getCoefProps({
                        ...col,
                        line,
                        handleClick: f => f
                      })}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  });
};

export const getCoefProps = cell => {
  return {
    toggleOutcome: cell.handleClick,
    isActive: false,
    coef: getCoefInTrueFormat(cell.odd),
    key: cell.line.compoundKey + "-" + cell.outcomeId
  };
};

const getRenderData = (line, countCols, countRows, market, event) => {
  const data = [];
  const odds = line.outcomeOdds
    .map((odd, i) => {
      return { odd, index: i };
    })
    .filter(odd => line.outcomeActive[odd.index]);
  odds
    .sort((a, b) => parseFloat(a.odd) - parseFloat(b.odd))
    .forEach((odd, index) => {
      const colIndex = Math.floor(index / countRows);
      const rowIndex = index % countRows;
      const newDataObj = {
        odd: odd.odd,
        name: renameMarketName(
          line,
          market,
          getOutcomeName(market, line.outcomeId[odd.index], line, event)
        ),
        outcomeId: line.outcomeId[odd.index],
        isOutcomeActive: !!line.outcomeActive[odd.index]
      };
      if (colIndex === 0) {
        data[rowIndex] = [newDataObj];
      } else {
        data[rowIndex].push(newDataObj);
      }
    });
  const diffCount = countCols * countRows - odds.length;
  if (diffCount !== 0) {
    for (let i = 0; i < diffCount; i++) {
      const index = data.length - i - 1;
      data[index].push(null);
    }
  }
  return data;
};
