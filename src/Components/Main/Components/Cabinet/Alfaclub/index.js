import React from "react";
import Info from "./Components/Info";
import Slider from "./Components/Slider";
// import "./style/alfa-club.css";
// import "./style/terms.css";

export default function Alfaclub(props) {
  return (
    <div className="alfa-club">
      <div className="alfa-club__header">
        <div className="alfa-club__title">
          Alfa club – <br />
          бонусы и привилегии
        </div>
        <div className="alfa-club__motto">ваша выгода каждый день</div>
      </div>
      <Slider />
      <Info />
    </div>
  );
}
