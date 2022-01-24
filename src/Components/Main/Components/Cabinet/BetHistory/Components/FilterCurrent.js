import React from "react";

export default function FilterCurrent(props) {
    return (
        <div
            className={
                ("elem" + props.className ? "before_elem" : "") +
                (props.isActive ? " active " : "")
            }
            onClick={props.handleClick}
        >
            {props.name}
        </div>
    );
}
