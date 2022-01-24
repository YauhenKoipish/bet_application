import C from "../../../Constants/";

export const changeSearchResults = (data) => {
    return {
        type: C.CHANGE_SEARCH_RESULT,
        data
    };
};

export const closeSearch = () => {
    return {
        type: C.CLOSE_SEARCH,
    };
};

export const openSearch = () => {
    return {
        type: C.OPEN_SEARCH,
    };
};
