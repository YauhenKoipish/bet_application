import React, { Component } from "react";
import {
  splitRangNumber,
  getDateInFormat,
  getSportIcon
} from "../../Services/Shared";

export default class CashoutHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleHistory() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const cashoutRecords = this.props.cashoutRecords;
    if (!cashoutRecords || cashoutRecords.length === 0) return "";
    return (
      <div
        className={
          "bets__history bet-history" + (!this.state.isOpen ? " closed" : "")
        }
      >
        <div
          className="bet-history__header"
          onClick={this.toggleHistory.bind(this)}
        >
          <span>История кэшаута</span>
          <div className="bet-history-arrow-dropbox">
            {getSportIcon("arrow")}
          </div>
        </div>

        <div className="bet-history__titles">
          <div className="bet-history__title">Кэшаут</div>
        </div>
        {cashoutRecords.map((r, i) => (
          <div className="bet-history__line" key={i}>
            <div className="bet-history__left">
              <div className="bet-history__date">
                {getDateInFormat("day/month hours:minutes", r.timestamp)}
              </div>
            </div>
            <div className="bet-history__right">
              <div className="bet-history__money">
                {splitRangNumber(Math.floor(r.outputStake))}
              </div>
            </div>
          </div>
        ))}
        <div className="bet-history__total">
          <div className="bet-history__left">
            <div className="bet-history__date">Всего</div>
          </div>
          <div className="bet-history__right">
            <div className="bet-history__money">
              {splitRangNumber(
                Math.floor(
                  cashoutRecords.reduce(
                    (accum, val) => (accum += val.outputStake),
                    0
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
