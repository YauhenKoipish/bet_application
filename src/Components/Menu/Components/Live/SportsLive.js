import React from "react";
import SingleSport from "./SingleSportLive";
import {
    getSportIcon,
    sortCallbackBySortIdAndName
} from "../../../../Services/Shared";

export default props => {
    const isSportInFav = isSportInFavFunc(props.favSports);
    return (
        <React.Fragment>
            {props.sports
                ? props.sports
                      .sort((a, b) => sortCallbackBySortIdAndName(a, b))
                      .map((sport, i) =>
                          SingleSport(
                              getSportProps(props, sport, isSportInFav, i)
                          )
                      )
                : ""}
        </React.Fragment>
    );
};

const getSportProps = (props, sport, isSportInFav, key) => {
    return {
        name: sport.name,
        icon: getSportIcon(sport.id),
        MinusOrPlus: isSportInFav(sport.id) ? "minus" : "plus",
        clickFunc: isSportInFav(sport.id)
            ? props.onMinus.bind(this, sport.id)
            : props.onPlus.bind(this, sport.id),
        route: props.navigate.bind(this, sport.name),
        isOpen: !props.closedSports.includes(sport.id),
        toggleSport: () => props.toggleSport(sport.id),
        events: getEvents(sport, props.eventsBySports, props.eventsMap),
        key,
        addEventToFav: props.addEventToFav,
        removeEventFromFav: props.removeEventFromFav,
        favEvents: props.favEvents
    };
};

const getEvents = (sport, eventsBySports, eventsMap) => {
    const events = eventsBySports.get(sport.id);
    return events.map(ev => eventsMap.get(ev));
};

export const isSportInFavFunc = sports => {
    const reducer = (accum, cur) => [...accum, cur.id];
    const favSports = sports.reduce(reducer, []);
    return sport => favSports.includes(sport);
};
