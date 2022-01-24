import React from "react";
import { connect } from "react-redux";

import { toggleOutcome } from "../../../../../../Actions/Components/Coupon/";

import {
  getCoefInTrueFormat,
  isLineBlocked,
  renameMarketName,
  getOutcomeName,
  getMarket,
  searchIndexOutcomeId,
  isOutcomeActive,
  isOutcomeBlocked
} from "../../../../../../Services/Shared";

import { isLineInCoupon } from "../../../../../Main/Components/Table/Line/index";
import Coef from "../../../Table/Line/Components/Coef";

class Line extends React.Component {
  constructor(props) {
    super(props);
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
    if (nextProps.ordinars !== this.props.ordinars) {
      const isUpdate = this.isComponentMustBeUpdate(nextProps);
      if (!isUpdate) return false;
      return true;
    }
    return true;
  }

  render() {
    // debugger;
    return (
      <div className="painting_line_container" lineid={this.props.line.id}>
        lineid={this.props.line.id}
        {this.props.line.matrix.map((cols, j) => {
          return (
            <div
              className={
                "painting__line " +
                (isLineBlocked(this.props.line, this.props.event)
                  ? " paused"
                  : "")
              }
              key={j}
            >
              {cols.map((indexOdds, k) => {
                const market = getMarket(
                  this.props.line,
                  this.props.markets,
                  this.props.marketsByNum
                );
                const indexElem = market
                  ? searchIndexOutcomeId(
                      market.outcomeId,
                      indexOdds,
                      this.props.line
                    )
                  : -1;

                return (
                  <div
                    className={
                      "painting__item " +
                      (isOutcomeActive(
                        this.props.line,
                        this.props.line.outcomeId[indexElem.lineIndex],
                        this.props.ordinars
                      )
                        ? " active"
                        : " ") +
                      (!isOutcomeBlocked(
                        this.props.line,
                        this.props.line.outcomeId[indexElem.lineIndex]
                      )
                        ? " opacity50"
                        : " ")
                    }
                    onClick={
                      isOutcomeBlocked(
                        this.props.line,
                        this.props.line.outcomeId[indexElem.lineIndex]
                      )
                        ? () =>
                            this.props.toggleOutcome(
                              this.props.line,
                              this.props.line.outcomeId[indexElem.lineIndex]
                            )
                        : f => f
                    }
                    key={k}
                  >
                    <div className="painting__team">
                      {renameMarketName(
                        this.props.line,
                        getMarket(
                          this.props.line,
                          this.props.markets,
                          this.props.marketsByNum
                        ),
                        getOutcomeName(
                          market,
                          this.props.line.outcomeId[indexElem.lineIndex],
                          this.props.line
                        )
                      )}
                    </div>

                    <Coef
                      key={
                        this.props.line.compoundKey + "-" + indexElem.lineIndex
                      }
                      coef={getCoefInTrueFormat(
                        this.props.line.outcomeOdds[indexElem.lineIndex]
                      )}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
  getRenameParamMarket(lineParam, market, indexElem) {
    const arrSSl = [
      "match_goalscorer",
      "team_goalscorer",
      "last_match_goalscorer",
      "score_anytime_grouped",
      "score_brace_grouped",
      "score_hattrick_grouped",
      "score_both_halves",
      "player_to_score_and_match_result",
      "extra_time_match_goalscorer",
      "player_scores_freekick",
      "player_score_header",
      "player_to_score_outside_area",
      "player_to_score_and_assist_goal",
      "both_players_to_score",
      "both_players_to_score_header"
    ];
    const findPlayersSSL = [...this.props.event.lines.values()].find(line => {
      const market = getMarket(
        lineParam,
        this.props.markets,
        this.props.marketsByNum
      );
      if (!market) return false;
      return arrSSl.includes(market.objectId.toString().split("_out_num")[0]);
    });
    if (findPlayersSSL) return this.props.line.outcomeName[indexElem.lineIndex];
    return this.props.line.outcomeTeam[indexElem.marketIndex];
  }
}

const mapStateToProps = state => {
  return {
    ordinars: state.coupon.ordinars,
    marketsByNum: state.server.entities.marketsByNum,
    markets: state.server.entities.markets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleOutcome: (line, outcomeId) => {
      dispatch(toggleOutcome(line, outcomeId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Line);
