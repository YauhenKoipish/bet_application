import React from "react";

export default function ReplenishmentItem({
  isActive = false,
  handleClick = f => f,
  name = "",
  rusName = "",
  Img,
  ImgFill
}) {
  return (
    <div
      className={"user-replenishment__item" + (isActive ? " active" : "")}
      onClick={handleClick}
    >
      <div className="user-replenishment__icon">
        {!isActive ? <Img /> : <ImgFill />}
      </div>
      <div className="user-replenishment__name">{rusName}</div>
    </div>
  );
}
