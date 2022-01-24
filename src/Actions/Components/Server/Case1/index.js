import C from '../../../../Constants/'
//saveSportEntity, saveCategoryEntity, saveTournamentEntity, saveMarketEntity
export const saveSportEntity = (sports) => {
    return {
        type: C.SAVE_SPORT_ENTITY,
        sports
    };
};

export const saveCategoryEntity = (categories) => {
    return {
        type: C.SAVE_CATEGORY_ENTITY,
        categories
    };
}; 

export const saveTournamentEntity = (tournaments) => {
    return {
        type: C.SAVE_TOURNAMENT_ENTITY,
        tournaments
    };
};

export const saveMarketEntity = (markets) => {
    return {
        type: C.SAVE_MARKET_ENTITY,
        markets
    };
};

export const saveMarketByNumEntity = (markets) => {
    return {
        type: C.SAVE_MARKET_BY_NUM_ENTITY,
        markets
    };
};