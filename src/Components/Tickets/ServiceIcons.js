import React from "react";
import { getIcon } from "../../Services/Shared";

export default function ServiceIcons(props) {
  return (
    <div className="bet-service__icons">
      {props.wasEdited ? getIcon("editing") : ""}
      {props.isCashoutHistory ? <div className="bet-service__cashout" /> : ""}
      {props.isStatistic && props.isBRStatistic ? (
        <div
          onClick={e => props.handleClickShowStatistic(e)}
          className="bet-service__statistic"
        >
          {getIcon("statistic")}
        </div>
      ) : (
        ""
      )}
      {props.isOpenIcon ? <div className="bet-service__open" /> : ""}
    </div>
  );
}
