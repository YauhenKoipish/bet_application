import React from "react";
import arrow from "../img/main-table/arrow.svg";

const Category = props => {
    return (
        <div className="main-table__sport open">
            <div className="main-table__header">
                <div className="main-table__img">{props.icon}</div>
                <div className="main-table__name">{props.name}</div>
                <div className="main-table__arrow arrow">
                    <img src={arrow} alt="" />
                </div>
            </div>
        </div>
    );
};
