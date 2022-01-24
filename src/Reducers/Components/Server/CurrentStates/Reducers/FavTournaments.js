import C from "../../../../../Constants/";
import {
    addFavoriteToLocalStorage,
    removeFavoriteToLocalStorage
} from "../../../../../Services/Shared";
import { getLocalStorageData } from "../../../../../Services/LocalStorage";

const initialState = getLocalStorageData("favTournamentsPrematch")
    ? getLocalStorageData("favTournamentsPrematch")
    : [];

export const favTournamentsPrematch = (state = initialState, action) => {
    switch (action.type) {
        case C.ADD_TOURNAMENT_TO_FAV_PREMATCH:
            addFavoriteToLocalStorage(
                "favTournamentsPrematch",
                action.tournamentId
            );
            return [...state, action.tournamentId];
        case C.REMOVE_TOURNAMENT_FROM_FAV_PREMATCH:
            removeFavoriteToLocalStorage(
                "favTournamentsPrematch",
                action.tournamentId
            );
            const index = state.indexOf(action.tournamentId);
            if (index === -1) return state;
            state.splice(index, 1);
            return [...state];

        default:
            return state;
    }
};
