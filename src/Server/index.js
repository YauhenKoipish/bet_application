import C from "../Constants/";
import { setStateLoadData } from "../Actions/Components/Server/";

import { createSocket } from "../Components/Socket/";

import { deleteEvent } from "../Actions/Components/Server/Case2/";
import { deleteOrPauseEvent } from "../Actions/Components/Server/Case8/";

import {
  error_code_phone_registration,
  no_use_phone_registration,
  no_use_data_registration,
  seccuess_registration,
  no_use_email_registration,
  no_use_login_registration,
  loader_registration_action
} from "../Actions/Components/Registraion/";
import {
  saveTickets,
  saveBalanceToState,
  saveOperationsToState,
  errorAuthorize,
  sendCodeNumberLogin,
  sendCode,
  changePswMyAccount,
  faillchangePsw,
  authorize_recover_password
} from "../Actions/Components/User/";

import {
  stepInputCode,
  successChangePsw,
  error_date_recover_psw,
  smsCodeValid
} from "../Actions/Components/RecoverPsw/";

import { betStop } from "../Actions/Components/Server/Case9/";
import { dispatch, getState } from "../";
import {
  getValidOdd,
  getCompoundKey,
  mergeEvents,
  getProvider,
  getMarket,
  getLineType,
  isLineBlocked,
  getDataForSendTicket,
  acceptTicket,
  getDataForSendFastBet,
  parseMap,
  getArrayEventsForRequestExtralines,
  requestNextExtraline,
  saveNewBetEditingTicket,
  removeInvalidEventsFromFav
} from "../Services/Shared";
import {
  addOrdinarToCoupon,
  removeOrdinarFromCoupon,
  addOrdinarInfo,
  removeOrdinarInfo,
  addResponseTicket,
  toggleOutcome,
  setSumInputExpress,
  setSumInputOrdinar,
  setSumInputSystem,
  rememberOrdinars,
  addOrdinarsToCoupon
} from "../Actions/Components/Coupon/";
import { paintingDictionary } from "../Actions/Components/Painting/";

import { getLocalStorageData, setLocalStorage } from "../Services/LocalStorage";
// actionCreators для case 1
import {
  saveSportEntity,
  saveCategoryEntity,
  saveTournamentEntity,
  saveMarketEntity,
  saveMarketByNumEntity
} from "../Actions/Components/Server/Case1/";
// actionCreators для case 2
import {
  saveEvents,
  saveEventsByGB,
  saveLines,
  saveLinesByCK,
  saveExtralinesArrayNeedToRequest
} from "../Actions/Components/Server/Case2/";
//actionCreators для case 3
import {
  saveUser,
  authorizeSuccsess,
  authorizeResponse
} from "../Actions/Components/Server/Case3/";
//actionCreators для case 15
import {
  saveCoefbuilder,
  errorModalBB
} from "../Actions/Components/Server/Case15/";
//actionCreators для case 16
import {
  saveMaxPayCoupon,
  addSendingData,
  setTypeSendingTicket,
  closeCoupon
} from "../Actions/Components/Coupon/";

import {
  saveMaxPayEditingTicket,
  calculateBet,
  calculateTicket
} from "../Actions/Components/Tickets/";
import { saveCurrentUrl } from "../Actions/Components/Navigation";

//actionCreators для Верификации

import {
  updateCallMeResponseVerification,
  updateIndentComponentVerification,
  updateDocumentsComponentVerification
} from "../Actions/Components/Verification/";

//actionCreators для ввода - вывода
import {
  changeStateConnectReplenishmentChanels,
  changeStateConnectWithdrawalChanels,
  changeReplenishmentChanels,
  changeWithdrawalChanels
} from "../Actions/Components/Cupis/";
//actionCreators бонуса на депозит
import { addResponseEndingBonusOnDeposit } from "../Actions/Components/BonusOnDeposit/";
import { getLanguage } from "../Services/SettingLanguage";
// ----------------------------------------------------- middlewares --------------------------------------

// export const reconnect = store => next => action => {
//   if (action.type === C.SOCKET_CLOSE) {
//     setTimeout(() => connectServer()(dispatch), 500);
//   }
//   return next(action);
// };

// export const writeNewEvent = store => next => action => {
//   if (action.type === C.SOCKET_CLOSE) {
//     setTimeout(() => connectServer()(dispatch), 500);
//   }
//   return next(action);
// };

export const routing = store => next => action => {
  if (action.type === C.ROUTING) {
    next(saveCurrentUrl(window.location.pathname));
    return next(action);
  }
  return next(action);
};

export const couponMiddleware = store => next => action => {
  if (action.type === C.COUPON_TOGGLE_OUTCOME) {
    const { line, outcomeId } = action;
    if (!line || (!outcomeId && outcomeId !== 0)) return;
    const currentLine = store
      .getState()
      .server.eventsAndLines.lines.get(line.id);
    // if (!currentLine) return;
    const outcomeIndex = line.outcomeId.indexOf(outcomeId);
    if (!currentLine.outcomeActive) debugger; // падает прилага првоерить!!!!!!!!!!!
    if (currentLine.outcomeActive && !currentLine.outcomeActive[outcomeIndex])
      return;
    const editingTicket = store.getState().tickets.editingTicket;
    const settings = store.getState().coupon.settings;
    const event = store
      .getState()
      .server.eventsAndLines.events.get(line.eventId);

    // если ставка редактируется,добавить в редактируемый тикет
    if (editingTicket) {
      if (event && !isLineBlocked(line, event)) {
        return saveNewBetEditingTicket(line, outcomeId);
      }
    }

    // если в настройках быстрая ставка
    if (settings.fastBet) return sendFastBet(action, getState(), dispatch);

    //добавление в купон
    const ordinars = store.getState().coupon.ordinars;
    const isOrdinarInState = ordinars.some(
      or => or.compoundKey === line.compoundKey && or.outcomeId === outcomeId
    );
    updateOrdinarInfo(isOrdinarInState, line, event, ordinars, next);
    if (!event || isLineBlocked(line, event)) {
      if (isOrdinarInState) {
        return next(removeOrdinarFromCoupon(line.compoundKey, outcomeId));
      }
      return;
    }
    return isOrdinarInState
      ? next(removeOrdinarFromCoupon(line.compoundKey, outcomeId))
      : next(addOrdinarToCoupon(line.compoundKey, outcomeId));
  } else if (action.type === C.SEND_TICKET) {
    const data = getDataForSendTicket(store.getState());
    next(addSendingData(data));
    dispatch(setTypeSendingTicket(1));
    sendTicket(data);
    return;
  } else if (action.type === C.ADD_RESPONSE_TICKET) {
    acceptTicket(action.response, action.mainResponse, getState(), dispatch);
    return;
  } else if (action.type === C.DO_CASHOUT) {
    dispatch(setTypeSendingTicket(2));
    sendTicket(null, action.data);
    return;
  } else if (action.type === C.SAVE_CHANGES_TICKET) {
    dispatch(setTypeSendingTicket(3));
    sendTicket(action.data.ticket, action.data.cashout);
    return;
  } else if (action.type === C.GET_EXTRALINE) {
    if (store.getState().server.reqExtraLines.includes(action.id)) return;
    next(action);
    getExtralines(action.id);
    return;
  }
  if (
    action.type === C.REMOVE_ORDINAR_FROM_COUPON ||
    action.type === C.CLEAR_COUPON
  ) {
    next(action);
    if (store.getState().coupon.ordinars.length === 0) {
      dispatch(closeCoupon());
    }
    return;
  }
  if (action.type === C.ADD_EDITING_TICKET) {
    next(action);
    const state = store.getState();
    const ordinarsInCoupon = state.coupon.ordinars;
    const rememberedOrdinars = state.coupon.rememberedOrdinars;
    const ordinarsEditingTicket = state.tickets.editingTicket
      ? [...state.tickets.editingTicket.bets.values()].map(bet => {
          return {
            compoundKey: bet.compoundKey,
            outcomeId: bet.outcomeId
          };
        })
      : [];
    if (action.ticket !== null) {
      dispatch(rememberOrdinars(ordinarsInCoupon));
      dispatch(addOrdinarsToCoupon(ordinarsEditingTicket));
    } else {
      dispatch(rememberOrdinars([]));
      dispatch(addOrdinarsToCoupon(rememberedOrdinars));
    }
    return;
  }
  if (action.type === C.ADD_BETS_EDITING_TICKET) {
    next(action);
    const ordinarsEditingTicket = [...action.bets.values()].map(bet => {
      return {
        compoundKey: bet.compoundKey,
        outcomeId: bet.outcomeId
      };
    });
    dispatch(addOrdinarsToCoupon(ordinarsEditingTicket));
  }
  return next(action);
};

const updateOrdinarInfo = (
  isOrdinarInState,
  line,
  event,
  ordinars,
  dispatch
) => {
  if (isOrdinarInState) {
    let count = 0;
    const isNotLastOrdinarWithLine = ordinars.some(ord => {
      if (ord.compoundKey === line.compoundKey) count++;
      if (count > 1) return true;
      return false;
    });
    if (!isNotLastOrdinarWithLine) {
      dispatch(removeOrdinarInfo(line.compoundKey));
    }
  } else {
    dispatch(addOrdinarInfo({ ...line }, { ...event }));
  }
};

const addInputValuesToCoupon = () => {
  const inputValues = getLocalStorageData("couponInputValues");
  if (!inputValues || inputValues.length === 0) return;

  if (inputValues.ordinars && inputValues.ordinars.length !== 0) {
    const ordinars = parseMap(inputValues.ordinars);
    ordinars.forEach((sum, key) => {
      dispatch(setSumInputOrdinar(sum, key));
    });
  }
  if (inputValues.express && inputValues.express !== null) {
    dispatch(setSumInputExpress(inputValues.express));
  }
  if (inputValues.system && inputValues.system !== null) {
    console.log(inputValues.system);
    dispatch(setSumInputSystem(inputValues.system));
  }
};

const addOrdinarsToCouponOnLoad = () => {
  const ordinars = getLocalStorageData("coupon");
  const inputValues = getState().coupon.inputValues;
  if (inputValues) {
    const ords =
      ordinars && ordinars.length !== 0 ? ordinars : getState().coupon.ordinars;
    const newInputValuesOrd = new Map();
    inputValues.ordinars.forEach((ord, key) => {
      const isOrdInOrdinars = ords.find(
        o => key === o.compoundKey + "-" + o.outcomeId
      );
      if (isOrdInOrdinars) {
        newInputValuesOrd.set(key, ord);
      }
    });
    inputValues.ordinars = newInputValuesOrd;
  }
  if (!ordinars || ordinars.length === 0) return;

  ordinars.forEach(ord => {
    const lineId = getState().server.eventsAndLines.linesByCK.get(
      ord.compoundKey
    );
    if (!lineId) return;

    const line = getState().server.eventsAndLines.lines.get(lineId);
    if (!line) return;
    dispatch(toggleOutcome(line, ord.outcomeId));
  });
  addInputValuesToCoupon();
};

const getLineByCK = compoundKey => {
  const linesByCk = getState().server.eventsAndLines.linesByCK;
  const lines = getState().server.eventsAndLines.lines;
  const lineId = linesByCk.get(compoundKey);
  if (!lineId) return null;
  const line = lines.get(lineId);
  return line;
};

const sendFastBet = (action, store, dispatch) => {
  const { line, outcomeId } = action;
  const event = store.server.eventsAndLines.events.get(line.eventId);
  if (!event || isLineBlocked(line, event)) return;

  const data = getDataForSendFastBet(line, outcomeId, store);
  dispatch(setTypeSendingTicket(1));
  sendTicket(data);
};

// if (action.type === C.DELETE_OR_PAUSE_EVENT) {
// const event = action.eventsMap.get(action.eventId);
// if (!event) return state;
// if (event.status === 0) {
//     console.log("Удаление из reducer" + action.eventId);
//     action.eventsMap.delete(action.eventId);
//     return new Map(action.eventsMap);
//     } else if (event.status > 0) {
//         event.isLinesBlocked = true;
//         return new Map([[action.eventId, event]]);
//     }
// }
// if (action.type === C.BET_STOP) {
//     let noUpdate = false;
//     action.eventsMap.forEach(ev => {
//         if (ev.provider === action.data.providerId) {
//             if (
//                 action.data.providerId === 2 ||
//                 action.data.providerId === 3
//             ) {
//                 if (action.data.isBetStop) action.eventsMap.delete(ev.id);
//                 else noUpdate = true;
//             } else {
//                 if (action.data.isBetStop) ev.isBetStop = true;
//                 else ev.isBetStop = false;
//             }
//         }
//     });
//     if (noUpdate) return state;
//     return new Map(action.eventsMap);
// }

export const deleteLines = event => {
  if (!event) return;
  const eventsMap = getState().server.eventsAndLines.events;
  const lines = getState().server.eventsAndLines.lines;
  event = eventsMap.get(event.id) || event;
  event.lines.forEach(line => {
    lines.delete(line.id);
  });
};

export const addEventsInActionDeleteOrPauseEvent = store => next => action => {
  if (action.type === C.SAVE_EVENTS) {
    const eventsMap = store.getState().server.eventsAndLines.events;
    action.lines = store.getState().server.eventsAndLines.lines;
    action.linesByCK = store.getState().server.eventsAndLines.linesByCK;
    const nextAction = next(action);
    action.events.forEach((val, key) => {
      if (val.status === -1 || val.status === 3 || val.status === 4) {
        // console.log("----------Удаление из case 2----------");
        // console.log("eventId - " + val.id);
        next(deleteEvent({ ...val }));
        deleteLines(val);
        eventsMap.delete(val);
      } else if (store.getState().server.eventsAndLines.deletedEvent) {
        next(deleteEvent(null));
      }
    });
    return nextAction;
  }
  if (action.type === C.DELETE_OR_PAUSE_EVENT) {
    const eventsMap = store.getState().server.eventsAndLines.events;
    const linesMap = store.getState().server.eventsAndLines.lines;
    // action.eventsMap = eventsMap;
    // const nextAction = next(action);
    const event = eventsMap.get(action.eventId);
    const events = new Map();
    if (event) {
      if (event.status === 0) {
        // console.log("----------Удаление из case 8----------");
        // console.log("eventId - " + event.id);
        next(deleteEvent({ ...event }));
        deleteLines(event);
        eventsMap.delete(event.id);
      } else if (event.status === 1) {
        const newEvent = { ...event };
        newEvent.lines.forEach(line => {
          const lineFromMainMap = linesMap.get(line.id);
          if (!lineFromMainMap) {
            console.error("нет линии в мапе линий, а в событии есть");
            return;
          }
          lineFromMainMap.isLineBlocked = true;
          line.isLineBlocked = true;
        });
        events.set(event.id, newEvent);
      }
      if (events.size > 0) dispatch(saveEvents(events, eventsMap));
    }
    return;
  } else if (action.type === C.BET_STOP) {
    const eventsMap = store.getState().server.eventsAndLines.events;
    // action.eventsMap = eventsMap;
    // const nextAction = next(action);
    const events = new Map();
    eventsMap.forEach(ev => {
      if (ev.provider === action.data.providerId) {
        if (action.data.providerId === 2 || action.data.providerId === 3) {
          if (action.data.isBetStop) {
            setTimeout(() => dispatch(deleteEvent({ ...ev })), 0);

            deleteLines(ev);

            eventsMap.delete(ev.id);
          }
        } else {
          events.set(ev.id, {
            ...ev,
            isBetStop: !!action.data.isBetStop
          });
        }
      }
    });
    // console.log(events);
    // window.debugEvents = events;
    if (events.size > 0) dispatch(saveEvents(events, eventsMap));
    return;
  }
  return next(action);
};
// ---------------------------------------------------------------------------------------------------

export const decode = (stream, step) => {
  let isAnswerGetInCase4 = false;
  switch (step) {
    case 1:
      handleEntities(stream);
      break;
    case 2:
      handleEventWithLines(stream);
      break;
    case 3:
      handleAuthorizationResponse(stream);
      break;
    case 4:
      isAnswerGetInCase4 = true;
      handleBetsAcceptionResponse(stream, true);
    case 14:
      if (!isAnswerGetInCase4) handleBetsAcceptionResponse(stream, false);
      isAnswerGetInCase4 = false;
      break;
    case 5:
      handleTicketsByDateResponse(stream);
      break;
    case 6:
      handleBetResult(stream);
      break;
    case 7:
      handleTicketResult(stream);
      break;
    case 8:
      handleEventsChanges(stream);
      break;
    case 9:
      handleBetStop(stream);
      break;
    case 10:
      handleRegistrationResponce(stream);
      break;
    case 13:
      handleUserAccountInfo(stream);
      break;
    case 15:
      handleBetBuilderResponse(stream);
      break;
    case 16:
      console.log(123);
      handleMaxPayoutResponse(stream);
      break;
    case 20:
      handleOperationsByDateResponse(stream);
      break;
    case 21:
      handleOperations(stream);
      break;
    case 22:
      handlePromotionFinishingRequest(stream);
      break;
    case 200:
      handleDocumentsComponent(stream);
      break;
    case 201:
      handleIdentComponent(stream);
      break;
    case 203:
      handleCallMeResponse(stream);
      break;
    case 210:
      handleReplenishmentResponse(stream);
      break;
    case 211:
      handleReplenishmentChannels(stream);
      break;
    case 220:
      handleWithdrawalResponse(stream);
      break;
    case 221:
      handleWithdrawChannels(stream);
      break;
    default:
      return;
  }
};

// ----------------------------------------------------- начальные переменные ------------------------------------------

let seek = 0;
let sendarray = [];
let sendindex = 0;

//  ----------------------------------------------------- case 1 -----------------------------------------------------
//  ------------------------------------------Получение статических сущностей--------------------------------------------

const handleEntities = stream => {
  seek = 0;
  readUnsignedByte(stream); //request_id

  const sports = handleEntitiesSports(stream);
  if (sports.size !== 0) dispatch(saveSportEntity(sports));

  const categories = handleEntitiesCategories(stream);
  if (categories.size !== 0) dispatch(saveCategoryEntity(categories));

  const tournaments = handleEntitiesTournaments(stream);
  if (tournaments.size !== 0) dispatch(saveTournamentEntity(tournaments));

  const markets = handleEntitiesMarkets(stream);
  if (markets.size !== 0) {
    dispatch(saveMarketEntity(markets));
    dispatch(saveMarketByNumEntity(markets));
  }
};

const handleEntitiesSports = stream => {
  const sports = new Map();
  const sportsNumber = readUnsignedShort(stream);
  for (let i = 0; i < sportsNumber; i++) {
    let data = {};
    data.id = readUnsignedShort(stream);
    data.sortId = readUnsignedByte(stream) || data.sportId;
    data.name = readUTF(stream);

    if (data.id >= 2000) data.name += "-1";
    sports.set(data.id, data);
  }
  return sports;
};

const handleEntitiesCategories = stream => {
  const categories = new Map();
  const categoriesNumber = readUnsignedShort(stream);
  for (let i = 0; i < categoriesNumber; i++) {
    let data = {};
    data.id = readUnsignedShort(stream);
    data.sportId = readUnsignedShort(stream);
    data.sortId = readUnsignedShort(stream);
    data.isOutright = readUnsignedByte(stream);
    data.name = readUTF(stream);
    const lang = getState().user.language_user.value;

    // if (lang === "en") {
    //   if (name.includes("@")) data.name = name.split("@")[0].replace("#", "");
    //   else data.name = name;
    // } else {
    //   if (name.includes("@")) data.name = name.split("@")[1].replace("#", "");
    //   else data.name = name;
    // }
    categories.set(data.id, data);
  }
  return categories;
};

const handleEntitiesTournaments = stream => {
  const tournaments = new Map();
  const tournamentsNumber = readUnsignedShort(stream);
  for (let i = 0; i < tournamentsNumber; i++) {
    let data = {};
    data.typeRadar = readUnsignedByte(stream); // 0 - tournamnets 2- simple_tournaments 1- race_tournaments
    data.id =
      (data.typeRadar < 10 ? "0" : "") +
      data.typeRadar +
      readUnsignedInt(stream);
    data.seasonId = readUnsignedInt(stream);
    data.sportId = readUnsignedShort(stream);
    data.categoryId = readUnsignedShort(stream);
    data.sortId = readUnsignedShort(stream);

    data.name = readUTF(stream);
    // if (name.includes("@")) {
    //   const lang = getState().user.language_user.value;
    //   if (lang === "en") {
    //     data.name = name.split("@")[0].replace("#", "");
    //   } else {
    //     data.name = name.split("@")[1].replace("#", "");
    //   }
    // } else data.name = name;

    tournaments.set(data.id, data);
  }
  return tournaments;
};

const handleEntitiesMarkets = stream => {
  // const markets = []

  const markets = new Map();
  const marketsNumber = readUnsignedShort(stream);
  for (let i = 0; i < marketsNumber; i++) {
    let data = {};
    data.id = readUnsignedShort(stream);
    // bet radar
    if (data.id < 10000) {
      data.provider = 0;
      data.providerName = "Radar";
      data.objectId = data.id;
    }
    // sporting solution
    else if (data.id >= 10000 && data.id < 15000) {
      data.provider = 1;
      data.providerName = "SSLN";
      data.objectId = readUTF(stream);
    } else if (data.id >= 15000 && data.id < 20000) {
      data.provider = 1;
      data.providerName = "SSLN";
      data.objectId = readUnsignedShort(stream);
    }
    // bet genius
    else if (data.id >= 20000 && data.id < 30000) {
      data.provider = 2;
      data.providerName = "Genius";
      // debugger;
      data.objectId = readShort(stream);
    }
    // alfabet
    else if (data.id >= 30000) {
      data.provider = 3;
      data.providerName = "company";
      data.objectId = data.id;
    }
    data.type = readUnsignedByte(stream);
    data.lineType = readUnsignedByte(stream);
    data.name = readUTF(stream);
    data.variant = readByte(stream);
    data.variableText = "";
    if (data.variant > -1) data.variableText = readUTF(stream);
    data.outcomeId = [];
    data.outcomeName = [];
    let outcomeNumber = readUnsignedShort(stream);
    for (let l = 0; l < outcomeNumber; l++) {
      data.outcomeId[l] = readUnsignedInt(stream);
      data.outcomeName[l] = readUTF(stream);
    }
    data.specifierName = [];
    let specifierNumber = readUnsignedByte(stream);
    for (let l = 0; l < specifierNumber; l++)
      data.specifierName[l] = readUTF(stream);
    markets.set(
      (data.uid = data.variableText
        ? `${data.id}-${data.variableText}`
        : `${data.id}`),
      data
    );
  }
  return markets;
};

//  ----------------------------------------------------- case 2 -----------------------------------------------------
//  ------------------------------------------Обновление Событий и линий ---------------------------------------------

const handleEventWithLines = stream => {
  seek = 0;
  readUnsignedByte(stream); //request_id
  // Events loop
  let events = new Map();
  let eventsByGB = new Map();
  let lines = new Map();
  let linesByCK = new Map();

  const state = getState();
  const eventsMap = getState().server.eventsAndLines.events;
  const eventsNum = readUnsignedShort(stream); //number of events
  for (let e = 0; e < eventsNum; e++) {
    let eData = {};
    eData.lineTypeRadar = readUnsignedByte(stream);
    let objectId = readUnsignedInt(stream);
    eData.isLongTerm = false;
    if (
      eData.lineTypeRadar === 2 ||
      eData.lineTypeRadar === 3 ||
      eData.lineTypeRadar === 4 ||
      eData.lineTypeRadar === 6 ||
      eData.lineTypeRadar === 9 ||
      eData.lineTypeRadar === 10 ||
      eData.lineTypeRadar === 15 ||
      eData.lineTypeRadar === 16 ||
      eData.lineTypeRadar === 17 ||
      eData.lineTypeRadar === 18
    ) {
      eData.tournamentId = getTournamentKey(eData.lineTypeRadar, objectId);
      eData.categoryId = readShort(stream); //+
      eData.seasonName = readUTF(stream); //+
      eData.id = "" + 1000000 * eData.lineTypeRadar + objectId; //+
      eData.gbId = eData.id;
      eData.timeSpanStart = readUnsignedInt(stream) * 1000; //+
      eData.isLongTerm = true; //+
      outrightsIterator();
    }

    if (eData.lineTypeRadar >= 30) {
      eData.id = getEventKeyTypeLine(eData.lineTypeRadar - 30, objectId);
      const event = getState().server.eventsAndLines.events.get(eData.id);
      if (event) eData.gbId = event.gbId;
      else console.log("ПОСМОТРИ, ПОЧЕМУ У ТЕБЯ НЕТ СОБЫТИЯ - " + eData.id);
      if (eData.id) {
        const arrayEventsForExtraLines = getState().server
          .extralinesArrayNeedToRequest;
        requestNextExtraline(arrayEventsForExtraLines, eData.id);
      }
    }

    if (
      eData.lineTypeRadar === 0 ||
      eData.lineTypeRadar === 1 ||
      eData.lineTypeRadar === 5 ||
      eData.lineTypeRadar === 7 ||
      eData.lineTypeRadar === 8 ||
      eData.lineTypeRadar === 11 ||
      eData.lineTypeRadar === 12 ||
      eData.lineTypeRadar === 13 ||
      eData.lineTypeRadar === 14 ||
      eData.lineTypeRadar === 19 ||
      eData.lineTypeRadar === 20 ||
      eData.lineTypeRadar === 21
    ) {
      eData.betRadarId = objectId;
      eData.providerId = eData.lineTypeRadar;
      eData.provider = getProvider(eData);
      eData.id = getEventKeyTypeLine(eData.lineTypeRadar, objectId);
      if (window.debugEvent && window.debugEvent === eData.id) debugger;
      eData.homeId = readUnsignedInt(stream); //+
      eData.awayId = readUnsignedInt(stream); //+
      eData.tournamentTypeRadar = readUnsignedByte(stream); //+

      //0 sr:match //1 sr:race_event /2 sr:match in simple tournament
      eData.status = readByte(stream); //+
      //0(not started) / 1(live) / 2(suspended) 3(ended) / 4(closed) / abandoned - only one of these 6 is possible
      eData.sportId = readUnsignedShort(stream); //+
      let sportCondition = readUnsignedShort(stream);
      eData.categoryId = readUnsignedShort(stream); //+
      if (eData.tournamentTypeRadar < 10)
        eData.tournamentId = `0${eData.tournamentTypeRadar}${readUnsignedInt(
          stream
        )}`;
      else
        eData.tournamentId = `${eData.tournamentTypeRadar}${readUnsignedInt(
          stream
        )}`;
      eData.videoProviderId = readUnsignedByte(stream); //+
      if (eData.videoProviderId > 0) eData.videoId = readUTF(stream); //1
      eData.timeSpanStart = readUnsignedInt(stream) * 1000; //+
      //start_date date in sec new Date..setTime(value * 1000);
      eData.betRadarOriginalId = readUnsignedInt(stream);
      const gbId = readUnsignedInt(stream);
      eData.gbId =
        deleteGBeventIdOrReturn(gbId, eData.id, eData.status) || eData.id;
      eData.periodLength = readByte(stream); //+
      eData.overtimeLength = readUnsignedByte(stream); //+
      if ((sportCondition - 1) % 2 === 0) {
        sportCondition -= 1;
        eData.bo = readUnsignedByte(stream);
      }
      sportCondition /= 2;
      eData.homeName = readUTF(stream); //+
      eData.awayName = readUTF(stream); //+
      eData.tvChanel = readUTF(stream); //+
      if (!eData.status || eData.status === -1 || eData.status === -10)
        eData.booked = readUnsignedByte(stream);
      if (eData.status > 0 || (eData.status < -1 && eData.status > -10)) {
        eData.homeScore = readUnsignedShort(stream) / 100;
        eData.awayScore = readUnsignedShort(stream) / 100;
        eData.setScores = readUTF(stream);
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.highestBreak = readUTF(stream);
        }
        sportCondition /= 2;
        eData.matchTime = readUTF(stream); //+
        eData.remainingTime = readUTF(stream);
        eData.remainingTimeInPeriod = readUTF(stream);
        eData.matchStatus = readUTF(stream);
        eData.matchStatusId = readShort(stream);
        eData.stopped = readUnsignedByte(stream);

        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.homeRedcards = readUnsignedByte(stream);
          eData.homeYellowcards = readUnsignedByte(stream);
          eData.awayRedcards = readUnsignedByte(stream);
          eData.awayYellowcards = readUnsignedByte(stream);
          eData.stoppageTime = readUTF(stream);
          eData.stoppageTimeAnnounced = readUTF(stream);
          eData.homeCorners = readUnsignedByte(stream);
          eData.awayCorners = readUnsignedByte(stream);
          eData.homeYellowRedCards = readUnsignedByte(stream);
          eData.awayYellowRedCards = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.homeGamescore = readUnsignedByte(stream);
          eData.awayGamescore = readUnsignedByte(stream);
          eData.tiebreak = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.expediteMode = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.homeSuspend = readUnsignedByte(stream);
          eData.awaySuspend = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.currentServer = readUnsignedByte(stream); //current_server
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          eData.homeBatter = readUnsignedByte(stream);
          eData.awayBatter = readUnsignedByte(stream);
          eData.outs = readUnsignedByte(stream);
          eData.balls = readUnsignedByte(stream);
          eData.strikes = readUnsignedByte(stream);
          eData.bases = readUTF(stream);
          sportCondition -= 1;
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.possession = readUnsignedByte(stream);
          eData.tryNum = readUnsignedByte(stream);
          eData.yards = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.visit = readUnsignedByte(stream);
          eData.remainingReds = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.homeLegscore = readUnsignedByte(stream);
          eData.awayLegscore = readUnsignedByte(stream);
          eData.throwNum = readUnsignedByte(stream);
          eData.visit = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.delivery = readUnsignedByte(stream);
          eData.homeRemainingBowls = readUnsignedByte(stream);
          eData.awayRemainingBowls = readUnsignedByte(stream);
          eData.currentEnd = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.homeDismissals = readUnsignedByte(stream);
          eData.awayDismissals = readUnsignedByte(stream);
          eData.homePenaltyRuns = readUnsignedByte(stream);
          eData.awayPenaltyRuns = readUnsignedByte(stream);
          eData.innings = readUnsignedByte(stream);
          eData.over = readUnsignedByte(stream);
          eData.delivery = readUnsignedByte(stream);
        }
        sportCondition /= 2;
        if ((sportCondition - 1) % 2 === 0) {
          sportCondition -= 1;
          eData.currentCtTeam = readUnsignedByte(stream);
        }
        sportCondition /= 2;

        if ((sportCondition - 1) % 2 == 0) {
          sportCondition = sportCondition - 1;
          eData.homePoints = readUnsignedByte(stream);
          eData.awayPoints = readUnsignedByte(stream);
          eData.homeBehinds = readUnsignedByte(stream);
          eData.awayBehinds = readUnsignedByte(stream);
          eData.setPoints = readUTF(stream);
          eData.setBehinds = readUTF(stream);
        }
        sportCondition /= 2;

        eData.position = readUnsignedByte(stream);
      }
      eData.numLinesForPrematch = readUnsignedShort(stream);
      // eData.isLinesBlocked = eventsMap.has(eData.id)
      //   ? eventsMap.get(eData.id).isLinesBlocked
      //   : false;
      eData.isBetStop = eventsMap.has(eData.id)
        ? eventsMap.get(eData.id).isBetStop
        : false;
      // app.handleEvent(eData, eData.lineTypeRadar);
    }
    const eventLines = new Map();
    const eventLinesByCK = new Map();
    // Lines loop

    const sameEvent = state.server.eventsAndLines.events.get(eData.id);
    let linesNum = readUnsignedShort(stream);
    for (let l = 0; l < linesNum; l++) {
      let lData = {
        lineTypeRadar:
          eData.lineTypeRadar >= 30
            ? eData.lineTypeRadar - 30
            : eData.lineTypeRadar,
        eventId: eData.id,
        tournamentId: eData.tournamentId,
        numLinesForPrematch: eData.numLinesForPrematch
      };

      lData.id = readUnsignedInt(stream);
      lData.isLineBlocked = false;
      lData.sportId = sameEvent ? sameEvent.sportId : eData.sportId;
      lData.marketId = readUnsignedShort(stream);
      // if (
      //     lData.lineTypeRadar === 2 ||
      //     lData.lineTypeRadar === 3 ||
      //     lData.lineTypeRadar === 4 ||
      //     lData.lineTypeRadar === 6 ||
      //     lData.lineTypeRadar === 9 ||
      //     lData.lineTypeRadar === 10 ||
      //     lData.lineTypeRadar === 15 ||
      //     lData.lineTypeRadar === 16 ||
      //     lData.lineTypeRadar === 17 ||
      //     lData.lineTypeRadar === 18 ||
      //     lData.lineTypeRadar === 19 ||
      //     lData.lineTypeRadar === 20
      // )
      //     lData.compoundKey = readUTF(stream);
      let compoundKey;

      if (
        lData.marketId < 30000 &&
        (lData.lineTypeRadar === 19 ||
          lData.lineTypeRadar === 20 ||
          lData.lineTypeRadar === 21)
      )
        compoundKey = readUTF(stream);
      lData.lineType = readUnsignedByte(stream);
      lData.status = readByte(stream);
      lData.name = null;
      if (lData.lineType === 3) lData.name = readUTF(stream);

      if (
        lData.lineTypeRadar === 2 ||
        lData.lineTypeRadar === 3 ||
        lData.lineTypeRadar === 4 ||
        lData.lineTypeRadar === 6 ||
        lData.lineTypeRadar === 9 ||
        lData.lineTypeRadar === 10 ||
        lData.lineTypeRadar === 15 ||
        lData.lineTypeRadar === 16 ||
        lData.lineTypeRadar === 17 ||
        lData.lineTypeRadar === 18
      )
        lData.radarTournamentId = objectId;

      lData.outcomeNumber = readUnsignedShort(stream);
      lData.outcomeId = [];
      lData.outcomeActive = [];
      lData.outcomeTeam = [];
      lData.outcomeName = [];
      lData.outcomeOdds = [];
      for (let u = 0; u < lData.outcomeNumber; u++) {
        lData.outcomeId[u] = readUnsignedInt(stream);
        lData.outcomeActive[u] = readByte(stream);
        if (
          lData.lineType === 1 ||
          lData.lineType === 2 ||
          lData.lineType === 4
        )
          lData.outcomeTeam[u] = readUnsignedByte(stream);
        if (lData.lineType > 0) lData.outcomeName[u] = readUTF(stream);
        lData.outcomeOdds[u] = getValidOdd(readInt(stream));
        // if (lData.outcomeOdds[u] === 0) lData.status = 0;
      }
      lData.specifierNumber = readUnsignedByte(stream);
      lData.specifierValue = [];
      for (let u = 0; u < lData.specifierNumber; u++)
        lData.specifierValue[u] = readUTF(stream);
      lData.compoundKey = compoundKey;
      lData.compoundKey = getCompoundKey(lData, eData);
      lData.compoundKey = deleteCompoundKeyOrReturn(
        lData.compoundKey,
        lData.id,
        lData.status,
        eData.status === undefined && sameEvent
          ? sameEvent.status
          : eData.status
      );
      eventLines.set(lData.id, lData);
      if (lData.compoundKey) {
        lines.set(lData.id, lData);
        if (
          eData.status !== -1 &&
          lData.status !== 0 &&
          lData.status !== 3 &&
          !(lData.status < -1) &&
          lData.status !== 4
        )
          linesByCK.set(lData.compoundKey, lData.id);
      }
    } // Lines loop
    eData.lines = eventLines;
    // addLines1x2(eData);
    if (events.has(eData.id)) {
      eData = mergeEvents(
        eData,
        events.get(eData.id),
        state.server.eventsAndLines.lines,
        state.server.eventsAndLines.linesByCK
      );
    }
    events.set(eData.id, eData);
    if (eData.status !== -1) eventsByGB.set(eData.gbId, eData.id);
  } // Events loop

  // dispatch lines
  if (linesByCK.size !== 0) dispatch(saveLinesByCK(linesByCK));
  if (lines.size !== 0) dispatch(saveLines(lines));
  // dispatch events
  if (eventsByGB.size !== 0) dispatch(saveEventsByGB(eventsByGB));
  if (events.size !== 0) dispatch(saveEvents(events, eventsMap));

  if (!getState().isLoadedData) {
    dispatch(setStateLoadData(true));
    addOrdinarsToCouponOnLoad();
    removeInvalidEventsFromFav();
  }
};

const addLines1x2 = data => {
  data.lines1x2 = () => {
    const getLineType = getLineTypeFunc(
      getState().server.entities.markets,
      getState().server.entities.marketsByNum
    );
    let filterVal = getFilterVal(data.sportId);
    const lines = getState().server.eventsAndLines.events.get(data.id).lines;
    let linesV = [...lines.values()].filter(
      line => getLineType(line) === filterVal && line.status !== 0
    );
    console.log(linesV);
  };
};

const getFilterVal = sportId => {
  if (
    sportId === 1023 ||
    sportId === 1027 ||
    sportId === 1028 ||
    sportId === 1030 ||
    sportId === 1031 ||
    sportId === 1205 ||
    sportId === 1042 ||
    sportId === 1012 ||
    sportId === 1015 ||
    sportId === 1112 ||
    sportId === 1113 ||
    sportId === 1013 ||
    sportId === 1025 ||
    sportId === 1026 ||
    sportId === 1038 ||
    sportId === 1102 ||
    sportId === 1103 ||
    sportId === 1118 ||
    sportId === 1124 ||
    sportId === 1126 ||
    sportId === 1127
  )
    return 2;
  return 1;
};

const getLineTypeFunc = (markets, marketsByNum) => {
  return line => {
    const market = getMarket(line, markets, marketsByNum);
    if (!market) return null;
    return getLineType(market, line);
  };
};

//  ----------------------------------------------------- case 3 -----------------------------------------------------
//  ------------------------ Ответ на авторизацию, данные пользователя, текущие ставки -------------------------------

const handleAuthorizationResponse = stream => {
  console.log("=========case 3==========");

  seek = 0;
  readUnsignedByte(stream); //request_id

  let registrationResponse = readByte(stream);
  console.log(
    "____________ОТВЕТ НА авторизацию________ -1  не прошла",
    registrationResponse
  );
  if (registrationResponse === -1) {
    dispatch(
      errorAuthorize({
        requestId: registrationResponse
      })
    );
    if (C.APP_FLG) {
      dispatch(authorizeResponse(registrationResponse));
      C.APP_FLG = false;
    }

    return;
  }

  getUserAccountData();
  let data = {};
  data.anonymous = readUnsignedByte(stream);
  data.currency = readShort(stream);
  data.surname = readUTF(stream);
  data.name = readUTF(stream);
  data.patronymic = readUTF(stream);
  data.country = readUTF(stream);
  data.countryId = readInt(stream);
  data.city = readUTF(stream);
  data.cityId = readInt(stream);
  data.region = readUTF(stream);
  data.regionId = readInt(stream);
  data.email = readUTF(stream);
  data.birthDay = readDate(stream);
  data.login = readUTF(stream);
  data.accessToken = readUTF(stream);
  data.token2 = readUTF(stream);
  data.postalIndex = readUTF(stream);
  data.phoneNumber = readUTF(stream);
  data.address = readUTF(stream);
  data.isVerified = readInt(stream);
  // data.isVerified = true;

  console.log(data);
  console.log(registrationResponse);

  dispatch(authorizeSuccsess(data));
  dispatch(authorizeResponse(registrationResponse));
  // LocalStorage Login

  handleAuthResponse(registrationResponse, data);
  //   requestReplenishmentChannels();
  //   requestWithdrawalChannels();
  // betAutentification(); // запрос на case 13
};
//  ----------------------------------------------------- case 4 -----------------------------------------------------
//  -------------------------------------------------- Прием ставки --------------------------------------------------
const handleBetsAcceptionResponse = (stream, isMustShowModal = true) => {
  seek = 0;
  readUnsignedByte(stream); //request_id
  const response = readByte(stream); //If a negative number means some error in sending data (for example, the number of events in the coupon is greater than 20) means that the bet or all bets are not accepted.
  console.log("response: " + response);
  if (response < 0) {
    if (isMustShowModal) dispatch(addResponseTicket([], response));
    return;
  }
  const accountData = readBalance(stream);
  dispatch(saveBalanceToState(accountData));
  // app.client.updateBalance(accountData);
  const isCashout = readByte(stream);
  // Ticket.case = 4;
  let ticketWithCashout = null;
  if (isCashout) {
    ticketWithCashout = readTicket(stream, true);
    const tickets = new Map();
    tickets.set(ticketWithCashout.ticketId, ticketWithCashout);
    dispatch(saveTickets(tickets));
  }
  const ticketNumber = readUnsignedByte(stream);
  const responseArray = [];
  const tickets = new Map();
  for (let i = 0; i < ticketNumber; i++) {
    const acceptionStatus = readShort(stream);
    // (ticket. acceptionStatus), -

    /**
     *  0 everything is normal,
     *  -6-7 odd odds do not match odd on the server (so the client did not tick any_koeff
     * -3 the amount of the bet is greater than the balance
     * -4 the bet amount less than the minimum allowed
     *  5 the amount of the bet exceeds the maximum allowed
     */
    console.log("acceptionStatus: ", acceptionStatus);
    responseArray.push(acceptionStatus);
    if (acceptionStatus < 0) continue;
    // Ticket.case = 4;
    // if(app.couponArea.bets.action == "editing") saveTicket(stream, false, true);
    // else saveTicket(stream);
    const ticket = readTicket(stream);
    tickets.set(ticket.ticketId, ticket);
  }
  console.log(responseArray);
  if (isMustShowModal) dispatch(addResponseTicket(responseArray, response));
  dispatch(saveTickets(tickets));
  // if (isCashout) app.couponArea.bets.compliteChangesBet(responseArray);
  // else app.couponArea.compliteBet(responseArray);
  // Cabinet.LoginInitializer();
  // Loyalty.initializeContent();
};

//  ----------------------------------------------------- case 5 -----------------------------------------------------
//  -------------------------------------- история ставок ------------------------------------------

const handleTicketsByDateResponse = stream => {
  seek = 0;
  const requestId = readUnsignedByte(stream); //request_id
  const ticketsNumber = readUnsignedShort(stream); //кол-во несыгранных ставок
  let tickets = new Map();
  for (let i = 0; i < ticketsNumber; i++) {
    let ticket = readTicket(stream);
    tickets.set(ticket.ticketId, ticket); // объект не сыгранных ставок
  }
  dispatch(saveTickets(tickets));
};

const handleBetResult = stream => {
  // Расчет ставки
  console.log("================== CASE 6 ======================");
  seek = 0;
  let requestId = readUnsignedByte(stream);
  let data = {};
  data.betId = readLong(stream);
  data.settlementOdd = readInt(stream) / 1000;
  data.summary = readUTF(stream);
  data.status = readByte(stream);
  dispatch(calculateBet(data));
};

const handleTicketResult = stream => {
  // Расчет тикета
  console.log("================== CASE 7 ======================");
  seek = 0;
  let data = {};
  let requestId = readUnsignedByte(stream);
  data.ticketId = readLong(stream);
  data.payout = readUnsignedInt(stream) / 100;
  data.units = readUnsignedInt(stream) / 100;
  data.bonus = readUnsignedInt(stream) / 100;
  data.status = readByte(stream);
  data.coef = readInt(stream) / 1000;
  data.settlementCoef = readInt(stream) / 1000;
  const balance = readBalance(stream);
  dispatch(saveBalanceToState(balance));
  dispatch(calculateTicket(data));
};

//  ----------------------------------------------------- case 8 -----------------------------------------------------
//  -------------------------------------- Пауза линий и удаление событий------------------------------------------

const handleEventsChanges = stream => {
  seek = 0;
  // console.log("==================== case 8 ====================");
  readUnsignedByte(stream); // request_id
  const objectId = readUnsignedInt(stream);
  const eventTypeRadar = readUnsignedByte(stream);
  const eventId = getEventKeyTypeEvent(eventTypeRadar, objectId);
  dispatch(deleteOrPauseEvent(eventId));
};

//  ----------------------------------------------------- case 9 -----------------------------------------------------
//  -------------------------------------- Бетстоп на линии------------------------------------------

const handleBetStop = stream => {
  seek = 0;
  // console.log("==================== case 9 ====================");
  readUnsignedByte(stream);
  const data = {};
  data.providerId = readUnsignedByte(stream); // 1 - radar, 2 - ssln, 3 - genius
  data.isBetStop = readUnsignedByte(stream); // 0 - отмена бетстопа, 1 - бетстоп
  dispatch(betStop(data));
};

//  ----------------------------------------------------- case 10 -----------------------------------------------------
//  --------------------------------------------- Ответ на регистрацию ------------------------------------------------

const handleRegistrationResponce = stream => {
  console.log("=================Case 10=========================");
  seek = 0;
  let requestId = readUnsignedByte(stream); //request_id
  let status = readUnsignedByte(stream);
  dispatch(loader_registration_action(false));
  console.log(status);
  switch (status) {
    case 0:

    case 1:
      console.log("1");

    case 2:
      console.log("2");

    case 3:
      console.log("3");
    // dispatch(emailUse(true));

    case 4:
      console.log("4"); //update client data. A user with such a name and a name and with a date of birth has already been registered. Also, this error will come when the client wants to re-change his name or surname
    case 5:
      console.log("5");

    case 6:
      handleRegistrationResponse({ status, requestId });
      console.log("case 6 ", { status, requestId });
      break;
    case 10:
      console.log("пароль изменен");
      dispatch(changePswMyAccount(true));
      break;
    case 11:
      console.log("пароль не удалось ошибка");
      dispatch(faillchangePsw(true));
      break;
    case 12: //Успешлая смена пароля
      console.log("Успешлая смена пароля => авторизация клиента в case 3.");
      dispatch(successChangePsw(true));
      // dispatch(authorize_recover_password(true));
      // dispatch(authorizeByLoginPSW(true));
      break;
    case 13: //Неудачная смена пароля
      console.log(
        'Неудачная смена пароля => воспользуйтесь функцией recoverClientPassword("new password")'
      );
      break;
    case 14: //Успешлая смс
      // dispatch(sendCode(true));
      console.log(
        'Успешный ввод смс кода => воспользуйтесь функцией recoverClientPassword("new password")'
      );
      dispatch(smsCodeValid(true));
      // recoverClientPassword();
      break;
    case 15: //Неудачная смс
      console.log(
        'Cмс код введён неверно => воспользуйтесь функцией sendRecoverySMS("sms-code")'
      );
      dispatch(error_code_phone_registration(true));
      break;
    case 16: // неверное сочетания дата + телефон
      console.log("Неверное сочетания даты и телефона ");
      dispatch(error_date_recover_psw(true));
      break;
    // case 242: // неверное сочетания дата + телефон
    //   console.log("Неверное сочетания даты и телефона ");
    //   dispatch(error_date_recover_psw(true));
    //   break;
  }
};

const handleRegistrationResponse = data => {
  console.log(data);
  let msgField;
  switch (data.status) {
    // Успешная регистрация
    case 0:
      switch (data.requestId) {
        // Успешная регистрация
        case 1:
          console.log(0, "Верные данные");
          dispatch(error_date_recover_psw(false));
          dispatch(stepInputCode(true));
          break;
        case 0:
          console.log(0, "Успешная регистрация");
          dispatch(seccuess_registration(true));
          break;
        case 3:
          console.log(0, "Успешная регистрация");
          dispatch(seccuess_registration(true));
          break;

        // Логин свободен - 7
        case 7:
          console.log("Логин свободен");
          dispatch(no_use_login_registration(false));
          // dispatch(loginUseRegistration(false));
          break;
        // Телефон свободен - 8
        case 8:
          console.log("Телефон свободен");
          dispatch(no_use_phone_registration(false));
          dispatch(sendCode(true));
          // dispatch(sendCodeNumber(true));
          // this.requestSmsCode();
          break;
        // Email свободен - 9
        case 9:
          console.log("Email свободен");
          dispatch(no_use_email_registration(false));
          // dispatch(emailUse(false));
          // this.toggleErrorMsg(this.inputs.email.msgFieldId, this.inputs.email.errorMsg[1]);
          break;
        // case 17:
        //     console.log("Ошибка восстановление пароля");
        //     dispatch(error_date_recover_psw(false));
        //     // dispatch(emailUse(false));
        //     // this.toggleErrorMsg(this.inputs.email.msgFieldId, this.inputs.email.errorMsg[1]);
        //     break;
        case 40:
          console.log(0, "Верные данные восстанволение");
          dispatch(error_date_recover_psw(false));
          dispatch(stepInputCode(true));
          // this.toggleErrorMsg(
          //     this.inputs.email.msgFieldId,
          //     this.inputs.email.errorMsg[1]
          // );
          break;
        case 10:
          console.log(0, "СМС введена верна ");
          dispatch(error_code_phone_registration(false));
          // dispatch(error_date_recover_psw(false));
          // dispatch(stepInputCode(true));
          // this.toggleErrorMsg(
          //     this.inputs.email.msgFieldId,
          //     this.inputs.email.errorMsg[1]
          // );
          break;
        default:
          dispatch(seccuess_registration(true));
          break;
      }
      break;

    // Ошибка. Логин уже используется
    case 1:
      console.log(1, "Ошибка. Логин уже используется");
      switch (data.requestId) {
        // При полной регистрации
        case 0:
          dispatch(no_use_login_registration(true));
          // this.toggleErrorMsg(this.inputs.login.msgFieldId, this.inputs.login.errorMsg[1]);
          break;
        // При проверке логина
        case 7:
          dispatch(no_use_login_registration(true));
          break;
        case 8:
          dispatch(no_use_phone_registration(true));
          break;
      }
      break;
    // Ошибка. Номер телефона уже используется
    case 2:
      console.log(2, "Ошибка. Номер телефона уже используется");
      switch (data.requestId) {
        // При полной регистрации
        case 0:
          dispatch(no_use_phone_registration(true));

          // this.toggleErrorMsg(this.inputs.phoneNumber.msgFieldId, this.inputs.phoneNumber.errorMsg[1]);
          break;
        // При проверке номера телефона
        case 8:
          dispatch(no_use_phone_registration(true));
          // this.toggleErrorMsg(this.inputs.phoneNumber.msgFieldId, this.inputs.phoneNumber.errorMsg[1]);
          break;
      }
      break;
    // Ошибка. Емаил уже используется
    case 3:
      console.log(3, "Ошибка. Емаил уже используется");
      switch (data.requestId) {
        // При полной регистрации
        case 0:
          console.log("Полная регистрация. ОШибка: email используется");
          dispatch(no_use_email_registration(true));
          // dispatch(emailUse(true));
          // this.toggleErrorMsg(this.inputs.email.msgFieldId, this.inputs.email.errorMsg[1]);
          break;
        // При проверке email
        case 9:
          dispatch(no_use_email_registration(true));
          // dispatch(emailUse(true));
          // console.log("Проверка email. ОШибка: email используется");
          // let msgField = document.getElementById(this.inputs.email.msgFieldId);
          // msgField.innerHTML = "Email уже используется";
          // msgField.parentElement.classList.add("error");
          break;
      }
      break;
    // Ошибка. Пользователь с таким именем и датой рождения зарегистрирован
    case 4:
      console.log(
        4,
        "Ошибка. Пользователь с таким именем и датой рождения зарегистрирован"
      );
      dispatch(no_use_data_registration(true));
      // dispatch(userDayOrDay(true));
      // msgField = document.getElementById(this.inputs.birthDay.msgFieldId);
      // msgField.innerHTML = "Пользователь с таким именем и датой рождения зарегистрирован";
      // msgField.parentElement.classList.add("error");
      break;
    // Ошибка. Неверный СМС код
    case 5:
      console.log(5, "Ошибка. Неверный СМС код");
      dispatch(error_code_phone_registration(true));
      // msgField = document.getElementById(this.inputs.smsCode.msgFieldId);
      // msgField.innerHTML = "Не верный код";
      // msgField.parentElement.classList.add("error");
      break;
    // Ошибка. Меньше 18 лет
    case 6:
      console.log(6, "Ошибка. Меньше 18 лет");
      dispatch(no_use_data_registration(true));
      // dispatch(userDayOrDay(true));
      // msgField = document.getElementById(this.inputs.birthDay.msgFieldId);
      // msgField.innerHTML = "Меньше 18 лет";
      // msgField.parentElement.classList.add("error");
      break;
  }
};

export const sendRegistrationClientFull = (
  surname,
  name,
  middlename,
  day,
  month,
  year,
  country,
  country_id,
  phone,
  city,
  city_id,
  postal_code,
  region,
  region_id,
  address,
  email,
  login,
  password,
  currency,
  sms_code,
  email_newsletter,
  timezone,
  ip_address
) => {
  sendindex = 0;
  sendarray.splice(0);
  writeByte(3);
  writeUTF(surname);
  writeUTF(name);
  writeUTF(middlename);
  writeShort(day);
  writeShort(month);
  writeShort(year);
  writeUTF(country);
  writeInt(country_id);
  writeUTF(phone);
  writeUTF(city);
  writeInt(city_id);
  writeUTF(postal_code);
  writeUTF(region);
  writeInt(region_id);
  writeUTF(address);
  writeUTF(email);
  writeUTF(login);
  writeUTF(password);
  writeShort(currency); //1 up to 6 "TMT", "RUB", "EUR", "USD", "TRY", "VM" 643 - RUB
  writeUTF(sms_code);
  writeByte(email_newsletter);
  writeByte(timezone);
  writeUTF(ip_address);
  writeByte(3);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientregister" + EncodeBase64_2(sendarray));
};

export const sendRegistrationsSMS = number => {
  console.log(number);
  console.log("Cod send you devise", number);
  sendindex = 0;
  sendarray = [];
  writeUTF(String(number));
  writeByte(1);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientsms" + EncodeBase64_2(sendarray));
  // the answer comes in the form of SMS to the phone number listed above. The answer does not return the answer. The server remembers the SMS and when registering when the same number is sent, the server will check if it is the correct SMS code
};

export const checkRegistrationClientSms = sms => {
  console.log(sms);
  sendindex = 0;
  sendarray = [];
  writeByte(10);
  writeUTF(String(sms));
  writeByte(10);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientregister" + EncodeBase64_2(sendarray));
};

export const sendRegistrationClientFullDataOrUpdateAndChangeRegistationDataLater = () => {
  var day = 1;
  var month = 0;
  var year = 1970;
  var country_id = 0;
  var city_id = 0;
  var region_id = 0;
  var timezone = 3;
  var currency = 1;
  sendindex = 0;
  sendarray.splice(0);
  writeByte(3); /// on the site there is a registration of 3 steps (at first only checking on the phone name and date of birth, then the second step checking for the login and the third step is a complete check.) For the mobile version there will probably be a full registration form. 3-means the full form of registration
  writeUTF("Surname");
  writeUTF("Name");
  writeShort(day); //1-31 of date of birth
  writeShort(month); //month of date of birth 0-11
  writeShort(year); //year of date of birth
  writeUTF("Turkey"); //
  writeInt(country_id); // when you need I can give you a js file with the names of the countries of the regions and the city. You will be able to switch it on, so that the country's city prefix phone and city are automatically sucked. Until the server checks for the correctness of the id, so registration will work with any value of country_id;
  writeUTF("+905051872271"); //phone number
  writeUTF("Istanbul"); //city
  writeInt(city_id); //Look above - as for the country_id.
  writeUTF("34010"); //postal index
  writeUTF("Il Istanbul"); //region name
  writeInt(region_id); //Look above - as for the country_id.
  writeUTF("Address street etc");
  writeUTF("aandriuc@sarki.pro"); //email
  writeUTF("100100"); //login
  writeUTF("password"); //password At registration here it is necessary to enter the password which the client will think up (this at the value of the first byte in the message is 3). If you use this send function to change the data of an existing client (this is the first byte sent is 6), you must enter the client's current password
  writeShort(currency); //1 up to 6 "TMT", "RUB", "EUR", "USD", "TRY", "VM"
  writeUTF("SMS code"); // sms code that got the client on the phone. To do this, there is another function that sends the client's phone number to the server and the client will receive the code. At what time of registration ыend the customer's phone number to the server - it's up to you.
  writeByte(0); // // 0 means that the client does not want to receive newsletters on the email and on the phone. If 1 then the client agrees to subscribe to the sending of sms and email messages.
  writeByte(timezone); //writeUTF(Reg4[21].value);//промокод
  writeUTF("192.89.89.22"); // ip client address. I can not get a webcam, because the server is hidden behind NAT. Ip can be obtained from a query on a Django or PHP server. Javascript ip javascript can not be obtained
  writeByte(3);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientregister" + EncodeBase64_2(sendarray)); // after sending, wait for the response in the decode function step 10
};

// ----------------------------------------------------- case 13 -----------------------------------------------------
//  -------------------------------- Информация о текущих ставках и операциях клиента---------------------------------
const handleUserAccountInfo = stream => {
  console.log("=========case 13==========");
  seek = 0;
  readUnsignedByte(stream); //request_id

  let data = {};

  // Даты ставок
  data.betsTimestamps = [];
  let totalBetsNumber = readUnsignedShort(stream);
  for (let i = 0; i < totalBetsNumber; i++)
    data.betsTimestamps.push(readUnsignedInt(stream) * 1000);

  // Даты операций
  data.operationsTimestamps = [];
  let totalOperationsNumber = readUnsignedShort(stream);
  for (let i = 0; i < totalOperationsNumber; i++)
    data.operationsTimestamps.push(readUnsignedInt(stream) * 1000);

  data.accountData = readBalance(stream);

  // Текущие ставки
  data.ticketsData = [];
  let ticketsNumber = readUnsignedShort(stream);
  for (let i = 0; i < ticketsNumber; i++)
    data.ticketsData.push(readTicket(stream));

  // Текущие операции
  data.currentOperationsData = [];
  let operationsNum = readUnsignedShort(stream);
  for (let i = 0; i < operationsNum; i++) {
    let operationData = readOperation(stream);
    data.currentOperationsData.push(operationData);
    // app.userInfo.components.money.components.history.handleOperation(
    //   operationData
    // );
  }
  console.log(data);

  dispatch(saveUser(data));

  const arrayEventsForExtraLines = getArrayEventsForRequestExtralines(
    data.ticketsData
  );
  dispatch(saveExtralinesArrayNeedToRequest(arrayEventsForExtraLines));
  requestNextExtraline(arrayEventsForExtraLines);

  // parentHandlers.handleClientData(data);
};

// ----------------------------------------------------- case 13 -----------------------------------------------------
//  -------------------------------- Информация о текущих ставках и операциях клиента---------------------------------

const handleBetBuilderResponse = (stream, props) => {
  console.log("================= = case 15 ===================");
  seek = 0;
  let requestId = readUnsignedByte(stream);
  let betBuilderOdd = readUnsignedInt(stream) / 1000;
  let errorCode = readInt(stream);
  let errorMsg = readUTF(stream);
  let message = readUTF(stream);
  if (errorCode) {
    console.error(
      "handleBetBuilderResponse errorCode = " + errorCode + " msg =" + errorMsg
    );
    const serverError = { errorCode: errorCode, errorMsg: errorMsg };
    dispatch(errorModalBB(serverError));
  }
  console.log(message, "------------ MSG");
  console.log(betBuilderOdd, "------------COEF");
  dispatch(saveCoefbuilder(betBuilderOdd));
};
const handleMaxPayoutResponse = stream => {
  console.log("===================== case 16 =====================");
  seek = 0;
  const requestId = readUTF(stream);
  const maxPayout = readInt(stream);
  console.log(requestId);
  console.log(maxPayout);
  if (requestId === "editingTicket")
    return dispatch(saveMaxPayEditingTicket(maxPayout));
  dispatch(saveMaxPayCoupon(requestId, maxPayout));
};

// ----------------------------------------------------- case 20 -----------------------------------------------------
//  -------------------------------- История операций ---------------------------------

export const handleOperationsByDateResponse = stream => {
  seek = 0;
  readUnsignedByte(stream); // request_id
  let operationsNum = readUnsignedShort(stream);
  const operations = [];
  for (let i = 0; i < operationsNum; i++)
    operations.push(readOperation(stream));
  dispatch(saveOperationsToState(operations));
};

// -------------------------------------- case 21 -------------------------------------
//  -------------------------------- История операций ---------------------------------

export const handleOperations = stream => {
  seek = 0;
  readUnsignedByte(stream); // request_id
  const accountData = readBalance(stream);
  dispatch(saveBalanceToState(accountData));
  const operationsNum = readUnsignedShort(stream);
  const operations = [];
  for (let i = 0; i < operationsNum; i++)
    operations.push(readOperation(stream));
  dispatch(saveOperationsToState(operations));
};
// -------------------------------------- case 22 -------------------------------------
//  -------------------------------- // Ответ на запрос на завершение акции "Бонус на депозит" ---------------------------------

const handlePromotionFinishingRequest = stream => {
  console.log("=============== case 22 ===============");
  seek = 0;
  readUnsignedByte(stream); // request_id
  let status = readUnsignedByte(stream);
  debugger;
  dispatch(addResponseEndingBonusOnDeposit({ status }));
};

// ---------------------------------- case 200 ---------------------------------
//  -------------------------------- Документы ---------------------------------

const handleDocumentsComponent = stream => {
  console.log("handleDocumentsComponent");
  seek = 0;

  //   const documentsComponent = {};
  const docs = [];

  const docsCount = readInt(stream);
  for (let i = 0; i < docsCount; ++i) {
    docs.push(readDocument(stream));
  }
  dispatch(updateDocumentsComponentVerification(docs));
};

// ---------------------------------- case 201 ---------------------------------
//  -------------------------------- Верификация ---------------------------------

const handleIdentComponent = stream => {
  seek = 0;
  console.log("handleIdentComponent");

  const identComponent = {};

  identComponent.identStatus = enumToString(
    ClientFinancialLimitsEnum,
    readInt(stream)
  );
  identComponent.bindingFailSource = enumToString(
    ClientBindingFailSourceEnum,
    readInt(stream)
  );
  identComponent.personalDataStatus = readInt(stream);
  identComponent.isCanTopup = readBool(stream);
  identComponent.isCanWithdraw = readBool(stream);
  identComponent.isCanPlay = readBool(stream);
  identComponent.isIdentificationInitiated = readBool(stream);
  identComponent.scriptFlag = enumToString(ClientScriptFlag, readInt(stream));

  const isCallMe = readBool(stream);

  const date = readDate(stream);
  if (date) {
    identComponent.callMe = {};
    identComponent.callMe.datetime = date;
  } else {
    identComponent.callMe = null;
  }
  dispatch(updateIndentComponentVerification(identComponent));
};

// ---------------------------------- case 203 ---------------------------------
//  -------------------------------- Перезвонить -------------------------------

const handleCallMeResponse = stream => {
  seek = 0;
  console.log("handleCallMeResponse");

  let result = readBool(stream);
  dispatch(updateCallMeResponseVerification(result));

  console.log(result);
};

// ---------------------------------- case 211 ---------------------------------
//  --------------------- Ответ на запрос каналов ввода ------------------------

const handleReplenishmentChannels = stream => {
  seek = 0;
  const data = {};
  const channelsNumber = readInt(stream);
  if (channelsNumber === -1) {
    data.status = 0;
    data.errorCode = readInt(stream);
  } else {
    data.status = 1;
    data.channels = [];
    for (let i = 0; i < channelsNumber; i++)
      data.channels.push(readReplenishmentChannel(stream));
  }

  console.log("handleReplenishmentChannels");
  console.log(data);
  dispatch(changeReplenishmentChanels(data));
};

// ---------------------------------- case 221 ---------------------------------
//  --------------------- Ответ на запрос каналов вывода -----------------------

const handleWithdrawChannels = stream => {
  seek = 0;
  const data = {};
  const channelsNumber = readInt(stream);
  if (channelsNumber === -1) {
    data.status = 0;
    data.errorCode = readInt(stream);
  } else {
    data.status = 1;
    data.channels = [];
    for (let i = 0; i < channelsNumber; i++)
      data.channels.push(readWithdrawalChannel(stream));
  }
  console.log("handleWithdrawChannels");
  console.log(data);
  dispatch(changeWithdrawalChanels(data));
};

// ---------------------------------- case 210 ---------------------------------
//  ---------------- Ответ на совершение операции пополнения -------------------

const handleReplenishmentResponse = stream => {
  seek = 0;
  const requestId = readInt(stream);
  const result = readBool(stream);

  console.log("handleReplenishmentResponse");
  console.log(result);
  dispatch(changeStateConnectReplenishmentChanels({ status: result }));
};

// ---------------------------------- case 220 ---------------------------------
//  ---------------- Ответ на совершение операции вывода -----------------------

const handleWithdrawalResponse = stream => {
  seek = 0;
  let requestId = readInt(stream);
  let result = readBool(stream);

  console.log("handleWithdrawalResponse");
  console.log(result);
  dispatch(changeStateConnectWithdrawalChanels({ status: result }));
};

// ------------------------------------------- REQUEST -----------------------------------------
//------------------------------------------  Запросы  ------------------------------------

export const streamPainting = (url, videoProviderId, videoId, sportId) => {
  const link = `${url}?#${videoProviderId}&${videoId}&${sportId}`;

  return link;
};

//Виджет

export const vidgit = matchId => {
  getFuncSIR(
    window,
    document,
    "script",
    "https://widgets.sir.sportradar.com/724b99e5d1b7c8d393c957792a68953b/widgetloader",
    "SIR",
    {
      language: "en",
      matchId: matchId
    }
  );
  window.SIR("addWidget", "#sr-widget", "match.lmtEssential", {
    showOdds: false,
    adsFrequency: false,
    language: "ru",
    matchId: matchId
  });
};

const getFuncSIR = (a, b, c, d, e, f, g, h, i) => {
  return (
    a[e] ||
    ((i = a[e] = function() {
      (a[e].q = a[e].q || []).push(arguments);
    }),
    (i.l = 1 * new Date()),
    (i.o = f),
    (g = b.createElement(c)),
    (h = b.getElementsByTagName(c)[0]),
    (g.async = 1),
    (g.src = d),
    g.setAttribute("n", e),
    h.parentNode.insertBefore(g, h))
  );
};

//Запрос на словари

export const getInfoXhrReqire = (url, paramSend) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(paramSend, url, true);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
};

export const dd = (url, options, view) => {
  let promiseMarkets = fetch(url, options);
  promiseMarkets
    .then(data => {
      return data;
    })
    .then(data => {
      return data.json();
    })
    .then(data => {
      console.log(data);
      dispatch(paintingDictionary(data, view));
    })
    .catch(error => {
      console.log(error);
    });
};

// betbuilder запрос на коэф

// Запрос коэффициента в конструкторе ставок
export const getBetBuilderOdd = (eventId, bets) => {
  console.log(
    "________________________________________ ДЛЯ ДИМЫ ________________________________________"
  );
  console.log(eventId, bets);

  console.log(
    "________________________________________ ДЛЯ ДИМЫ ________________________________________"
  );
  sendindex = 0;
  sendarray = [];
  writeUTF(eventId);
  writeByte(bets.length); // количество линии из бетбилдера

  bets.forEach(bet => {
    writeUTF(bet.compoundKey);
    writeByte(bet.lineTypeRadar);
    writeInt(bet.outcomeId);
  });
  writeByte(3); // request_id
  sendarray[sendindex] = 0;
  createSocket.socketSend("builder" + EncodeBase64_2(sendarray));
};

export const authorizeByLogin = data => {
  console.log(data.Login, data.Password);
  sendindex = 0;
  sendarray = [];
  writeUTF(data.Login); //     +37379467307
  writeUTF(data.Password); //     555555
  writeUTF("127.0.0.0.1");
  writeByte(3); // отсылать тайм зону клиента, в часах
  writeByte(data.requestId); // флаг того, что это авторизация по логину и паролю
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientlogin" + EncodeBase64_2(sendarray));
  getUserAccountData();
  console.warn(1);
};

export const authorizeByToken = data => {
  // debugger;
  console.log(data);
  // debugger;
  sendindex = 0;
  sendarray = [];
  writeUTF(data.Password); //
  writeUTF(data.Login); //
  writeUTF("127.0.0.0.1");
  writeByte(3); // отсылать тайм зону клиента, в часах
  writeByte(data.requestId); // флаг того, что это авторизация по токену
  sendarray[sendindex] = 0;
  createSocket.socketSend("clienttoken" + EncodeBase64_2(sendarray));
  getUserAccountData();
  console.warn(2);
};

const getUserAccountData = () => {
  sendindex = 0;
  sendarray = [];
  writeByte(3);
  sendarray[sendindex] = 0;
  createSocket.socketSend("betlogin" + EncodeBase64_2(sendarray));
};

export const betAutentification = () => {
  sendindex = 0;
  sendarray.splice(0);
  writeByte(1);
  sendarray[sendindex] = 0;
  createSocket.socketSend("betlogin" + EncodeBase64_2(sendarray));
};

export const logout = () => {
  console.log("clientlogout");
  createSocket.socketSend("clientlogout");
};

//resend psw
export const recoverPassword = data => {
  console.log(data);
  sendindex = 0;
  sendarray = [];
  writeByte(5); // mandatory number 5 for this function
  writeUTF(String(data.phone)); // phone number
  writeShort(data.day); //1-31 of date of birth
  writeShort(+data.munth); //month of date of birth 0-11
  writeShort(data.year); //year of date of birth //send date
  writeByte(40);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientregister" + EncodeBase64_2(sendarray));
  //The answer to this request is waiting in step 10. The client will receive an SMS with a password to his phone number
};

export const changeClientPassword = (currentUserPassword, newUserPassword) => {
  sendindex = 0;
  sendarray.splice(0);
  console.log(currentUserPassword, newUserPassword);
  writeUTF(currentUserPassword);
  writeUTF(newUserPassword);
  writeByte(1);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientnewpass" + EncodeBase64_2(sendarray));
};

export const sendRecoverySMS = sms => {
  console.log(sms);
  sendindex = 0;
  sendarray = [];
  writeUTF(sms);
  writeByte(40);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientcode" + EncodeBase64_2(sendarray));
};

// registration
export const sendRegistrationData = data => {
  //разбить на мини функции
  let country_id = 0;
  let city_id = 0;
  let region_id = 0;
  let timezone = 3;
  let currency = 643;
  sendindex = 0;
  sendarray = [];
  writeByte(3); /// on the site there is a registration of 3 steps (at first only checking on the phone name and date of birth, then the second step checking for the login and the third step is a complete check.) For the mobile version there will probably be a full registration form. 3-means the full form of registration
  //Для изменения регистрационных данных из личного кабинету нужно в этом месте отправить цифру 6 writeByte(6).
  writeUTF(data.lastName);
  writeUTF(data.secondName);
  writeUTF(data.otherName);
  writeShort(data.birthday.day); //1-31 of date of birth
  writeShort(data.birthday.month); //month of date of birth 0-11
  writeShort(data.birthday.year); //year of date of birth
  writeUTF(data.nationality); //
  writeInt(country_id); // when you need I can give you a js file with the names of the countries of the regions and the city. You will be able to switch it on, so that the country's city prefix phone and city are automatically sucked. Until the server checks for the correctness of the id, so registration will work with any value of country_id;
  writeUTF(data.phone); //phone number
  writeUTF("Istanbul"); //city
  writeInt(city_id); //Look above - as for the country_id.F
  writeUTF("34010"); //postal index
  writeUTF("Il Istanbul"); //region name
  writeInt(region_id); //Look above - as for the country_id.
  writeUTF("Address street etc");
  writeUTF(data.eMail); //email
  writeUTF(data.login); //login
  writeUTF(data.password); //password At registration here it is necessary to enter the password which the client will think up (this at the value of the first byte in the message is 3). If you use this send function to change the data of an existing client (this is the first byte sent is 6), you must enter the client's current password
  //If you change your personal data (the first byte sent = 6), the server checks. If the database already has data filled by the name of the name of the birth date of the account currency phone number, then the attempt to change this data will return an error.

  writeShort(currency); //1 up to 6 "TMT", "RUB", "EUR", "USD", "TRY", "VM"
  writeUTF(data.sms); // sms code that got the client on the phone. To do this, there is another function that sends the client's phone number to the server and the client will receive the code. At what time of registration ыend the customer's phone number to the server - it's up to you.
  writeByte(0); // // 0 means that the client does not want to receive newsletters on the email and on the phone. If 1 then the client agrees to subscribe to the sending of sms and email messages.
  writeByte(timezone);

  writeUTF("192.89.89.22"); // ip client address. I can not get a webcam, because the server is hidden behind NAT. Ip can be obtained from a query on a Django or PHP server. Javascript ip javascript can not be obtained
  writeUTF(data.promocode); //promocode
  writeUTF(data.pincode); //pincode
  writeUTF(""); // data.btag btag
  writeByte(0);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientregister" + EncodeBase64_2(sendarray));
  console.log("СЕРВЕР ПОЛУЧИЛ ИХ");
  // after sending, wait for the response in the decode function step 10
};

//Регистрация запрос на номер телефона код
export const checkRegistrationClientPhone = phoneNumber => {
  console.log("NUMBER SEND CHECK", phoneNumber);
  sendindex = 0;
  sendarray = [];
  writeByte(8);
  writeUTF(phoneNumber);
  writeByte(8);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientregister" + EncodeBase64_2(sendarray));
};
export const checkRegistrationClienMail = email => {
  console.log("email SEND CHECK", email);
  sendindex = 0;
  sendarray = [];
  writeByte(9);
  writeUTF(email);
  writeByte(9);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientregister" + EncodeBase64_2(sendarray));
};

export const checkRegistrationClienLogin = login => {
  console.log("Login SEND CHECK", login);
  sendindex = 0;
  sendarray = [];
  writeByte(7);
  writeUTF(login);
  writeByte(7);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientregister" + EncodeBase64_2(sendarray));
};
//восстановление пароля
export const recoverClientPassword = newUserPassword => {
  sendindex = 0;
  sendarray = [];
  writeUTF(newUserPassword);
  writeByte(1);
  sendarray[sendindex] = 0;
  createSocket.socketSend("clientcodepass" + EncodeBase64_2(sendarray));
};
//ExtraLine
export const getExtralines = eventId => {
  sendindex = 0;
  sendarray = [];
  writeUTF(eventId);
  writeByte(1);
  sendarray[sendindex] = 0;
  console.log("Requested extralines for: " + eventId);
  createSocket.socketSend("extralines" + EncodeBase64_2(sendarray));
};

export const requestPromotionFinish = () => {
  sendindex = 0;
  sendarray = [];
  writeByte(1); // request_id
  sendarray[sendindex] = 0;
  createSocket.socketSend("betbonusdeposit" + EncodeBase64_2(sendarray));
};

const isAuthorized = () => {
  const state = getState();
  return state.user.isAuthorize;
};

let outrightsIterator = f => f;

export const requestOutrights = (catIds, index) => {
  sendindex = 0;
  sendarray = [];
  const catId = catIds[index];
  if (!catId) return;

  writeInt(catId);
  writeByte(2);
  sendarray[sendindex] = 0;
  createSocket.socketSend("outright" + EncodeBase64_2(sendarray));

  outrightsIterator =
    index + 1 < catIds.length
      ? () => requestOutrights(catIds, index + 1)
      : f => f;
};

export const requestMaxPayout = (betsData, requestId, type) => {
  if (!isAuthorized()) return;
  console.log("request_" + requestId);
  console.log(betsData);

  sendindex = 0;
  sendarray = [];
  //ticket->type 1 ординар 2 экспресс 3 система 4 бетбилдер
  writeByte(type);

  writeByte(betsData.length);
  for (let betData of betsData) {
    writeUTF(betData.compoundKey);
    writeByte(betData.lineTypeRadar);
    writeInt(betData.outcomeId);
  }
  writeUTF(requestId);
  sendarray[sendindex] = 0;
  createSocket.socketSend("betlimits" + EncodeBase64_2(sendarray));
};

export const sendTicket = (ticket, cashout = null) => {
  console.log("================ ПРИНЯТИЕ СТАВКИ ================");
  sendindex = 0;
  sendarray = [];
  const state = getState();
  const settings = state.coupon.settings;
  console.log("balance - " + state.user.isMainBalance);
  const accountType = state.user.isMainBalance ? 0 : 1;
  console.log("Ticket: ", ticket);

  writeLong(cashout ? cashout.ticketId : 0);
  console.log("cashoutTicketId", cashout ? cashout.ticketId : 0);

  writeStake(cashout ? cashout.outputStake : 0);
  console.log("outputCashoutStake", cashout ? cashout.outputStake : 0);

  writeStake(cashout ? cashout.remainingStake : 0);
  console.log("remainingStake", cashout ? cashout.remainingStake : 0);

  writeByte(ticket ? 4 : 0);
  console.log("Type: ", ticket ? 4 : 0);

  if (ticket) {
    writeByte(1);
    console.log("Device: ", 1);

    // ============ BET BUILDER ===========
    console.group("BET BUILDER");
    if (ticket.get("builder")) {
      // Количество исходов в бет билдере
      console.log("Outcomes NUM: ", ticket.get("builder").outcomes.length);
      writeByte(ticket.get("builder").outcomes.length);

      for (let outcome of ticket.get("builder").outcomes) {
        //                    let line = app.lines.get(app.compoundKeys.get(outcome.lineId));
        console.log("compoundKey: ", outcome.compoundKey);
        writeUTF(outcome.compoundKey);

        console.log("lineTypeRadar: ", outcome.lineTypeRadar);
        writeByte(outcome.lineTypeRadar);

        console.log("OutcomeId: ", outcome.outcomeId);
        writeInt(outcome.outcomeId);

        console.log("Odd: ", outcome.odd);
        writeFloat(outcome.odd);
      }

      // Сумма ставки
      console.log("Stake: ", ticket.get("builder").stake);
      writeStake(ticket.get("builder").stake);

      // Тип счета
      console.log("Account type: ", accountType);
      writeByte(accountType); // 0 - ставка с реального баланса. 1 - ставка делается с бонусного баланса

      // Коэффициент
      //console.log("BB Odd: ", ticket.betBuilderData.odd);
      console.log("BB Odd: ", ticket.get("builder").odd);
      writeFloat(ticket.get("builder").odd);
    } else {
      // Количество исходов в бет билдере
      console.log("Outcomes NUM: ", 0);
      writeByte(0);

      // Сумма ставки
      console.log("Stake: ", 0);
      writeStake(0);

      // Тип счета
      console.log("Account type: ", accountType);
      writeByte(accountType); // 0 - ставка с реального баланса. 1 - ставка делается с бонусного баланса

      // Коэффициент
      console.log("BB Odd: ", 0);
      writeFloat(0);
    }
    console.groupEnd();

    writeByte(ticket.get("ordinars").length);
    console.log("Bets number: ", ticket.get("ordinars").length);

    writeByte(ticket.get("system").rang);
    console.log("system selected: ", ticket.get("system").rang);

    // Умножить сумму ставки на 100
    writeStake(ticket.get("system").sum);
    console.log("system stake: ", ticket.get("system").sum);

    // Тип счета
    console.log("Account type: ", accountType);
    writeByte(accountType);

    // Умножить сумму ставки на 100
    writeStake(ticket.get("express").sum);
    console.log("express stake: ", "EE" + ticket.get("express").sum);

    // Тип счета
    console.log("Account type: ", accountType);
    writeByte(accountType);

    writeByte(settings.changingCoefs);
    console.log("any coef: ", settings.changingCoefs);

    writeByte(settings.changingMaxPay ? 1 : 0);
    console.log("alternative: ", settings.changingMaxPay ? 1 : 0);

    writeByte(0);
    console.log("action: ", 0);

    ticket.get("ordinars").forEach(ordinar => {
      writeUTF(ordinar.compoundKey);
      console.log("compoundKey: ", ordinar.compoundKey);
      writeByte(ordinar.lineTypeRadar);
      console.log("line.lineTypeRadar: ", ordinar.lineTypeRadar);
      writeInt(ordinar.outcomeId);
      console.log("outcomeId: ", ordinar.outcomeId);
      writeFloat(ordinar.outcomeOdds);
      console.log("outcomeOdds: ", ordinar.outcomeOdds);

      // Если ставка в составе экспресса или системы, то здесь сумма 0 (это число игнорируется)
      writeStake(ordinar.sum);
      console.log("stake: ", ordinar.sum);

      // Тип счета
      console.log("Account type: ", accountType);
      writeByte(accountType);
    });
  }

  writeInt(1);

  sendarray[sendindex] = 0;

  console.log("============= ПРИНЯТИЕ СТАВКИ КОНЕЦ =============");
  createSocket.socketSend("multiticket" + EncodeBase64_2(sendarray));
};

window.sendTicket = sendTicket;

export const getTicketsByDate = timestamp => {
  sendindex = 0;
  sendarray = [];
  writeInt(timestamp / 1000); //date of tickets in seconds
  writeByte(1);
  sendarray[sendindex] = 0;
  createSocket.socketSend("bethistory" + EncodeBase64_2(sendarray));
  // the answer to this request comes in step 5
};

export const getOperationByDate = timestamp => {
  sendindex = 0;
  sendarray = [];
  writeInt(timestamp / 1000); //date of tickets in seconds
  writeByte(1);
  sendarray[sendindex] = 0;
  createSocket.socketSend("betoperation" + EncodeBase64_2(sendarray));
  // the answer to this request comes in step 20
};

//---------------------------Вспомогательные функции при получении ответа на авторизацию ------------------

const handleAuthResponse = (status, data) => {
  console.log(data);
  if (status === -1) console.log({ type: 50 });
  else {
    setLocalStorage("Login", data.token2);
    setLocalStorage("Password", data.accessToken);
  }
};

// const setGBeventId = (gbId, eventId, status) => {
//   const prevEventId = app.matchingEvents.get(gbId);
//   if (status === -1 && prevEventId === eventId) {
//     app.matchingEvents.delete(gbId);
//     return null;
//   }
//   if (status !== -1) {
//     app.matchingEvents.set(gbId, eventId);
//     return gbId;
//   }
// };

// const setCompoundKey = (compoundKey, lineId, status) => {
//   const prevLineId = app.compoundKeys.get(lineId);
//   if (
//     (status === -1 || status === 3 || status === 4) &&
//     prevLineId === lineId
//   ) {
//     app.compoundKeys.delete(lineId);
//     return null;
//   }
//   if (status === 0 || status === 1) {
//     app.compoundKeys.set(compoundKey, lineId);
//     return compoundKey;
//   }
// };

//  -------------------------------------- Вспомогательные функции для расшифровки --------------------------------------------

const readOperation = stream => {
  // debugger;
  const operation = {};
  operation.id = readLong(stream); //Идентификатор операции
  operation.status = readByte(stream); //1 - операция выполнена; 0 - операция выполняется
  operation.creationDate = readInt(stream) * 1000; //Дата начала выполнения операции
  operation.endDate = readInt(stream) * 1000; //Дата окончания выполнения операции (Нужно отображать именно этот параметр)
  operation.operationType = readByte(stream); //Тип операции 0-27 смотреть в телеграмме
  operation.sum = readInt(stream) / 100; //значение пополнения основного счёта (если отрицательное, то средства выведены)
  operation.freeSum = readInt(stream) / 100; //значение пополнения бонусного счёта (если отрицательное, то средства выведены)
  //алгоритм обработки сумм: 1. выбрать из параметров sum и freeSum не нулевой параметр. В зависимости от типа описать операцию
  operation.tax = readInt(stream) / 100; //значение налога (пока 0)
  operation.code = readByte(stream); //Игнорировать этот параметр
  operation.type = readByte(stream); //0 - зачисление на обычный счёт; 1 - зачисление на бонусный счёт
  operation.comment = readUTF(stream); //Комментарий к истории. обычно пустая строка
  return operation;
};

const readBalance = stream => {
  let accountData = {};
  // Деньги на счет у клиента
  accountData.balance = readLong(stream) / 100;

  // Деньги в игре
  accountData.inGameBalance = readLong(stream) / 100;

  // Деньги на бонусном счету
  accountData.bonusBalance = readLong(stream) / 100;

  // Деньги с бонусного счета в игре
  accountData.inGameBonusBalance = readLong(stream) / 100;

  // Деньги со счета в игре на тотализхаторе
  accountData.inGameTotoBalance = readLong(stream) / 100;

  // Уровень лояльности
  accountData.currentLeagueId = readUnsignedInt(stream);

  // Очки программы лояльности
  accountData.points = readUnsignedInt(stream) / 100;

  // Сумма поплнений со времени начала акции
  accountData.deposit = readLong(stream) / 100;

  // Количество денег набранных на бонусный счет, они перейдут на бонусный счет по нажитю на кнопку
  accountData.rolled = readLong(stream) / 100;

  // Количество милисекунд до конца акции
  accountData.bonusDepositRemainingTime = readUnsignedInt(stream) * 1000;
  return accountData;
};

const readTicket = (stream, isUpdate = false, isEdited = false) => {
  // Ticket data
  const ticketId = readLong(stream);
  const accountType = readUnsignedByte(stream);
  const status = readUnsignedByte(stream);
  const timestamp = readUnsignedInt(stream) * 1000;
  const payout = readUnsignedInt(stream) / 100;
  const stake = readUnsignedInt(stream) / 100;
  const points = readUnsignedInt(stream) / 100; // очки программы лояльности
  const bonusBalance = readUnsignedInt(stream) / 100; //  количество денег зачисленных на бонусный счет после расчета этой ставки
  const returned = readUnsignedInt(stream) / 100;
  const type = readUnsignedByte(stream);
  const systemRang = readUnsignedByte(stream);
  const ticketCoef = readUnsignedInt(stream) / 1000;
  const resultTicketCoef = readUnsignedInt(stream) / 1000;

  const parentTicketId = readLong(stream); //

  const cashoutRecords = [];
  const cashoutNumber = readByte(stream);
  for (let i = 0; i < cashoutNumber; i++) {
    const outputCashoutStake = readInt(stream) / 100;
    const cashoutStake = readInt(stream) / 100;

    const cashoutTimestamp = readInt(stream) * 1000;
    const editableTicketId = readLong(stream);

    cashoutRecords.push({
      outputStake: outputCashoutStake,
      stake: cashoutStake,
      timestamp: cashoutTimestamp,
      editableTicketId: editableTicketId
    });
  }

  const bets = new Map();
  const betsNumber = readByte(stream);
  for (let i = 0; i < betsNumber; i++) {
    const betId = readLong(stream);
    const eventStatus = readByte(stream);
    const marketId = readInt(stream);
    const variant = readByte(stream);
    const compoundKey = readUTF(stream);
    const matchingMarkets = [];
    const isUnconfirmed = false;
    const marketsNum = readByte(stream);
    for (let i = 0; i < marketsNum; i++) {
      matchingMarkets.push(readMatchingMarkets(stream));
    }

    const matchingOutcomes = [];
    const outcomesNum = readByte(stream);
    for (let i = 0; i < outcomesNum; i++) {
      matchingOutcomes.push(readMatchingOutcomes(stream));
    }
    const outcomeId = readInt(stream);
    const eventStartTime = readUnsignedInt(stream);
    const sportId = 1023; //readShort(stream);
    const acceptedOdd = readInt(stream) / 1000;
    const eventScore = readUTF(stream);
    const eventSetScore = readUTF(stream);
    const eventGameScore = readUTF(stream);

    const eventBehinds = readUTF(stream);
    const eventPoint = readUTF(stream);
    const eventSetBehinds = readUTF(stream);
    const eventSetPoints = readUTF(stream);

    const eventMatchStatusDescription = readUTF(stream);
    const eventMatchTime = readUTF(stream);
    const eventHomeName = readUTF(stream);
    const eventAwayName = readUTF(stream);
    const tournamentName = readUTF(stream);
    const sportName = readUTF(stream);
    const categoryName = readUTF(stream);
    const settlementOdd = readInt(stream) / 1000;
    const summary = readUTF(stream);
    const status = readByte(stream);
    const typeRadar = readByte(stream);
    const objectId = readUnsignedInt(stream);
    const eventId = getEventKeyTypeLine(typeRadar, objectId);
    const prevGbEventId = readUnsignedInt(stream);
    const gbEventId = prevGbEventId ? prevGbEventId : eventId; //
    const outcomeName = readUTF(stream);
    const marketName = readUTF(stream);
    const specifierValue = []; //
    const specifiersNumber = readByte(stream); //
    for (let i = 0; i < specifiersNumber; i++) {
      specifierValue.push(readUTF(stream));
    }

    bets.set(betId, {
      betId,
      sportId,
      eventStatus,
      outcomeId,
      marketId,
      variant,
      compoundKey,
      matchingMarkets,
      matchingOutcomes,
      eventStartTime,
      acceptedOdd,
      eventScore,
      eventSetScore,
      eventGameScore,
      eventMatchStatusDescription,
      eventMatchTime,
      eventHomeName,
      eventAwayName,
      eventBehinds,
      eventPoint,
      eventSetBehinds,
      eventSetPoints,
      tournamentName,
      sportName,
      categoryName,
      settlementOdd,
      summary,
      eventId,
      gbEventId,
      status,
      typeRadar,
      outcomeName,
      marketName,
      specifierValue,
      isUnconfirmed
    });
  }

  return {
    ticketId,
    ticketCoef,
    resultTicketCoef,
    parentTicketId,
    accountType,
    status,
    timestamp,
    payout,
    stake,
    points,
    bonusBalance,
    returned,
    type,
    systemRang,
    cashoutRecords,
    betsNumber,
    bets
  };
};

export const sendCallMe = date => {
  sendindex = 0;
  sendarray = [];
  // writeUTF(String(contact));
  console.log(date);
  writeShort(date.getDate());
  writeShort(date.getMonth());
  writeShort(date.getFullYear());
  // writeLong(datetime);
  sendarray[sendindex] = 0;
  console.log(sendarray);

  createSocket.socketSend("clientcallme" + EncodeBase64_2(sendarray));
};

export const requestReplenishmentChannels = () => {
  sendindex = 0;
  sendarray = [];
  writeInt(1);
  sendarray[sendindex] = 0;
  createSocket.socketSend("client_d_channels" + EncodeBase64_2(sendarray));
  console.log("REPLENISHMENT CHANNELS REQUEST SENT");
};

window.requestReplenishmentChannels = requestReplenishmentChannels;

export const requestReplenishment = data => {
  sendindex = 0;
  sendarray = [];
  writeInt(1);
  writeUTF(String(data.channel));
  writeFloat(data.sum);
  sendarray[sendindex] = 0;
  createSocket.socketSend("client_d_create" + EncodeBase64_2(sendarray));
};

export const requestWithdrawalChannels = () => {
  sendindex = 0;
  sendarray = [];
  writeInt(1);
  sendarray[sendindex] = 0;
  createSocket.socketSend("client_w_channels" + EncodeBase64_2(sendarray));
  console.log("WITHDRAWAL CHANNELS REQUEST SENT");
};

window.requestWithdrawalChannels = requestWithdrawalChannels;

export const requestWithdrawal = data => {
  sendindex = 0;
  sendarray = [];
  writeInt(1);
  writeUTF(String(data.channel));
  writeUTF(String("")); // used from channels
  writeFloat(data.sum);
  sendarray[sendindex] = 0;
  createSocket.socketSend("client_w_create" + EncodeBase64_2(sendarray));
};

const deleteGBeventIdOrReturn = (gbId, eventId, status) => {
  const store = getState();
  const prevEventId = store.server.eventsAndLines.eventsByGB.get(gbId);
  if (status === -1 && prevEventId === eventId) {
    store.server.eventsAndLines.eventsByGB.delete(gbId);
    return gbId;
  }
  return gbId;
};

const deleteCompoundKeyOrReturn = (
  compoundKey,
  lineId,
  status,
  eventStatus
) => {
  const store = getState();
  const prevLineId = store.server.eventsAndLines.linesByCK.get(compoundKey);
  if (
    (eventStatus === -1 ||
      status === 0 ||
      status < -1 ||
      status === 3 ||
      status === 4) &&
    prevLineId === lineId
  ) {
    store.server.eventsAndLines.linesByCK.delete(compoundKey);
    return null;
  }
  return compoundKey;
};

const readMatchingMarkets = stream => {
  let matching_market = {};
  matching_market.provider = readByte(stream);
  matching_market.market_id = readShort(stream);
  if (matching_market.provider === 1)
    matching_market.variable_text = readUTF(stream);
  else matching_market.variable_text = "";
  matching_market.spec_index0 = readByte(stream);
  matching_market.spec_index1 = readByte(stream);
  matching_market.spec_value0 = readByte(stream);
  matching_market.spec_value1 = readByte(stream);
  return matching_market;
};

const readMatchingOutcomes = stream => {
  let matching_outcome = {};
  matching_outcome.provider = readByte(stream);
  matching_outcome.market_id = readShort(stream);
  if (matching_outcome.provider === 1)
    matching_outcome.variable_text = readUTF(stream);
  else matching_outcome.variable_text = "";
  matching_outcome.outcome_id = readShort(stream);
  return matching_outcome;
};

const readReplenishmentChannel = stream => {
  const channel = {};
  channel.name = readUTF(stream);
  channel.minSum = readInt(stream) / 1000;
  channel.maxSum = readInt(stream) / 1000;
  channel.isIframeSupported = readBool(stream);
  channel.paymentType = readByte(stream);
  return channel;
};

const readWithdrawalChannel = stream => {
  const channel = {};
  channel.name = readUTF(stream);
  channel.minSum = readInt(stream) / 1000;
  channel.maxSum = readInt(stream) / 1000;
  channel.isIframeSupported = readBool(stream);
  channel.paymentType = readByte(stream);
  channel.isAccountCreationAllowed = readBool(stream);

  channel.accounts = [];
  let accountsCount = readInt(stream);
  for (let i = 0; i < accountsCount; i++) {
    let account = {};
    account.name = readUTF(stream);
    account.code = readUTF(stream);
    channel.accounts.push(account);
  }

  return channel;
};

export const sendWithdrawCancelRequest = (requestId, operationId) => {
  sendindex = 0;
  sendarray = [];
  writeInt(requestId);
  writeUTF(String(operationId));
  sendarray[sendindex] = 0;
  createSocket.socketSend("client_w_cancel" + EncodeBase64_2(sendarray));
};

//// CUPIS ////

const readDocument = stream => {
  const doc = {};

  doc.type = enumToString(ClientDocumentTypeEnum, readInt(stream));
  doc.id = readLong(stream);
  doc.state = enumToString(ClientDocumentStateEnum, readInt(stream));
  doc.comment = readUTF(stream);
  doc.imgTypes = [];

  let imgTypesCount = readInt(stream);
  for (let i = 0; i < imgTypesCount; ++i) {
    doc.imgTypes.push(
      enumToString(ClientDocumentImageTypeEnum, readInt(stream))
    );
  }

  return doc;
};

////
//// ENUMS
////

const ClientDocumentImageTypeEnum = {
  PassportFirstPage: 1, // Первая страница паспорта
  PassportSecondPage: 2, // Вторая страница паспорта
  Inn: 3, // ИНН
  Snils: 4, // СНИЛС
  SelfieWithPassport: 5, // Селфи с паспортом

  strs: {
    1: "PassportFirstPage",
    2: "PassportSecondPage",
    3: "Inn",
    4: "Snils",
    5: "SelfieWithPassport"
  }
};

const ClientDocumentTypeEnum = {
  Passport: 1, // Паспорт
  Inn: 2, // ИНН
  Snils: 3, // СНИЛС

  strs: {
    1: "Passport",
    2: "Inn",
    3: "Snils"
  }
};

const ClientDocumentStateEnum = {
  NotChecked: 0, // не проверен
  Valid: 1, // проверен и валиден
  Invalid: 2, // проверен и не валиден

  strs: {
    0: "NotChecked",
    1: "Valid",
    2: "Invalid"
  }
};

const ClientBindingFailSourceEnum = {
  Unknown: 0, // Отображаем "свяжитесь с альфабет"
  Duplicate: 5, // перс данные есть у другого клиента. Игроку показываем "С указанными пасп данными уже существует клиент ЦУПИС с другим номером телефона. Свяжитесь с ЦУПИС"
  Other: 7, // "свяжитесь с цупис"
  strs: {
    0: "Unknown",
    5: "Duplicate",
    7: "Other"
  }
};

const ClientScriptFlag = {
  None: 0, // Отображаем проверку документов
  Courier: 1, // Отображаем страницу с курьером
  UploadDocs: 2, // Отображаем страницу загрузки документов
  OpenAccount: 3, // Открытый аккаунт
  strs: {
    0: "None",
    1: "Courier",
    2: "UploadDocs",
    3: "OpenAccount"
  }
};

const ClientFinancialLimitsEnum = {
  Limited: 1, // Ограничено, отображаем рекомендации по повышению уровня до Full
  Full: 2, // Не ограничено
  None: 0, // Не ограничено

  strs: {
    0: "None",
    1: "Limited",
    2: "Full"
  }
};

const enumToString = (type, value) => {
  return type.strs[value];
};

const readBool = stream => {
  return readByte(stream) === 1 ? true : false;
};

const readDateTime = stream => {
  return readLong(stream);
};

const writeDateTime = timestamp => {
  writeLong(timestamp);
};

//// CUPIS END ////

const writeFloat = N => {
  writeInt(Math.ceil(N * 1000));
};
const writeInt = n => {
  if (n < 0) n = 256 + n;
  let n0 = n;
  sendarray[sendindex + 3] = Math.floor(n / (256 * 256 * 256));
  let n1 = n0 - sendarray[sendindex + 3] * 256 * 256 * 256;
  sendarray[sendindex + 2] = Math.floor(n1 / (256 * 256));
  let n2 = n1 - sendarray[sendindex + 2] * 256 * 256;
  sendarray[sendindex + 1] = Math.floor(n2 / 256);
  let n3 = n2 - sendarray[sendindex + 1] * 256;
  sendarray[sendindex] = n3;
  sendindex = sendindex + 4;
};

const writeStake = N => {
  writeInt(Math.ceil(N * 100));
};

const writeShort = n => {
  if (n < 0) n = 256 + n;
  let n2 = n;
  sendarray[sendindex + 1] = Math.floor(n2 / 256);
  let n3 = n2 - sendarray[sendindex + 1] * 256;
  sendarray[sendindex] = n3;
  sendindex = sendindex + 2;
};
const writeByte = n => {
  if (n < 0) n = 256 + n;
  sendarray[sendindex] = n;
  sendindex = sendindex + 1;
};
const writeUTF = string => {
  let string2 = fromUTF8(string);
  writeShort(string2.length);
  let i = 0;
  for (i = 0; i < string2.length; i++)
    sendarray[sendindex + i] = string2.charCodeAt(i);
  sendindex = sendindex + i;
};
const writeLong = n => {
  let i = 0;
  let a = [];
  a[0] = n;

  for (i = 0; i < 8; i++) {
    sendarray[sendindex + (8 - 1 - i)] = Math.floor(
      a[i] / Math.pow(256, 8 - 1 - i)
    );
    if (i < 7)
      a[i + 1] =
        a[i] - sendarray[sendindex + (8 - 1 - i)] * Math.pow(256, 8 - 1 - i);
  }
  sendindex = sendindex + 8;
};
const readUnsignedInt = stream => {
  let l =
    stream[seek] +
    stream[seek + 1] * 256 +
    stream[seek + 2] * 65536 +
    stream[seek + 3] * 16777216;
  seek = seek + 4;
  return l;
};
const readInt = stream => {
  let l =
    stream[seek] +
    stream[seek + 1] * 256 +
    stream[seek + 2] * 65536 +
    stream[seek + 3] * 16777216;
  if (l > 2147483648) l = l - 4294967296;
  seek = seek + 4;
  return l;
};

const readByte = stream => {
  let l = stream[seek];
  if (l > 127) l = l - 256;
  seek = seek + 1;
  return l;
};
const readShort = stream => {
  let l = stream[seek] + stream[seek + 1] * 256;
  if (l > 32768) l = l - 65536;
  seek = seek + 2;
  return l;
};
const readUnsignedByte = stream => {
  let l = stream[seek];
  seek = seek + 1;
  return l;
};
const readUnsignedShort = stream => {
  let l = stream[seek] + stream[seek + 1] * 256;
  seek = seek + 2;
  return l;
};
const readLong = stream => {
  let l = 0;
  for (let i = 0; i < 8; i++) {
    l = l + stream[seek + i] * Math.pow(256, i);
  }
  seek = seek + 8;
  return l;
};
const readUTF = stream => {
  let p = stream[seek] + stream[seek + 1] * 256;
  seek = seek + 2;
  let string = "";
  let i = 0;
  string = stream.subarray(seek, seek + p);
  seek = seek + p;
  const name = toUTF8A(string);
  if (name.includes("@")) {
    const lang = getState().user.language_user.value;

    if (lang == "en") {
      return name.split("@")[0].replace("#", "");
    } else {
      return name.split("@")[1].replace("#", "");
    }
  } else return name;
};
const readDate = stream => {
  let isDate = readByte(stream);
  if (isDate !== 1) return null;
  let day = readShort(stream);
  let month = readShort(stream);
  let year = readShort(stream);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
};

const toUTF8A = array => {
  let string = "";
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  let c3 = 0;

  while (i < array.length) {
    c = array[i];

    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      c2 = array[i + 1];
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = array[i + 1];
      c3 = array[i + 2];
      string += String.fromCharCode(
        ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      );
      i += 3;
    }
  }
  return string;
};
const fromUTF8 = string => {
  string = string.toString().replace(/\r\n/g, "\n");
  let utftext = "";

  for (let n = 0; n < string.length; n++) {
    let c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }

  return utftext;
};
const Encode_Byte = b => {
  let Base64Code =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  return Base64Code[b % 64];
};
const EncodeBase64_2 = mm => {
  let i;
  i = 0;
  let Result = "";
  while (i < mm.length - 1) {
    Result = Result + Encode_Byte(Math.floor(mm[i] / 4));
    Result = Result + Encode_Byte((mm[i] * 16) | Math.floor(mm[i + 1] / 16));
    if (i + 1 < mm.length - 1)
      Result =
        Result + Encode_Byte((mm[i + 1] * 4) | Math.floor(mm[i + 2] / 64));
    else Result = Result + "=";
    if (i + 2 < mm.length - 1) Result = Result + Encode_Byte(mm[i + 2]);
    else Result = Result + "=";
    i = i + 3;
  }
  return Result;
};

const getEventKeyTypeLine = (lineType_radar, id) => {
  switch (lineType_radar) {
    case 0:
      return "00" + id;
    case 1:
      return "01" + id;
    case 5:
      return "03" + id;
    case 7:
      return "04" + id;
    case 8:
      return "05" + id;
    case 11:
      return "06" + id;
    case 12:
      return "07" + id;
    case 13:
      return "08" + id;
    case 15:
      return "09" + id;
    case 19:
      return "10" + id;
    case 20:
      return "11" + id;
    case 21:
      return "13" + id;
    case 22:
      return "14" + id;
    case 23:
      return "15" + id;
  }
};

const getEventKeyTypeEvent = (event_type_radar, id) => {
  if (event_type_radar === 2) event_type_radar = 0;
  if (event_type_radar < 10) return `0${event_type_radar}${id}`;
  else return `${event_type_radar}${id}`;
};

const getTournamentKey = (lineType_radar, id) => {
  switch (lineType_radar) {
    case 2:
      return "02" + id;
    case 3:
      return "00" + id; // BetRadar
    case 4:
      return "01" + id;
    case 6:
      return "03" + id;
    case 9:
      return "04" + id;
    case 10:
      return "05" + id;
    case 15:
      return "06" + id;
    case 16:
      return "07" + id;
    case 17:
      return "08" + id;
    case 18:
      return "09" + id;
    case 19:
      return "10" + id; // SSLN
    case 20:
      return "11" + id; // BetGenius
    case 21:
      return "13" + id; // LSport
    case 22:
      return "14" + id;
    case 23:
      return "15" + id;
  }
};
