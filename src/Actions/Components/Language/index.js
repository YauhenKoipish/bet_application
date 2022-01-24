import C from "../../../Constants/";

export const changeLanguage = object => {
  return {
    type: C.LANGUAGE_USER,
    isModalShow: false,
    value: object.lang,
    dict: object.dict
  };
};
