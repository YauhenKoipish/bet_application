import React from "react";
//иконки видов спорта
import { ReactComponent as AmericanFootball } from "../Components/Menu/img/sport-left/AmericanFootball.svg";
import { ReactComponent as AussieRules } from "../Components/Menu/img/sport-left/AussieRules.svg";
import { ReactComponent as Badminton } from "../Components/Menu/img/sport-left/Badminton.svg";
import { ReactComponent as Baseball } from "../Components/Menu/img/sport-left/Baseball.svg";
import { ReactComponent as Calendar } from "../Components/Menu/img/sport-left/calendar.svg";
import { ReactComponent as CalendarActive } from "../Components/Menu/img/sport-left/calendar-active.svg";
import { ReactComponent as Basketball } from "../Components/Menu/img/sport-left/Basketball.svg";
import { ReactComponent as Boxing } from "../Components/Menu/img/sport-left/Boxing.svg";
import { ReactComponent as BeachSoccer } from "../Components/Menu/img/sport-left/BeachSoccer.svg";
import { ReactComponent as BeachVolley } from "../Components/Menu/img/sport-left/BeachVolley.svg";
// import { ReactComponent as ChampionsLeague } from "../Components/Menu/img/sport-left/Champions League.svg";
import { ReactComponent as Cricket } from "../Components/Menu/img/sport-left/Cricket.svg";
import { ReactComponent as Curling } from "../Components/Menu/img/sport-left/Curling.svg";
import { ReactComponent as Cybersport } from "../Components/Menu/img/sport-left/Cybersport.svg";
import { ReactComponent as Darts } from "../Components/Menu/img/sport-left/Darts.svg";
import { ReactComponent as Fieldhockey } from "../Components/Menu/img/sport-left/Fieldhockey.svg";
import { ReactComponent as Floorball } from "../Components/Menu/img/sport-left/Floorball.svg";
import { ReactComponent as Golf } from "../Components/Menu/img/sport-left/Golf.svg";
import { ReactComponent as Handball } from "../Components/Menu/img/sport-left/Handball.svg";
import { ReactComponent as IceHockey } from "../Components/Menu/img/sport-left/IceHockey.svg";
// import { ReactComponent as Motorsport } from "../Components/Menu/img/sport-left/Motorsport.svg";
import { ReactComponent as Olympics } from "../Components/Menu/img/sport-left/Olympics.svg";
import { ReactComponent as Other } from "../Components/Menu/img/sport-left/Other.svg";
import { ReactComponent as Pesapallo } from "../Components/Menu/img/sport-left/Pesapallo.svg";
import { ReactComponent as Rugby } from "../Components/Menu/img/sport-left/Rugby.svg";
import { ReactComponent as RugbyLeague } from "../Components/Menu/img/sport-left/RugbyLeague.svg";
import { ReactComponent as Snooker } from "../Components/Menu/img/sport-left/Snooker.svg";
import { ReactComponent as Soccer } from "../Components/Menu/img/sport-left/Soccer.svg";
import { ReactComponent as Squash } from "../Components/Menu/img/sport-left/Squash.svg";
import { ReactComponent as TableTennis } from "../Components/Menu/img/sport-left/TableTennis.svg";
import { ReactComponent as Tennis } from "../Components/Menu/img/sport-left/Tennis.svg";
import { ReactComponent as Volleyball } from "../Components/Menu/img/sport-left/Volleyball.svg";
import { ReactComponent as Waterpolo } from "../Components/Menu/img/sport-left/Waterpolo.svg";
import { ReactComponent as WinterSports } from "../Components/Menu/img/sport-left/WinterSports.svg";
import { ReactComponent as Fave } from "../Components/Menu/img/sport-left/fave.svg";
import { ReactComponent as FaveFill } from "../Components/Menu/img/sport-left/favourite-fill.svg";
import { ReactComponent as AllSports } from "../Components/Menu/img/sport-left/All_sports.svg";
import { ReactComponent as Translation } from "../Components/Menu/img/sport-left/Translation.svg";
import { ReactComponent as Plus } from "../Components/Menu/img/sport-left/plus.svg";
import { ReactComponent as Minus } from "../Components/Menu/img/sport-left/minus.svg";
import { ReactComponent as Arrow } from "../Components/Menu/img/line-live/arrow.svg";
import { ReactComponent as CloseIcon } from "../Components/Menu/img/line-live/close.svg";
import { ReactComponent as SettingIcon } from "../Components/Menu/img/line-live/settings.svg";
import { ReactComponent as ArrowsUpDown } from "../Components/Main/Components/Table/Filter/img/arrows.svg";
import { ReactComponent as FavSmall } from "../Components/Menu/img/line-live/fav.svg";
import { ReactComponent as FavSmallFull } from "../Components/Menu/img/line-live/fav-full.svg";
import { ReactComponent as LiveIcon } from "../Components/Main/Components/Table/Event/img/line/live.svg";
import { ReactComponent as StatIcon } from "../Components/Main/Components/Table/Event/img/line/stat.svg";
import { ReactComponent as TranslationIcon } from "../Components/Main/Components/Table/Event/img/line/translation.svg";
import { ReactComponent as TringleIcon } from "../img/figures/tringle.svg";
import { ReactComponent as ArrowTicket } from "../img/figures/arrowTicket.svg";
import { ReactComponent as OddsAuthorize } from "../img/authorize/oddsAuthorize.svg";
import { ReactComponent as ConfirmOk } from "../img/authorize/confirmOk.svg";
import { ReactComponent as BgImgModalRegistration } from "../img/authorize/bgModal.svg";
import { ReactComponent as Editing } from "../Components/Tickets/img/edited.svg";
import { ReactComponent as FilterPartCashaout } from "../Components/Tickets/img/filter.svg";
import { ReactComponent as DoubleArrows } from "../img/figures/doubleArrows.svg";
import { ReactComponent as Logo } from "../Components/Header/Image/logo/logo-small.svg";
import { ReactComponent as LogoBig } from "../img/logo/logo-big.svg";
import { ReactComponent as Eyes } from "../img/eyes.svg";
import { ReactComponent as EyesClose } from "../img/eyes-close.svg";
import { ReactComponent as Fav } from "../Components/Main/Components/Rospis/Components/img/fav.svg";
import { ReactComponent as UserIcon } from "../Components/Header/Image/user-info/user-icon-white.svg";
import { ReactComponent as ReplenishmentIcon } from "../Components/Header/Image/replenishment-button/replenishment.svg";
import { ReactComponent as RefreshBalansIcon } from "../Components/Main/Components/Cabinet/img/refresh.svg";
import { ReactComponent as PhoneIcon } from "../img/icon/phone.svg";
import { ReactComponent as MailIcon } from "../img/icon/mail.svg";
import { ReactComponent as MakeReportIcon } from "../img/bookmaker/make_report.svg";
import { ReactComponent as NewGroupIcon } from "../img/bookmaker/new_group.svg";
import { ReactComponent as OpenBetsIcon } from "../img/bookmaker/open_bets.svg";
import { ReactComponent as TopBetsIcon } from "../img/bookmaker/top_bets.svg";
import { ReactComponent as InformationIcon } from "../img/bookmaker/information.svg";

// import { ReactComponent as TranslationIcon } from "../Components/Main/Components/Table/Event/img/line/translation.svg";
//прочие иконки

import { ReactComponent as Burger } from "../img/top-nav/burger.svg";

import { getLocalStorageData, setLocalStorage } from "./LocalStorage";
import {
  addSendingData,
  clearCoupon,
  toggleOutcome,
  setSumInputExpress,
  setSumInputOrdinar,
  setSumInputSystem,
  sendCouponBuilder,
  setTypeSendingTicket
} from "../Actions/Components/Coupon/";
import { showModal } from "../Actions/Components/Modal/";

import {
  removePreloaderTicket,
  addEditingTicket
} from "../Actions/Components/Tickets";
import { getState, dispatch } from "../";
import { getExtraLine } from "../Actions/Components/Server/Case2";
import { addFavEvents } from "../Actions/Components/Server/CurrentStates/";
import { addBetsEditingTicket } from "../Actions/Components/Tickets/";

import { routsName } from "../Router/RouterList";
// import { matchStatusDict } from "./Dict";

export const getArrayFatBet = (min = 100, max = 4000) => {
  if (min > max) return [0];
  const array = [min];
  let curSum = min;
  for (; curSum < max; ) {
    curSum = curSum * 2;
    if (curSum < max) array.push(curSum);
  }
  array.push(max);
  return array;
};

export const TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000;

export const heightOneCellLineWithSpecifier = 71;

export const additionOfInformationToTheLine = (line, markets) => {
  const modificatinLine = line;
  const market = markets.get(modificatinLine.marketId.toString());
  modificatinLine.name = market.name;
  // modificatinLine.teamGoal = line.outcomeTeam;
  // modificatinLine.outcomeTeam = market.outcomeName;
  // return modificatinLine;
};

export const scrollTop = arrayHistory => {
  const index = arrayHistory.length - 1;

  if (!arrayHistory[index].includes("/rospis")) window.scrollTo(0, 0);
};

export const sortOutcome__correctScore = line => {
  return line;
};

export const getTimestampWithOffset = (timestamp, isServerToClient) => {
  return isServerToClient
    ? timestamp - TIME_ZONE_OFFSET
    : timestamp + TIME_ZONE_OFFSET;
};

export const getFormattedCoef = value => {
  let coef = +value;
  if (coef < 10) return (Math.floor(coef * 100) / 100).toFixed(2);
  if (coef >= 10 && coef < 100) return (Math.floor(coef * 10) / 10).toFixed(1);
  if (coef >= 100) return Math.floor(coef);
};

export const getFormattedSum = value => {
  return Math.floor(+value);
};

export const getSumSplittedBySpaces = value => {
  value = String(value).replace(" ", "");
  if (isNaN(value) || +value < 0) return value;
  let buff = [];
  for (let i = 0; i < value.length; i++) {
    if ((i + 1) % 3 || i + 1 === value.length) {
      buff.unshift(value[value.length - 1 - i]);
    } else {
      buff.unshift(` ${value[value.length - 1 - i]}`);
    }
  }
  return buff.join("");
};

export const getValidOdd = val => {
  let value = +val;
  if (value <= 1000) return 0;
  return value / 1000;
};

export const getFormattedNumeral = data => {
  let num = data.number,
    divisionReminder;
  switch (data.word) {
    case "исход":
      if (num === 1) return "исход";
      if (num > 1 && num < 5) return "исхода";
      if (num >= 5 && num <= 20) return "исходов";
      return "исход(-ов)";
    case "день":
      if (num >= 5 && num <= 20) return "дней";
      divisionReminder = num % 10;
      if (divisionReminder === 1) return "день";
      if (
        divisionReminder === 2 ||
        divisionReminder === 3 ||
        divisionReminder === 4
      )
        return "дня";
      if (
        !divisionReminder ||
        divisionReminder === 5 ||
        divisionReminder === 6 ||
        divisionReminder === 7 ||
        divisionReminder === 8 ||
        divisionReminder === 9
      )
        return "дней";
      break;
    case "час":
      if (num >= 5 && num <= 20) return "часов";
      divisionReminder = num % 10;
      if (divisionReminder === 1) return "час";
      if (
        divisionReminder === 2 ||
        divisionReminder === 3 ||
        divisionReminder === 4
      )
        return "часа";
      if (
        !divisionReminder ||
        divisionReminder === 5 ||
        divisionReminder === 6 ||
        divisionReminder === 7 ||
        divisionReminder === 8 ||
        divisionReminder === 9
      )
        return "часов";
      break;
    case "минута":
      if (num >= 5 && num <= 20) return "минут";
      divisionReminder = num % 10;
      if (divisionReminder === 1) return "минута";
      if (
        divisionReminder === 2 ||
        divisionReminder === 3 ||
        divisionReminder === 4
      )
        return "минуты";
      if (
        !divisionReminder ||
        divisionReminder === 5 ||
        divisionReminder === 6 ||
        divisionReminder === 7 ||
        divisionReminder === 8 ||
        divisionReminder === 9
      )
        return "минут";
      break;
    default:
      return;
  }
};

const getCatKey = (line, gbId) => {
  // 0 sr:match: //1 -  sr:race_event(sr:stage) //2 - sr:simple_tournament //3 sr:season (sr : tournament) //4 sr:race_tournament //5 vf:match //6 vf:season (vf:tournament:)
  //7 - vbl:match  //8 - vto:match  //9 - vbl:season : (vbl:tournament) //10 - vto:season (vto:tournament) //11 vdr:stage //12 vhc:stage //13 vti:match // 14 wns:match//
  //15 vdr:season : (vdr:stage) //16 vhc:season (vhc:stage:) //17 vti:season : (vti:tournament) //18 wns:season (wns:tournament: //19 ssln_event
  if (line.marketId >= 30000 && gbId > 0 && gbId !== line.eventId)
    return "99" + gbId;

  switch (line.lineTypeRadar) {
    case 0:
      return "00" + line.eventId.substring(2);
    case 1:
      return "01" + line.eventId.substring(2);
    case 2:
      return "02" + line.radarTournamentId;
    case 3:
      return "03" + line.radarTournamentId;
    case 4:
      return "04" + line.radarTournamentId;
    case 5:
      return "05" + line.eventId.substring(2);
    case 6:
      return "06" + line.radarTournamentId;
    case 7:
      return "07" + line.eventId.substring(2);
    case 8:
      return "08" + line.eventId.substring(2);
    case 9:
      return "09" + line.radarTournamentId;
    case 10:
      return "10" + line.radarTournamentId;
    case 11:
      return "11" + line.eventId.substring(2);
    case 12:
      return "12" + line.eventId.substring(2);
    case 13:
      return "13" + line.eventId.substring(2);
    case 14:
      return "14" + line.eventId.substring(2);
    case 15:
      return "15" + line.radarTournamentId;
    case 16:
      return "16" + line.radarTournamentId;
    case 17:
      return "17" + line.radarTournamentId;
    case 18:
      return "18" + line.radarTournamentId;
    case 19:
      return "19" + line.eventId.substring(2);
    case 20:
      return "20" + line.eventId.substring(2);
    case 21:
      return "21" + line.eventId.substring(2);
    case 22:
      return "22" + line.eventId.substring(2);
    case 23:
      return "23" + line.eventId.substring(2);
    default:
      break;
  }
  return "";
};

// const getOrdinarCatKey = (line, gbId) => {
//   // 0 sr:match: //1 -  sr:race_event(sr:stage) //2 - sr:simple_tournament //3 sr:season (sr : tournament) //4 sr:race_tournament //5 vf:match //6 vf:season (vf:tournament:)
//   //7 - vbl:match  //8 - vto:match  //9 - vbl:season : (vbl:tournament) //10 - vto:season (vto:tournament) //11 vdr:stage //12 vhc:stage //13 vti:match // 14 wns:match//
//   //15 vdr:season : (vdr:stage) //16 vhc:season (vhc:stage:) //17 vti:season : (vti:tournament) //18 wns:season (wns:tournament: //19 ssln_event
//   if (line.marketId >= 30000 && gbId > 0 && gbId !== eventId)
//     return "99" + gbId; // переписать

//   switch (line.lineTypeRadar) {
//     case 0:
//       return "00" + line.eventId.substring(2);
//     case 1:
//       return "01" + line.eventId.substring(2);
//     case 2:
//       return "02" + line.radarTournamentId;
//     case 3:
//       return "03" + line.radarTournamentId;
//     case 4:
//       return "04" + line.radarTournamentId;
//     case 5:
//       return "05" + line.eventId.substring(2);
//     case 6:
//       return "06" + line.radarTournamentId;
//     case 7:
//       return "07" + line.eventId.substring(2);
//     case 8:
//       return "08" + line.eventId.substring(2);
//     case 9:
//       return "09" + line.radarTournamentId;
//     case 10:
//       return "10" + line.radarTournamentId;
//     case 11:
//       return "11" + line.eventId.substring(2);
//     case 12:
//       return "12" + line.eventId.substring(2);
//     case 13:
//       return "13" + line.eventId.substring(2);
//     case 14:
//       return "14" + line.eventId.substring(2);
//     case 15:
//       return "15" + line.radarTournamentId;
//     case 16:
//       return "16" + line.radarTournamentId;
//     case 17:
//       return "17" + line.radarTournamentId;
//     case 18:
//       return "18" + line.radarTournamentId;
//     case 19:
//       return "19" + line.eventId.substring(2);
//     case 20:
//       return "20" + line.eventId.substring(2);
//     default:
//       break;
//   }
//   return "";
// };

// static getCompoundKey(data) {
//   let compoundKey = getCatKey(data) + ";" + data.marketId;
//   for (let i = 0; i < data.specifierValue.length; i++) {
//       if (i === 0) compoundKey = compoundKey + ";" + data.specifierValue[i];
//       else compoundKey = compoundKey + "&" + data.specifierValue[i];
//   }
//   return compoundKey;

//   function getCatKey(data) {
//       if (data.marketId >= 30000 && data.gbEventId > 0)  return "99" + data.gbEventId;

//       switch (data.lineTypeRadar) {
//           case 0: return "00" + data.eventId.substring(2);
//           case 1: return "01" + data.eventId.substring(2);
//           case 2: return "02" + data.radarTournamentId;
//           case 3: return "03" + data.radarTournamentId;
//           case 4: return "04" + data.radarTournamentId;
//           case 5: return "05" + data.eventId.substring(2);
//           case 6: return "06" + data.radarTournamentId;
//           case 7: return "07" + data.eventId.substring(2);
//           case 8: return "08" + data.eventId.substring(2);
//           case 9: return "09" + data.radarTournamentId;
//           case 10: return "10" + data.radarTournamentId;
//           case 11: return "11" + data.eventId.substring(2);
//           case 12: return "12" + data.eventId.substring(2);
//           case 13: return "13" + data.eventId.substring(2);
//           case 14: return "14" + data.eventId.substring(2);
//           case 15: return "15" + data.radarTournamentId;
//           case 16: return "16" + data.radarTournamentId;
//           case 17: return "17" + data.radarTournamentId;
//           case 18: return "18" + data.radarTournamentId;
//           case 19: return "19" + data.eventId.substring(2);
//           case 20: return "20" + data.eventId.substring(2);
//       }
//       return "";
//   }
// }

// export const getOrdinarCompoundKey = (ordinar) => {
//   if (ordinar.compoundKey && ordinar.compoundKey.length > 0) return ordinar.compoundKey;
//   ordinar.compoundKey = getCatKey(line, event.gbId) + ";" + line.marketId;
//   for (let i = 0; i < line.specifierValue.length; i++) {
//     if (i === 0)
//       line.compoundKey = line.compoundKey + ";" + line.specifierValue[i];
//     else line.compoundKey = line.compoundKey + "&" + line.specifierValue[i];
//   }
//   return line.compoundKey;
// };

export const getCompoundKey = (line, event) => {
  if (line.compoundKey && line.compoundKey.length > 0) return line.compoundKey;
  line.compoundKey = getCatKey(line, event.gbId) + ";" + line.marketId;
  for (let i = 0; i < line.specifierValue.length; i++) {
    if (i === 0)
      line.compoundKey = line.compoundKey + ";" + line.specifierValue[i];
    else line.compoundKey = line.compoundKey + "&" + line.specifierValue[i];
  }
  return line.compoundKey;
};

export const getValidTimeStamp = timestamp => {
  return (timestamp + new Date().getTimezoneOffset() * 60) * 1000;
};

export const getMenuContainerHeight = () => {
  const getFavSportsHeight = () => {
    const elem = document.getElementById("menu-favSports");
    if (!elem) return 0;
    return elem.clientHeight;
  };

  const getHeaderHeight = () => {
    document.getElementsByTagName("header");
    return parseInt(
      getComputedStyle(document.getElementsByTagName("header")[0]).height
    );
  };

  return window.innerHeight - getHeaderHeight() - getFavSportsHeight();
};

export const getIcon = (iconName, color = "white") => {
  switch (iconName) {
    case "burger-menu":
      return <Burger fill={color} />;
    case "plus": // translation
      return <Plus fill={color} />;
    case "minus": // translation
      return <Minus fill={color} />;
    case "logo-sml":
      return <Logo fill={color} />;
    case "logo-big":
      return <LogoBig fill={color} />;
    case "setting":
      return <SettingIcon fill="#798192" />;
    case "tringle":
      return <TringleIcon fill={color} />;
    case "calendar":
      return <Calendar fill={"#283042"} />;
    case "calendar-active":
      return <CalendarActive />;
    case "arrowTicket":
      return <ArrowTicket fill={color} />;
    case "statistic":
      return <StatIcon fill={color} />;
    case "double_arrows":
      return <DoubleArrows fill={color} />;
    case "editing":
      return <Editing fill={color} />;
    case "part__cashout":
      return <FilterPartCashaout fill={color} />;
    case "odds_96_big_authorize":
      return <OddsAuthorize />;
    case "confirmOk":
      return <ConfirmOk />;
    case "fav":
      return <Fave />;
    case "favFill":
      return <Fave fill={color} />;
    case "icon_registration":
      return <BgImgModalRegistration />;
    case "eyes":
      return <Eyes />;
    case "eyes-close":
      return <EyesClose />;
    case "user-icon":
      return <UserIcon fill={color} />;
    case "replenishment":
      return <ReplenishmentIcon fill={color} />;
    case "refreshBalansIcon":
      return <RefreshBalansIcon fill={color} />;
    case "arrow":
      return <Arrow fill={color} />;
    case "phone":
      return <PhoneIcon fill={color} />;
    case "mail":
      return <MailIcon fill={color} />;
    case "makeReport":
      return <MakeReportIcon fill={color} />;
    case "newGroup":
      return <NewGroupIcon fill={color} />;
    case "openBets":
      return <OpenBetsIcon fill={color} />;
    case "topBets":
      return <TopBetsIcon fill={color} />;
    case "information":
      return <InformationIcon fill={color} />;

    default:
      break;
  }
  return "Не получил картинку по iconName " + iconName;
};

export const getSportIcon = (id, className, color = "white") => {
  // const state = getState();

  switch (id) {
    case 1: // футбол BR id
    case 1023: // футбол
      return <Soccer className={className} fill={color} />;
    case 2: // Баскетбол
    case 1016: // Баскетбол BR id
      return <Basketball className={className} fill={color} />;
    case 3: // Бейсбол
    case 1015: // Бейсбол BR id
      return <Baseball className={className} fill={color} />;
    case 4: // Хоккей
    case 1027: // Хоккей BR id
      return <IceHockey className={className} fill={color} />;
    case 5: // теннис BR id
    case 1034: // теннис
      return <Tennis className={className} fill={color} />;
    case 6: // гандбол BR id
    case 1028: // теннис
      return <Handball className={className} fill={color} />;
    case 7: // флорбол BR id
    case 1102: // флорбол
      return <Floorball className={className} fill={color} />;
    case 9: // гольф BR id
    case 1026: // гольф
      return <Golf className={className} fill={color} />;
    case 10: // бокс BR id
    case 1020: // бокс
      return <Boxing className={className} fill={color} />;
    case 12: // рэгби BR id
    case 1031: // рэгби
      return <Rugby className={className} fill={color} />;
    case 13: // авст футбол BR id
    case 1013: // рэгби
      return <AussieRules className={className} fill={color} />;
    case 14: // зима BR id
    case 1143: // зима
      return <WinterSports className={className} fill={color} />;
    case 16: // Ам футбол BR id
    case 1012: // Ам футбол
      return <AmericanFootball className={className} fill={color} />;
    case 19: // снукер BR id
    case 1036: // снукер
      return <Snooker className={className} fill={color} />;
    case 20: // настольный теннис BR id
    case 1033: // настольный теннис
      return <TableTennis className={className} fill={color} />;
    case 21: // крикет BR id
    case 1021: // крикет
      return <Cricket className={className} fill={color} />;
    case 22: // дартс BR id
    case 1022: // дартс
      return <Darts className={className} fill={color} />;
    case 23: // волейбол BR id
    case 1035: // волейбол
      return <Volleyball className={className} fill={color} />;
    case 24: // Хоккей на траве BR id
    case 1126: // Хоккей на траве
      return <Fieldhockey className={className} fill={color} />;
    case 26: // водное поло BR id
    case 1042: // водное поло
      return <Waterpolo className={className} fill={color} />;
    case 28: // водное поло BR id
    case 1118: // водное поло
      return <Curling className={className} fill={color} />;
    case 30: // Олим игры BR id
    case 1132: // Олим игры
      return <Olympics className={className} fill={color} />;
    case 31: // Бадминтон BR id
    case 1014: // Бадминтон
      return <Badminton className={className} fill={color} />;
    case 34: // Пляжный волейбол BR id
    case 1017: // Пляжный волейбол
      return <BeachVolley className={className} fill={color} />;
    case 37: // Сквош BR id
    case 1107: // Сквош
      return <Squash className={className} fill={color} />;
    case 1030: // рэгбиЛиг BR id
    case 59: // рэгбиЛиг
      return <RugbyLeague className={className} fill={color} />;
    case 1112: // пляж футбол BR id
    case 60: // пляж футбол
      return <BeachSoccer className={className} fill={color} />;
    case 61: // песапалло BR id
    case 1127: // песапалло
      return <Pesapallo className={className} fill={color} />;
    case 1202: // киберспорт
      return <Cybersport className={className} fill={color} />;
    case -1: // fave
    case "fave": // translation
      return <Fave className={className} fill={color} />;
    case "faveFill":
      return <FaveFill className={className} fill={color} />;
    case -2: // allSports
    case "allSports": // translation
      return <AllSports className={"yellow"} fill={color} />;
    case -3: // translation
    case "translation": // translation
      return <Translation className={className} fill={color} />;
    case "plus": // translation
      return <Plus className={className} fill={color} />;
    case "minus": // translation
      return <Minus className={className} fill={color} />;
    case "arrow":
      return <Arrow className={className} fill={color} />;
    case "arrowsUpDown":
      return <ArrowsUpDown className={className} fill={color} />;
    case "favSmall":
      return <FavSmall className={className} fill={color} />;
    case "favSmallFull":
      return <FavSmallFull className={className} fill={color} />;
    case "LiveIcon":
      return <LiveIcon className={className} fill={color} />;
    case "StatIcon":
      return <StatIcon className={className} fill={color} />;
    case "TranslationIcon":
      return <TranslationIcon className={className} fill={color} />;
    case "close":
      return <CloseIcon className={className} fill={color} />;
    case "setting":
      return <SettingIcon className={className} fill={color} />;
    case "tringle":
      return <TringleIcon fill={color} />;
    case "calendar":
      return <Calendar className={className} fill={"#283042"} />;
    case "calendar-active":
      return <CalendarActive className={className} />;
    case 32: // Игра в боулз BR id
    case 1019: // Игра в боулз
    default:
      return <Other fill={color} />;
  }
};

export const isTournamentsInSport = sportId => {
  if (
    sportId === 1020 ||
    sportId === 1014 ||
    sportId === 1108 ||
    sportId === 1026 ||
    sportId === 1022 ||
    sportId === 1179 ||
    sportId === 1018 ||
    sportId === 1151 ||
    sportId === 1017 ||
    sportId === 1112 ||
    sportId === 1112 ||
    sportId === 1107
  )
    return false;
  return true;
  // Бокс 1020
  // Бадминтон 1014
  // Велоспорт 1108
  // Гольф 1026
  // Дартс 1022
  // Единоборства 1179
  // Керлинг 1018
  // Легкая атлетика 1151
  // Пляжный волейбол 1017
  // Пляжный футбол 1112
  // Сквош 1107
};

export const isFewEventsInSport = sportId => {
  if (
    sportId === 1013 ||
    sportId === 1012 ||
    sportId === 1030 ||
    sportId === 1031 ||
    sportId === 1036 ||
    sportId === 106 ||
    sportId === 1111 ||
    sportId === 1041 ||
    sportId === 1201 ||
    sportId === 109 ||
    sportId === 17 ||
    sportId === 136 ||
    sportId === 135 ||
    sportId === 81
  )
    return true;
  return false;
  // Бокс 1020
  // Бадминтон 1014
  // Велоспорт 1108
  // Гольф 1026
  // Дартс 1022
  // Единоборства 1179
  // Керлинг 1018
  // Легкая атлетика 1151
  // Пляжный волейбол 1017
  // Пляжный футбол 1112
  // Сквош 1107
};

export const searchIndexOutcomeId = (outcomeId, number, line) => {
  const index = {};
  index.lineIndex = line.outcomeId.indexOf(+number);
  index.marketIndex = outcomeId.indexOf(+number);

  return index;
};

export const isOutcomeActive = (line, outcomeId, ordinars) => {
  if (!line || !ordinars || ordinars.length < 1) return false;
  const result = ordinars.some(
    ord => ord.compoundKey === line.compoundKey && outcomeId === ord.outcomeId
  );
  return result;
};

// import { ReactComponent as Plus } from "../Components/Menu/img/sport-left/plus.svg";
// import { ReactComponent as Minus } from "../Components/Menu/img/sport-left/minus.svg";
// import { ReactComponent as Arrow } from "../Components/Menu/img/left-menu/arrow.svg";
// import { ReactComponent as FavSmall } from "../Components/Menu/img/left-menu/fav.svg";
// import { ReactComponent as FavSmallFull } from "../Components/Menu/img/left-menu/fav-full.svg";
export const transliterate = (input, mode) => {
  if (mode && !input.toString().match(/[А-яЁё]/g)) return input;
  if (!mode && !input.toString().match(/[A-z]/g)) return input;
  input = input.toLowerCase();
  const rus = "кий щ   ш  ч  ц  ю  я  ё  ж  ъ   э  ь  ы а б в г д е з и й к л м н о п р с т у ф х к".split(
    / +/g
  );
  const eng = "kij shh sh ch cz yu ya yo zh jj  eh ij y a b v g d e z i j k l m n o p r s t u f x q ".split(
    / +/g
  );

  let newValue = "";
  for (let i = 0; i < input.length; i++) {
    if (mode) {
      if (input[i] === " ") newValue += "_";
      else if (rus.indexOf(input[i]) !== -1)
        newValue += eng[rus.indexOf(input[i])];
      else newValue += input[i];
    } else {
      if (input[i] === "_") newValue += " ";
      else if (eng.indexOf(input[i]) !== -1)
        newValue += rus[eng.indexOf(input[i])];
      else newValue += input[i];
    }
  }
  return newValue;
};

export const getpreoryMarketStreamPainting = sportId => {
  switch (sportId) {
    case 1023: // футбол
      return [30001, 30229, 30003];

    case 1034: // футбол
      return [30002, 30229, 30003];

    case 1016: // футбол
      return [30002, 30229, 30003];

    case 1027: // футбол
      return [30001, 30229, 30003];

    case 1028: // футбол
      return [30001, 30229, 30003];

    case 1015: // футбол
      return [30002, 30229, 30003];

    case 1035: // футбол
      return [30002, 30229, 30003];

    case 1103: // футзал
      return [30001, 30229, 30003];

    case 1017: // пляж вол
      return [30002, 30229, 30003];

    case 1014: // бадм
      return [30002, 30229, 30003];

    case 1012: // ам футбол
      return [30002, 30229, 30003];

    case 1102: // флорбол
      return [30001, 30229, 30003];

    case 1021: // крик
      return [30002, 30229, 30003];

    case 1042: // вод поло
      return [30001, 30229, 30003];

    case 1030: // рег лиг
      return [30002, 30229, 30003];

    case 1031: // рег юни
      return [30002, 30229, 30003];

    case 1020: // Бокс
      return [30001, 30229, 30003];

    case 1079: // ММА
      return [30001, 30229, 30003];

    case 1036: // Снук
      return [30002, 30229, 30003];

    case 1033: // Настоль
      return [30002, 30229, 30003];

    case 1202: // Кибер
      return [30002, 30229, 30003];

    case 1026: // Гольф
      return [30002, 30229, 30003];

    case 1109: // Шахматы
      return [30001, 30229, 30003];

    default:
      return [30001, 30229, 30003];
  }
};

export const getTranslitNameForSport = id => {
  switch (id) {
    case 1: // футбол BR id
    case 1023: // футбол
      return "futbol";
    case 2: // Баскетбол
    case 1016: // Баскетбол BR id
      return "basketbol";
    case 4: // Хоккей
    case 1027: // Хоккей BR id
      return "xokkej";
    case 6:
      return [30001, 30229, 30003]; // теннис BR id
    case 1034: // теннис
      return "tennis";
    case 20: // настольный теннис BR id
    case 1033: // настольный теннис
      return "nastolniytennis";
    case 23: // волейбол BR id
    case 1035: // волейбол
      return "volejbol";
    case 19: // снукер BR id
    case 1036: // снукер
      return "snuker";
    case 21: // крикет BR id
    case 1021: // крикет
      return "kriket";
    case 22: // дартс BR id
    case 1022: // дартс
      return "darts";
    case 31: // Бадминтон BR id
    case 1014: // Бадминтон
      return "badminton";
    case 34: // Пляжный волейбол BR id
    case 1017: // Пляжный волейбол
      return "beachVolley";
    case 37: // Сквош BR id
    case 1107: // Сквош
      return "squash";
    case 1202: // киберспорт
      return "cybersport";
    case -1: // fave
      return "fave";
    case -2: // allSports
      return "allSports";
    case -3: // translation
      return "translation";
    case 32: // Игра в боулз BR id
    case 1019: // Игра в боулз
    default:
      return "other";
  }
};

export const getKeyByValue = function(value, obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === value) return prop;
    }
  }
};

export const getEntityById = (entity, id) => {
  return entity.get(id);
};

export const getSportByName = (sports, name) => {
  const sportRus = [...sports.values()].find(
    sport => transliterate(sport.name, true) === name
  );
  if (sportRus) return sportRus;
  const sportEng = [...sports.values()].find(
    sport => sport.name.toLowerCase() === name.replace(/_/g, " ")
  );
  if (sportEng) return sportEng;
  return null;
};

export const getCategoryByName = (categories, name, sportId) => {
  if (!sportId) return null;
  const catRus = [...categories.values()].find(
    cat => cat.sportId === sportId && transliterate(cat.name, true) === name
  );
  if (catRus) return catRus;
  const catEng = [...categories.values()].find(
    cat =>
      cat.sportId === sportId &&
      cat.name.toLowerCase() === name.replace(/_/g, " ")
  );
  if (catEng) return catEng;
  return null;
};

export const getTournamentByName = (tournaments, name, sportId, catId) => {
  if (!sportId || !catId) return null;
  const tRus = [...tournaments.values()].find(
    t =>
      t.categoryId === catId &&
      t.sportId === sportId &&
      transliterate(t.name, true) === name
  );
  if (tRus) return tRus;
  const tEng = [...tournaments.values()].find(
    t =>
      t.categoryId === catId && t.name.toLowerCase() === name.replace(/_/g, " ")
  );
  if (tEng) return tEng;
  return null;
};

export const getPropertyByValue = (
  value,
  prop,
  input,
  isTranslit,
  isLowerCase
) => {
  let output;
  if (isTranslit) {
    output = [...input.values()].find(
      val => transliterate(val[prop], true) === value
    );
    if (output) return output;
  }
  if (isLowerCase) {
    output = [...input.values()].find(
      val => val[prop].toLowerCase() === value.replace(/_/g, " ")
    );
    if (output) return output;
    return null;
  }
  output = [...input.values()].find(val => val[prop] === value);
  if (output) return output;
  return null;
};

export const getDateInFormat = (format, date, isInLocalDate = false) => {
  const UTCdate = new Date(!isInLocalDate ? date : date + TIME_ZONE_OFFSET);
  return format
    .replace(/year/g, addZeroToDate(UTCdate.getFullYear()))
    .replace(/fullYear/g, UTCdate.getFullYear())
    .replace(/month/g, addZeroToDate(UTCdate.getMonth() + 1))
    .replace(/day/g, addZeroToDate(UTCdate.getDate()))
    .replace(/hours/g, addZeroToDate(UTCdate.getHours()))
    .replace(/minutes/g, addZeroToDate(UTCdate.getMinutes()))
    .replace(/miliseconds/g, addZeroToDate(UTCdate.getMilliseconds()))
    .replace(/seconds/g, addZeroToDate(UTCdate.getSeconds()));
};

export const addZeroToDate = val => {
  return ("0" + val).substr(-2);
};

export const sortCallbackByProp = (a, b, prop = null, entity = null) => {
  if (entity) {
    a = entity.get(a);
    b = entity.get(b);
    if (!a && b) return -1;
    if (a && !b) return 1;
    if (!a && !b) return 0;
  }
  if (prop) {
    a = a[prop];
    b = b[prop];
  }
  if (a > b) return 1;
  else if (a < b) return -1;
  else if (a !== undefined && b === undefined) return -1;
  else if (a === undefined && b !== undefined) return 1;
  else return 0;
};

export const sortCallbackBySortIdAndName = (
  a,
  b,
  prop = null,
  entity = null
) => {
  if (entity) {
    a = entity.get(a);
    b = entity.get(b);
    if (!a && b) return -1;
    if (a && !b) return 1;
    if (!a && !b) return 0;
  }
  if (prop && !entity) {
    a = a[prop];
    b = b[prop];
  }
  if (!!a.sortId && !b.sortId) return -1; //хз почему так
  if (!a.sortId && !!b.sortId) return 1; //хз почему так
  if (a.sortId > b.sortId) return 1;
  if (a.sortId < b.sortId) return -1;
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};

export const sortCallbackBySortIdAndName2 = (
  a,
  b,
  prop = null,
  entity = null,
  ethalonSortId = 0
) => {
  if (entity) {
    a = entity.get(a);
    b = entity.get(b);
    if (!a && b) return -1;
    if (a && !b) return 1;
    if (!a && !b) return 0;
  }
  if (prop && !entity) {
    a = a[prop];
    b = b[prop];
  }
  if (!ethalonSortId) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }
  if (a.sortId === ethalonSortId && b.sortId !== ethalonSortId) return -1;
  if (a.sortId !== ethalonSortId && b.sortId === ethalonSortId) return 1;
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};

export const sortCallbackBySortIdAndName3 = (
  sortId1,
  sortId2,
  name1,
  name2,
  ethalonSortId = 0
) => {
  if (!ethalonSortId) {
    if (name1 > name2) return 1;
    if (name1 < name2) return -1;
    return 0;
  }
  if (sortId1 === ethalonSortId && sortId2 !== ethalonSortId) return -1;
  if (sortId1 !== ethalonSortId && sortId2 === ethalonSortId) return 1;
  if (name1 > name2) return 1;
  if (name1 < name2) return -1;
  return 0;
};

export const addFavoriteToLocalStorage = (key, val) => {
  let favSportsLocalStorage = getLocalStorageData(key);
  if (favSportsLocalStorage) {
    if (!favSportsLocalStorage.includes(val)) favSportsLocalStorage.push(val);
  } else favSportsLocalStorage = [val];
  setLocalStorage(key, favSportsLocalStorage);
};

export const removeFavoriteToLocalStorage = (key, val) => {
  let favSportsLocalStorage = getLocalStorageData(key);
  if (favSportsLocalStorage)
    favSportsLocalStorage.splice(favSportsLocalStorage.indexOf(val), 1);
  else favSportsLocalStorage = [];

  setLocalStorage(key, favSportsLocalStorage);
};

export const getMarket = (line, markets, marketsByNum) => {
  if (!line || !markets || !marketsByNum) return null;
  const trueMarketId = marketsByNum.get(line.marketId);
  if (!trueMarketId) return null;
  const market = markets.get(trueMarketId);
  if (market.lineType == 0) {
    let trueMarket;
    if (market.variant > -1) {
      trueMarket = markets.get(
        line.marketId + "_" + line.specifierValue[market.variant]
      );
      return trueMarket ? trueMarket : market;
    } else {
      if (!market.variableText) return market;
      trueMarket = markets.get(line.marketId + "_" + market.variableText);
      return trueMarket ? trueMarket : market;
    }
  }
  return market;
};

export const stringifyMap = map => {
  if (!map || map.size === 0) return [];
  return [...map.keys()].map(key => [key, map.get(key)]);
};

export const parseMap = map => {
  if (!map) return new Map();
  return new Map(map);
};

export const getCoef = (line, outcomeId, defaultValue = "") => {
  if (!line) return defaultValue;
  const index = line.outcomeId.indexOf(outcomeId);
  if (index < 0) return defaultValue;
  const coef = line.outcomeOdds[index];
  return coef ? getCoefInTrueFormat(coef) : defaultValue;
};

export const getOutcomeId = (market, index) => {
  if (!market || (!index && index !== 0)) return -1;
  return market.outcomeId[index];
};

export const getCoefInTrueFormat = coef => {
  if (!coef || coef === "-") return "-";
  coef = coef.toString();
  let length = coef.indexOf(".");

  if (length === -1) length = coef.length;

  coef.indexOf(".") !== -1 ? (coef += "00") : (coef += ".00");
  return coef.split(".")[0].length < 3
    ? coef.slice(0, 4)
    : coef.slice(0, length);
};

export const validateInput = (elem, ...handlers) => {
  let typeElem = null;
  if (elem.value) {
    typeElem = 1; // input
  } else {
    typeElem = 2; // div
  }

  const value = typeElem === 1 ? elem.value : elem.textContent;
  const validValue = value.replace(/^0/, "").replace(/[^0-9\.]/g, "");
  let resultValue;
  if (value !== validValue) resultValue = validValue;
  else resultValue = value;
  handlers.forEach(handler => (resultValue = handler(resultValue)));
  if (typeElem === 1) elem.value = resultValue;
  else elem.textContent = resultValue;
};

export const getOnlyNumbers = value => {
  return value
    .replace(/ /g, "")
    .replace(/^0/, "")
    .replace(/[^0-9]/g, "");
};

export const splitRangNumber = num => {
  return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};

export const getLastItemInMap = map => Array.from(map)[map.size - 1];
export const getLastKeyInMap = map => Array.from(map)[map.size - 1][0];
export const getLastValueInMap = map => Array.from(map)[map.size - 1][1];
export const getFirstItemInMap = map => Array.from(map)[0];
export const getFirstKeyInMap = map => Array.from(map)[0][0];
export const getFirstValueInMap = map => Array.from(map)[0][1];

export const getLineType = (market, line) => {
  if (!market) return null;
  const lineType = market.lineType;
  if (
    (lineType === 1 ||
      lineType === 6 ||
      lineType === 4 ||
      lineType === 8 ||
      lineType === 3 ||
      lineType === 7) &&
    line.outcomeOdds.length !== 2
  )
    return null;
  if ((lineType === 2 || lineType === 5) && line.outcomeOdds.length !== 3)
    return null;
  return lineType;
};

export const mergeLines = (linesNew, linesPrev, linesMap, linesByCK) => {
  const lines = new Map(linesPrev);
  linesNew.forEach(line => {
    lines.set(line.id, line);

    // if (lines.has(line.id)) {
    //   // const newLine = { ...lines.get(line.id), ...line };
    //   lines.set(line.id, line);
    //   // if (!line.prevOutcomeOdds) {
    //   //   line.prevOutcomeOdds = [...lines.get(line.id).outcomeOdds];
    //   // } else {
    //   //   if (
    //   //     isArraysEqual(line.prevOutcomeOdds, lines.get(line.id).outcomeOdds)
    //   //   ) {
    //   //     line.prevOutcomeOdds = [...lines.get(line.id).outcomeOdds];
    //   //   }
    //   // }
    // } else lines.set(line.id, line);
  });
  lines.forEach((line, lineId) => {
    if (line.status === 0 || line.status < -1) {
      linesByCK.delete(line.compoundKey);
      linesMap.delete(lineId);
      lines.delete(lineId);
    }
  });
  return lines;
};

export const isArraysEqual = (arr1, arr2) => {
  if (JSON.stringify(arr1) === JSON.stringify(arr2)) return true;
  return false;
};

export const mergeEvents = (eventNew, eventPrev, linesMap, linesByCK) => {
  const lines = mergeLines(
    eventNew.lines,
    eventPrev.lines,
    linesMap,
    linesByCK
  );
  return {
    ...eventPrev,
    ...eventNew,
    lines
  };
};

export const filterVariants = ["1x2", "total", "handicap"];

export const getInitialValuesFilter = col => {
  switch (col) {
    case 1:
      return ["1x2"];
    case 2:
      return ["1x2", "total"];
    case 3:
      return ["1x2", "total", "handicap"];
  }
};

export const getValTopNavView = () => {
  const w = window.innerWidth;
  if (w >= 414) {
    return "backToTournament";
  } else {
    return "homeAway";
  }
};

export const getCountColsForLineFilter = () => {
  const w = window.innerWidth;
  if (w >= 1366) {
    return 3;
  } else if (w >= 768) {
    return 2;
  } else {
    return 1;
  }
};

export const isLineBlocked = (line, event) => {
  if (
    !line ||
    !event ||
    line.status <= 0 ||
    event.isBetStop ||
    line.isLineBlocked
  )
    return true;
  return false;
};

export const emptyLineTmp = (isMultiLine = false) => {
  return (
    <div className="line__table">
      <div className="line__coef">
        <span />
      </div>
      <div
        className={"line__coef" + (isMultiLine ? " line__coef--dropdown" : "")}
      >
        <span />
      </div>
      <div className="line__coef">
        <span />
      </div>
    </div>
  );
};

export const getStatusVidgit = ev => {
  if (ev.status != 1) return false;
  if (
    ev.betRadarOriginalId != 0 &&
    (ev.sportId == 1023 ||
      ev.sportId == 1016 ||
      ev.sportId == 1027 ||
      ev.sportId == 1034 ||
      ev.sportId == 1012 ||
      ev.sportId == 1028 ||
      ev.sportId == 1035 ||
      ev.sportId == 1017 ||
      ev.sportId == 1033 ||
      ev.sportId == 1014)
  )
    return true;
  if (ev.videoProviderId != 0) return true;

  return false;
};

export const getInfoStreamOrVidgitEvent = ev => {
  const status = { stream: 0, vidgit: 0 };
  if (ev.status != 1) return status;
  if (ev.betRadarOriginalId != 0) status.vidgit = 1;
  if (ev.videoProviderId != 0) status.stream = 1;
  return status;
};

export const getLineCoefClass = (coef1, coef2, isLineBlocked = false) => {
  if (!coef1 || !coef2 || isLineBlocked) return "";
  if (coef2 > coef1) return " green_rose";
  if (coef2 < coef1) return " red_fell";
  return "";
};

export const isOutcomeBlocked = (line, outcomeId) => {
  if (!line || line.status !== 1) return false;

  const index = line.outcomeId.indexOf(outcomeId);

  if (index === -1) return false;
  if (line.outcomeActive[index] !== 1) return false;
  return line.outcomeActive[index];
};

export const getUniqueArr = arr => {
  const seen = {};
  const out = [];
  let len = arr.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    let item = arr[i];
    if (item !== undefined && seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
};

export const getEventIdsFromCurrentTickets = () => {
  const state = getState();
  const isAuthorize = state.user.isAuthorize;
  if (!isAuthorize) return [];
  const tickets = [...state.user.info.tickets.values()];
  if (!tickets || tickets.length === 0) return [];
  const currentTickets = [...tickets].filter(t => !t.status);
  if (!currentTickets || currentTickets.length === 0) return [];
  const gbEventIds = currentTickets.reduce((arrayFromTickets, ticket) => {
    return [
      ...arrayFromTickets,
      ...[...ticket.bets.values()].reduce(
        (arrayFromBets, bet) => [...arrayFromBets, bet.gbEventId],
        []
      )
    ];
  }, []);
  const uniqGbEventIds = getUniqueArr(gbEventIds);
  return uniqGbEventIds;
};

export const getEthalonSortId = (sportIds = [], entityName) => {
  const state = getState();
  const entity = state.server.entities[entityName];
  if (!entity) return null;
  const validEntites = [...entity.values()].filter(
    ent => (sportIds === null || sportIds.includes(ent.sportId)) && ent.sortId
  );
  if (validEntites.length === 0) return null;
  const response = Math.min(...validEntites.map(ent => ent.sortId));
  return response;
};

export const getDeltaCoef = line =>
  Math.abs(line.outcomeOdds[0] - line.outcomeOdds[1]);

export const sortLinesBySpecifier = (a, b) =>
  parseFloat(a.specifierValue[0]) - parseFloat(b.specifierValue[0]);

export const getLinesSortedByDelta = (a, b) => {
  const delta1 = Math.abs(+a.outcomeOdds[0] - +a.outcomeOdds[1]);
  const delta2 = Math.abs(+b.outcomeOdds[0] - +b.outcomeOdds[1]);
  return delta1 > delta2 ? 1 : delta2 > delta1 ? -1 : 0;
};

export const getCurAndPrevCoefs = (line, index, getCoef) => {
  if (!line) return [null, null];
  const coefs = line.outcomeOdds;
  const prevCoefs = line.prevOutcomeOdds;
  return [
    prevCoefs ? getCoef(prevCoefs, index) : null,
    coefs ? getCoef(coefs, index) : null
  ];
};

// 1 - radar, 2 - ssln, 3 - genius
export const getProvider = event => {
  if (event.lineTypeRadar < 19) {
    return 1;
  } else if (event.lineTypeRadar === 19) {
    return 2;
  } else if (event.lineTypeRadar === 20) {
    return 3;
  } else if (event.lineTypeRadar === 21) {
    return 4;
  }
};

export const getFilterSportByName = (name, sports) => {
  if (!name || sports.size === 0) return null;
  const sport = getSportByName(sports, name);
  if (!sport) return null;
  return sport.id;
};

export const getFilterArraySportByName = (name, sports) => {
  if (!name || sports.size === 0) return null;
  const arrSports = [...sports.values()]
    .filter(sport => transliterate(sport.name, true) === name)
    .map(sport => sport.id);
  return arrSports;
};

export const getFilterCategoryByName = (name, sportIds, categories) => {
  if (!sportIds || sportIds.length === 0) return null;
  if (!name || categories.size === 0) return null;
  const sportId = sportIds.find(sportId =>
    getCategoryByName(categories, name, sportId)
  );
  let cat = getCategoryByName(categories, name, sportId);
  if (!cat) return null;
  return cat.id;
};

export const getFilterTournamentByName = (
  name,
  sportIds,
  catId,
  tournaments,
  catName = "",
  categories
) => {
  if (!sportIds || !catId) return null;
  if (!name || sportIds.length === 0 || tournaments.size === 0) return null;
  const sportId = sportIds.find(sportId =>
    getCategoryByName(categories, catName, sportId)
  );
  const t = getTournamentByName(tournaments, name, sportId, catId);
  if (!t) return null;
  return t.id;
};

export const getMainScore = event => {
  if (!event || event.status !== 1) return null;
  const score = getScore(event);
  if (!score) return null;
  if (
    score.hasOwnProperty("homeScore") &&
    score.homeScore !== undefined &&
    score.hasOwnProperty("awayScore") &&
    score.awayScore !== undefined
  )
    return { home: score.homeScore, away: score.awayScore };
  if (
    score.hasOwnProperty("homeSetScore") &&
    score.homeSetScore !== undefined &&
    score.hasOwnProperty("awaySetScore") &&
    score.awaySetScore !== undefined
  )
    return { home: score.homeSetScore, away: score.awaySetScore };
  if (
    score.hasOwnProperty("homeGameScore") &&
    score.homeGameScore !== undefined &&
    score.hasOwnProperty("awayGameScore") &&
    score.awayGameScore !== undefined
  )
    return { home: score.homeGameScore, away: score.awayGameScore };
  return null;
};

const isEventNeedStatus = event => {
  if (
    event.sportId === 1023 ||
    event.sportId === 1034 ||
    event.sportId === 1027 ||
    event.sportId === 1016 ||
    event.sportId === 1035 ||
    event.sportId === 1020 ||
    event.sportId === 1021 ||
    event.sportId === 1022 ||
    event.sportId === 1028 ||
    event.sportId === 1030 ||
    event.sportId === 1031 ||
    event.sportId === 1036 ||
    event.sportId === 1202 ||
    event.sportId === 1012 ||
    event.sportId === 1015 ||
    event.sportId === 1013 ||
    event.sportId === 1014 ||
    event.sportId === 1017 ||
    event.sportId === 1019 ||
    event.sportId === 1025 ||
    event.sportId === 1033 ||
    event.sportId === 1038 ||
    event.sportId === 1101 ||
    event.sportId === 1103 ||
    event.sportId === 1107
  )
    return true;
  return false;
};

export const getScore = event => {
  var result = {};
  if (!isEventNeedStatus(event)) return null;
  result.status = getMatchStatus(event);
  switch (event.sportId) {
    case 1023: //Soccer +
      result.homeScore = getMatchHomeScore(event);
      result.awayScore = getMatchAwayScore(event);
      result.time = getMatchTime(event);
      result.homeYellowCards = getMatchYellowHomeCards(event);
      result.awayYellowCards = getMatchYellowAwayCards(event);
      result.homeRedCards = getMatchRedHomeCards(event);
      result.awayRedCards = getMatchRedAwayCards(event);
      result.awayCorners = getMatchAwayCorners(event);
      result.homeCorners = getMatchHomeCorners(event);
      result.setScores = getAllSetScores(event);
      break;
    case 1033: // Table Tennis +/-
    case 1017: //Beach Volley +
    case 1034: //Tennis +
    case 1036: //Snooker +
    case 1014: //Badminton +
    case 1107: //Squash +/-
    case 1021: //Cricket +/-
      const homeGameScore = getMatchHomeGameScore(event);
      const awayGameScore = getMatchAwayGameScore(event);
      result.homeGameScore =
        event.sportId === 1034 && homeGameScore >= 50 ? "AD" : homeGameScore;
      result.awayGameScore =
        event.sportId === 1034 && awayGameScore >= 50 ? "AD" : awayGameScore;
      result.homeSetScore = getMatchHomeScore(event);
      result.awaySetScore = getMatchAwayScore(event);
      result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
      result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
      result.currentServer = getCurrentServer(event);
      result.setScores = getAllSetScores(event);
      break;
    case 1035: //Volleyball +
    case 1019: //Bowls +/-
      result.homeGameScore = getMatchHomeGameScore(event);
      result.awayGameScore = getMatchAwayGameScore(event);
      result.homeSetScore = getMatchHomeScore(event);
      result.awaySetScore = getMatchAwayScore(event);
      result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
      result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
      result.currentServer = getCurrentServer(event);
      result.setScores = getAllSetScores(event);
      result.time = getMatchTime(event);
      break;
    case 1028: //Handball
    case 1027: {
      //Ice Hockey +
      const suspended = getMatchSuspend(event);
      if (suspended) {
        result.homeSuspend = suspended.homeSuspend;
        result.awaySuspend = suspended.awaySuspend;
        result.isSuspend = suspended.isSuspend;
      }
    }
    case 1016: //Basketball +
    case 1030: //Rugby League +
    case 1031: //Rugby +
    case 1012: //American Football +
    case 1013: //Aussie Rules +
    case 1025: //Gaelic Football +
    case 1038: //Hurling +/-
    case 1103: //Futsal +
      result.homeScore = getMatchHomeScore(event);
      result.awayScore = getMatchAwayScore(event);
      result.time = getMatchTime(event);
      break;
    case 1202: //Cybersport +
    case 1015: //Baseball +
    case 1022: //Darts +
      result.homeScore = getMatchHomeScore(event);
      result.awayScore = getMatchAwayScore(event);
      break;
    case 1101: //FormulaOne +
    case 1020: //Boxing +
    default:
      break;
  }
  return result;
};

const getPriorityMatchTime = event => {
  if (
    event.sportId === 1027 ||
    event.sportId === 1016 ||
    event.sportId === 1031 ||
    event.sportId === 1030 || //?
    event.sportId === 1012 ||
    event.sportId === 1028
  )
    return event.remainingTimeInPeriod;
  return event.matchTime;
};

const getSecondPriorityMatchTime = event => {
  if (
    event.sportId === 1027 ||
    event.sportId === 1016 ||
    event.sportId === 1030 || //?
    event.sportId === 1031 ||
    event.sportId === 1012 ||
    event.sportId === 1028 ||
    event.sportId === 1013
  )
    return event.matchTime;
  return event.remainingTimeInPeriod;
};

export const getMatchTime = event => {
  if (!event.matchTime && !event.remainingTimeInPeriod) return "";
  const priorityMatchTime = getPriorityMatchTime(event);
  const secondPriorityMatchTime = getSecondPriorityMatchTime(event);
  const matchTime = priorityMatchTime || secondPriorityMatchTime;
  let time = +matchTime.split(":")[0];
  if (event.provider !== 3) {
    time = time + 1;
  }
  return time + "'";
};

export const getMatchSuspend = event => {
  let countPlayers = 0;
  switch (event.sportId) {
    case 1027:
      countPlayers = 5;
      break;
    case 1028:
      countPlayers = 6;
      break;
    default:
  }
  if (!countPlayers) return null;
  return {
    homeSuspend: countPlayers - event.homeSuspend,
    awaySuspend: countPlayers - event.awaySuspend,
    isSuspend: event.awaySuspend || event.homeSuspend
  };
};

// // 1 - radar, 2 - ssln, 3 - genius
// export const getMatchTime = event => {
//   if (event.provider === 1 && event.matchTime)
//     return +event.matchTime.split(":")[0] + 1 + "'";
//   else if (event.provider === 2) {
//     if (event.matchStatus) {
//       switch (event.sportId) {
//         case 1016: //Basketball
//           return (
//             10 -
//             event.matchStatus
//               .replace("(", "")
//               .replace(")", "")
//               .split(":")
//               [event.matchStatus.split(":").length - 1].split(".")[0] +
//             "'"
//           );
//         case 1027: //Ice Hockey
//           return (
//             20 -
//             event.matchStatus
//               .replace("(", "")
//               .replace(")", "")
//               .split(" ")
//               [event.matchStatus.split(" ").length - 1].split(":")[0] +
//             "'"
//           );
//         case 1030: //Rugby League
//           return event.matchStatus.split(":")[0] + "'";
//         case 1031: //Rugby
//           return event.matchStatus.split(":")[0] + "'";
//         case 1012: //American Football
//           return (
//             parseInt(
//               event.matchStatus
//                 .split(": ")
//                 [event.matchStatus.split(": ").length - 1].split(" ")[1]
//                 .split(":")[0]
//             ) + "'"
//           );
//         case 1028: //Handball
//           return (
//             event.matchTime
//               .replace(/[()]/g, "")
//               .split(":")[1]
//               .split(".")[0] + "'"
//           );
//         default:
//           return parseInt(event.matchTime.split(":")[0]) + 1 + "'";
//       }
//     }
//   } else if (event.provider === 3) {
//     switch (event.sportId) {
//       case 1016: //Basketball
//         return event.matchTime ? event.matchTime + "'" : "";
//       default:
//         return event.matchTime;
//     }
//   }
// };

export const getMatchYellowHomeCards = event => {
  return event.homeYellowcards;
};

export const getMatchYellowAwayCards = event => {
  return event.awayYellowcards;
};

export const getMatchRedHomeCards = event => {
  return event.homeRedcards + event.homeYellowRedCards;
};

export const getMatchRedAwayCards = event => {
  return event.awayRedcards + event.awayYellowRedCards;
};

export const getMatchAwayCorners = event => {
  return event.awayCorners;
};

export const getMatchHomeCorners = event => {
  return event.homeCorners;
};

export const getMatchStatus = event => {
  const state = getState();
  if (!state.matchStatuses) return "";
  const matchStatuses =
    state.matchStatuses.match_status_descriptions.match_status;
  if (!matchStatuses) return "";

  const matchStatusObj = matchStatuses.find(
    obj => +obj._id === event.matchStatusId
  );
  if (!matchStatusObj) return "";

  const matchStatus = getNameByBetRadarStatus(matchStatusObj._description);
  return matchStatus || "";
};

export const getFullTime = event => {
  const status = getMatchStatus(event);
  const time = getMatchTime(event);
  return status === "Пер." ? status : status + " " + time;
};

export const getMatchHomeScore = event => {
  if (event.sportId === 1013) return event.homePoints;
  return event.homeScore;
};

export const getMatchAwayScore = event => {
  if (event.sportId === 1013) return event.awayPoints;
  return event.awayScore;
};

export const getMatchHomeGameScore = event => {
  return event.homeGamescore;
};

export const getMatchAwayGameScore = event => {
  return event.awayGamescore;
};

export const getAllSetScores = event => {
  return event.setScores;
};

export const getMatchHomeCurrentSetScore = event => {
  // if (event.provider === 2) {
  //   switch (event.sportId) {
  //     case 1022:
  //       if (!event.matchStatus) {
  //         return "";
  //       }
  //       return event.matchStatus
  //         .replace("*", "")
  //         .split(" ")[0]
  //         .split("-")[0];
  //   }
  // }
  return event.setScores
    ? event.setScores
        .split("-")
        [event.setScores.split("-").length - 1].split(":")[0]
    : 0;
};

export const getMatchAwayCurrentSetScore = event => {
  // if (event.provider === 2) {
  //   switch (event.sportId) {
  //     case 1022:
  //       if (!event.matchStatus) {
  //         return "";
  //       }
  //       return event.matchStatus
  //         .replace("*", "")
  //         .split(" ")[0]
  //         .split("-")[1];
  //   }
  // }
  return event.setScores
    ? event.setScores
        .split("-")
        [event.setScores.split("-").length - 1].split(":")[1]
    : 0;
};

export const getCurrentServer = event => {
  // if (event.provider === 2) {
  //   switch (event.sportId) {
  //     case 1022:
  //       return;
  //     case 1022:
  //       var cs = event.matchStatus.split(" ")[0].split("-");
  //       if (cs[0].includes("*")) return 1;
  //       else if (cs[1].includes("*")) return 1;
  //       return 0;
  //       break;
  //   }
  // }
  return event.currentServer;
};

//словарь матч статусов
export const getNameByBetRadarStatus = status => {
  switch (status) {
    case "Not started":
      return "";
    case "1st period":
      return "1П";
    case "2nd period":
      return "2П";
    case "3rd period":
      return "3П";
    case "4th period":
      return "4П";
    case "5th period":
      return "5П";
    case "1st half":
      return "1Т";
    case "2nd half":
      return "2Т";
    case "1st set":
      return "1С";
    case "2nd set":
      return "2С";
    case "3rd set":
      return "3С";
    case "4th set":
      return "4С";
    case "5th set":
      return "5С";
    case "1st quarter":
      return "1Ч";
    case "2nd quarter":
      return "2Ч";
    case "3rd quarter":
      return "3Ч";
    case "4th quarter":
      return "4Ч";
    case "Golden set":
      return "Зол. сет";
    case "Started":
      return "";
    case "In progress":
      return "В игре";
    case "About to start":
      return "";
    case "Break":
      return "Пер.";
    case "Halftime":
      return "Пер.";
    case "Awaiting extra time":
      return "ОТ";
    case "Extra time halftime":
      return "Пер. ОТ";
    case "Awaiting penalties":
      return "Пен.";
    case "Awaiting golden set":
      return "Зол. сет";
    case "Overtime":
      return "ОТ";
    case "1st extra":
      return "ОТ";
    case "2nd extra":
      return "ОТ";
    case "Penalties":
      return "Пен.";
    case "Postponed":
      return "Отложен";
    case "Start delayed":
      return "Задерж.";
    case "Cancelled":
      return "Отменен";
    case "Game 1":
      return "";
    case "Game 2":
      return "";
    case "Game 3":
      return "";
    case "Game 4":
      return "";
    case "Game 5":
      return "";
    case "Game 6":
      return "";
    case "Game 7":
      return "";
    case "Interrupted":
      return "Прерван";
    case "Suspended":
      return "Отложен";
    case "Abandoned":
      return "Отменен";
    case "Walkover":
      return "Итог";
    case "Retired":
      return "Итог";
    case "Walkover, player 1 won":
      return "Итог";
    case "Walkover, player 2 won":
      return "Итог";
    case "Player 1 retired, player 2 won":
      return "Итог";
    case "Player 2 retired, player 1 won":
      return "Итог";
    case "Player 1 defaulted, player 2 won":
      return "Итог";
    case "Player 2 defaulted, player 1 won":
      return "Итог";
    case "Only Result":
      return "";
    case "Ended":
      return "Итог";
    case "AET":
      return "После ОТ";
    case "AOT":
      return "После ОТ";
    case "AP":
      return "Итог";
    case "After golden set":
      return "Итог";
    case "1st map":
      return "1К";
    case "2nd map":
      return "2К";
    case "3rd map":
      return "3К";
    case "4th map":
      return "4К";
    case "5th map":
      return "5К";
    case "6th map":
      return "6К";
    case "7th map":
      return "7К";
    case "1st Game":
      return "1С";
    case "2nd Game":
      return "2С";
    case "3rd Game":
      return "3С";
    case "4th Game":
      return "4С";
    case "5th Game":
      return "5С";
    case "1st end":
      return "";
    case "2nd end":
      return "";
    case "3rd end":
      return "";
    case "4th end":
      return "";
    case "5th end":
      return "";
    case "6th end":
      return "";
    case "7th end":
      return "";
    case "8th end":
      return "";
    case "9th end":
      return "";
    case "10th end":
      return "";
    case "Extra end":
      return "";
    case "First break":
      return "Пер.";
    case "Second break":
      return "Пер.";
    case "Third break":
      return "Пер.";
    case "Fourth break":
      return "Пер.";
    case "Fifth break":
      return "Пер.";
    case "Sixth break":
      return "Пер.";
    case "1st inning top":
      return "Верх 1";
    case "1st inning bottom":
      return "Низ 1";
    case "2nd inning top":
      return "Верх 2";
    case "2nd inning bottom":
      return "Низ 2";
    case "3rd inning top":
      return "Верх 3";
    case "3rd inning bottom":
      return "Низ 3";
    case "4th inning top":
      return "Верх 4";
    case "4th inning bottom":
      return "Низ 4";
    case "5th inning top":
      return "Верх 5";
    case "5th inning bottom":
      return "Низ 5";
    case "6th inning top":
      return "Верх 6";
    case "6th inning bottom":
      return "Низ 6";
    case "7th inning top":
      return "Верх 7";
    case "7th inning bottom":
      return "Низ 7";
    case "8th inning top":
      return "Верх 8";
    case "8th inning bottom":
      return "Низ 8";
    case "9th inning top":
      return "Верх 9";
    case "9th inning bottom":
      return "Низ 9";
    case "Extra inning top":
      return "Верх ЭИ";
    case "Extra inning bottom":
      return "Низ ЭИ";
    case "Break top1-bottom1":
      return "Низ 1";
    case "Break top2-bottom1":
      return "Верх 2";
    case "Break top2-bottom2":
      return "Низ 2";
    case "Break top3-bottom2":
      return "Верх 3";
    case "Break top3-bottom3":
      return "Низ 3";
    case "Break top4-bottom3":
      return "Верх 4";
    case "Break top4-bottom4":
      return "Низ 4";
    case "Break top5-bottom4":
      return "Верх 5";
    case "Break top5-bottom5":
      return "Низ 5";
    case "Break top6-bottom5":
      return "Верх 6";
    case "Break top6-bottom6":
      return "Низ 6";
    case "Break top7-bottom6":
      return "Верх 7";
    case "Break top7-bottom7":
      return "Низ 7";
    case "Break top8-bottom7":
      return "Верх 8";
    case "Break top8-bottom8":
      return "Низ 8";
    case "Break top9-bottom8":
      return "Верх 9";
    case "Break top9-bottom9":
      return "Низ 9";
    case "Break topEI-bottom9":
      return "Верх ЭИ";
    case "Break topEI-bottomEI":
      return "Низ ЭИ";
    case "Sudden death":
      return "";
    case "6th set":
      return "6C";
    case "7th set":
      return "7C";
    case "Awaiting sudden death":
      return "";
    case "After sudden death":
      return "";
    case "First innings, home team":
      return "1 инн.";
    case "First innings, away team":
      return "1 инн.";
    case "Second innings, home team":
      return "2 инн.";
    case "Second innings, away team":
      return "2 инн.";
    case "Awaiting super over":
      return "Суперовер";
    case "Super over, home team":
      return "Суперовер";
    case "Super over, away team":
      return "Суперовер";
    case "After super over":
      return "Итог";
    case "Innings break":
      return "Пер.";
    case "Super over break":
      return "Пер.";
    case "Lunch break":
      return "Ланч";
    case "Tea break":
      return "Чайный пер.";
    case "Stumps":
      return "Stumps";
    case "8th set":
      return "8C";
    case "9th set":
      return "9C";
    case "10th set":
      return "10C";
    case "11th set":
      return "11C";
    case "12th set":
      return "12C";
    case "13th set":
      return "13C";
    case "Third innings, home team":
      return "3 инн.";
    case "Third innings, away team":
      return "3 инн.";
    case "Fourth innings, home team":
      return "4 инн.";
    case "Fourth innings, away team":
      return "4 инн.";
    case "Dinner Break":
      return "";
    case "Drinks":
      return "";
    case "Super over":
      return "Суперовер";
    case "1st inning":
      return "";
    case "2nd inning":
      return "";
    case "3rd inning":
      return "";
    case "4th inning":
      return "";
    case "5th inning":
      return "";
    case "6th inning":
      return "";
    case "7th inning":
      return "";
    case "8th inning":
      return "";
    case "9th inning":
      return "";
    default:
      return "";
  }
};

export const replaceCompetitorsFull = event => {
  if (!event) return f => f;
  return val =>
    val
      .replace(/\$competitor1/g, event.homeName)
      .replace(/\$competitor2/g, event.awayName);
};

export const replaceCompetitors = (val, isNeedDraw = true) => {
  if (!val) return "";
  const newValue = val
    .toString()
    .replace(/\$competitor1/g, "1")
    .replace(/\$competitor2/g, "2");

  if (!isNeedDraw) return newValue;
  return newValue.replace(/draw/g, "X").replace(/[Нн]ичья/g, "X");
};

export const replaceSkobki = val => {
  if (!val) return "";
  return val.replace(/{|}/g, "");
};

export const isEmptyObject = obj => {
  return JSON.stringify(obj) === "{}";
};

export const replaceHalfsInFootball = (value, line) => {
  if (!line || !value) return value;
  if (line.sportId === 1023 || line.sportId === 1103 || line.sportId === 1112) {
    return value
      .replace(/(1|1-я) половина/g, "1-й тайм")
      .replace(/(2|2-я) половина/g, "2-й тайм");
  }
  return value;
};

export const renameMarketName = (
  line,
  market,
  value,
  replaceCompetitorsFunc = replaceCompetitors,
  counter = 0
) => {
  if (!value || isEmptyObject(market) || isEmptyObject(line)) return "";
  if (counter > 2) {
    value = replaceSkobki(value).replace(/\!/g, "");
    return value;
  }
  value =
    value === market.name
      ? replaceCompetitorsFull(
          getState().server.eventsAndLines.events.get(line.eventId)
        )(value)
      : replaceCompetitorsFunc(value);
  const matchingArray = value.match(/{.+?}/g);
  if (!matchingArray || matchingArray.length === 0)
    return replaceHalfsInFootball(value, line);

  matchingArray.forEach(matchingValue => {
    matchingValue = matchingValue.replace(/\!/g, "");
    if (
      market &&
      market.specifierName &&
      market.specifierName.length > 0 &&
      market.specifierName.some((spec, i) => {
        const regular = new RegExp(`{[^A-z]*${spec}}*`, "g");
        return regular.test(matchingValue);
      })
    ) {
      const replacementValueSpecIndex = market.specifierName.findIndex(spec =>
        new RegExp(`{[^A-z]*${spec}}*`, "g").test(matchingValue)
      );
      const replacementValue = line.specifierValue[replacementValueSpecIndex];
      const regular = market.specifierName[replacementValueSpecIndex];
      value = value
        .replace(new RegExp(regular, "g"), replacementValue)
        .replace(/\+\-/, "-")
        .replace(/\-\+/, "-")
        .replace(/\+\+/, "+")
        .replace(/\-\-/, "+");
    }
  });

  if (market.specifierName.some(name => new RegExp(name, "g").test(value)))
    return renameMarketName(
      line,
      market,
      value,
      replaceCompetitorsFunc,
      counter + 1
    );
  value = replaceSkobki(value).replace(/\!/g, "");
  value = replaceCompetitorsFunc(value);
  value = replaceHalfsInFootball(value, line);
  return value;
};

export const isFileSizeValid = number => {
  return number <= 5242880;
};

export const getEventName = event => {
  if (!event) return "";
  if (event.isLongTerm) return event.seasonName;
  return event.homeName + (event.awayName ? "-" + event.awayName : "");
};
export const getEventNameArray = event => {
  if (!event) return "";
  if (event.isLongTerm) return event.seasonName;
  return [event.homeName, event.awayName ? "-" + event.awayName : ""];
};

const removeInvalidEventsFromEvents = events => {
  const state = getState();
  const eventsMap = state.server.eventsAndLines.events;
  return events.filter(eId => eventsMap.has(eId));
};

export const removeInvalidEventsFromFav = () => {
  const state = getState();
  const favEventsPrematch = removeInvalidEventsFromEvents(
    state.server.currentStates.favEventsPrematch
  );
  const favEventsLive = removeInvalidEventsFromEvents(
    state.server.currentStates.favEventsLive
  );
  dispatch(addFavEvents(favEventsLive, 1));
  dispatch(addFavEvents(favEventsPrematch, 0));
};

export const isEventLongTerm = typeRadar => {
  return (
    typeRadar === 2 ||
    typeRadar === 3 ||
    typeRadar === 4 ||
    typeRadar === 6 ||
    typeRadar === 9 ||
    typeRadar === 10 ||
    typeRadar === 15 ||
    typeRadar === 16 ||
    typeRadar === 17 ||
    typeRadar === 18
  );
};

export const getOutcomeName = (
  market,
  outcomeId,
  line = null,
  event = null
) => {
  if (!market) return "";
  if (
    market.id === 38 ||
    market.id === 39 ||
    market.id === 40 ||
    (event && event.isLongTerm)
  ) {
    if (!line) return "";
    const index = line.outcomeId.indexOf(outcomeId);
    if (index < 0) return "";
    return line.outcomeName[index] || market.outcomeName[index];
  } else {
    const obj =
      market.outcomeId && market.outcomeId.length !== 0 ? market : line;
    const index = obj.outcomeId.indexOf(outcomeId);
    if (index < 0) return "";
    return obj.outcomeName[index];
  }
};

export const getMarketName = (market, line = null, event = null) => {
  if (!market) return "";
  if (event && event.isLongTerm) {
    if (market.id === 539) return "Кто выше?";
    return line.name || market.name;
  }
  return line.name || market.name || "";
};

export const getCookie = name => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getLineByCK = compoundKey => {
  if (!compoundKey) return null;
  const state = getState();
  const lineId = state.server.eventsAndLines.linesByCK.get(compoundKey);
  if (!lineId) return null;
  return state.server.eventsAndLines.lines.get(lineId);
};

export const getEventByGB = gbEventId => {
  if (!gbEventId) return null;
  const state = getState();
  const eventId = state.server.eventsAndLines.eventsByGB.get(gbEventId);
  if (!eventId) return null;
  return state.server.eventsAndLines.events.get(eventId);
};

export const getUrlForRospis = eventId => {
  if (!eventId) return null;
  const state = getState();
  const event = state.server.eventsAndLines.events.get(eventId);
  if (!event) return null;
  const sport = getEntityById(state.server.entities.sports, event.sportId);
  if (!sport) return null;
  const category = getEntityById(
    state.server.entities.categories,
    event.categoryId
  );
  if (!category) return null;
  const tournament = getEntityById(
    state.server.entities.tournaments,
    event.tournamentId
  );
  if (!tournament) return null;

  return (
    "/" +
    routsName.dict.rospis +
    "/" +
    transliterate(sport.name, true) +
    "/" +
    transliterate(category.name, true) +
    "/" +
    transliterate(tournament.name, true) +
    "/" +
    event.id +
    "/" +
    routsName.dict.all
  );
};

export const getArrayEventsForRequestExtralines = tickets => {
  const arrayEvents = [];
  tickets.forEach(ticket => {
    ticket.bets.forEach(bet => {
      const event = getEventByGB(bet.gbEventId);
      if (event && !arrayEvents.includes(event.id)) arrayEvents.push(event.id);
    });
  });
  return arrayEvents;
};

export const requestNextExtraline = (arrayExtralines, eventId = null) => {
  if (!arrayExtralines || arrayExtralines.length === 0) return;
  if (!eventId) {
    eventId = arrayExtralines[0];
  } else {
    const index = arrayExtralines.indexOf(eventId);
    if (index === -1 || arrayExtralines.length <= index + 1) return;
    eventId = arrayExtralines[index + 1];
  }
  dispatch(getExtraLine(eventId));
};

// -------- COUPON ---------
export const getDefaultOpenValue = () => {
  const w = window.innerWidth;
  if (w >= 1024) {
    return true;
  }
  return false;
};

export const getDataForSendTicket = state => {
  const {
    ordinars,
    coefs,
    inputValues,
    maxPay,
    ordinarsInfo,
    system,
    multibetsInfo,
    couponBuilder
  } = state.coupon;
  const { lines, linesByCK, events } = state.server.eventsAndLines;
  const { markets, marketsByNum } = state.server.entities;
  const builderCoef = state.server.builderInfo.builderCoef;
  const getMaxSum = (maxPay, coef) =>
    maxPay ? Math.floor(maxPay / (coef - 1)) : Infinity;

  const isOrdinarValid = (value, coefArg, line, event) => {
    if (isLineBlocked(line, event)) return false;
    // if (value < MIN_SUM_INPUT) return false;
    // const coef = coefArg && coefArg !== "-" ? coefArg : 0;
    // const maxSum = getMaxSum(maxPay, coef);
    // if (value > maxSum) return false;
    return true;
  };

  const isBlockMultibets = () => {
    return (
      multibetsInfo.isBlocked ||
      multibetsInfo.isExccedMaxCount ||
      multibetsInfo.isOrdinarsFromOneEvent
    );
  };

  const getLineByCK = compoundKey => {
    const lineId = linesByCK.get(compoundKey);
    if (!lineId) return null;
    return lines.get(lineId);
  };

  const getBuilder = () => {
    if (!couponBuilder) return null;
    const event = events.get(couponBuilder.event.id);
    if (!event) return null;
    const isValidBuilder = [...couponBuilder.bets.values()].every(bet =>
      getLineByCK(bet.compoundKey)
    );
    if (!isValidBuilder) return null;

    return {
      stake: inputValues.builder ? +inputValues.builder : 0,
      odd: builderCoef,
      outcomes: [...couponBuilder.bets.values()].map(bet => {
        const line = getLineByCK(bet.compoundKey);
        // const market = getMarket(line, markets, marketsByNum);
        const odd = line.outcomeOdds[line.outcomeId.indexOf(+bet.outcomeId)];
        return {
          compoundKey: bet.compoundKey,
          outcomeId: +bet.outcomeId,
          odd,
          lineTypeRadar: line.lineTypeRadar
        };
      })
    };
  };

  const getExpress = () => {
    return {
      sum: !isBlockMultibets() && inputValues.express ? +inputValues.express : 0
    };
  };

  const getSystem = () => {
    const isBlocked = isBlockMultibets();
    return {
      sum: !isBlocked && inputValues.system ? +inputValues.system : 0,
      rang: !isBlocked && inputValues.system ? system.rang : 0
    };
  };

  const isMultibets = () => {
    return isBlockMultibets()
      ? false
      : !!inputValues.system || !!inputValues.express;
  };

  const getOrdinars = () => {
    let result = [...ordinars];
    if (!isMultibets())
      result = [...result].filter(ord =>
        inputValues.ordinars.has(ord.compoundKey + "-" + ord.outcomeId)
      );

    return result
      .map(ord => {
        const line = getLineByCK(ord.compoundKey);
        return {
          compoundKey: ord.compoundKey,
          outcomeId: ord.outcomeId,
          outcomeOdds: line.outcomeOdds[line.outcomeId.indexOf(ord.outcomeId)],
          sum: inputValues.ordinars.has(ord.compoundKey + "-" + ord.outcomeId)
            ? +inputValues.ordinars.get(ord.compoundKey + "-" + ord.outcomeId)
            : 0,
          lineTypeRadar: line.lineTypeRadar,
          line,
          event: {
            ...events.get(ordinarsInfo.get(ord.compoundKey).event.id)
          }
        };
      })
      .filter(ord =>
        isOrdinarValid(ord.sum, ord.outcomeOdds, ord.line, ord.event)
      );
  };

  const ordinarsData = getOrdinars();
  const expressData = getExpress();
  const systemData = getSystem();
  const builderData = getBuilder();

  const result = new Map([
    ["ordinars", ordinarsData],
    ["express", expressData],
    ["system", systemData],
    ["builder", builderData]
  ]);
  return result;
};

export const getDataForSendFastBet = (line, outcomeId, store) => {
  const getExpress = () => {
    return {
      sum: 0
    };
  };

  const getSystem = () => {
    return {
      sum: 0,
      rang: 0
    };
  };

  const getOrdinars = () => {
    const events = store.server.eventsAndLines.events;
    const settings = store.coupon.settings;
    const result = [];
    result.push({
      compoundKey: line.compoundKey,
      outcomeId: outcomeId,
      outcomeOdds: getCoef(line, outcomeId, 0),
      sum: settings.fastBet,
      lineTypeRadar: line.lineTypeRadar,
      line,
      event: events.get(line.eventId)
    });
    return result;
  };

  const ordinarsData = getOrdinars();
  const expressData = getExpress();
  const systemData = getSystem();

  const result = new Map([
    ["ordinars", ordinarsData],
    ["express", expressData],
    ["system", systemData]
  ]);

  return result;
};

const getStructuredAcception = (response, sendingData) => {
  let ordIndex = 0;
  let sum = 0;
  const ordinars = [...sendingData.get("ordinars")].filter(
    ord => ord.sum !== 0
  );
  const ordinarsAcception = new Map();
  let answerMap = new Map([
    ["express", null],
    ["system", null],
    ["builder", null]
  ]);
  response.forEach(r => {
    if (sum !== -1) {
      if (r < 0) sum = -1;
    }
    if (sendingData.get("builder") && answerMap.get("builder") === null) {
      answerMap.set("builder", r);
      return;
    }
    if (ordIndex < ordinars.length) {
      const ordinar = ordinars[ordIndex];
      ordinarsAcception.set(ordinar.compoundKey + "---" + ordinar.outcomeId, r);
      ordIndex++;
      return;
    }
    if (
      sendingData.get("express").sum !== 0 &&
      answerMap.get("express") === null
    ) {
      answerMap.set("express", r);
      return;
    }
    if (
      sendingData.get("system").sum !== 0 &&
      answerMap.get("system") === null
    ) {
      answerMap.set("system", r);
      return;
    }
  });
  answerMap.set("ordinars", ordinarsAcception);
  answerMap.set("total", sum);
  return answerMap;
};

export const acceptNewBets = (response, mainResponse, state, dispatch) => {
  dispatch(addSendingData(null));

  const isFail = response.every(r => r < 0);
  if (isFail || mainResponse < 0) {
    return dispatch(
      showModal({
        text: getTicketTextError(
          response.length === 1 ? response[0] : mainResponse
        )
      })
    );
  }
  const sendingData = new Map(state.coupon.sendingData);

  // if (!sendingData || sendingData.size === 0)
  //   return acceptFastBet(mainResponse, dispatch);
  const structuredAcception = getStructuredAcception(response, sendingData);

  const language = getState().user.language_user.dict;
  if (structuredAcception.get("total") == 0) {
    dispatch(
      showModal({
        text:
          [...structuredAcception.get("ordinars").values()].lenght > 1
            ? "несколько"
            : language.modal.betAccepted
      })
    );
  } else {
    const arrayError = [...structuredAcception.get("ordinars").values()].filter(
      elem => {
        if (elem != 0) {
          return true;
        } else {
          return false;
        }
      }
    );
    if (arrayError.length <= 1) {
      const express = structuredAcception.get("express");
      if (express) arrayError.push("-1");
      const builder = structuredAcception.get("builder");
      if (builder) arrayError.push("-1");
      const system = structuredAcception.get("system");
      if (system) arrayError.push("-1");
    }
    dispatch(
      showModal({
        text:
          arrayError.length > 1
            ? language.modal.betNotAccepted
            : language.modal.betNotAcceptedOne
      })
    );
  }

  if (structuredAcception.get("builder") == 0)
    dispatch(sendCouponBuilder(null));

  let isMustDeleteOrdinars = true;

  if (
    structuredAcception.get("express") !== null ||
    structuredAcception.get("system") !== null
  ) {
    if (
      (structuredAcception.get("express") === null ||
        structuredAcception.get("express") == 0) &&
      (structuredAcception.get("system") === null ||
        structuredAcception.get("system") == 0) &&
      structuredAcception.get("total") == 0
    ) {
      return dispatch(clearCoupon());
    }
    isMustDeleteOrdinars = false;
    if (structuredAcception.get("express") == 0)
      dispatch(setSumInputExpress(""));
    if (structuredAcception.get("system") == 0) dispatch(setSumInputSystem(""));
  }

  if (
    structuredAcception.get("total") >= 0 &&
    structuredAcception.get("ordinars").size === state.coupon.ordinars.length
  ) {
    return dispatch(clearCoupon());
  }

  structuredAcception.get("ordinars").forEach((acception, key) => {
    if (acception > 0) {
      if (isMustDeleteOrdinars) {
        const ordinar = state.coupon.ordinars.find(
          ord =>
            ord.compoundKey === key.split("---")[0] &&
            ord.outcomeId === +key.split("---")[1]
        );
        const line = state.coupon.ordinarsInfo.get(ordinar.compoundKey).line;
        dispatch(toggleOutcome(line, ordinar.outcomeId));
      } else {
        dispatch(
          setSumInputOrdinar(
            "",
            key.split("---")[0] + "-" + key.split("---")[1]
          )
        );
      }
    }
  });
};

export const sortArray = (a, b) => parseFloat(a) - parseFloat(b);

export const acceptCashout = (response, state, dispatch) => {
  dispatch(removePreloaderTicket());
  const language = getState().user.language_user.dict;
  if (response === 0) {
    return dispatch(
      showModal({
        text: language.modal.buyoutBet
      })
    );
  } else {
    return dispatch(
      showModal({
        text: getTicketTextError(response)
      })
    );
  }
};

export const acceptChangingTicket = (
  response,
  mainResponse,
  state,
  dispatch
) => {
  dispatch(removePreloaderTicket());
  dispatch(addEditingTicket(null));
  if (mainResponse === 0 && response[0] === 0) {
    const language = getState().user.language_user.dict;
    return dispatch(
      showModal({
        text: language.modal.editBetsSuccess
      })
    );
  } else {
    return dispatch(
      showModal({
        text: getTicketTextError(response[0])
      })
    );
  }
};

export const acceptTicket = (response, mainResponse, state, dispatch) => {
  const sendingType = state.coupon.sendingTicketType;
  switch (sendingType) {
    case 1:
      acceptNewBets(response, mainResponse, state, dispatch);
      break;
    case 2:
      acceptCashout(mainResponse, state, dispatch);
      break;
    case 3:
      acceptChangingTicket(response, mainResponse, state, dispatch);
      break;
    default:
      break;
  }
  dispatch(setTypeSendingTicket(null));
};

const acceptFastBet = (response, dispatch) => {
  const language = getState().user.language_user.dict;

  if (response === 0)
    return dispatch(
      showModal({
        text: language.modal.betAccepted
      })
    );
  else if (response < 0)
    return dispatch(
      showModal({
        text: getTicketTextError(response)
      })
    );
};

export const getTicketTextError = code => {
  const language = getState().user.language_user.dict;
  switch (code) {
    case -1:
      return language.modal.code_1_2; //В момент получения купона линия не найдена
    case -2:
      return language.modal.code_1_2; // В момент получения купона линия не активна
    case -3:
      return language.modal.code_3; //Сумма ставки больше баланса
    case -5:
      return language.modal.code_5; //Исход с таким outcome_id не найден в этой линии
    case -6:
      return language.modal.code_6_7; //Коэффициент поднялся
    case -7:
      return language.modal.code_6_7; //Коэффициент опустился
    case -8:
      return language.modal.code_8; // Клиент не залогинен
    case -9:
      return language.modal.code_9; //Битые данные в купоне (например, больше 20 событий, отрицательная сумма и т.п.)
    case -11:
      return language.modal.code_11; //Изменился счет в матче во время ставки
    case -12:
      return language.modal.code_12; //Событие не найдено или уже закончилось
    case -13:
      return language.modal.code_13; //Или линия не активна, или коэффициент изменился во время ставки, или линия удалилась во время ставки –
    case -17:
      return language.modal.code_17; //Коэффициент BetBuilder на сервере <=1
    case -18:
      return language.modal.code_18; //Превышен максимум ставки
    case -19:
      return language.modal.code_19; //Ни одной ставки с суммой больше 0
    case -20:
      return language.modal.code_20; //Битые данные в cashout
    case -21:
      return language.modal.code_5_21; //Неправильный ticket_id в cashout
    case -22:
      return language.modal.code_22_23; //Ставка выкупается от другого клиента
    case -23:
      return language.modal.code_22_23; //Сумма выкупа = 0
    case -24:
      return language.modal.code_24_25; //Сумма вывода + сумма остатка не соответствует полному выкупу
    case -25:
      return language.modal.code_24_25; //Ошибка с выкупом ставки (сумма вывода больше суммы полного выкупа)
    case -27:
      return language.modal.code_27; //Сумма редактируемой ставки превышает сумму выкупа
    case -40:
      return language.modal.code_40; //Неправильные данные BetBuilder
    case -50:
      return language.modal.code_50; //Выкуп на ставку, сделанную с бонусного счета
    case -60:
      return language.modal.code_60_61_62; //BetRadar не работает
    case -61:
      return language.modal.code_60_61_62; //Sporting Solutions не работает
    case -62:
      return language.modal.code_60_61_62; //BetGenius не работает
    case -65:
      return language.modal.code_65; //Экспресс с двумя одинаковыми событиями
    default:
      return language.modal.code_5_21;
  }
};

export const addStickyContent = () => {
  document.querySelector("body").classList.add("sticky-content");
};

const changeStyleTopBetWindow = () => {
  //   debugger;
  const betsWindow = document.querySelector(".bets-window");
  const leftMenuContainer = document.getElementById("left-menu-container"); //(".left-menu__sport-list");
  if (!betsWindow || !leftMenuContainer) return;

  if (document.documentElement.clientWidth < 1023) {
    betsWindow.style.top = 0 + "px";
    leftMenuContainer.style.top = 0 + "px";
    return;
  }

  const offsetTop = window.scrollY;
  const initialTop = 70; // 120
  const diffTop = initialTop - offsetTop;
  const elemTop = diffTop > 0 ? diffTop : 0; // 50
  betsWindow.style.top = elemTop + "px";
  leftMenuContainer.style.top = elemTop + "px";
};

export const addBetsWindowStyleWhenSticky = () => {
  window.addEventListener("scroll", changeStyleTopBetWindow);
  //   if (betsWindow) betsWindow.style.top = "70px";
};

export const removeStickyContent = () => {
  document.querySelector("body").classList.remove("sticky-content");
  window.removeEventListener("scroll", changeStyleTopBetWindow);
  changeStyleTopBetWindow();
  //   const betsWindow = document.querySelector(".bets-window");
  //   if (betsWindow) betsWindow.removeAttribute("style");
};

export const saveNewBetEditingTicket = (line, outcomeId) => {
  const state = getState();
  const props = {
    events: state.server.eventsAndLines.events,
    markets: state.server.entities.markets,
    marketsByNum: state.server.entities.marketsByNum,
    editingTicket: state.tickets.editingTicket,
    unconfirmedBet: state.tickets.unconfirmedBets
  };

  const getBetKey = bet => {
    return bet.line.compoundKey + "-" + bet.outcomeId;
  };
  const getBetValue = bet => {
    const event = props.events.get(bet.line.eventId);
    const market = getMarket(bet.line, props.markets, props.marketsByNum);
    const outcomeName = renameMarketName(
      bet.line,
      market,
      getOutcomeName(market, bet.outcomeId, bet.line),
      replaceCompetitorsFull(event)
    );
    const marketName = renameMarketName(
      bet.line,
      market,
      market.name,
      replaceCompetitorsFull(event)
    );
    return {
      key: getBetKey(bet),
      line: bet.line,
      outcomeId: bet.outcomeId,
      compoundKey: bet.line.compoundKey,
      isUnconfirmed: true,
      gbEventId: event.gbId,
      eventStatus: event.status,
      eventStartTime: event.timeSpanStart,
      acceptedOdd: getCoef(bet.line, bet.outcomeId, "-"),
      marketName,
      outcomeName,
      eventHomeName: event.homeName,
      eventAwayName: event.awayName
    };
  };

  const addBetWithSameLine = (key, unconfirmedBet) => {
    const bet = props.editingTicket.bets.get(key);
    if (bet.outcomeId === unconfirmedBet.outcomeId) {
      if (bet.isUnconfirmed) {
        props.editingTicket.bets.delete(key);
        dispatch(addBetsEditingTicket(props.editingTicket.bets));
      }
      return;
    } else {
      const market = getMarket(
        unconfirmedBet.line,
        props.markets,
        props.marketsByNum
      );
      const event = props.events.get(unconfirmedBet.line.eventId);
      bet.outcomeId = unconfirmedBet.outcomeId;
      bet.acceptedOdd = getCoef(
        unconfirmedBet.line,
        unconfirmedBet.outcomeId,
        "-"
      );
      bet.marketName = renameMarketName(
        unconfirmedBet.line,
        market,
        market.name,
        replaceCompetitorsFull(event)
      );
      bet.outcomeName = renameMarketName(
        unconfirmedBet.line,
        market,
        getOutcomeName(market, unconfirmedBet.outcomeId, unconfirmedBet.line),
        replaceCompetitorsFull(event)
      );
      props.editingTicket.bets.set(key, bet);
      dispatch(addBetsEditingTicket(props.editingTicket.bets));
    }
  };

  const getNewBetKey = lastKey => {
    if (lastKey.toString().match(/unconfirmed\_/)) {
      return "unconfirmed_" + (+lastKey.replace(/unconfirmed\_/, "") + 1);
    } else {
      return "unconfirmed_1";
    }
  };

  const saveNewBet = props => {
    const unconfirmedBet = { line, outcomeId };
    const bets = props.editingTicket.bets;

    const sameLine = [...bets.keys()].find(
      key => bets.get(key).compoundKey === unconfirmedBet.line.compoundKey
    );
    if (sameLine) return addBetWithSameLine(sameLine, unconfirmedBet);

    const sameEvent = [...bets.keys()].find(key => {
      const event = props.events.get(unconfirmedBet.line.eventId);
      if (!event) return false;
      return bets.get(key).gbEventId === event.gbId;
    });
    if (sameEvent) return;
    if (bets.size >= 20) return;

    const lastKey = getLastKeyInMap(bets);
    const newKey = getNewBetKey(lastKey);
    bets.set(newKey, getBetValue(unconfirmedBet));

    dispatch(addBetsEditingTicket(bets));
  };

  saveNewBet(props);
};
