import C from "../../../../Constants/";

export const saveCoefbuilder = coef => {
    return {
        type: C.SAVE_COEF_BUILER,
        coef
    };
};

export const errorModalBB = arr => {
    return {
        type: C.ERROR_CODE_BUILDER,
        arr
    };
};

export const editBuilderCoupon = (line, event) => {
    return {
        type: C.EDIT_BUILDER,
        line,
        event
    };
};

export const builderRemoveError = () => {
    return {
        type: C.REMOVE_ERROR_BUILDER
    };
};

export const addBetBuilder = bbGroup => {
    return {
        type: C.ADD_BB_GROUP,
        bbGroup
    };
};

export const remvoeOneBuilder = (event, key) => {
    const removeOne = { event, key };
    return {
        type: C.REMOVE_ONE_BUILDER,
        removeOne
    };
};

export const removeAll = event => {
    return {
        type: C.REMOVE_ALL_BUILDER
    };
};
