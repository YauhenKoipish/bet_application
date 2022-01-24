import History from "./History";
import C from "../Constants/";

export const redirect = store => next => action => {
    //eslint-disable-line no-unused-vars
    if (action.type === C.ROUTING) {
        History[action.payload.method](action.payload.nextUrl);
    }

    return next(action);
};
