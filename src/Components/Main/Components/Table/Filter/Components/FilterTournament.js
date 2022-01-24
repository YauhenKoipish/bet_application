import React from "react";

import { connect } from "react-redux";
import { getSportIcon, transliterate } from "../../../../../../Services/Shared";

const FilterTournament = props => {
  return (
    <div
      className={
        "filter__name" +
        (props.isOpen ? " open" : "") +
        (props.sportName
          ? " " + transliterate(props.sportName, true) + "-background"
          : "")
      }
      onClick={props.toggle}
    >
      {getCaption(props.currentT, props.lang)}
      <div className="filter__arrows">{getSportIcon("arrowsUpDown")}</div>
      {getDropDown(
        props.currentT,
        props.tournaments,
        props.onAllTournaments,
        props.sportName,
        props.lang
      )}
    </div>
  );
};

const getDropDown = (curT, tournaments, onAllTournaments, sportName, lang) => {
  return (
    <ul
      className={
        "filter__dropdowm dropdown" +
        (sportName ? " " + transliterate(sportName, true) + "-background" : "")
      }
    >
      {curT ? (
        <li className="dropdowm__elem" onClick={onAllTournaments}>
          {lang.allChampionships}
        </li>
      ) : (
        ""
      )}
      {tournaments
        ? tournaments.map((t, i) =>
            t.name !== curT ? (
              <li className="dropdowm__elem" key={i} onClick={t.click}>
                {t.name}
              </li>
            ) : (
              ""
            )
          )
        : ""}
    </ul>
  );
};

const getCaption = (tournament, lang) => {
  return (
    <span className="filter__main">
      {tournament ? tournament : lang.allChampionships}
    </span>
  );
};

// export default FilterTournament;

const mapStateToProps = state => {
  return {
    lang: state.user.language_user.dict
  };
};

export default connect(mapStateToProps)(FilterTournament);
