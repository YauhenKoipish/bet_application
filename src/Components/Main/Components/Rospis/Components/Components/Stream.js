import React from "react";

import { streamPainting } from "../../../../../../Server/";
import { getStatusVidgit } from "../../../../../../Services/Shared";
import LineStream from "./Components/LineStream";

export const Stream = props => {
    const video = streamPainting(
        "https://video.abet.ru/greenvideo.html",
        props.event.videoProviderId,
        props.event.videoId,
        props.event.sportId
    );

    const width = () => {
        // console.log(screen.width);
        return 280;
    };

    const openModal = () => {
        props.history.push("/login/registration");
    };

    // debugger;
    if (getStatusVidgit(props.event)) {
        return (
            <div
                className={"stream " + (props.statusStream ? "open" : "")}
                style={{ order: 2 }}
            >
                <div className='stream__header'>
                    {props.buttonStream.view === 1 &&
                    props.event.betRadarOriginalId != 0 ? (
                        <div
                            className={
                                "stream__widget " +
                                (props.editViewinfo === 2 ? "active" : "")
                            }
                            onClick={() => props.changeStatusView(2)}
                        >
                            <svg
                                width='21'
                                height='12'
                                viewBox='0 0 21 12'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M21 12H0V0H21V12ZM11 1H20V3H16V9H20V11H11V7.93699C11.8626 7.71497 12.5 6.93192 12.5 6C12.5 5.06808 11.8626 4.28503 11 4.06301V1ZM10 4.06301V1H1V3H5V9H1V11H10V7.93699C9.13739 7.71497 8.5 6.93192 8.5 6C8.5 5.06808 9.13739 4.28503 10 4.06301ZM17 4H20V8H17V4ZM1 4V8H4V4H1ZM11.5 6C11.5 6.55228 11.0523 7 10.5 7C9.94772 7 9.5 6.55228 9.5 6C9.5 5.44772 9.94772 5 10.5 5C11.0523 5 11.5 5.44772 11.5 6Z'
                                    fill='white'
                                />
                            </svg>
                        </div>
                    ) : (
                        ""
                    )}
                    {props.buttonStream.stream === 1 ? (
                        <div
                            className={
                                "stream__stream " +
                                (props.editViewinfo === 1 ? "active" : "")
                            }
                            onClick={() => props.changeStatusView(1)}
                        >
                            <svg
                                width='17'
                                height='12'
                                viewBox='0 0 17 12'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M17 0H0V1.35529V9.49302V11.016H5V12H12V11.016L17 11C17 11 16.9923 10.3306 16.9923 9.49302L17 1.35529V0ZM16 10H1V1H16V10ZM7 8.64401V2.76976L12 5.70689L7 8.64401Z'
                                    fill='white'
                                />
                            </svg>
                        </div>
                    ) : (
                        ""
                    )}

                    <div
                        className='stream__open'
                        onClick={() => props.changeStatusStream()}
                    >
                        <svg
                            width='11'
                            height='6'
                            viewBox='0 0 11 6'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L5.5 4.79289L10.1464 0.146447C10.3417 -0.0488155 10.6583 -0.0488155 10.8536 0.146447C11.0488 0.341709 11.0488 0.658291 10.8536 0.853553L5.85355 5.85355C5.65829 6.04882 5.34171 6.04882 5.14645 5.85355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z'
                                fill='white'
                            />
                        </svg>
                    </div>
                </div>

                <div className='stream__content'>
                    <div className='stream__window'>
                        {props.userAuthorize ? (
                            props.buttonStream.stream === 1 &&
                            props.editViewinfo === 1 ? (
                                <iframe
                                    seamless
                                    frameBorder='0'
                                    align='left'
                                    width={width() + "px"}
                                    height='140px'
                                    scrolling='no'
                                    allow='autoplay'
                                    src={video}
                                />
                            ) : props.buttonStream.view === 1 &&
                              props.editViewinfo === 2 ? (
                                <div
                                    id='sr-widget'
                                    data-sr-widget='match.lmt'
                                    data-sr-match-id={
                                        props.event.betRadarOriginalId
                                    }
                                >
                                    {props.viewVidgit()}
                                </div>
                            ) : (
                                ""
                            )
                        ) : (
                            <div className='stream__cap'>
                                <div className='stream__text'>
                                    Трансляция доступна для авторизованных
                                    пользователей
                                </div>
                                <div className='stream__login'>
                                    <button onClick={() => openModal()}>
                                        Регистрация
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <LineStream {...props} />
                </div>
            </div>
        );
    } else {
        return "";
    }
};
