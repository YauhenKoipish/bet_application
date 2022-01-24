import React from "react";
import Event from "./Event";

export default function Tournament(props) {
  return (
    <div>
      {props.events.map(eId => (
        <Event
          key={eId}
          seasonName={props.seasonName}
          sportId={props.sportId}
          eId={eId}
        />
      ))}
    </div>
  );
}
