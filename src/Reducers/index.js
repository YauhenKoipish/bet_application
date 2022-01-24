import { combineReducers } from "redux";
import { server } from "./Components/Server/";
import { menu } from "./Components/Menu/";
import search from "./Components/Search/";
import user from "./Components/User/";
import { accountMenu } from "./Components/AccountMenu/";
import { socket, isLoadedData } from "./Components/Socket/";
import { view } from "./Components/View/";
import { history } from "./Components/History/";
import { filters } from "./Components/Filters/";
import { paintingDictionary } from "./Components/Painting/";
import { dictionaryPaintingActive } from "./Components/View/DictionaryPaintingActive";
import { modal, modalTest, showModal } from "./Components/Modal/";
import { cupis } from "./Components/Cupis/";
import coupon from "./Components/Coupon/";
import registration from "./Components/Registration/";
import tickets from "./Components/Tickets";
import verification from "./Components/Verification";
import recoverPSW from "./Components/RecoverPSW/";
import bonusOnDeposit from "./Components/BonusOnDeposit/";
import matchStatuses from "./Components/MatchStatuses/";

import bookmakerInformation from "./Components/BookmakerInformation";

import C from "../Constants/";

const mainSetting = (state = {}, action) => {
  if (action.type === C.SET_MAIN_SETTIN) {
    return action.value;
  }
  return state;
};
const viewSingleBet = (state = false, action) => {
  if (action.type === C.CHANGE_VIEW_SINGLE_BET) {
    return action.value;
  }
  return state;
};

const width_screen = (state = window.innerWidth, action) => {
  if (action.type === C.CHANGE_SIZE_SCREEN) {
    return action.value;
  }
  return state;
};

const isBookmaker = (state = false, action) => {
  if (action.type === C.BOOKMAKER_ADMIN) {
    return action.value;
  }
  return state;
};

export const reducers = combineReducers({
  socket,
  width_screen,
  viewSingleBet,
  recoverPSW,
  server,
  menu,
  user,
  accountMenu,
  isLoadedData,
  view,
  filters,
  paintingDictionary,
  dictionaryPaintingActive,
  search,
  coupon,
  tickets,
  modal,
  registration,
  modalTest,
  history,
  verification,
  cupis,
  bonusOnDeposit,
  matchStatuses,
  mainSetting,
  showModal,
  isBookmaker,
  bookmakerInformation
});
