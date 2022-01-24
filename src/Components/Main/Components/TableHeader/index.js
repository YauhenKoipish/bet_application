import React from "react";
import { getSportIcon } from "../../../../Services/Shared";

const arrow = getSportIcon("arrow");

export default function index({
  handleClick = f => f,
  name = "",
  isArrow = false,
  isOpen = true,
  icon = null
}) {
  return (
    <div className="main-table__header" onClick={handleClick}>
      {icon ? <div className="main-table__img">{icon}</div> : ""}
      <div className="main-table__name">{name}</div>
      {isArrow ? (
        <div
          className={
            "main-table__arrow arrow" + (isOpen ? " transform-arrow" : "")
          }
        >
          {arrow}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
