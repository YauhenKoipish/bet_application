import C from "../../../Constants/";

export const changeViewTableFilter = (cols, filters) => {
    return {
        type: C.CHANGE_VIEW_TABLE_FILTER,
        cols,
        filters
    };
};

export const changeViewTopNav = val => {
    return {
        type: C.CHANGE_VIEW_TOP_NAV,
        val
    };
};

export const changeViewSingleBet = boolean => {
    return {
        type: C.CHANGE_VIEW_SINGLE_BET,
        value: boolean
    };
};
