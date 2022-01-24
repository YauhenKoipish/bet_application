import React from "react";
import { getScore, transliterate } from "../../Services/Shared";
import FutbolScore from "../../Services/Scores/Futbol";
import TennisScore from "../../Services/Scores/Tennis";
import BaseballScore from "../../Services/Scores/Baseball";
import BoxingScore from "../../Services/Scores/Boxing";
import VolleyScore from "../../Services/Scores/Volley";

export default props => {
  if (!props.event || props.event.status !== 1) return "";
  const info = props.info;
  if (!info) return "";
  const transliterSportName = props.sport
    ? transliterate(props.sport.name, true)
    : "";
  return (
    <React.Fragment>
      {getScoreTmp(props.event, info, transliterSportName)}
    </React.Fragment>
  );
};

export const classTeamFeed = (team, event, returningClass = "active") => {
  if (!event) return "";
  const info = getScore(event);
  switch (event.sportId) {
    case 1023: // futbol
      if (team === event.homeName) {
        if (info.homeRedCards) return "red-card";
      } else if (team === event.awayName) {
        if (info.awayRedCards) return "red-card";
      }
      return "";
    case 1033: //Table Tennis +
    case 1034: //Tennis +
    case 1014: // Badminton +
    case 1035: //Volleyball +
    case 1017: //Beach Volleyball +
    case 1022: //Darts +
    case 1036: //Snooker +
    case 1107: //Sqoush +
    case 1202: //cybersport +
      if (team === event.homeName) {
        if (info.currentServer === 1) return returningClass;
      } else if (team === event.awayName) {
        if (info.currentServer === 2) return returningClass;
      }
      return "";
    default:
      return "";
  }
};

const getScoreTmp = (event, info, transliterSportName = "") => {
  if (!event) return "";
  info.color = transliterSportName + "-color";
  switch (event.sportId) {
    case 1023: // futbol
    case 1027:
    case 1016:
    case 1028:
    case 1030:
    case 1031:
    case 1012:
    case 1013:
    case 1025:
    case 1038:
    case 1103:
      return FutbolScore(info);
    case 1034: //Tennis
      return TennisScore(info);
    case 1035: //Volleyball
    case 1021:
    case 1014:
    case 1017:
    case 1019:
    case 1033:
    case 1107:
    case 1036:
      return VolleyScore(info);
    case 1015:
    case 1022:
    case 1202:
      return BaseballScore(info);
    case 1020:
    case 1101:
      return BoxingScore(info);
    default:
      return "";
  }
};

//BaseballScore
//BoxingScore

// case 1020: //Boxing
//     break;
// case 1021: //Cricket
//     result.homeScore = getMatchHomeScore(event);
//     result.awayScore = getMatchAwayScore(event);
//     break;
// case 1022: //Darts
//     result.homeGameScore = getMatchHomeGameScore(event);
//     result.awayGameScore = getMatchAwayGameScore(event);
//     result.homeSetScore = getMatchHomeScore(event);
//     result.awaySetScore = getMatchAwayScore(event);
//     result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
//     result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
//     result.currentServer = getCurrentServer(event);
//     break
// case 1030: //Rugby League
//     result.homeScore = getMatchHomeScore(event);
//     result.awayScore = getMatchAwayScore(event);
//     result.time = getMatchTime(event);
//     break;
// case 1031: //Rugby
//     result.homeScore = getMatchHomeScore(event);
//     result.awayScore = getMatchAwayScore(event);
//     result.time = getMatchTime(event);
//     break;
// case 1202: //Cybersport
//     break;
// case 1012: //American Football
//     result.homeScore = getMatchHomeScore(event);
//     result.awayScore = getMatchAwayScore(event);
//     result.time = getMatchTime(event);
//     break;
// case 1015: //Baseball
//     break;
// case 1013: //Aussie Rules
//     result.homeScore = getMatchHomeScore(event);
//     result.awayScore = getMatchAwayScore(event);
//     result.time = getMatchTime(event);
//     break;
// case 1014: //Badminton
//     break;
// case 1017: //Beach Volley
//     break;
// case 1019: //Bowls
//     break;
// case 1025: //Gaelic Football
//     result.homeScore = getMatchHomeScore(event);
//     result.awayScore = getMatchAwayScore(event);
//     result.time = getMatchTime(event);
//     break;
// case 1033: //Table Tennis
//     break;
// case 1038: //Hurling
//     result.homeScore = getMatchHomeScore(event);
//     result.awayScore = getMatchAwayScore(event);
//     result.time = getMatchTime(event);
//     break;
// case 1101: //FormulaOne
//     break;
// case 1103: //Futsal
//     result.homeScore = getMatchHomeScore(event);
//     result.awayScore = getMatchAwayScore(event);
//     result.time = getMatchTime(event);
//     break;
// case 1107: //Squash
//     break;
