import React from "react";
import { splitRangNumber } from "../../Services/Shared";

export default function Stake(props) {
  const getStake = () => {
    if (props.status) {
      return (
        props.cashoutRecords.reduce((accum, val) => (accum += val.stake), 0) +
        props.stake
      );
    } else {
      return props.stake;
    }
  };

  return (
    <div className="bet-aside__bet">
      <div className="bet-aside__type">{props.lang.betsHistoryTable.bets}</div>
      <div className="bet-aside__money">
        <input
          type="text"
          value={splitRangNumber(Math.floor(getStake()))}
          onChange={props.changeStake}
          ref={props.inputElem}
        />
        <span onClick={props.onClickMaxPay}>{props.maxPayText}</span>
      </div>
    </div>
  );
}
