import C from "../../../../Constants/";

export const saveCurrentSports = sports => {
  return {
    type: C.SAVE_CURRENT_SPORTS,
    sports
  };
};

export const addSportToFav = (sportId, status) => {
  let type;
  if (status === 0) {
    type = C.ADD_SPORT_TO_FAV_PREMATCH;
  } else if (status === 1) {
    type = C.ADD_SPORT_TO_FAV_LIVE;
  }
  return {
    type,
    sportId
  };
};

export const removeSportFromFav = (sportId, status) => {
  let type;
  if (status === 0) {
    type = C.REMOVE_SPORT_FROM_FAV_PREMATCH;
  } else if (status === 1) {
    type = C.REMOVE_SPORT_FROM_FAV_LIVE;
  }
  return {
    type,
    sportId
  };
};

export const addTournamentToFav = (tournamentId, status) => {
  let type;
  if (status === 0) {
    type = C.ADD_TOURNAMENT_TO_FAV_PREMATCH;
  } else if (status === 1) {
    type = C.ADD_TOURNAMENT_TO_FAV_LIVE;
  }
  return {
    type,
    tournamentId
  };
};

export const removeTournamentFromFav = (tournamentId, status) => {
  let type;
  if (status === 0) {
    type = C.REMOVE_TOURNAMENT_FROM_FAV_PREMATCH;
  } else if (status === 1) {
    type = C.REMOVE_TOURNAMENT_FROM_FAV_LIVE;
  }
  return {
    type,
    tournamentId
  };
};

export const addEventToFav = (eventId, status) => {
  let type;
  if (status === 0) {
    type = C.ADD_EVENT_TO_FAV_PREMATCH;
  } else if (status === 1) {
    type = C.ADD_EVENT_TO_FAV_LIVE;
  }
  return {
    type,
    eventId
  };
};

export const removeEventFromFav = (eventId, status) => {
  let type;
  if (status === 0) {
    type = C.REMOVE_EVENT_FROM_FAV_PREMATCH;
  } else if (status === 1) {
    type = C.REMOVE_EVENT_FROM_FAV_LIVE;
  }
  return {
    type,
    eventId
  };
};

export const addFavEvents = (events, status) => {
  let type;
  if (status === 0) {
    type = C.ADD_EVENTS_TO_FAV_PREMATCH;
  } else if (status === 1) {
    type = C.ADD_EVENTS_TO_FAV_LIVE;
  }
  return {
    type,
    events
  };
};
