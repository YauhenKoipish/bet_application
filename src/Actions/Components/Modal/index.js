import C from "../../../Constants/";

export const showModal = data => {
    return {
        type: C.SHOW_MODAL,
        data
    };
};

export const closeModal = () => {
    return {
        type: C.CLOSE_MODAL
    };
};

export const showModalTest = () => {
    return {
        type: C.SHOW_MODAL_TEST
    };
};
export const closeModalTest = () => {
    return {
        type: C.CLOSE_MODAL_TEST
    };
};
