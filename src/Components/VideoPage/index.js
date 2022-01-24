//анализ фильтрации элементов

import React, { Component } from "react";
import { connect } from "react-redux";

import TvMain from "./Components/Tv_main";
import { streamPainting } from "../../Server/";
import { route } from "../../Actions/Components/Navigation/";
// import "./Style/tv-doc.css";
// import "./Style/tv-form.css";
// import "./Style/tv-schedule.css";
// import "./Style/tv-start.css";
// import "./Style/tv-stream.css";
// import "./Style/tv.css";

// import burger from "./Img/burger.svg";
// import close from "./Img/close.svg";
// import enter from "./Img/enter.svg";
// import Group from "./Img/Group.svg";
// import logoOne from "./Img/logo-1.svg";
// import logoTwo from "./Img/logo-2.svg";
// import start from "./Img/start.png";
// import tv from "./Img/tv.svg";
// import yellow from "./Img/yellow.svg";

class StreamPage extends Component {
    constructor(props) {
        super(props);

        this.initState = {
            mainPage: props.user, // присвоить значение от регистрации
            eventsStream: new Map(),
            activeStream: null
        };
        this.state = this.getCurState(this.initState, props, true);
    }

    get isUpdate() {
        if (this._isBeUpdated) {
            this._isBeUpdated = false;
            return true;
        }
        return false;
    }

    set isUpdate(val) {
        this._isBeUpdated = val;
    }

    filtrsEvents(allEvents) {
        const eventsStream = new Map();
        allEvents.forEach(event => {
            if (event.status === 1) {
                if (event.videoProviderId !== 0) {
                    eventsStream.set(event.id, event);
                }
            }
        });

        return eventsStream;
    }

    getCurState(state, props, isEvent) {
        const events = isEvent ? props.events : props.newEvents;
        if (isEvent) {
            const eventsStream = this.filtrsEvents(events);
            const activeStream = eventsStream.entries().next().value;
            this.isUpdate = true;

            if (eventsStream === undefined || activeStream === undefined) {
                debugger;
            }
            return {
                ...state,
                eventsStream,
                activeStream
            };

            // БРАТАН ПРОВЕРЯЕМ НА НАЛИЧИЕ ВООБЩЕ ЕВЕНТОВ
        }

        events.forEach(event => {
            if (state.eventsStream.has(events.id)) {
                return state;
            } else {
                const eventsStream = this.state.eventsStream;

                events.forEach(event => {
                    if (events.status === 1)
                        if (events.videoProviderId !== 0)
                            eventsStream.set(events.id, event);
                });
                if (eventsStream != this.state.eventsStream) {
                    debugger;
                    this.isUpdate = true;
                    return {
                        ...state,
                        eventsStream
                    };
                }
            }
        });

        if (props.user !== state.mainPage) {
            const mainPage = props.user;
            this.isUpdate = true;
            const newState = {
                ...state,
                mainPage
            };
            return newState;
        }

        return state;
    }

    chageActiveStream(newActiveEvent) {
        if (this.state.activeStream[0] != newActiveEvent.id) {
            const activeStream = [];
            activeStream[1] = this.state.eventsStream.get(newActiveEvent.id);
            activeStream[0] = activeStream[1].id;
            const newState = {
                ...this.state,
                activeStream
            };
            this.isUpdate = true;
            this.setState(newState);
            // this.forceUpdate();
        }
        return true;
    }

    getFrame(activeEvent) {
        const video = streamPainting(
            "https://video.abet.ru/greenvideo.html",
            activeEvent.videoProviderId,
            activeEvent.videoId,
            activeEvent.sportId
        );
        return (
            <iframe
                seamless
                frameBorder="0"
                align="left"
                width="100%"
                height="600px"
                scrolling="no"
                allow="autoplay"
                src={video}
                key={activeEvent.id}
            />
        );
    }

    shouldComponentUpdate(nextProps) {
        if (this.isUpdate) return true;

        const newState = this.getCurState(this.state, nextProps, false);
        if (newState !== this.state) {
            this.setState(newState);
        }
        return false;
    }
    changeUrl() {
        const url = "/login/registration";
        this.props.navigate(url);
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.mainPage ? TvMain() : this.createStreamComponent()}
            </React.Fragment>
        );
    }

    createStreamComponent() {
        return (
            <div className="tv__stream tv-stream ">
                <div className="tv-stream__pic">
                    {this.getFrame(this.state.activeStream[1])}
                </div>
                <div className="tv-stream__filters">
                    <div className="tv-stream__filter">
                        <div className="tv-stream__type">
                            <span>Все</span>
                        </div>
                        <div className="tv-stream__date">
                            <span>
                                Смысл от даты если все равно все трансляции
                                только сейчас идут?
                            </span>
                        </div>
                        <div className="tv-stream__schedule">
                            Расписание - очередная ненужная штука
                        </div>
                        <div className="tv-stream__close" />
                    </div>
                    <div className="tv-stream__elements">
                        {[...this.state.eventsStream.values()].map(
                            (elem, i) => {
                                return (
                                    <div
                                        className="tv-stream__item"
                                        key={i}
                                        onClick={() =>
                                            this.chageActiveStream(elem)
                                        }
                                    >
                                        <div className="tv-stream__wrapper">
                                            <div className="tv-stream__title">
                                                <div className="tv-stream__sport">
                                                    {elem.sportId}
                                                </div>
                                                <div className="tv-stream__time">
                                                    Live
                                                </div>
                                            </div>
                                            <div className="tv-stream__teams">
                                                {elem.homeName}/{elem.awayName}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events,
        newEvents: state.server.eventsAndLines.newEvents,
        user: state.user.isAuthorize
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: url => dispatch(route("push", url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StreamPage);
