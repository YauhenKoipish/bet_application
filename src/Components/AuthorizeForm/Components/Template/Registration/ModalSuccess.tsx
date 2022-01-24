import React from "react";
import { routsName } from "../../../../../Router/RouterList";

import ImgBg from "../../../../../img/authorize/RegReady.png";
import { getIcon } from "../../../../../Services/Shared";

export default function ModalSuccess(state) {
  // debugger;
  return (
    <>
      <div className="block">
        <img src={ImgBg} alt="" />
        <div className="title_success_registration">
          <span>{getIcon("logo-big")}</span>
          <span>{state.lang.header.registration.registrationComplete}</span>
        </div>
        <button onClick={() => state.callback("/")}>
          {state.lang.modal.successRegistration.goodGame}
        </button>
      </div>
    </>
  );
}
