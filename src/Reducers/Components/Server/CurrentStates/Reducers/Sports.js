import C from '../../../../../Constants/'

const initialState =  [];

export const sports = (state = initialState, action) => {
    if(action.type === C.SAVE_CURRENT_SPORTS){
        return action.sports;
    }
    return state
};
