import React from "react";

import { getIcon } from "../../../../Services/Shared";

const routeTournament = (event, route) => {
    if (!event.target.closest(".list-match__plus")) route();
};

const Tournament = ({ toFavFunc, name, isInFav, route }) => {
    return (
        <div
            className="list-match__item"
            onClick={e => routeTournament(e, route)}
        >
            <div className="list-match__description">
                <div className="list-match__name">{name}</div>

                <div className="list-match__plus" onClick={toFavFunc}>
                    {getIcon(isInFav ? "minus" : "plus")}
                </div>
            </div>
        </div>
    );
};

export default Tournament;
