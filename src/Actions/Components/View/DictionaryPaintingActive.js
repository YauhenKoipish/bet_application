import C from "../../../Constants/";

export const dictionaryPaintingActive = name => {
    return {
        type: C.CHANGE_VIEW_PAINTING,
        name
    };
};
