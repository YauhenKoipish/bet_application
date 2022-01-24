import React from "react";

export default props => {
    const color = props.color ? props.color : "";
    return (
        <div className="line-live__score">
            <div className="line-live__column">
                <div className={"bold " + color}>{props.homeSetScore}</div>
                <div className={"bold " + color}>{props.awaySetScore}</div>
            </div>
            <div className="line-live__column">
                <div>{props.homeCurrentSetScore}</div>
                <div>{props.awayCurrentSetScore}</div>
            </div>
            <div className="line-live__column">
                <div>{props.homeGameScore}</div>
                <div>{props.awayGameScore}</div>
            </div>
        </div>
    );
};
