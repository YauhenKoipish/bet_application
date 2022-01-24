// import React from "react";
// //иконки видов спорта
// import { ReactComponent as AmericanFootball } from "../Components/Menu/img/sport-left/AmericanFootball.svg";
// import { ReactComponent as AussieRules } from "../Components/Menu/img/sport-left/AussieRules.svg";
// import { ReactComponent as Badminton } from "../Components/Menu/img/sport-left/Badminton.svg";
// import { ReactComponent as Baseball } from "../Components/Menu/img/sport-left/Baseball.svg";
// import { ReactComponent as Basketball } from "../Components/Menu/img/sport-left/Basketball.svg";
// import { ReactComponent as Boxing } from "../Components/Menu/img/sport-left/Boxing.svg";
// import { ReactComponent as BeachSoccer } from "../Components/Menu/img/sport-left/BeachSoccer.svg";
// import { ReactComponent as BeachVolley } from "../Components/Menu/img/sport-left/BeachVolley.svg";
// // import { ReactComponent as ChampionsLeague } from "../Components/Menu/img/sport-left/Champions League.svg";
// import { ReactComponent as Cricket } from "../Components/Menu/img/sport-left/Cricket.svg";
// import { ReactComponent as Curling } from "../Components/Menu/img/sport-left/Curling.svg";
// import { ReactComponent as Cybersport } from "../Components/Menu/img/sport-left/Cybersport.svg";
// import { ReactComponent as Darts } from "../Components/Menu/img/sport-left/Darts.svg";
// import { ReactComponent as Fieldhockey } from "../Components/Menu/img/sport-left/Fieldhockey.svg";
// import { ReactComponent as Floorball } from "../Components/Menu/img/sport-left/Floorball.svg";
// import { ReactComponent as Golf } from "../Components/Menu/img/sport-left/Golf.svg";
// import { ReactComponent as Handball } from "../Components/Menu/img/sport-left/Handball.svg";
// import { ReactComponent as IceHockey } from "../Components/Menu/img/sport-left/IceHockey.svg";
// // import { ReactComponent as Motorsport } from "../Components/Menu/img/sport-left/Motorsport.svg";
// import { ReactComponent as Olympics } from "../Components/Menu/img/sport-left/Olympics.svg";
// import { ReactComponent as Other } from "../Components/Menu/img/sport-left/Other.svg";
// import { ReactComponent as Pesapallo } from "../Components/Menu/img/sport-left/Pesapallo.svg";
// import { ReactComponent as Rugby } from "../Components/Menu/img/sport-left/Rugby.svg";
// import { ReactComponent as RugbyLeague } from "../Components/Menu/img/sport-left/RugbyLeague.svg";
// import { ReactComponent as Snooker } from "../Components/Menu/img/sport-left/Snooker.svg";
// import { ReactComponent as Soccer } from "../Components/Menu/img/sport-left/Soccer.svg";
// import { ReactComponent as Squash } from "../Components/Menu/img/sport-left/Squash.svg";
// import { ReactComponent as TableTennis } from "../Components/Menu/img/sport-left/TableTennis.svg";
// import { ReactComponent as Tennis } from "../Components/Menu/img/sport-left/TableTennis.svg";
// import { ReactComponent as Volleyball } from "../Components/Menu/img/sport-left/Volleyball.svg";
// import { ReactComponent as Waterpolo } from "../Components/Menu/img/sport-left/Waterpolo.svg";
// import { ReactComponent as WinterSports } from "../Components/Menu/img/sport-left/WinterSports.svg";
// import { ReactComponent as Fave } from "../Components/Menu/img/sport-left/fave.svg";
// import { ReactComponent as AllSports } from "../Components/Menu/img/sport-left/All_sports.svg";
// import { ReactComponent as Translation } from "../Components/Menu/img/sport-left/Translation.svg";
// import { ReactComponent as Plus } from "../Components/Menu/img/sport-left/plus.svg";
// import { ReactComponent as Minus } from "../Components/Menu/img/sport-left/minus.svg";
// import { ReactComponent as Arrow } from "../Components/Menu/img/line-live/arrow.svg";
// import { ReactComponent as CloseIcon } from "../Components/Menu/img/line-live/close.svg";
// import { ReactComponent as SettingIcon } from "../Components/Menu/img/line-live/settings.svg";
// import { ReactComponent as ArrowsUpDown } from "../Components/Main/Components/Table/Filter/img/arrows.svg";
// import { ReactComponent as FavSmall } from "../Components/Menu/img/line-live/fav.svg";
// import { ReactComponent as FavSmallFull } from "../Components/Menu/img/line-live/fav-full.svg";
// import { ReactComponent as LiveIcon } from "../Components/Main/Components/Table/Event/img/line/live.svg";
// import { ReactComponent as StatIcon } from "../Components/Main/Components/Table/Event/img/line/stat.svg";
// import { ReactComponent as TranslationIcon } from "../Components/Main/Components/Table/Event/img/line/translation.svg";
// // import { ReactComponent as TranslationIcon } from "../Components/Main/Components/Table/Event/img/line/translation.svg";
// import { MIN_SUM_INPUT } from "../Components/Coupon/Components/Coupon/";
// import { getLocalStorageData, setLocalStorage } from "./LocalStorage";
// import {
//   addSendingData,
//   clearCoupon,
//   toggleOutcome,
//   setSumInputExpress,
//   setSumInputOrdinar,
//   setSumInputSystem,
//   sendCouponBuilder,
//   setTypeSendingTicket
// } from "../Actions/Components/Coupon/";
// import { showModal } from "../Actions/Components/Modal/";
// import { validateEmail } from "./Validation";
// import { removePreloaderTicket } from "../Actions/Components/Tickets";
// import { store } from "../../Store";
// // import { matchStatusDict } from "./Dict";

// export const TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000;

// export const heightOneCellLineWithSpecifier = 73;

// export const getTimestampWithOffset = (timestamp, isServerToClient) => {
//   return isServerToClient
//     ? timestamp - TIME_ZONE_OFFSET
//     : timestamp + TIME_ZONE_OFFSET;
// };

// export const getFormattedCoef = value => {
//   let coef = +value;
//   if (coef < 10) return (Math.floor(coef * 100) / 100).toFixed(2);
//   if (coef >= 10 && coef < 100) return (Math.floor(coef * 10) / 10).toFixed(1);
//   if (coef >= 100) return Math.floor(coef);
// };

// export const getFormattedSum = value => {
//   return Math.floor(+value);
// };

// export const getSumSplittedBySpaces = value => {
//   value = String(value).replace(" ", "");
//   if (isNaN(value) || +value < 0) return value;
//   let buff = [];
//   for (let i = 0; i < value.length; i++) {
//     if ((i + 1) % 3 || i + 1 === value.length) {
//       buff.unshift(value[value.length - 1 - i]);
//     } else {
//       buff.unshift(` ${value[value.length - 1 - i]}`);
//     }
//   }
//   return buff.join("");
// };

// export const getValidOdd = val => {
//   let value = +val;
//   if (value <= 1000) return 0;
//   return value / 1000;
// };

// export const getFormattedNumeral = data => {
//   let num = data.number,
//     divisionReminder;
//   switch (data.word) {
//     case "исход":
//       if (num === 1) return "исход";
//       if (num > 1 && num < 5) return "исхода";
//       if (num >= 5 && num <= 20) return "исходов";
//       return "исход(-ов)";
//     case "день":
//       if (num >= 5 && num <= 20) return "дней";
//       divisionReminder = num % 10;
//       if (divisionReminder === 1) return "день";
//       if (
//         divisionReminder === 2 ||
//         divisionReminder === 3 ||
//         divisionReminder === 4
//       )
//         return "дня";
//       if (
//         !divisionReminder ||
//         divisionReminder === 5 ||
//         divisionReminder === 6 ||
//         divisionReminder === 7 ||
//         divisionReminder === 8 ||
//         divisionReminder === 9
//       )
//         return "дней";
//       break;
//     case "час":
//       if (num >= 5 && num <= 20) return "часов";
//       divisionReminder = num % 10;
//       if (divisionReminder === 1) return "час";
//       if (
//         divisionReminder === 2 ||
//         divisionReminder === 3 ||
//         divisionReminder === 4
//       )
//         return "часа";
//       if (
//         !divisionReminder ||
//         divisionReminder === 5 ||
//         divisionReminder === 6 ||
//         divisionReminder === 7 ||
//         divisionReminder === 8 ||
//         divisionReminder === 9
//       )
//         return "часов";
//       break;
//     case "минута":
//       if (num >= 5 && num <= 20) return "минут";
//       divisionReminder = num % 10;
//       if (divisionReminder === 1) return "минута";
//       if (
//         divisionReminder === 2 ||
//         divisionReminder === 3 ||
//         divisionReminder === 4
//       )
//         return "минуты";
//       if (
//         !divisionReminder ||
//         divisionReminder === 5 ||
//         divisionReminder === 6 ||
//         divisionReminder === 7 ||
//         divisionReminder === 8 ||
//         divisionReminder === 9
//       )
//         return "минут";
//       break;
//     default:
//       return;
//   }
// };

// const getCatKey = (line, gbId) => {
//   // 0 sr:match: //1 -  sr:race_event(sr:stage) //2 - sr:simple_tournament //3 sr:season (sr : tournament) //4 sr:race_tournament //5 vf:match //6 vf:season (vf:tournament:)
//   //7 - vbl:match  //8 - vto:match  //9 - vbl:season : (vbl:tournament) //10 - vto:season (vto:tournament) //11 vdr:stage //12 vhc:stage //13 vti:match // 14 wns:match//
//   //15 vdr:season : (vdr:stage) //16 vhc:season (vhc:stage:) //17 vti:season : (vti:tournament) //18 wns:season (wns:tournament: //19 ssln_event
//   if (line.marketId >= 30000 && gbId > 0) return "99" + gbId;

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

// export const getCompoundKey = (line, event) => {
//   if (line.compoundKey && line.compoundKey.length > 0) return line.compoundKey;
//   line.compoundKey = getCatKey(line, event.gbId) + ";" + line.marketId;
//   for (let i = 0; i < line.specifierValue.length; i++) {
//     if (i === 0)
//       line.compoundKey = line.compoundKey + ";" + line.specifierValue[i];
//     else line.compoundKey = line.compoundKey + "&" + line.specifierValue[i];
//   }
//   return line.compoundKey;
// };

// export const getValidTimeStamp = timestamp => {
//   return (timestamp + new Date().getTimezoneOffset() * 60) * 1000;
// };

// export const getMenuContainerHeight = () => {
//   const getFavSportsHeight = () => {
//     const elem = document.getElementById("menu-favSports");
//     if (!elem) return 0;
//     return elem.clientHeight;
//   };

//   const getHeaderHeight = () => {
//     document.getElementsByTagName("header");
//     return parseInt(
//       getComputedStyle(document.getElementsByTagName("header")[0]).height
//     );
//   };

//   return window.innerHeight - getHeaderHeight() - getFavSportsHeight();
// };

// export const getSportIcon = (id, className = "") => {
//   switch (id) {
//     case 1: // футбол BR id
//     case 1023: // футбол
//       return <Soccer className={className} />;
//     case 2: // Баскетбол
//     case 1016: // Баскетбол BR id
//       return <Basketball className={className} />;
//     case 3: // Бейсбол
//     case 1015: // Бейсбол BR id
//       return <Baseball className={className} />;
//     case 4: // Хоккей
//     case 1027: // Хоккей BR id
//       return <IceHockey className={className} />;
//     case 5: // теннис BR id
//     case 1034: // теннис
//       return <Tennis className={className} />;
//     case 6: // гандбол BR id
//     case 1028: // теннис
//       return <Handball className={className} />;
//     case 7: // флорбол BR id
//     case 1102: // флорбол
//       return <Floorball className={className} />;
//     case 9: // гольф BR id
//     case 1026: // гольф
//       return <Golf className={className} />;
//     case 10: // бокс BR id
//     case 1020: // бокс
//       return <Boxing className={className} />;
//     case 12: // рэгби BR id
//     case 1031: // рэгби
//       return <Rugby className={className} />;
//     case 13: // авст футбол BR id
//     case 1013: // рэгби
//       return <AussieRules className={className} />;
//     case 14: // зима BR id
//     case 1143: // зима
//       return <WinterSports className={className} />;
//     case 16: // Ам футбол BR id
//     case 1012: // Ам футбол
//       return <AmericanFootball className={className} />;
//     case 19: // снукер BR id
//     case 1036: // снукер
//       return <Snooker className={className} />;
//     case 20: // настольный теннис BR id
//     case 1033: // настольный теннис
//       return <TableTennis className={className} />;
//     case 21: // крикет BR id
//     case 1021: // крикет
//       return <Cricket className={className} />;
//     case 22: // дартс BR id
//     case 1022: // дартс
//       return <Darts className={className} />;
//     case 23: // волейбол BR id
//     case 1035: // волейбол
//       return <Volleyball className={className} />;
//     case 24: // Хоккей на траве BR id
//     case 1126: // Хоккей на траве
//       return <Fieldhockey className={className} />;
//     case 26: // водное поло BR id
//     case 1042: // водное поло
//       return <Waterpolo className={className} />;
//     case 28: // водное поло BR id
//     case 1118: // водное поло
//       return <Curling className={className} />;
//     case 30: // Олим игры BR id
//     case 1132: // Олим игры
//       return <Olympics className={className} />;
//     case 31: // Бадминтон BR id
//     case 1014: // Бадминтон
//       return <Badminton className={className} />;
//     case 34: // Пляжный волейбол BR id
//     case 1017: // Пляжный волейбол
//       return <BeachVolley className={className} />;
//     case 37: // Сквош BR id
//     case 1107: // Сквош
//       return <Squash className={className} />;
//     case 1030: // рэгбиЛиг BR id
//     case 59: // рэгбиЛиг
//       return <RugbyLeague className={className} />;
//     case 1112: // пляж футбол BR id
//     case 60: // пляж футбол
//       return <BeachSoccer className={className} />;
//     case 61: // песапалло BR id
//     case 1127: // песапалло
//       return <Pesapallo className={className} />;
//     case 1202: // киберспорт
//       return <Cybersport className={className} />;
//     case -1: // fave
//     case "fave": // translation
//       return <Fave className={className} />;
//     case -2: // allSports
//     case "allSports": // translation
//       return <AllSports className={className} />;
//     case -3: // translation
//     case "translation": // translation
//       return <Translation className={className} />;
//     case "plus": // translation
//       return <Plus className={className} />;
//     case "minus": // translation
//       return <Minus className={className} />;
//     case "arrow":
//       return <Arrow className={className} />;
//     case "arrowsUpDown":
//       return <ArrowsUpDown className={className} />;
//     case "favSmall":
//       return <FavSmall className={className} />;
//     case "favSmallFull":
//       return <FavSmallFull className={className} />;
//     case "LiveIcon":
//       return <LiveIcon className={className} />;
//     case "StatIcon":
//       return <StatIcon className={className} />;
//     case "TranslationIcon":
//       return <TranslationIcon className={className} />;
//     case "close":
//       return <CloseIcon className={className} />;
//     case "setting":
//       return <SettingIcon className={className} />;
//     case 32: // Игра в боулз BR id
//     case 1019: // Игра в боулз
//     default:
//       return <Other />;
//   }
// };

// export const searchIndexOutcomeId = (outcomeId, number, line) => {
//   const index = {};
//   index.lineIndex = line.outcomeId.indexOf(+number);
//   index.marketIndex = outcomeId.indexOf(+number);
//   return index;
// };

// export const isOutcomeActive = (line, outcomeId, ordinars) => {
//   if (!line || !ordinars || ordinars.length < 1) return false;
//   const result = ordinars.some(
//     ord => ord.compoundKey === line.compoundKey && outcomeId === ord.outcomeId
//   );
//   return result;
// };

// // import { ReactComponent as Plus } from "../Components/Menu/img/sport-left/plus.svg";
// // import { ReactComponent as Minus } from "../Components/Menu/img/sport-left/minus.svg";
// // import { ReactComponent as Arrow } from "../Components/Menu/img/left-menu/arrow.svg";
// // import { ReactComponent as FavSmall } from "../Components/Menu/img/left-menu/fav.svg";
// // import { ReactComponent as FavSmallFull } from "../Components/Menu/img/left-menu/fav-full.svg";
// export const transliterate = (input, mode) => {
//   if (mode && !input.toString().match(/[А-яЁё]/g)) return input;
//   if (!mode && !input.toString().match(/[A-z]/g)) return input;
//   input = input.toLowerCase();
//   const rus = "кий щ   ш  ч  ц  ю  я  ё  ж  ъ   э  ь  ы а б в г д е з и й к л м н о п р с т у ф х к".split(
//     / +/g
//   );
//   const eng = "kij shh sh ch cz yu ya yo zh jj  eh ij y a b v g d e z i j k l m n o p r s t u f x q ".split(
//     / +/g
//   );

//   let newValue = "";
//   for (let i = 0; i < input.length; i++) {
//     if (mode) {
//       if (input[i] === " ") newValue += "_";
//       else if (rus.indexOf(input[i]) !== -1)
//         newValue += eng[rus.indexOf(input[i])];
//       else newValue += input[i];
//     } else {
//       if (input[i] === "_") newValue += " ";
//       else if (eng.indexOf(input[i]) !== -1)
//         newValue += rus[eng.indexOf(input[i])];
//       else newValue += input[i];
//     }
//   }
//   return newValue;
// };

// export const getpreoryMarketStreamPainting = sportId => {
//   switch (sportId) {
//     case 1023: // футбол
//       return [30001, 30229, 30003];

//     case 1034: // футбол
//       return [30002, 30229, 30003];

//     case 1016: // футбол
//       return [30002, 30229, 30003];

//     case 1027: // футбол
//       return [30001, 30229, 30003];

//     case 1028: // футбол
//       return [30001, 30229, 30003];

//     case 1015: // футбол
//       return [30002, 30229, 30003];

//     case 1035: // футбол
//       return [30002, 30229, 30003];

//     case 1103: // футзал
//       return [30001, 30229, 30003];

//     case 1017: // пляж вол
//       return [30002, 30229, 30003];

//     case 1014: // бадм
//       return [30002, 30229, 30003];

//     case 1012: // ам футбол
//       return [30002, 30229, 30003];

//     case 1102: // флорбол
//       return [30001, 30229, 30003];

//     case 1021: // крик
//       return [30002, 30229, 30003];

//     case 1042: // вод поло
//       return [30001, 30229, 30003];

//     case 1030: // рег лиг
//       return [30002, 30229, 30003];

//     case 1031: // рег юни
//       return [30002, 30229, 30003];

//     case 1020: // Бокс
//       return [30001, 30229, 30003];

//     case 1079: // ММА
//       return [30001, 30229, 30003];

//     case 1036: // Снук
//       return [30002, 30229, 30003];

//     case 1033: // Настоль
//       return [30002, 30229, 30003];

//     case 1202: // Кибер
//       return [30002, 30229, 30003];

//     case 1026: // Гольф
//       return [30002, 30229, 30003];

//     case 1109: // Шахматы
//       return [30001, 30229, 30003];

//     default:
//       return [30001, 30229, 30003];
//   }
// };

// export const getTranslitNameForSport = id => {
//   switch (id) {
//     case 1: // футбол BR id
//     case 1023: // футбол
//       return "futbol";
//     case 2: // Баскетбол
//     case 1016: // Баскетбол BR id
//       return "basketbol";
//     case 4: // Хоккей
//     case 1027: // Хоккей BR id
//       return "xokkej";
//     case 6:
//       return [30001, 30229, 30003]; // теннис BR id
//     case 1034: // теннис
//       return "tennis";
//     case 20: // настольный теннис BR id
//     case 1033: // настольный теннис
//       return "nastolniytennis";
//     case 23: // волейбол BR id
//     case 1035: // волейбол
//       return "volejbol";
//     case 19: // снукер BR id
//     case 1036: // снукер
//       return "snuker";
//     case 21: // крикет BR id
//     case 1021: // крикет
//       return "kriket";
//     case 22: // дартс BR id
//     case 1022: // дартс
//       return "darts";
//     case 31: // Бадминтон BR id
//     case 1014: // Бадминтон
//       return "badminton";
//     case 34: // Пляжный волейбол BR id
//     case 1017: // Пляжный волейбол
//       return "beachVolley";
//     case 37: // Сквош BR id
//     case 1107: // Сквош
//       return "squash";
//     case 1202: // киберспорт
//       return "cybersport";
//     case -1: // fave
//       return "fave";
//     case -2: // allSports
//       return "allSports";
//     case -3: // translation
//       return "translation";
//     case 32: // Игра в боулз BR id
//     case 1019: // Игра в боулз
//     default:
//       return "other";
//   }
// };

// export const getEntityById = (entity, id) => {
//   return entity.get(id);
// };

// export const getSportByName = (sports, name) => {
//   const sportRus = [...sports.values()].find(
//     sport => transliterate(sport.name, true) === name
//   );
//   if (sportRus) return sportRus;
//   const sportEng = [...sports.values()].find(
//     sport => sport.name.toLowerCase() === name.replace(/_/g, " ")
//   );
//   if (sportEng) return sportEng;
//   return null;
// };

// export const getCategoryByName = (categories, name, sportId) => {
//   if (!sportId) return null;
//   const catRus = [...categories.values()].find(
//     cat => cat.sportId === sportId && transliterate(cat.name, true) === name
//   );
//   if (catRus) return catRus;
//   const catEng = [...categories.values()].find(
//     cat =>
//       cat.sportId === sportId &&
//       cat.name.toLowerCase() === name.replace(/_/g, " ")
//   );
//   if (catEng) return catEng;
//   return null;
// };

// export const getTournamentByName = (tournaments, name, sportId, catId) => {
//   if (!sportId || !catId) return null;
//   const tRus = [...tournaments.values()].find(
//     t =>
//       t.categoryId === catId &&
//       t.sportId === sportId &&
//       transliterate(t.name, true) === name
//   );
//   if (tRus) return tRus;
//   const tEng = [...tournaments.values()].find(
//     t =>
//       t.categoryId === catId && t.name.toLowerCase() === name.replace(/_/g, " ")
//   );
//   if (tEng) return tEng;
//   return null;
// };

// export const getPropertyByValue = (
//   value,
//   prop,
//   input,
//   isTranslit,
//   isLowerCase
// ) => {
//   let output;
//   if (isTranslit) {
//     output = [...input.values()].find(
//       val => transliterate(val[prop], true) === value
//     );
//     if (output) return output;
//   }
//   if (isLowerCase) {
//     output = [...input.values()].find(
//       val => val[prop].toLowerCase() === value.replace(/_/g, " ")
//     );
//     if (output) return output;
//     return null;
//   }
//   output = [...input.values()].find(val => val[prop] === value);
//   if (output) return output;
//   return null;
// };

// export const getDateInFormat = (format, date, isInLocalDate = false) => {
//   const UTCdate = new Date(!isInLocalDate ? date : date + TIME_ZONE_OFFSET);
//   return format
//     .replace(/year/g, addZeroToDate(UTCdate.getFullYear()))
//     .replace(/fullYear/g, UTCdate.getFullYear())
//     .replace(/month/g, addZeroToDate(UTCdate.getMonth() + 1))
//     .replace(/day/g, addZeroToDate(UTCdate.getDate()))
//     .replace(/hours/g, addZeroToDate(UTCdate.getHours()))
//     .replace(/minutes/g, addZeroToDate(UTCdate.getMinutes()))
//     .replace(/miliseconds/g, addZeroToDate(UTCdate.getMilliseconds()))
//     .replace(/seconds/g, addZeroToDate(UTCdate.getSeconds()));
// };

// export const addZeroToDate = val => {
//   return ("0" + val).substr(-2);
// };

// export const sortCallbackByProp = (a, b, prop = null, entity = null) => {
//   if (entity) {
//     a = entity.get(a);
//     b = entity.get(b);
//     if (!a && b) return -1;
//     if (a && !b) return 1;
//     if (!a && !b) return 0;
//   }
//   if (prop) {
//     a = a[prop];
//     b = b[prop];
//   }
//   if (a > b) return 1;
//   else if (a < b) return -1;
//   else if (a !== undefined && b === undefined) return -1;
//   else if (a === undefined && b !== undefined) return 1;
//   else return 0;
// };

// export const sortCallbackBySortIdAndName = (
//   a,
//   b,
//   prop = null,
//   entity = null
// ) => {
//   if (entity) {
//     a = entity.get(a);
//     b = entity.get(b);
//     if (!a && b) return -1;
//     if (a && !b) return 1;
//     if (!a && !b) return 0;
//   }
//   if (prop && !entity) {
//     a = a[prop];
//     b = b[prop];
//   }
//   if (a.sortId > b.sortId) return 1;
//   else if (a.sortId < b.sortId) return -1;
//   else if (a.sortId !== undefined && b.sortId === undefined) return -1;
//   else if (a.sortId === undefined && b.sortId !== undefined) return 1;
//   else if (a.name > b.name) return 1;
//   else if (a.name < b.name) return -1;
//   else return 0;
// };

// export const addFavoriteToLocalStorage = (key, val) => {
//   let favSportsLocalStorage = getLocalStorageData(key);
//   if (favSportsLocalStorage) {
//     if (!favSportsLocalStorage.includes(val)) favSportsLocalStorage.push(val);
//   } else favSportsLocalStorage = [val];
//   setLocalStorage(key, favSportsLocalStorage);
// };

// export const removeFavoriteToLocalStorage = (key, val) => {
//   let favSportsLocalStorage = getLocalStorageData(key);
//   if (favSportsLocalStorage)
//     favSportsLocalStorage.splice(favSportsLocalStorage.indexOf(val), 1);
//   else favSportsLocalStorage = [];

//   setLocalStorage(key, favSportsLocalStorage);
// };

// export const getMarket = (line, markets, marketsByNum) => {
//   if (!line || !markets || !marketsByNum) return null;
//   const trueMarketId = marketsByNum.get(line.marketId);
//   if (!trueMarketId) return null;
//   const market = markets.get(trueMarketId);
//   if (market.lineType == 0) {
//     let trueMarket;
//     if (market.variant > -1) {
//       trueMarket = markets.get(
//         line.marketId + "_" + line.specifierValue[market.variant]
//       );
//       return trueMarket ? trueMarket : market;
//     } else {
//       if (!market.variableText) return market;
//       trueMarket = markets.get(line.marketId + "_" + market.variableText);
//       return trueMarket ? trueMarket : market;
//     }
//   }
//   return market;
// };

// export const stringifyMap = map => {
//   if (!map || map.size === 0) return [];
//   return [...map.keys()].map(key => [key, map.get(key)]);
// };

// export const parseMap = map => {
//   if (!map) return new Map();
//   return new Map(map);
// };

// export const getCoef = (line, outcomeId, defaultValue = "") => {
//   if (!line) return defaultValue;
//   const index = line.outcomeId.indexOf(outcomeId);
//   if (index < 0) return defaultValue;
//   const coef = line.outcomeOdds[index];
//   return coef ? getCoefInTrueFormat(coef) : defaultValue;
// };

// export const getOutcomeId = (market, index) => {
//   if (!market || (!index && index !== 0)) return -1;
//   return market.outcomeId[index];
// };

// export const getCoefInTrueFormat = coef => {
//   if (!coef) return "-";
//   coef = coef.toString();
//   let length = coef.indexOf(".");

//   if (length === -1) length = coef.length;

//   coef.indexOf(".") !== -1 ? (coef += "00") : (coef += ".00");
//   return coef.split(".")[0].length < 3
//     ? coef.slice(0, 4)
//     : coef.slice(0, length);
// };

// export const validateInput = (elem, ...handlers) => {
//   const value = elem.value;
//   const validValue = value.replace(/^0/, "").replace(/[^0-9]/g, "");
//   let resultValue;
//   if (value !== validValue) resultValue = validValue;
//   else resultValue = value;
//   handlers.forEach(handler => (resultValue = handler(resultValue)));
//   elem.value = resultValue;
// };

// export const splitRangNumber = num => {
//   return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
// };

// export const getLastItemInMap = map => Array.from(map)[map.size - 1];
// export const getLastKeyInMap = map => Array.from(map)[map.size - 1][0];
// export const getLastValueInMap = map => Array.from(map)[map.size - 1][1];
// export const getFirstItemInMap = map => Array.from(map)[0];
// export const getFirstKeyInMap = map => Array.from(map)[0][0];
// export const getFirstValueInMap = map => Array.from(map)[0][1];

// export const getLineType = (market, line) => {
//   if (!market) return null;
//   const lineType = market.lineType;
//   if (
//     (lineType === 1 ||
//       lineType === 6 ||
//       lineType === 4 ||
//       lineType === 8 ||
//       lineType === 3 ||
//       lineType === 7) &&
//     line.outcomeOdds.length !== 2
//   )
//     return null;
//   if ((lineType === 2 || lineType === 5) && line.outcomeOdds.length !== 3)
//     return null;
//   return lineType;
// };

// export const mergeLines = (linesNew, linesPrev, linesMap, linesByCK) => {
//   const lines = new Map(linesPrev);
//   linesNew.forEach(line => {
//     if (lines.has(line.id)) {
//       if (!line.prevOutcomeOdds) {
//         line.prevOutcomeOdds = [...lines.get(line.id).outcomeOdds];
//       } else {
//         if (
//           isArraysEqual(line.prevOutcomeOdds, lines.get(line.id).outcomeOdds)
//         ) {
//           line.prevOutcomeOdds = [...lines.get(line.id).outcomeOdds];
//         }
//       }
//     }
//     lines.set(line.id, line);
//   });
//   lines.forEach((line, lineId) => {
//     if (line.status === 0 || line.status < -1) {
//       linesByCK.delete(line.compoundKey);
//       linesMap.delete(lineId);
//       lines.delete(lineId);
//     }
//   });
//   return lines;
// };

// export const isArraysEqual = (arr1, arr2) => {
//   if (JSON.stringify(arr1) === JSON.stringify(arr2)) return true;
//   return false;
// };

// export const mergeEvents = (eventNew, eventPrev, linesMap, linesByCK) => {
//   const lines = mergeLines(
//     eventNew.lines,
//     eventPrev.lines,
//     linesMap,
//     linesByCK
//   );
//   return {
//     ...eventPrev,
//     ...eventNew,
//     lines
//   };
// };

// export const filterVariants = ["1x2", "total", "handicap"];

// export const getInitialValuesFilter = col => {
//   switch (col) {
//     case 1:
//       return ["1x2"];
//     case 2:
//       return ["1x2", "total"];
//     case 3:
//       return ["1x2", "total", "handicap"];
//   }
// };

// export const getValTopNavView = () => {
//   const w = window.innerWidth;
//   if (w >= 414) {
//     return "backToTournament";
//   } else {
//     return "homeAway";
//   }
// };

// export const getCountColsForLineFilter = () => {
//   const w = window.innerWidth;
//   if (w >= 1366) {
//     return 3;
//   } else if (w >= 768) {
//     return 2;
//   } else {
//     return 1;
//   }
// };

// export const isLineBlocked = (line, event) => {
//   if (
//     !line ||
//     !event ||
//     line.status === -1 ||
//     event.isBetStop ||
//     event.isLinesBlocked
//   )
//     return true;
//   return false;
// };

// export const emptyLineTmp = (isMultiLine = false) => {
//   return (
//     <div className="line__table">
//       <div className="line__coef">
//         <span />
//       </div>
//       <div
//         className={"line__coef" + (isMultiLine ? " line__coef--dropdown" : "")}
//       >
//         <span />
//       </div>
//       <div className="line__coef">
//         <span />
//       </div>
//     </div>
//   );
// };

// export const getLineCoefClass = (coef1, coef2, isLineBlocked = false) => {
//   if (!coef1 || !coef2 || isLineBlocked) return "";
//   if (coef2 > coef1) return " green_rose";
//   if (coef2 < coef1) return " red_fell";
//   return "";
// };

// export const getDeltaCoef = line =>
//   Math.abs(line.outcomeOdds[0] - line.outcomeOdds[1]);

// export const sortLinesBySpecifier = (a, b) =>
//   parseFloat(a.specifierValue[0]) - parseFloat(b.specifierValue[0]);

// export const getLinesSortedByDelta = (a, b) => {
//   const delta1 = Math.abs(+a.outcomeOdds[0] - +a.outcomeOdds[1]);
//   const delta2 = Math.abs(+b.outcomeOdds[0] - +b.outcomeOdds[1]);
//   return delta1 > delta2 ? 1 : delta2 > delta1 ? -1 : 0;
// };

// export const getCurAndPrevCoefs = (line, index, getCoef) => {
//   if (!line) return [null, null];
//   const coefs = line.outcomeOdds;
//   const prevCoefs = line.prevOutcomeOdds;
//   return [
//     prevCoefs ? getCoef(prevCoefs, index) : null,
//     coefs ? getCoef(coefs, index) : null
//   ];
// };

// // 1 - radar, 2 - ssln, 3 - genius
// export const getProvider = event => {
//   if (event.lineTypeRadar < 19) {
//     return 1;
//   } else if (event.lineTypeRadar === 19) {
//     return 2;
//   } else if (event.lineTypeRadar === 20) {
//     return 3;
//   }
// };

// export const getFilterSportByName = (name, sports) => {
//   if (!name || sports.size === 0) return null;
//   const sport = getSportByName(sports, name);
//   if (!sport) return null;
//   return sport.id;
// };

// export const getFilterCategoryByName = (name, sportId, categories) => {
//   if (!sportId) return null;
//   if (!name || categories.size === 0) return null;
//   const cat = getCategoryByName(categories, name, sportId);
//   if (!cat) return null;
//   return cat.id;
// };

// export const getFilterTournamentByName = (
//   name,
//   sportId,
//   catId,
//   tournaments
// ) => {
//   if (!sportId || !catId) return null;
//   if (!name || tournaments.size === 0) return null;
//   const t = getTournamentByName(tournaments, name, sportId, catId);
//   if (!t) return null;
//   return t.id;
// };

// export const getMainScore = event => {
//   if (!event || event.status !== 1) return null;
//   const score = getScore(event);
//   // debugger;
//   if (
//     score.hasOwnProperty("homeScore") &&
//     score.homeScore !== undefined &&
//     score.hasOwnProperty("awayScore") &&
//     score.awayScore !== undefined
//   )
//     return { home: score.homeScore, away: score.awayScore };
//   if (
//     score.hasOwnProperty("homeSetScore") &&
//     score.homeSetScore !== undefined &&
//     score.hasOwnProperty("awaySetScore") &&
//     score.awaySetScore !== undefined
//   )
//     return { home: score.homeSetScore, away: score.awaySetScore };
//   if (
//     score.hasOwnProperty("homeGameScore") &&
//     score.homeGameScore !== undefined &&
//     score.hasOwnProperty("awayGameScore") &&
//     score.awayGameScore !== undefined
//   )
//     return { home: score.homeGameScore, away: score.awayGameScore };
//   return null;
// };

// export const getScore = event => {
//   var result = {};
//   result.status = getMatchStatus(event);
//   switch (event.sportId) {
//     case 1023: //Soccer
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       result.homeYellowCards = getMatchYellowHomeCards(event);
//       result.awayYellowCards = getMatchYellowAwayCards(event);
//       result.homeRedCards = getMatchRedHomeCards(event);
//       result.awayRedCards = getMatchRedAwayCards(event);
//       result.awayCorners = getMatchAwayCorners(event);
//       result.homeCorners = getMatchHomeCorners(event);
//       result.setScores = getAllSetScores(event);

//       break;
//     case 5:
//     case 1033:
//     case 1034: //Tennis
//       result.homeGameScore =
//         getMatchHomeGameScore(event) >= 50 ? "0" : getMatchHomeGameScore(event);
//       result.awayGameScore =
//         getMatchAwayGameScore(event) >= 50 ? "0" : getMatchAwayGameScore(event);
//       result.homeSetScore = getMatchHomeScore(event);
//       result.awaySetScore = getMatchAwayScore(event);
//       result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
//       result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
//       result.currentServer = getCurrentServer(event);
//       result.setScores = getAllSetScores(event);
//       result.timeKeyWords = "сет";
//       result.valueKeyWords = "гейм";
//       break;
//     case 1027: //Ice Hockey
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1016: //Basketball
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1035: //Volleyball
//       result.homeGameScore = getMatchHomeCurrentSetScore(event);
//       result.awayGameScore = getMatchAwayCurrentSetScore(event);
//       result.homeSetScore = getMatchHomeScore(event);
//       result.awaySetScore = getMatchAwayScore(event);
//       result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
//       result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
//       result.currentServer = getCurrentServer(event);
//       break;
//     case 1020: //Boxing
//       break;
//     case 1021: //Cricket
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       break;
//     case 1022: //Darts
//       result.homeGameScore = getMatchHomeGameScore(event);
//       result.awayGameScore = getMatchAwayGameScore(event);
//       result.homeSetScore = getMatchHomeScore(event);
//       result.awaySetScore = getMatchAwayScore(event);
//       result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
//       result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
//       result.currentServer = getCurrentServer(event);
//       break;
//     case 1028: //Handball
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1030: //Rugby League
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1031: //Rugby
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1036: //Snooker
//       result.homeGameScore = getMatchHomeGameScore(event);
//       result.awayGameScore = getMatchAwayGameScore(event);
//       result.homeSetScore = getMatchHomeScore(event);
//       result.awaySetScore = getMatchAwayScore(event);
//       result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
//       result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
//       result.currentServer = getCurrentServer(event);
//       break;
//     case 1202: //Cybersport
//       result.homeGameScore = getMatchHomeCurrentSetScore(event);
//       result.awayGameScore = getMatchAwayCurrentSetScore(event);
//       result.homeSetScore = getMatchHomeScore(event);
//       result.awaySetScore = getMatchAwayScore(event);
//       result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
//       result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
//       result.currentServer = getCurrentServer(event);
//       break;
//     case 1012: //American Football
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1015: //Baseball
//       break;
//     case 1013: //Aussie Rules
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1014: //Badminton
//       result.homeGameScore = getMatchHomeCurrentSetScore(event);
//       result.awayGameScore = getMatchAwayCurrentSetScore(event);
//       result.homeSetScore = getMatchHomeScore(event);
//       result.awaySetScore = getMatchAwayScore(event);
//       result.homeCurrentSetScore = getMatchHomeCurrentSetScore(event);
//       result.awayCurrentSetScore = getMatchAwayCurrentSetScore(event);
//       result.currentServer = getCurrentServer(event);
//       break;
//     case 1017: //Beach Volley
//       break;
//     case 1019: //Bowls
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       break;
//     case 1025: //Gaelic Football
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1033: //Table Tennis
//       break;
//     case 1038: //Hurling
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1101: //FormulaOne
//       break;
//     case 1103: //Futsal
//       result.homeScore = getMatchHomeScore(event);
//       result.awayScore = getMatchAwayScore(event);
//       result.time = getMatchTime(event);
//       break;
//     case 1107: //Squash
//       break;
//     default:
//       break;
//   }
//   return result;
// };
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

// export const getMatchYellowHomeCards = event => {
//   return event.homeYellowcards;
// };

// export const getMatchYellowAwayCards = event => {
//   return event.awayYellowcards;
// };

// export const getMatchRedHomeCards = event => {
//   return event.homeRedcards;
// };

// export const getMatchRedAwayCards = event => {
//   return event.awayRedcards;
// };

// export const getMatchAwayCorners = event => {
//   return event.awayCorners;
// };

// export const getMatchHomeCorners = event => {
//   return event.homeCorners;
// };

// // export const getMatchTime = (matchTime) => {
// //     if (matchTime) {
// //         if (matchTime.includes(":")) return `${+matchTime.split(":")[0] + 1}'`;
// //         else return matchTime;
// //     }
// //     return "";
// // }

// // export const getMatchStatus = event => {
// //     if (event.matchStatusId === 0) {
// //         return "";
// //     } else {
// //         const dictItem = matchStatusDict.get(event.sportId);
// //         if (dictItem) {
// //             const statusesData = dictItem.statuses;
// //             const statusData = statusesData.find(
// //                 item => item.id === event.matchStatusId
// //             );
// //             if (statusData) {
// //                 return statusData.rusName;
// //             } else {
// //                 // console.warn("No statusDAta", this, this.matchStatusId);
// //             }
// //         } else {
// //             // console.warn("No dict foe match status", this.sportId);
// //         }
// //         return "#-#";
// //     }
// // };

// // ЯРИКА
// export const getMatchStatus = event => {
//   if (event.provider === 1) return getBetRadarStatus(event.matchStatus);
//   else if (event.provider === 2) {
//     if (event.matchStatus) {
//       switch (event.sportId) {
//         case 1023: //Soccer
//           return getSportlingSolutionStatus(event.matchStatus);
//         case 1016: //Basketball
//           return getSportlingSolutionStatus(
//             event.matchStatus
//               .replace("(", "")
//               .replace(")", "")
//               .split(":")[0]
//           );
//         case 1027: //Ice Hockey
//           return getSportlingSolutionStatus(
//             event.matchStatus
//               .replace("(", "")
//               .replace(")", "")
//               .split(" ")[0]
//           );
//         case 1030: //Rugby League
//           return getSportlingSolutionStatus(event.matchTime);
//         case 1031: //Rugby
//           return getSportlingSolutionStatus(event.matchTime);
//         case 1028: //Handball
//           return event.matchTime.replace(/[()]/g, "").split(":")[0];
//         case 1012:
//           return getSportlingSolutionStatus(
//             event.matchStatus
//               .split(": ")
//               [event.matchStatus.split(": ").length - 1].split(" ")[0]
//           );
//         default:
//           return event.matchStatus;
//       }
//     }
//   } else if (event.provider === 3) return getBetGeniusStatus(event.matchStatus);
// };

// export const getMatchHomeScore = event => {
//   return event.homeScore;
// };

// export const getMatchAwayScore = event => {
//   return event.awayScore;
// };

// export const getMatchHomeGameScore = event => {
//   return event.homeGamescore;
// };

// export const getMatchAwayGameScore = event => {
//   return event.awayGamescore;
// };

// export const getAllSetScores = event => {
//   return event.setScores;
// };

// export const getMatchHomeCurrentSetScore = event => {
//   if (event.provider === 2) {
//     switch (event.sportId) {
//       case 1022:
//         if (!event.matchStatus) {
//           console.log(event);
//           return "";
//         }
//         return event.matchStatus
//           .replace("*", "")
//           .split(" ")[0]
//           .split("-")[0];
//     }
//   }
//   return event.setScores
//     ? event.setScores
//         .split("-")
//         [event.setScores.split("-").length - 1].split(":")[0]
//     : 0;
// };

// export const getMatchAwayCurrentSetScore = event => {
//   if (event.provider === 2) {
//     switch (event.sportId) {
//       case 1022:
//         if (!event.matchStatus) {
//           console.log(event);
//           return "";
//         }
//         return event.matchStatus
//           .replace("*", "")
//           .split(" ")[0]
//           .split("-")[1];
//     }
//   }
//   return event.setScores
//     ? event.setScores
//         .split("-")
//         [event.setScores.split("-").length - 1].split(":")[1]
//     : 0;
// };

// export const getCurrentServer = event => {
//   if (event.provider === 2) {
//     switch (event.sportId) {
//       case 1022:
//         return;
//       case 1022:
//         var cs = event.matchStatus.split(" ")[0].split("-");
//         if (cs[0].includes("*")) return 1;
//         else if (cs[1].includes("*")) return 1;
//         return 0;
//         break;
//     }
//   }
//   return event.currentServer;
// };

// export const replaceCompetitorsFull = event => {
//   if (!event) return f => f;
//   return val =>
//     val
//       .replace(/\$competitor1/g, event.homeName)
//       .replace(/\$competitor2/g, event.awayName);
// };

// export const replaceCompetitors = val => {
//   if (!val) return "";
//   return val.replace(/\$competitor1/g, "1").replace(/\$competitor2/g, "2");
// };

// export const replaceSkobki = val => {
//   if (!val) return "";
//   return val.replace(/{|}/g, "");
// };

// export const renameMarketName = (
//   line,
//   market,
//   value,
//   replaceCompetitorsFunc = replaceCompetitors
// ) => {
//   // debugger;
//   if (!value) return "";
//   value = replaceCompetitorsFunc(value);
//   const matchingArray = value.match(/{.*?}/g);
//   if (!matchingArray || matchingArray.length === 0) return value;
//   matchingArray.forEach(matchingValue => {
//     const cleanValue = matchingValue.replace(/{|}/g, "");
//     if (
//       market &&
//       market.specifierName &&
//       market.specifierName.some(spec => cleanValue.match(new RegExp(spec, "g")))
//     ) {
//       const replaceMentValueSpecIndex = market.specifierName.findIndex(spec =>
//         cleanValue.match(new RegExp(spec, "g"))
//       );
//       const replacementValue = line.specifierValue[replaceMentValueSpecIndex];

//       const symbolBeforeSpec = value.match(new RegExp("(.)" + regular, "g"));
//       const regular = market.specifierName[replaceMentValueSpecIndex];

//       if (replacementValue.match(/\:/g)) {
//         // для европейского гандикапа
//         value = value.replace(new RegExp(regular, "g"), replacementValue);
//         return;
//       }
//       // debugger;
//       // const lineSpecFloat = parseFloat(replacementValue);
//       value = value
//         .replace(new RegExp(regular, "g"), replacementValue)
//         .replace(/\+\-/, "-")
//         .replace(/\-\+/, "-")
//         .replace(/\+\+/, "+")
//         .replace(/\-\-/, "+");
//       // value = value.replace(
//       //     new RegExp(regular, "g"),
//       //     symbolBeforeSpec === "-"
//       //         ? -lineSpecFloat > 0
//       //             ? "+" + lineSpecFloat
//       //             : lineSpecFloat
//       //         : lineSpecFloat < 0
//       //         ? lineSpecFloat.toString().replace("-", "")
//       //         : lineSpecFloat
//       // );
//     }
//   });
//   value = replaceSkobki(value).replace(/\!/g, "");
//   value = replaceCompetitorsFunc(value);

//   return value;
// };

// export const getOutcomeName = (market, outcomeId) => {
//   if (!market) return "";
//   const index = market.outcomeId.indexOf(outcomeId);
//   if (index < 0) return "";
//   return market.outcomeName[index];
// };

// export const getSportlingSolutionStatus = status => {
//   switch (status) {
//     case "1st":
//       return "1Т";
//     case "2nd":
//       return "2Т";
//     case "1st ET":
//       return "ОТ1";
//     case "2nd ET":
//       return "ОТ2";
//     case "Q1":
//       return "1Ч";
//     case "Q2":
//       return "2Ч";
//     case "Q3":
//       return "3Ч";
//     case "Q4":
//       return "4Ч";
//     case "OT1":
//       return "1ОТ";
//     case "OT2":
//       return "2ОТ";
//     case "OT3":
//       return "3ОТ";
//     case "OT4":
//       return "4ОТ";
//     case "P1":
//       return "1П";
//     case "P2":
//       return "2П";
//     case "P3":
//       return "3П";
//     case "P4":
//       return "4П";
//     case "H1":
//       return "П1";
//     case "H2":
//       return "П2";
//     default:
//       return "";
//   }
// };

// export const getBetGeniusStatus = status => {
//   switch (status) {
//     case "1st":
//       return "П1";
//     case "2nd":
//       return "П2";
//     case "halftime":
//       return "Пер.";
//     case "HalfTime":
//       return "Пер.";
//     case "FirstQuarter":
//       return "1Ч";
//     case "SecondQuarter":
//       return "2Ч";
//     case "ThirdQuarter":
//       return "3Ч";
//     case "FourthQuarter":
//       return "4Ч";
//     case "BeforeFirstQuarter":
//       return "1Ч";
//     case "BeforeSecondQuarter":
//       return "2Ч";
//     case "BeforeThirdQuarter":
//       return "3Ч";
//     case "BeforeFourthQuarter":
//       return "4Ч";
//     case "Abandoned":
//       return "Отм.";
//     case "AwayTeamBatting":
//       return "Верх";
//     case "AwayTeamWin":
//       return "Поб.гостей";
//     case "postmatch":
//       return "ОТ";
//     default:
//       return "";
//   }
// };

// export const getBetRadarStatus = status => {
//   switch (status) {
//     case "1st extra":
//       return "1ОТ";
//     case "1st extra, 2nd extra":
//       return "1, 2 Доп.";
//     case "1st Game":
//       return "1Г";
//     case "1st half":
//       return "1Т";
//     case "1st inning bottom":
//       return "1 Ин.";
//     case "1st inning top":
//       return "1 Ин.";
//     case "1st period":
//       return "1 Пер.";
//     case "1st quarter":
//       return "1Ч";
//     case "1st set":
//       return "1 Сет";
//     case "2nd extra":
//       return "2ОТ";
//     case "2nd Game":
//       return "2Г";
//     case "2nd half":
//       return "2Т";
//     case "2nd inning bottom":
//       return "2 Ин.";
//     case "2nd inning top":
//       return "2 Ин.";
//     case "2nd period":
//       return "2 Пер.";
//     case "2nd quarter":
//       return "2Ч";
//     case "2nd set":
//       return "2 Сет";
//     case "3rd Game":
//       return "3Г";
//     case "3rd inning bottom":
//       return "3 Ин.";
//     case "3rd inning top":
//       return "3 Ин.";
//     case "3rd period":
//       return "3 Пер.";
//     case "3rd quarter":
//       return "3Ч";
//     case "3rd set":
//       return "3 Сет";
//     case "4th Game":
//       return "4Г";
//     case "4th inning bottom":
//       return "4 Ин.";
//     case "4th inning top":
//       return "4 Ин.";
//     case "4th quarter":
//       return "4Ч";
//     case "4th set":
//       return "4 Сет";
//     case "5th Game":
//       return "5Г";
//     case "5th inning bottom":
//       return "5 Ин.";
//     case "5th inning top":
//       return "5 Ин.";
//     case "5th set":
//       return "5 Сет";
//     case "6th inning bottom":
//       return "6 Ин.";
//     case "6th inning top":
//       return "6 Ин.";
//     case "6th set":
//       return "6 Сет";
//     case "7th inning bottom":
//       return "7 Ин.";
//     case "7th inning top":
//       return "7 Ин.";
//     case "7th set":
//       return "7 Сет";
//     case "8th inning bottom":
//       return "8 Ин.";
//     case "8th inning top":
//       return "8 Ин.";
//     case "8th set":
//       return "8 Сет";
//     case "9th inning bottom":
//       return "9 Ин.";
//     case "9th inning top":
//       return "9 Ин.";
//     case "Abandoned":
//       return "Отм.";
//     case "AET":
//       return "ПДВ";
//     case "After golden set":
//       return "ПРС";
//     case "After sudden death":
//       return "ПМС";
//     case "After super over":
//       return "ПСФ";
//     case "AP":
//       return "ПП";
//     case "Awaiting extra time":
//       return "Пер.";
//     case "Awaiting golden set":
//       return "Пер.";
//     case "Awaiting penalties":
//       return "Пер.";
//     case "Awaiting sudden death":
//       return "Пер.";
//     case "Awaiting super over":
//       return "Пер.";
//     case "Break":
//       return "Пер.";
//     case "Break top1-bottom1":
//       return "1 Пер.";
//     case "Break top2-bottom1":
//     case "Break top2-bottom2":
//       return "2 Пер.";
//     case "Break top3-bottom2":
//     case "Break top3-bottom3":
//       return "3 Пер.";
//     case "Break top4-bottom3":
//     case "Break top4-bottom4":
//       return "4 Пер.";
//     case "Break top5-bottom4":
//     case "Break top5-bottom5":
//       return "5 Пер.";
//     case "Break top6-bottom5":
//     case "Break top6-bottom6":
//       return "6 Пер.";
//     case "Break top7-bottom6":
//       return "7 Пер.";
//     case "Break top8-bottom7":
//     case "Break top8-bottom8":
//       return "8 Пер.";
//     case "Break top9-bottom8":
//     case "Break top9-bottom9":
//       return "9 Пер.";
//     case "Break topEI-bottom9":
//       return "10 Пер.";
//     case "Break topEI-bottomEI":
//       return "10 Пер.";
//     case "Ended":
//       return "Зак.";
//     case "Extra inning bottom":
//       return "Доп. Ин.";
//     case "Extra inning top":
//       return "Доп. Ин.";
//     case "Extra time halftime":
//       return "Пер.";
//     case "Fifth break":
//       return "5 Пер.";
//     case "First break":
//       return "1 Пер.";
//     case "First innings, away team":
//       return "1 Ин. 2";
//     case "First innings, home team":
//       return "1 Ин. 1";
//     case "Fourth break":
//       return "4 Пер.";
//     case "Golden set":
//       return "ЗС";
//     case "Halftime":
//       return "Пер.";
//     case "In progress":
//       return "Игра";
//     case "Innings break":
//       return "Пер.";
//     case "Interrupted":
//       return "Прерв.";
//     case "Lunch break":
//       return "Пер.";
//     case "Overtime":
//       return "ОТ";
//     case "Penalties":
//       return "Пен.";
//     case "Player 1 defaulted, player 2 won":
//       return "1 ТП";
//     case "Player 1 retired, player 2 won":
//       return "1 Сн.";
//     case "Player 2 defaulted, player 1 won":
//       return "2 ТП";
//     case "Player 2 retired, player 1 won":
//       return "2 Сн.";
//     case "Postponed":
//       return "Отл.";
//     case "Second break":
//       return "2 Пер.";
//     case "Second innings, away team":
//       return "2 Ин. ";
//     case "Second innings, home team":
//       return "2 Ин. 1";
//     case "Sixth break":
//       return "6 Пер.";
//     case "Start delayed":
//       return "Отл.";
//     case "Stumps":
//       return "Бит.";
//     case "Sudden death":
//       return "МС";
//     case "Super over break":
//       return "Пер.";
//     case "Super over, away team":
//       return "СФ 2";
//     case "Super over, home team":
//       return "СФ 1";
//     case "Tea break":
//       return "Пер.";
//     case "Third break":
//       return "3 Пер.";
//     case "Walkover, player 1 won":
//       return "1 Поб.";
//     case "Walkover, player 2 won":
//       return "2 Поб.";
//     default:
//       return "";
//   }
// };

// // -------- COUPON ---------
// export const getDefaultOpenValue = () => {
//   const w = window.innerWidth;
//   if (w >= 1024) {
//     return true;
//   }
//   return false;
// };

// export const getDataForSendTicket = state => {
//   const {
//     ordinars,
//     coefs,
//     inputValues,
//     maxPay,
//     ordinarsInfo,
//     system,
//     multibetsInfo,
//     couponBuilder
//   } = state.coupon;
//   const { lines, linesByCK, events } = state.server.eventsAndLines;
//   const builderCoef = state.server.builderInfo.builderCoef;
//   const getMaxSum = (maxPay, coef) =>
//     maxPay ? Math.floor(maxPay / (coef - 1)) : Infinity;

//   const isOrdinarValid = (value, coefArg, line, event) => {
//     if (isLineBlocked(line, event)) return false;
//     // if (value < MIN_SUM_INPUT) return false;
//     // const coef = coefArg && coefArg !== "-" ? coefArg : 0;
//     // const maxSum = getMaxSum(maxPay, coef);
//     // if (value > maxSum) return false;
//     return true;
//   };

//   const isBlockMultibets = () => {
//     return (
//       multibetsInfo.isBlocked ||
//       multibetsInfo.isExccedMaxCount ||
//       multibetsInfo.isOrdinarsFromOneEvent
//     );
//   };

//   const getLineByCK = compoundKey => {
//     const lineId = linesByCK.get(compoundKey);
//     if (!lineId) return null;
//     return lines.get(lineId);
//   };

//   const getBuilder = () => {
//     if (!couponBuilder) return null;
//     const event = events.get(couponBuilder.event);
//     if (!event) return null;
//     const isValidBuilder = [...couponBuilder.bets.values()].every(bet =>
//       getLineByCK(bet.compoundKey)
//     );
//     if (!isValidBuilder) return null;

//     return {
//       stake: inputValues.builder ? +inputValues.builder : 0,
//       odd: builderCoef,
//       outcomes: [...couponBuilder.bets.values()].map(bet => {
//         const line = getLineByCK(bet.compoundKey);
//         const odd = line.outcomeOdds[line.outcomeId.indexOf(+bet.outcomeId)];
//         return {
//           compoundKey: bet.compoundKey,
//           outcomeId: +bet.outcomeId,
//           odd,
//           lineTypeRadar: line.lineTypeRadar
//         };
//       })
//     };
//   };

//   const getExpress = () => {
//     return {
//       sum: !isBlockMultibets() && inputValues.express ? +inputValues.express : 0
//     };
//   };

//   const getSystem = () => {
//     const isBlocked = isBlockMultibets();
//     return {
//       sum: !isBlocked && inputValues.system ? +inputValues.system : 0,
//       rang: !isBlocked && inputValues.system ? system.rang : 0
//     };
//   };

//   const isMultibets = () => {
//     return isBlockMultibets()
//       ? false
//       : !!inputValues.system || !!inputValues.express;
//   };

//   const getOrdinars = () => {
//     let result = [...ordinars];
//     if (!isMultibets())
//       result = [...result].filter(ord =>
//         inputValues.ordinars.has(ord.compoundKey + "-" + ord.outcomeId)
//       );
//     return result
//       .map(ord => {
//         return {
//           compoundKey: ord.compoundKey,
//           outcomeId: ord.outcomeId,
//           outcomeOdds: coefs.ordinars.get(
//             ord.compoundKey + "-" + ord.outcomeId
//           ),
//           sum: inputValues.ordinars.has(ord.compoundKey + "-" + ord.outcomeId)
//             ? +inputValues.ordinars.get(ord.compoundKey + "-" + ord.outcomeId)
//             : 0,
//           lineTypeRadar: ordinarsInfo.get(ord.compoundKey).line.lineTypeRadar,
//           line: {
//             ...lines.get(ordinarsInfo.get(ord.compoundKey).line.id)
//           },
//           event: {
//             ...events.get(ordinarsInfo.get(ord.compoundKey).event.id)
//           }
//         };
//       })
//       .filter(ord =>
//         isOrdinarValid(ord.sum, ord.outcomeOdds, ord.line, ord.event)
//       );
//   };

//   const ordinarsData = getOrdinars();
//   const expressData = getExpress();
//   const systemData = getSystem();
//   const builderData = getBuilder();

//   const result = new Map([
//     ["ordinars", ordinarsData],
//     ["express", expressData],
//     ["system", systemData],
//     ["builder", builderData]
//   ]);
//   return result;
// };

// export const getDataForSendFastBet = (line, outcomeId, store) => {
//   const getExpress = () => {
//     return {
//       sum: 0
//     };
//   };

//   const getSystem = () => {
//     return {
//       sum: 0,
//       rang: 0
//     };
//   };

//   const getOrdinars = () => {
//     const events = store.server.eventsAndLines.events;
//     const settings = store.coupon.settings;
//     const result = [];
//     result.push({
//       compoundKey: line.compoundKey,
//       outcomeId: outcomeId,
//       outcomeOdds: getCoef(line, outcomeId, 0),
//       sum: settings.fastBet,
//       lineTypeRadar: line.lineTypeRadar,
//       line,
//       event: events.get(line.eventId)
//     });
//     return result;
//   };

//   const ordinarsData = getOrdinars();
//   const expressData = getExpress();
//   const systemData = getSystem();

//   const result = new Map([
//     ["ordinars", ordinarsData],
//     ["express", expressData],
//     ["system", systemData]
//   ]);

//   return result;
// };

// const getStructuredAcception = (response, sendingData) => {
//   let ordIndex = 0;
//   let sum = 0;
//   const ordinars = [...sendingData.get("ordinars")].filter(
//     ord => ord.sum !== 0
//   );
//   const ordinarsAcception = new Map();
//   let answerMap = new Map([
//     ["express", null],
//     ["system", null],
//     ["builder", null]
//   ]);
//   response.forEach(r => {
//     sum += r;
//     if (sendingData.get("builder") && answerMap.get("builder") === null) {
//       answerMap.set("builder", r);
//       return;
//     }
//     if (ordIndex < ordinars.length) {
//       const ordinar = ordinars[ordIndex];
//       ordinarsAcception.set(ordinar.compoundKey + "-" + ordinar.outcomeId, r);
//       ordIndex++;
//       return;
//     }
//     if (
//       sendingData.get("express").sum !== 0 &&
//       answerMap.get("express") === null
//     ) {
//       answerMap.set("express", r);
//       return;
//     }
//     if (
//       sendingData.get("system").sum !== 0 &&
//       answerMap.get("system") === null
//     ) {
//       answerMap.set("system", r);
//       return;
//     }
//   });
//   answerMap.set("ordinars", ordinarsAcception);
//   answerMap.set("total", sum);
//   return answerMap;
// };

// export const acceptNewBets = (response, mainResponse, state, dispatch) => {
//   dispatch(addSendingData(null));

//   const isFail = response.every(r => r !== 0);
//   if (isFail || mainResponse < 0) {
//     return dispatch(
//       showModal({
//         text: getTicketTextError(mainResponse)
//       })
//     );
//   }
//   const sendingData = new Map(state.coupon.sendingData);

//   if (!sendingData || sendingData.size === 0)
//     return acceptFastBet(mainResponse, dispatch);
//   const structuredAcception = getStructuredAcception(response, sendingData);
//   const language = getState().user.language_user.dict;
//   if (structuredAcception.get("total") === 0) {
//     dispatch(
//       showModal({
//         text: language.modal.betAccepted
//       })
//     );
//   } else {
//     dispatch(
//       showModal({
//         text: language.modal.partbetNotAccepted
//       })
//     );
//   }

//   if (structuredAcception.get("builder") === 0)
//     dispatch(sendCouponBuilder(null));

//   let isMustDeleteOrdinars = true;

//   if (
//     structuredAcception.get("express") !== null ||
//     structuredAcception.get("system") !== null
//   ) {
//     if (
//       (structuredAcception.get("express") === null ||
//         structuredAcception.get("express") === 0) &&
//       (structuredAcception.get("system") === null ||
//         structuredAcception.get("system") === 0) &&
//       structuredAcception.get("total") === 0
//     )
//       return dispatch(clearCoupon());
//     else isMustDeleteOrdinars = false;
//     if (structuredAcception.get("express") === 0)
//       dispatch(setSumInputExpress(""));
//     if (structuredAcception.get("system") === 0)
//       dispatch(setSumInputSystem(""));
//   }

//   if (
//     structuredAcception.get("total") === 0 &&
//     structuredAcception.get("ordinars").size === state.coupon.ordinars.length
//   )
//     return dispatch(clearCoupon());

//   structuredAcception.get("ordinars").forEach((acception, key) => {
//     if (acception === 0) {
//       if (isMustDeleteOrdinars) {
//         const ordinar = state.coupon.ordinars.find(
//           ord =>
//             ord.compoundKey === key.split("-")[0] &&
//             ord.outcomeId === +key.split("-")[1]
//         );
//         const line = state.coupon.ordinarsInfo.get(ordinar.compoundKey).line;
//         dispatch(toggleOutcome(line, ordinar.outcomeId));
//       } else {
//         dispatch(setSumInputOrdinar("", key));
//       }
//     }
//   });
// };

// export const acceptCashout = (response, state, dispatch) => {
//   dispatch(removePreloaderTicket());
//   const language = getState().user.language_user.dict;
//   if (response === 0) {
//     return dispatch(
//       showModal({
//         text: language.modal.buyoutBet
//       })
//     );
//   } else {
//     return dispatch(
//       showModal({
//         text: getTicketTextError(response)
//       })
//     );
//   }
// };

// export const acceptTicket = (response, mainResponse, state, dispatch) => {
//   const sendingType = state.coupon.sendingTicketType;
//   switch (sendingType) {
//     case 1:
//       acceptNewBets(response, mainResponse, state, dispatch);
//       break;
//     case 2:
//       acceptCashout(mainResponse, state, dispatch);
//     default:
//       break;
//   }
//   dispatch(setTypeSendingTicket(null));
// };

// const acceptFastBet = (response, dispatch) => {
//   const language = getState().user.language_user.dict;
//   if (response === 0)
//     return dispatch(
//       showModal({
//         text: language.modal.betAccepted
//       })
//     );
//   else if (response < 0)
//     return dispatch(
//       showModal({
//         text: getTicketTextError(response)
//       })
//     );
// };

// export const getTicketTextError = code => {
//   const language = getState().user.language_user.dict;
//   switch (code) {
//     case -1:
//       return language.modal.code_1_2; //В момент получения купона линия не найдена
//     case -2:
//       return language.modal.code_1_2; // В момент получения купона линия не активна
//     case -3:
//       return language.modal.code_3; //Сумма ставки больше баланса
//     case -5:
//       return language.modal.code_5; //Исход с таким outcome_id не найден в этой линии
//     case -6:
//       return language.modal.code_6_7; //Коэффициент поднялся
//     case -7:
//       return language.modal.code_6_7; //Коэффициент опустился
//     case -8:
//       return language.modal.code_8; // Клиент не залогинен
//     case -9:
//       return language.modal.code_9; //Битые данные в купоне (например, больше 20 событий, отрицательная сумма и т.п.)
//     case -11:
//       return language.modal.code_11; //Изменился счет в матче во время ставки
//     case -12:
//       return language.modal.code_12; //Событие не найдено или уже закончилось
//     case -13:
//       return language.modal.code_13; //Или линия не активна, или коэффициент изменился во время ставки, или линия удалилась во время ставки –
//     case -17:
//       return language.modal.code_17; //Коэффициент BetBuilder на сервере <=1
//     case -18:
//       return language.modal.code_18; //Превышен максимум ставки
//     case -19:
//       return language.modal.code_19; //Ни одной ставки с суммой больше 0
//     case -20:
//       return language.modal.code_20; //Битые данные в cashout
//     case -21:
//       return language.modal.code_5_21; //Неправильный ticket_id в cashout
//     case -22:
//       return language.modal.code_22_23; //Ставка выкупается от другого клиента
//     case -23:
//       return language.modal.code_22_23; //Сумма выкупа = 0
//     case -24:
//       return language.modal.code_24_25; //Сумма вывода + сумма остатка не соответствует полному выкупу
//     case -25:
//       return language.modal.code_24_25; //Ошибка с выкупом ставки (сумма вывода больше суммы полного выкупа)
//     case -27:
//       return language.modal.code_27; //Сумма редактируемой ставки превышает сумму выкупа
//     case -40:
//       return language.modal.code_40; //Неправильные данные BetBuilder
//     case -50:
//       return language.modal.code_50; //Выкуп на ставку, сделанную с бонусного счета
//     case -60:
//       return language.modal.code_60_61_62; //BetRadar не работает
//     case -61:
//       return language.modal.code_60_61_62; //Sporting Solutions не работает
//     case -62:
//       return language.modal.code_60_61_62; //BetGenius не работает
//     case -65:
//       return language.modal.code_65; //Экспресс с двумя одинаковыми событиями
//     default:
//       return language.modal.code_5_21;
//   }
// };
