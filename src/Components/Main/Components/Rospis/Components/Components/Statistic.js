import React from "react";
import {
    getDateInFormat,
    getTranslitNameForSport
} from "../../../../../../Services/Shared";

import {
    statisticDetails,
    title
} from "./Components/TmpStatisticSports/SmallComponents";

export const statisticPrematch = ev => {
    const sportNameClass = getTranslitNameForSport(ev.sportId);
    return (
        <div
            className={
                "statistic__not-started not-started " +
                sportNameClass +
                "-border"
            }
        >
            <div className='not-started__game'>
                <div className='not-started__teams'>
                    <div className='not-started__team'>{ev.homeName}</div>
                    <div className='not-started__team'>{ev.awayName}</div>
                </div>
            </div>
            <div className='not-started__time'>
                <div className='not-started__date'>
                    {getDateInFormat("day / month", ev.timeSpanStart)}
                </div>
                <div className='not-started__date'>
                    {getDateInFormat("hours : minutes", ev.timeSpanStart)}
                </div>
            </div>
        </div>
    );
};

export const StatisticLive = props => {
    const tmp = getTemplatePaintingStatistic(
        props.event.sportId,
        props.event,
        props.changeStatus,
        props.status,
        props.routerProps,
        props.activeSportEventsLive,
        props.editSportFiltrs,
        props.changePainting,
        props.activeSpropt,
        props.activeSportBorder
    );
    return tmp;
};

const getTemplatePaintingStatistic = (
    id,
    ev,
    functionOpenFiltrs,
    openFiltrs,
    routerProps,
    evs,
    editSportFiltrs,
    changePainting,
    activeSpropt,
    activeSportBorder
) => {
    switch (id) {
        case 1: // футбол BR id
        case 1023: // футбол
            return (
                <div
                    className={
                        "statistic__begun " + (activeSportBorder + "-border")
                    }
                    style={{ order: 1 }}
                >
                    {title({
                        id,
                        ev,
                        functionOpenFiltrs,
                        openFiltrs,
                        routerProps,
                        evs,
                        editSportFiltrs,
                        changePainting,
                        activeSpropt
                    })}
                    {statisticDetails(ev)}
                </div>
            );

        case 1028:
        case 1035:
        case 1033:
        case 1014:
        case 1034: // теннис
            return (
                <div
                    className={
                        "statistic__begun " + (activeSportBorder + "-border")
                    }
                >
                    {title({
                        id,
                        ev,
                        functionOpenFiltrs,
                        openFiltrs,
                        routerProps,
                        evs,
                        editSportFiltrs,
                        changePainting,
                        activeSpropt
                    })}
                    {statisticDetails(ev)}
                </div>
            );

        case 1015: // бейзбол
            return (
                <div
                    className={
                        "statistic__begun " + (activeSportBorder + "-border")
                    }
                >
                    {title({
                        id,
                        ev,
                        functionOpenFiltrs,
                        openFiltrs,
                        routerProps,
                        evs,
                        editSportFiltrs,
                        changePainting,
                        activeSpropt
                    })}
                    {statisticDetails(ev)}
                </div>
            );

        case 1021: // крикет
            return (
                <div
                    className={
                        "statistic__begun " + (activeSportBorder + "-border")
                    }
                >
                    {title({
                        id,
                        ev,
                        functionOpenFiltrs,
                        openFiltrs,
                        routerProps,
                        evs,
                        editSportFiltrs,
                        changePainting,
                        activeSpropt
                    })}
                </div>
            );

        case 1013: //Австралия рулз
            return (
                <div
                    className={
                        "statistic__begun " + (activeSportBorder + "-border")
                    }
                >
                    {title({
                        id,
                        ev,
                        functionOpenFiltrs,
                        openFiltrs,
                        routerProps,
                        evs,
                        editSportFiltrs,
                        changePainting,
                        activeSpropt
                    })}
                    {statisticDetails(ev)}
                </div>
            );

        default:
            return (
                <div
                    className={
                        "statistic__begun " + (activeSportBorder + "-border")
                    }
                >
                    {title({
                        id,
                        ev,
                        functionOpenFiltrs,
                        openFiltrs,
                        routerProps,
                        evs,
                        editSportFiltrs,
                        changePainting,
                        activeSpropt
                    })}
                    {statisticDetails(ev)}
                </div>
            );
    }
};
