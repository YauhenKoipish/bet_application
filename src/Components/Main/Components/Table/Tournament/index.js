import React from "react";
import Event from "../Event/";
import { connect } from "react-redux";
import { getSportIcon } from "../../../../../Services/Shared";
import { isDevelop } from "../../../../../Constants/";
import TableHeader from "../../TableHeader/";

const Tournament = props => {
  const {
    tournament,
    events,
    handleRospis,
    name,
    toggleTournament,
    isOpen
  } = props;
  if (!tournament) {
    console.warn("нет турнира", props);
    return "";
  }
  return (
    <div
      className={"main-table__sport" + (isOpen ? " open" : "")}
      key={tournament.id}
      tournamentid={tournament.id}
    >
      <TableHeader
        handleClick={toggleTournament}
        name={
          (isDevelop || props.isBookmaker ? tournament.id + " " : "") + name
        }
        isArrow={true}
        isOpen={isOpen}
        icon={getSportIcon(tournament.sportId, "svg", props.color)}
      />
      {events.map((event, i) => {
        return (
          <Event
            eventId={event.id}
            handleRospis={() => handleRospis(event.id)}
            key={event.id}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  isBookmaker: state.isBookmaker
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tournament);
