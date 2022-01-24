import React from "react";
import { getDateInFormat } from "../../Services/Shared";

export default function(props) {
  return (
    <div className="bets__data">
      <div className="bets__number">№{props.ticketId}</div>
      <div className="bets__date">
        <span>{getDateInFormat("day/month/year", props.timestamp)}</span>
        <span>
          &nbsp;
          {getDateInFormat("hours:minutes", props.timestamp)}
        </span>
      </div>
    </div>
  );
}
