import React from "react";

export default function index(props) {
    if (props.view === "small") return <>{props.children}</>;

    return (
        <div className="history-money__big money-big">
            <div className="money-big__titles">
                <div className="money-big__title">
                    <span>{props.lang.dataAndTime}</span>
                </div>
                <div className="money-big__title">
                    <span>{props.lang.way}</span>
                </div>
                <div className="money-big__title">
                    <span>{props.lang.sum}</span>
                </div>
                <div className="money-big__title">
                    <span>{props.lang.tax}</span>
                </div>
                <div className="money-big__title">
                    <span>{props.lang.total}</span>
                </div>
                <div className="money-big__title">
                    <span>{props.lang.status}</span>
                </div>
            </div>
            {props.children}
        </div>
    );
}
