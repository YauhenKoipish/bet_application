import C from "../../../Constants/";

export const updateIndentComponentVerification = data => {
  return {
    type: C.UPDATE_INDENT_COMPONENT_VERIFICATION,
    data
  };
};

export const updateDocumentsComponentVerification = data => {
  return {
    type: C.UPDATE_DOCUMENTS_COMPONENT_VERIFICATION,
    data
  };
};

export const updateCallMeResponseVerification = data => {
  return {
    type: C.UPDATE_CALL_ME_RESPONSE_VERIFICATION,
    data
  };
};

export const updateVerificationStatus = status => {
  return {
    type: C.UPDATE_VERIFICATION_STATUS,
    status
  };
};
