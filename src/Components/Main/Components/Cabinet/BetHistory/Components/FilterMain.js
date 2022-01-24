import React from "react";

export default function FilterMain(props) {
  return (
    <div className={props.isActive ? "active" : ""} onClick={props.handleClick}>
      {props.name}
    </div>
  );
}
