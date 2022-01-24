import React from "react";

export default function Slide(props) {
  return (
    <div
      className={
        "alfa-club__item " + (props.isActive ? " active" : "") + props.classes
      }
      ref={props.elem}
    >
      <div className="alfa-club__img">
        <img src={props.svgComponent} />
      </div>
      <div className="alfa-club__status">
        <span className="alfa-club__points">
          {props.isCurrentLevel ? props.points : ""}
        </span>
      </div>
    </div>
  );
}
