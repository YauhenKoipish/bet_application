import React from "react";

import { getInfoStreamOrVidgitEvent } from "../../../../../../../../Services/Shared";

export const filtrsStatistic = (evs, changePainting) => {
    const getIconStream = () => (
        <div>
            <svg
                width='17'
                height='12'
                viewBox='0 0 17 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g opacity='0.5'>
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M17 0H0V1.35529V9.49302V11.016H5V12H12V11.016L17 11C17 11 16.9923 10.3306 16.9923 9.49302L17 1.35529V0ZM16.0001 10H1.00006V1H16.0001V10ZM7.0001 8.64401V2.76976L12.0001 5.70689L7.0001 8.64401Z'
                        fill='white'
                    />
                </g>
            </svg>
        </div>
    );

    const getIconVidgit = () => (
        <div>
            <svg
                width='17'
                height='12'
                viewBox='0 0 17 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
            >
                <g opacity='0.5'>
                    <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M17 12H0V0H17V12ZM9 1H16V3H12V9H16V11H9V7.93699C9.86261 7.71497 10.5 6.93192 10.5 6C10.5 5.06808 9.86261 4.28503 9 4.06301V1ZM8 4.06301V1H1V3H5V9H1V11H8V7.93699C7.13739 7.71497 6.5 6.93192 6.5 6C6.5 5.06808 7.13739 4.28503 8 4.06301ZM13 4L16 4.06301V8H13V4ZM1 4V8L4 7.93699V4H1ZM9.5 6C9.5 6.55228 9.05228 7 8.5 7C7.94772 7 7.5 6.55228 7.5 6C7.5 5.44772 7.94772 5 8.5 5C9.05228 5 9.5 5.44772 9.5 6Z'
                        fill='white'
                    />
                </g>
            </svg>
        </div>
    );

    return (
        <div className='statistic__list'>
            {evs.map((event, key) => {
                const statusIcon = getInfoStreamOrVidgitEvent(event);

                return (
                    <div
                        className='statistic__elem'
                        key={key}
                        onClick={() => changePainting(event)}
                    >
                        <div className='statistic__teams'>
                            <div className='statistic__team'>
                                <div>{event.homeName}</div>
                            </div>
                            <div className='statistic__info'>
                                <div className='statistic__score'>
                                    {event.homeScore} : {event.awayScore}
                                </div>
                                <div className='statistic__more'>
                                    <div className='statistic__translation'>
                                        {statusIcon.stream
                                            ? getIconStream()
                                            : ""}
                                        {statusIcon.vidgit
                                            ? getIconVidgit()
                                            : ""}
                                    </div>
                                </div>
                            </div>
                            <div className='statistic__team'>
                                <div>{event.awayName}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
