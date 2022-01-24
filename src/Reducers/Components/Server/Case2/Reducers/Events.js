import C from "../../../../../Constants/";
import { mergeEvents } from "../../../../../Services/Shared";

const initialState = new Map();

export const events = (state = initialState, action) => {
    if (action.type === C.RESET_STATE) {
        state.forEach(ev => (ev = null));
        state = null;
        return new Map();
    }
    if (action.type === C.SAVE_EVENTS) {
        action.events.forEach((val, key) => {
            // if (val.status === -1 || val.status === 3 || val.status === 4) {
            //     if (state.has(key)) {
            //         state.delete(key);
            //     }
            //     return;
            // }
            if (state.has(key))
                val = mergeEvents(
                    val,
                    state.get(key),
                    action.lines,
                    action.linesByCK
                );
            state.set(key, val);
        });
        return state;
    }
    return state;
};
