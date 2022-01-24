import { combineReducers } from "redux";

import { sports } from "./Reducers/Sports";
import { favSportsPrematch, favSportsLive } from "./Reducers/FavSports";
import { favEventsPrematch, favEventsLive } from "./Reducers/FavEvents";
import { favTournamentsPrematch } from "./Reducers/FavTournaments";

export const currentStates = combineReducers({
    sports,
    favSportsPrematch,
    favSportsLive,
    favTournamentsPrematch,
    favEventsPrematch,
    favEventsLive
});
