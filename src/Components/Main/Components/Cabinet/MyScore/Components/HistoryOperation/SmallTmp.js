import React from "react";
import {
  splitRangNumber,
  getDateInFormat
} from "../../../../../../../Services/Shared";
import { sendWithdrawCancelRequest } from "../../../../../../../Server/";

export default function index({
  type = "",
  id = "",
  time = "",
  tax = 0,
  sum = 0,
  total = 0,
  status = "",
  statusClass = "",
  isBonus = false
}) {
  return (
    <div className="history-money__small money-small">
      <div className="money-small__top">
        <div className="money-small__data">
          <span>
            {getDateInFormat("day/month/fullYear hours:minutes", time)}
          </span>
          <span>№{id}</span>
        </div>
        <div className="money-small__type">
          <span>{type}</span>
        </div>
      </div>

      <div className="money-small__row">
        <div className="money-small__title">
          <span>Сумма:</span>
        </div>
        <div className={"money-small__info " + (isBonus ? " bonus-icon" : "")}>
          <span>{splitRangNumber(sum.toFixed(2))}</span>
        </div>
      </div>

      <div className="money-small__row">
        <div className="money-small__title">
          <span>Налог:</span>
        </div>
        <div className="money-small__info">
          <span>{splitRangNumber(tax.toFixed(2))}</span>
        </div>
      </div>

      <div className="money-small__row">
        <div className="money-small__title">
          <span>Итого:</span>
        </div>
        <div className="money-small__info">
          <span>{splitRangNumber(Math.floor(total))}</span>
        </div>
      </div>

      <div className="money-small__row">
        <div className="money-small__title">
          <span>Статус:</span>
        </div>
        <div className={"money-small__info " + statusClass}>
          <span
            onClick={
              status === "Отменить"
                ? () => sendWithdrawCancelRequest(1, id)
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
