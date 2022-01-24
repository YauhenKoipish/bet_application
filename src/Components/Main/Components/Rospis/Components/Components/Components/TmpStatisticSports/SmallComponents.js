import React from "react";

import ScrollMenu from "../../../../../../../ScrollMenu/";

import StatisticSportsCategory from "../../../../../../../ScrollMenu/Components/StatisticSportsCategory";

import { filtrsStatistic } from "./FiltrsSportsPaintingStatistic";
import {
    getMainScore,
    getMatchStatus,
    getMatchTime,
    getScore
} from "../../../../../../../../Services/Shared";

const getTmpSportTimeOrMatchStatus = ev => {
    const matchStatus = getMatchStatus(ev);
    const score = getMainScore(ev);
    const time = getMatchTime(ev);
    // debugger;
    switch (ev.sportId.toString()) {
        //счет и время
        case "1027":
        case "1023":
        case "1016":
        case "1028":
        case "1030":
        case "1031":
        case "1012":
        case "1015":
        case "1013":
        case "1025":
        case "1038":
        case "1103":
            if (matchStatus !== "Пер.") {
                return matchStatus + " " + time;
            } else {
                return "Пер.";
            }
        // счет
        case "1034":
        case "1035":
        case "1021":
        case "1022":
        case "1016":
        case "1014":
        case "1017":
        case "1033":
        case "1107":
            return score ? score.home + " : " + score.away : "";

        //раунд  не знаю в каком поле приходит
        case "1020":
            return matchStatus !== "Пер." ? matchStatus : "";

        // время
        case "1019":
            return time;

        //текущий круг не знаю в каком поле приходит
        case "1101":
            return matchStatus !== "Пер." ? matchStatus : "";

        default:
            return "";
    }
};

export const title = props => {
    const { ev, openFiltrs, functionOpenFiltrs } = props;
    // debugger;
    const score = getMainScore(ev);
    const matchStatus = getMatchStatus(ev);
    const matchTime = getMatchTime(ev);
    // debugger;
    return (
        <div
            className={"statistic__teams " + (openFiltrs ? "open" : "")}
            onClick={() => functionOpenFiltrs()}
        >
            <div className='statistic__team'>
                <div>{ev.homeName}</div>
            </div>
            <div className='statistic__info'>
                <div className='statistic__score'>
                    {score ? score.home + " : " + score.away : ""}
                </div>
                <div className='statistic__more'>
                    {ev.sportId === 1035 ? (
                        ""
                    ) : (
                        <div>
                            {matchStatus} {matchTime}
                        </div>
                    )}
                    {/* <div>Если не стандартный</div> */}
                </div>
            </div>
            <div className='statistic__team'>
                <div>{ev.awayName}</div>
            </div>
            <div className='statistic__arrows'>
                <svg
                    width='6'
                    height='10'
                    viewBox='0 0 6 10'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M3 0L6 3H0L3 0ZM3 10L0 7H6L3 10Z'
                        fill='white'
                    />
                </svg>
            </div>
            <div className='statistic__dropdown'>
                {filtrsStatistic(props.evs, props.changePainting)}
                <div className='statistic__scroll'>
                    {
                        <ScrollMenu
                            {...getPropsForScrollMenu(
                                props.routerProps,
                                1,
                                Infinity
                            )}
                            scrollX={0}
                            active={props.activeSpropt}
                            onScroll={f => f}
                            rootComponent='painting'
                            handleClick={props.editSportFiltrs}
                            ScrollComponent={StatisticSportsCategory}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export const timeScore = (
    setScores = false,
    event,
    scoreAussieRules = null
) => {
    function getClassBejsbol() {
        if (event.sportId === 1015) {
            if (event.currentServer === 1) {
                return " bejsbol";
            } else if (event.currentServer === 2) {
                return " bejsbol right";
            }
        } else {
            return "";
        }
    }
    if (!setScores) {
    } else {
        const arrayScore = setScores.split("-");
        return arrayScore.map((elem, k) => {
            return (
                <div className='statistic__column' key={k}>
                    <div className='statistic__title'>{k + 1}</div>
                    <div
                        className={
                            "statistic__numbers " +
                            (k === arrayScore.length - 1
                                ? getScoreActive(event)
                                : "")
                        }
                    >
                        {elem}
                    </div>
                    {event.sportId === 1015 && arrayScore.length - 1 == k ? (
                        <div
                            className={
                                "statistic__delivery" + getClassBejsbol()
                            }
                        />
                    ) : (
                        ""
                    )}
                    {scoreAussieRules ? scoreRules() : ""}
                </div>
            );
        });
    }
};

const getScoreActive = event => {
    const info = getScore(event);
    // debugger

    if (info && info.currentServer === 1) return "left";
    if (info && info.currentServer === 2) return "right";
    return "";
};

const scoreRules = (score = "1:1") => {
    return <div className='aussie'>{score}</div>;
};

const getPropsForScrollMenu = (parentProps, status, time = Infinity) => {
    const scrollProps = { ...parentProps };
    scrollProps.filters = {};
    scrollProps.filters.status = [status];
    scrollProps.filters.time = time;
    return scrollProps;
};

export const statisticDetails = ev => {
    const home = {
        homeCorners: ev.homeCorners,
        homeRedcards: +ev.homeYellowRedCards + ev.homeRedcard,
        homeYellowcards: ev.homeYellowcards
    };

    const away = {
        homeCorners: ev.awayCorners,
        homeRedcards: +ev.awayYellowRedCards + ev.awayRedcard,
        homeYellowcards: ev.awayYellowcards
    };

    //imeScore(ev.setScores) передать счет озурулся
    // debugger;
    let flg = null;
    if (
        ev.homeYellowRedCards != 0 ||
        ev.homeYellowcards != 0 ||
        (ev.awayYellowRedCards != 0 || ev.awayYellowcards != 0)
    ) {
        // debugger;
        flg = true;
    } else {
        flg = false;
    }
    // debugger;
    return (
        <div className='statistic__details'>
            <div className='statistic__wrapper'>
                {getSportInfo(ev.sportId, home, flg)}
                <div className='statistic__stat'>
                    {timeScore(ev.setScores ? ev.setScores : ev.setPoints, ev)}
                    {ev.sportId == 1034 ? scoreCurrentSet(ev) : ""}
                </div>

                {getSportInfo(ev.sportId, away, flg)}
            </div>
            {ev.sportId == 1015 ? beijboll(ev) : ""}
        </div>
    );
};

const scoreCurrentSet = ev => {
    return (
        <div className='statistic__detailed'>
            (
            {(ev.homeGamescore == 50 ? "AD" : ev.homeGamescore) +
                ":" +
                (ev.awayGamescore == 50 ? "AD" : ev.awayGamescore)}
            )
        </div>
    );
};

//Придет бейзбол посмотреть евент
const beijboll = ev => {
    // console.log(ev);
    let arrayActiveElement = null;
    // debugger;
    if (ev.bases) arrayActiveElement = ev.bases.split(",");
    else arrayActiveElement = [0, 0, 0];
    return (
        <div className='statistic__baseball'>
            <div className='statistic__in-game'>
                <div className='statistic__row'>
                    <div className='statistic__title'>Ball</div>
                    <div className='statistic__quantity'>{ev.balls}</div>
                </div>
                <div className='statistic__row'>
                    <div className='statistic__title'>Strike</div>
                    <div className='statistic__quantity'>{ev.strikes}</div>
                </div>
                <div className='statistic__row'>
                    <div className='statistic__title'>Out</div>
                    <div className='statistic__quantity'>{ev.outs}</div>
                </div>
            </div>
            <div className='statistic__field'>
                <div className={arrayActiveElement[1] == 1 ? "active" : ""} />
                <div className={arrayActiveElement[0] == 1 ? "active" : ""} />
                <div />
                <div className={arrayActiveElement[2] == 1 ? "active" : ""} />
            </div>
        </div>
    );
};

const getSportInfo = (sportId, ev, flg) => {
    switch (sportId) {
        case 1023:
            return (
                <div className='statistic__football'>
                    <div className='statistic__corner'>
                        <svg
                            width='14'
                            height='17'
                            viewBox='0 0 14 17'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M1.5 12.2071V15.5H4.79289L1.5 12.2071ZM1.5 10.7929V0H0.5V16V16.5H1H14V15.5H6.20711L1.5 10.7929Z'
                                fill='white'
                            />
                        </svg>
                        <span>{ev.homeCorners}</span>
                    </div>
                    {flg ? (
                        <div className='statistic__cards'>
                            <div className='statistic__card yellow'>
                                {ev.homeYellowcards}
                            </div>
                            <div className='statistic__card red'>
                                {ev.homeYellowRedCards}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            );
        default:
            break;
    }
};
