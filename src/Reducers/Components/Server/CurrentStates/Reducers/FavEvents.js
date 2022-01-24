import C from "../../../../../Constants/";
import {
  addFavoriteToLocalStorage,
  removeFavoriteToLocalStorage
} from "../../../../../Services/Shared";
import {
  getLocalStorageData,
  setLocalStorage
} from "../../../../../Services/LocalStorage";

const initialState = getLocalStorageData("favEventsPrematch")
  ? getLocalStorageData("favEventsPrematch")
  : [];

export const favEventsPrematch = (state = initialState, action) => {
  switch (action.type) {
    case C.ADD_EVENT_TO_FAV_PREMATCH:
      addFavoriteToLocalStorage("favEventsPrematch", action.eventId);
      return [...state, action.eventId];
    case C.ADD_EVENTS_TO_FAV_PREMATCH:
      setLocalStorage("favEventsPrematch", action.events);
      return action.events;
    case C.REMOVE_EVENT_FROM_FAV_PREMATCH:
      removeFavoriteToLocalStorage("favEventsPrematch", action.eventId);
      const index = state.indexOf(action.eventId);
      if (index === -1) return state;
      state.splice(index, 1);
      return [...state];

    default:
      return state;
  }
};

const initialStateLive = getLocalStorageData("favEventsLive")
  ? getLocalStorageData("favEventsLive")
  : [];

export const favEventsLive = (state = initialStateLive, action) => {
  switch (action.type) {
    case C.ADD_EVENT_TO_FAV_LIVE:
      addFavoriteToLocalStorage("favEventsLive", action.eventId);
      return [...state, action.eventId];
    case C.ADD_EVENTS_TO_FAV_LIVE:
      setLocalStorage("favEventsLive", action.events);
      return action.events;
    case C.REMOVE_EVENT_FROM_FAV_LIVE:
      removeFavoriteToLocalStorage("favEventsLive", action.eventId);
      const index = state.indexOf(action.eventId);
      if (index === -1) return state;
      state.splice(index, 1);
      return [...state];

    default:
      return state;
  }
};
