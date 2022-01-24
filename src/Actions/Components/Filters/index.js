import C from "../../../Constants/";

export const changeActiveValueTimeFilter = val => {
  return {
    type: C.CHANGE_TIME_FILTER_PREMATCH,
    val
  };
};
