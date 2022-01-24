import C from "../../../../../Constants/";
import {
    addFavoriteToLocalStorage,
    removeFavoriteToLocalStorage
} from "../../../../../Services/Shared";
import { getLocalStorageData } from "../../../../../Services/LocalStorage";

const initialState = getLocalStorageData("favSportsPrematch")
    ? getLocalStorageData("favSportsPrematch")
    : [];

export const favSportsPrematch = (state = initialState, action) => {
    switch (action.type) {
        case C.ADD_SPORT_TO_FAV_PREMATCH:
            addFavoriteToLocalStorage("favSportsPrematch", action.sportId);
            return [...state, action.sportId];
        case C.REMOVE_SPORT_FROM_FAV_PREMATCH:
            removeFavoriteToLocalStorage("favSportsPrematch", action.sportId);
            const index = state.indexOf(action.sportId);
            if (index === -1) return state;
            state.splice(index, 1);
            return [...state];

        default:
            return state;
    }
};

const initialStateLive = getLocalStorageData("favSportsLive")
    ? getLocalStorageData("favSportsLive")
    : [];

export const favSportsLive = (state = initialStateLive, action) => {
    switch (action.type) {
        case C.ADD_SPORT_TO_FAV_LIVE:
            addFavoriteToLocalStorage("favSportsLive", action.sportId);
            return [...state, action.sportId];
        case C.REMOVE_SPORT_FROM_FAV_LIVE:
            removeFavoriteToLocalStorage("favSportsLive", action.sportId);
            const index = state.indexOf(action.sportId);
            if (index === -1) return state;
            state.splice(index, 1);
            return [...state];

        default:
            return state;
    }
};
