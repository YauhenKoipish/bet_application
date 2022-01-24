import React from "react";
import Tournament from "./Tournament";

export default function Season(props) {
  return (
    <div>
      {props.tournaments.map(t => (
        <Tournament
          key={t.tournamentId}
          seasonName={props.name}
          sportId={props.sportId}
          {...t}
        />
      ))}
    </div>
  );
}
