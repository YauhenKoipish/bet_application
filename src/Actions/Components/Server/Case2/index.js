import C from "../../../../Constants/";

export const saveLines = lines => {
  return {
    type: C.SAVE_LINES,
    lines
  };
};

export const saveLinesByCK = linesByCK => {
  return {
    type: C.SAVE_LINES_BY_CK,
    linesByCK
  };
};

export const saveEvents = (events, eventsMap) => {
  return {
    type: C.SAVE_EVENTS,
    events,
    eventsMap
  };
};

export const saveEventsByGB = eventsByGB => {
  return {
    type: C.SAVE_EVENTS_BY_GB,
    eventsByGB
  };
};

export const saveNewEvents = events => {
  return {
    type: C.SAVE_NEW_EVENTS,
    events
  };
};

export const deleteEvent = event => {
  return {
    type: C.DELETE_EVENT,
    event
  };
};

export const getExtraLine = id => {
  return {
    type: C.GET_EXTRALINE,
    id
  };
};

export const saveExtralinesArrayNeedToRequest = array => {
  return {
    type: C.SAVE_EXTRALINES_ARRAY_NEED_TO_REQUEST,
    array
  };
};
