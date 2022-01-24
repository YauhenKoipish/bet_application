import C from "../../../Constants/";

const initialState = {
    mobile: {},
    tablet: {}
};

export const paintingDictionary = (state = initialState, action) => {
    switch (action.type) {
        case C.PAINTING_DICTIONARY_MOBILE:
            return {
                ...state,
                mobile: { ...action.mobile }
            };
        case C.PAINTING_DICTIONARY_TEABLET:
            return {
                ...state,
                tablet: { ...action.tablet }
            };
        default:
            return state;
    }
};
