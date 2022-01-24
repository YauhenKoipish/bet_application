import C from "../../../Constants/";

export const paintingDictionary = (data, view) => {
    if (view == "tablet")
        return {
            type: C.PAINTING_DICTIONARY_TEABLET,
            tablet: { ...data }
        };
    else
        return {
            type: C.PAINTING_DICTIONARY_MOBILE,
            mobile: { ...data }
        };
};
