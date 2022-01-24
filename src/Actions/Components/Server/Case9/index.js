import C from "../../../../Constants/";

export const betStop = data => {
    return {
        type: C.BET_STOP,
        data
    };
};
