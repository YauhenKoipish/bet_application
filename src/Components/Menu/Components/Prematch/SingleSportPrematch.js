import React from "react";

import { getIcon } from "../../../../Services/Shared";

const routeSport = (event, route) => {
    if (!event.target.closest(".sport-left__icon")) route();
};

const SingleSport = ({
    name,
    icon,
    MinusOrPlus,
    key,
    clickFunc = f => f,
    route = f => f,
    isT = false,
    activeLink
}) => {
    return (
        <div
            className={
                "left-menu__line sport-left" +
                (isT ? " sport-left--small" : "") +
                (activeLink === key ? " active" : "")
            }
            key={key}
            onClick={e => routeSport(e, route)}
        >
            <div className="absl">
                {!isT && icon ? (
                    <div className="sport-left__img">{icon}</div>
                ) : (
                    ""
                )}

                <div className="sport-left__name">{name}</div>

                {!!MinusOrPlus ? (
                    <div className="sport-left__icon" onClick={clickFunc}>
                        <span>
                            {MinusOrPlus === "minus"
                                ? getIcon("minus")
                                : getIcon("plus")}
                        </span>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
export default SingleSport;
