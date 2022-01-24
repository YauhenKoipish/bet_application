import C from "../../../../Constants/";

const initialState = {
    active: {
        name: null, //"24 hourse", //DictEn.hourToday, /// Указать Актуальынй словарь при первой загрузке
        val: 24 * 60 * 60 * 1000,
        activeText: "hourToday"
    }
};

export const timeFilter = (state = initialState, action) => {
    if (action.type === C.CHANGE_TIME_FILTER_PREMATCH) {
        return {
            ...state,
            active: action.val
        };
    }
    return state;
};
