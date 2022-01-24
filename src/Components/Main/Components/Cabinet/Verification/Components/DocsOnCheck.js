import React from "react";
import preloader from "../img/gifPreloader.gif";

export default function DocsOnCheck(props) {
  return (
    <div className="verification-cap ">
      <div className="verification-cap__text">
        <div className="verification-cap__title">{props.lang.happyRegist}</div>
        <div className="verification-cap__info">{props.lang.dataCheck}</div>
      </div>

      <div className="verification-cap__preloader">
        <img src={preloader} alt="" />
      </div>
    </div>
  );
}
