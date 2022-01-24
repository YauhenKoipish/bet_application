import C from "../../../Constants";

export const addResponseEndingBonusOnDeposit = (response: number) => {
    return {
        type: C.ADD_RESPONSE_ENDING_BONUS_ON_DEPOSIT,
        response
    };
};

export const changeStateConnectWithdrawalChanels = (val: any) => {
    return {
        type: C.CHANGE_STATE_CONNECT_WITHDRAWAL_CHANELS,
        val
    };
};

export const changeReplenishmentChanels = (chanels: any) => {
    return {
        type: C.CHANGE_REPLENISHMENT_CHANELS,
        chanels
    };
};

export const changeWithdrawalChanels = (chanels: any) => {
    return {
        type: C.CHANGE_WITHDRAWAL_CHANELS,
        chanels
    };
};
