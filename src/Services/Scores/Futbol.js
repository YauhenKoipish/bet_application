import React from "react";

export default props => {
  const color = props.color ? props.color : "";
  const score =
    props.homeScore + ":" + props.awayScore === ":" ||
    props.homeScore === undefined ||
    props.awayScore === undefined
      ? ""
      : props.homeScore + ":" + props.awayScore;
  return (
    <div className="line-live__score">
      <div className="line-live__column">
        <div className={"bold " + color}>{score}</div>
        <div>
          {props.status.match(new RegExp("Пер.", "g")) ||
          props.status.match(new RegExp("Пен.", "g"))
            ? props.status
            : props.status + " " + props.time}
        </div>
      </div>
    </div>
  );
};
