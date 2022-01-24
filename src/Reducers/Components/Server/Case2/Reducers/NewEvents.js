import C from "../../../../../Constants/";
import { mergeEvents} from "../../../../../Services/Shared";

const initialState = new Map();

export const newEvents = (state = initialState, action) => {
  if (action.type === C.RESET_STATE) {
    state.forEach(ev => (ev = null));
    state = null;

    return new Map();
  }
  if (action.type === C.SAVE_EVENTS) {
    if (action.events.size !== action.eventsMap.size) {
      const events = new Map();
      let isDeletedEv;
      action.events.forEach(ev => {
        isDeletedEv = false;
        if (ev.status === -1 || ev.status === 3 || ev.status === 4) {
          isDeletedEv = true;
        }
        if (!isDeletedEv) {
          if (action.eventsMap.has(ev.id)) {
            ev = mergeEvents(
              action.eventsMap.get(ev.id),
              ev,
              action.lines,
              action.linesByCK
            );
          }
          events.set(ev.id, ev);
        }
      });
      return events;
    }
    return new Map(action.events);
  }
  // if (action.type === C.DELETE_OR_PAUSE_EVENT) {
  //     const event = action.eventsMap.get(action.eventId);
  //     if (!event) return state;
  //     if (event.status > 0) {
  //         event.isLinesBlocked = true;
  //         return new Map([[action.eventId, event]]);
  //     }
  // }
  // if (action.type === C.BET_STOP) {
  //     let isUpdate = false;
  //     action.eventsMap.forEach(ev => {
  //         if (ev.provider === action.data.providerId) {
  //             if (action.data.providerId === 1) {
  //                 if (action.data.isBetStop) ev.isBetStop = true;
  //                 else ev.isBetStop = false;
  //                 isUpdate = true;
  //             }
  //         }
  //     });
  //     if (isUpdate) return new Map(action.eventsMap);
  //     return state;
  // }
  return state;
};
