import React from "react";
import { transliterate, getSportIcon } from "../../../Services/Shared";

const Category = props => {
  //   if (props.isActive) debugger;
  return (
    <li
      className={
        "menu-scroll__item" +
        (props.isActive
          ? " active " + transliterate(props.name, true) + "-before"
          : "")
      }
      onClick={props.func}
    >
      <span className="menu-scroll__img">
        {/* {getSportIcon(
          props.sportId,
          null,
          props.isActive ? "#f2bf54" : "white"
        )} */}

        {props.img}
      </span>
      <span className="menu-scroll__name">{props.name}</span>
    </li>
  );
};

export default Category;
