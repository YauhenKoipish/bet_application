import C from "../../../Constants/";

export const openMenu = () => {
    return {
        type: C.OPEN_MENU
    };
};

export const closeMenu = () => {
    return {
        type: C.CLOSE_MENU
    };
};
export const changeActiveItem = sportName => {
    return {
        type: C.CHANGE_ACTIVE_MENU,
        value: sportName
    };
};
