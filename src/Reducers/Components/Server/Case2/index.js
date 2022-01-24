import { combineReducers } from "redux";

import { events } from "./Reducers/Events";
import { newEvents } from "./Reducers/NewEvents";
import { deletedEvent } from "./Reducers/DeletedEvent";
import { eventsByGB } from "./Reducers/EventsByGB";
import { lines } from "./Reducers/Lines";
import { linesByCK } from "./Reducers/LinesByCK";

export const case2 = combineReducers({
    events,
    eventsByGB,
    lines,
    linesByCK,
    newEvents,
    deletedEvent
});
