import React from "react";
import {
  splitRangNumber,
  getDateInFormat
} from "../../../../../../../Services/Shared";
import { sendWithdrawCancelRequest } from "../../../../../../../Server/";

const handleClickInProgress = props => {
  const { isInProgress = true } = props;
  if (isInProgress) {
    window.open(props.link, "_blank");
  } else {
    sendWithdrawCancelRequest(1, props.id);
  }
};

export default function index(props) {
  const {
    type = "",
    id = "",
    time = "",
    tax = 0,
    sum = 0,
    total = 0,
    status = "",
    isBonus = false,
    statusClass = "",
    link = "",
    isInProgress = true
  } = props;
  return (
    <div className="money-big__body">
      <div className="money-big__row">
        <div className="money-big__cell">
          <span>
            {getDateInFormat("day/month/fullYear hours:minutes", time)}
          </span>
          <span>№{id}</span>
        </div>
        <div className="money-big__cell">
          <span>{type}</span>
        </div>
        <div className={"money-big__cell " + (isBonus ? " bonus-icon" : "")}>
          <span>{splitRangNumber(sum.toFixed(2))}</span>
        </div>
        <div className="money-big__cell">
          <span>{splitRangNumber(tax.toFixed(2))}</span>
        </div>
        <div className="money-big__cell">
          <span>{splitRangNumber(Math.floor(total))}</span>
        </div>
        <div className={"money-big__cell " + statusClass}>
          <span
            onClick={
              status === "В процессе"
                ? () => handleClickInProgress(props)
                : f => f
            }
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
