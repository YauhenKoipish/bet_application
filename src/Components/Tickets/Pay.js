import React from "react";
import { splitRangNumber } from "../../Services/Shared";

export default function Pay(props) {
  return (
    <div
      className={
        "bet-aside__pay " +
        (props.status &&
        props.accountType &&
        props.resultTicketCoef < 1 &&
        props.payout
          ? " bonus-icon"
          : "")
      }
    >
      <div className="bet-aside__type">{props.lang.payout}</div>
      <div className="bet-aside__money">
        <div className="bet-aside__numbers" ref={props.refElem}>
          {getFormatPay(props)}
        </div>
      </div>
    </div>
  );
}

export const getFormatPay = props => {
  const pay = getPay(props);
  if (pay === props.lang.ingame) return pay;
  return splitRangNumber(Math.floor(pay));
};

export const getPay = ({
  cashoutRecords,
  resultTicketCoef,
  coef,
  status,
  stake,
  payout,
  isEdited = false,
  accountType,
  pay,
  lang
}) => {
  if (!status && !isEdited) return lang.ingame;
  if (isEdited) return pay;
  if (!status) {
    return coef * stake;
  } else {
    if (accountType == 1) {
      // ставка с бонусного счета
      if (resultTicketCoef > 1) return payout - stake;
      else return payout;
    } else {
      let correctPay = cashoutRecords.reduce(
        (accum, val) => (accum += val.outputStake),
        0
      );
      correctPay += payout;
      return correctPay;
    }
  }
};
