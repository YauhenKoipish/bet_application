import React from "react";
import { transliterate } from "../../../Services/Shared";

const StatisticSportsCategory = props => {
    const handleClick = event => {
        event.stopPropagation();
        props.func();
    };

    return (
        <div
            className={
                "statistic__item" +
                (props.isActive
                    ? " active " + transliterate(props.name, true) + "-before"
                    : "")
            }
            onClick={e => handleClick(e)}
        >
            {props.img}
        </div>
    );
};
export default StatisticSportsCategory;
