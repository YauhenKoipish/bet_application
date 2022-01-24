import React, { Component } from "react";
import {
  getCoefInTrueFormat,
  getSportIcon
} from "../../../../../Services/Shared";
import Coef from "../../Table/Line/Components/Coef";
import { toggleOutcome } from "../../../../../Actions/Components/Coupon/";
import { getCoefProps } from "./Line";
import { connect } from "react-redux";
import { isLinesInCoupon } from "../../Table/Line/";
import TableHeader from "../../TableHeader/";

class HeadToHeadLines extends Component {
  constructor(props) {
    super(props);
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
      !isLinesInCoupon(nextProps.ordinars, this.props.lines) &&
      !isLinesInCoupon(this.props.ordinars, this.props.lines)
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
    const { lines, seasonName, sportId } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <TableHeader
          handleClick={this.toggleTournament.bind(this)}
          name={(seasonName ? seasonName + ". " : "") + ". Кто выше?"}
          isArrow={true}
          isOpen={isOpen}
          icon={getSportIcon(sportId)}
        />
        {isOpen ? (
          <div className="long-term__table">
            {lines.map(line => {
              return (
                <div
                  className="long-term__row"
                  key={line.compoundKey}
                  lineid={line.id}
                >
                  <div className="long-term__left">
                    <div className="long-term__name">
                      <span>{line.outcomeName[0]}</span>
                    </div>
                    <div
                      className={
                        "long-term__coef " +
                        (this.props.ordinars.find(
                          ord =>
                            ord.compoundKey === line.compoundKey &&
                            ord.outcomeId === line.outcomeId[0]
                        )
                          ? "active"
                          : "") +
                        (line.outcomeActive && !line.outcomeActive[0]
                          ? " opacity50"
                          : "")
                      }
                    >
                      <Coef
                        {...getCoefProps({
                          odd: line.outcomeOdds[0],
                          line,
                          outcomeId: line.outcomeId[0],
                          handleClick: this.props.toggleOutcome.bind(
                            this,
                            line,
                            line.outcomeId[0]
                          )
                        })}
                      />
                    </div>
                  </div>
                  <div className="long-term__right">
                    <div
                      className={
                        "long-term__coef " +
                        (this.props.ordinars.find(
                          ord =>
                            ord.compoundKey === line.compoundKey &&
                            ord.outcomeId === line.outcomeId[1]
                        )
                          ? "active"
                          : "") +
                        (line.outcomeActive && !line.outcomeActive[1]
                          ? " opacity50"
                          : "")
                      }
                    >
                      <Coef
                        {...getCoefProps({
                          odd: line.outcomeOdds[1],
                          line,
                          outcomeId: line.outcomeId[1],
                          handleClick: this.props.toggleOutcome.bind(
                            this,
                            line,
                            line.outcomeId[1]
                          )
                        })}
                      />
                    </div>
                    <div className="long-term__name">
                      <span>{getCoefInTrueFormat(line.outcomeName[1])}</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
    linesMap: state.server.eventsAndLines.lines,
    linesByCK: state.server.eventsAndLines.linesByCK,
    ordinars: state.coupon.ordinars
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
)(HeadToHeadLines);
