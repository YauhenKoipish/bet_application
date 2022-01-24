import React from "react";
import { getSportIcon } from "../../../../Services/Shared";
import SingleSport from "./SingleSportLive";
import { routsName } from "../../../../Router/RouterList";
export default props => {
    return (
        <div className="left-menu__top" id="menu-favSports">
            {SingleSport({
                name: "Мои матчи",
                icon: getSportIcon(-1),
                key: 0,
                isT: false,
                route: props.route.bind(this, routsName.dict.moi_matchi),
                isArrow: false,
                MinusOrPlus: null
            })}
            {props.children}
        </div>
    );
};
