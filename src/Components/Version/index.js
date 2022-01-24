import React from "react";
import C, { VERSION_CHANGES } from "../../Constants/";
import { showModal } from "../../Actions/Components/Modal/";
import { dispatch } from "../../";

export default function index() {
  return (
    <div className="version-block" onClick={showChanges}>
      <span>{C.VERSION}</span>
    </div>
  );
}

const showChanges = () => {
  dispatch(
    showModal({
      title: "Версия " + C.VERSION,
      text: (
        <div className="version_modal_changes">
          {<VERSION_CHANGES />}
          {<ProviderAdvice />}
        </div>
      )
    })
  );
};

export const ProviderAdvice = () => {
  return (
    <div className="provider_advice">
      <div className="br">BetRadar</div>
      <div className="ssln">SSLN</div>
      <div className="bg">BetGenius</div>
      <div className="ls">LSports</div>
    </div>
  );
};
