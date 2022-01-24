import React from "react";
// import "./style/verification.css";
// import "./style/verifiacation-courier.css";
// import "./style/verification-cap.css";

import { connect } from "react-redux";
import Courier from "./Components/Courier";
import UploadDocuments from "./Components/UploadDocuments/";
import DocsOnCheck from "./Components/DocsOnCheck";
import { updateCallMeResponseVerification } from "../../../../../Actions/Components/Verification/";
import { showModal } from "../../../../../Actions/Components/Modal";

function Verification(props) {
  const { verificationInfo } = props;
  if (
    !verificationInfo.isIdentificationInitiated ||
    verificationInfo.scriptFlag === "None" ||
    !verificationInfo.scriptFlag ||
    (verificationInfo.identStatus === "None" &&
      verificationInfo.scriptFlag === "OpenAccount")
  )
    return <DocsOnCheck text={props.lang.checkDocuments} lang={props.lang} />;
  if (verificationInfo.scriptFlag === "Courier") return <Courier {...props} />;
  if (verificationInfo.scriptFlag === "UploadDocs")
    return <UploadDocuments {...props} />;
  return "Раздел верификации недостуен";
}

const mapStateToProps = state => {
  return {
    verificationInfo: state.verification.ident,
    callMeResponse: state.verification.callMeResponse,
    userInfo: state.user.isAuthorize,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCallMeResponseVerification: val =>
      dispatch(updateCallMeResponseVerification(val)),
    showModal: modal => dispatch(showModal(modal))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verification);
