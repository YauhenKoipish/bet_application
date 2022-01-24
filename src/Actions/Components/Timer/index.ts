import C from "../../../Constants/";
export const saveStateTimer = number => {
    return {
        type: C.TIMER_REGISTRATION,
        value: number
    };
};
