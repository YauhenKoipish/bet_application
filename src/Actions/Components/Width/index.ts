import C from "../../../Constants/index";

export const changeParamScreen = number_size_width => {
    return {
        type: C.CHANGE_SIZE_SCREEN,
        value: number_size_width
    };
};
