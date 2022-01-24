import C from "../../../../Constants/";

export const deleteOrPauseEvent = eventId => {
    return {
        type: C.DELETE_OR_PAUSE_EVENT,
        eventId
    };
};
