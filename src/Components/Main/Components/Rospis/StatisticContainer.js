import React from "react";

import { connect } from "react-redux";

import { Stream } from "./Components/Components/Stream";

import { vidgit } from "../../../../Server/";

class StatisticContainer extends React.Component {
    constructor(props) {
        super(props);
        this.updateVidgit = true;
        this.goBackEvent = false;
        const event = props.events.get(props.match.params.event);
        this.initialState = {
            statusStream: true,
            event: event,
            sportId: props.events.has(props.match.params.event)
                ? event.sportId
                : 1023,
            tabActiveSport: props.match.params.sport,
            editViewinfo: this.getStateView(event),
            buttonStream: {
                stream:
                    event.videoProviderId !== 0 && event.status !== 0
                        ? 1
                        : false,
                view:
                    (event.status === 1 && event.sportId == 1023) ||
                    event.sportId == 1016 ||
                    event.sportId == 1027 ||
                    event.sportId == 1034 ||
                    event.sportId == 1012 ||
                    event.sportId == 1028 ||
                    event.sportId == 1035 ||
                    event.sportId == 1017 ||
                    event.sportId == 1033 ||
                    event.sportId == 1014
                        ? 1
                        : false
            },
            userAuthorize: props.userInfo ? true : false
        };

        this.state = this.getCurState(this.initialState, props, false);
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
    getStateView(event) {
        if (event.videoProviderId !== 0 && event.status !== 0) {
            return 1;
        }
        if (
            (event.status === 1 && event.sportId == 1023) ||
            event.sportId == 1027 ||
            event.sportId == 1034 ||
            event.sportId == 1012 ||
            event.sportId == 1028 ||
            event.sportId == 1035 ||
            event.sportId == 1017 ||
            event.sportId == 1033 ||
            event.sportId == 1014
        ) {
            return 2;
        }

        return 3;
    }

    getCurState(state = {}, props = null, eventUpdate) {
        if (props.userInfo && !state.userAuthorize) {
            const newState = {
                ...this.state,
                userAuthorize: props.userInfo ? true : false
            };
            this.isUpdate = true;
            return newState;
        }
        if (!props.userInfo && state.userAuthorize) {
            const newState = {
                ...this.state,
                userAuthorize: props.userInfo ? true : false
            };
            this.isUpdate = true;
            return newState;
        }
        return state;
    }

    changeStatusStream() {
        const newState = {
            ...this.state,
            statusStream: !this.state.statusStream
        };
        this.isUpdate = true;
        this.setState(newState);
    }

    shouldComponentUpdate(nextProps) {
        if (this.isUpdate) return true;

        const newState = this.getCurState(this.state, nextProps, true);
        if (newState !== this.state) {
            this.setState(newState);
        }
        if (nextProps.match.params.event !== this.props.match.params.event)
            return true;

        return false;
    }

    changeStatusView(status) {
        const newState = { ...this.state };
        newState.editViewinfo = status;
        this.isUpdate = true;
        this.setState(newState);
    }

    render() {
        if (!this.goBackEvent) {
            return (
                <>
                    <Stream
                        {...this.state}
                        {...this.props}
                        changeStatusStream={this.changeStatusStream.bind(this)}
                        changeStatusView={this.changeStatusView.bind(this)}
                        viewVidgit={this.viewVidgit.bind(this)}
                        status={
                            this.state.event.videoProviderId !== 0 &&
                            this.state.event.status !== 0
                                ? 1
                                : 0
                        }
                    />
                </>
            );
        }
    }

    viewVidgit() {
        this.isUpdate = true;
        if (this.updateVidgit) vidgit(this.state.event.betRadarOriginalId);
    }
    componentDidMount() {
        if (
            (this.state.event.status === 1 &&
                this.state.event.sportId == 1023) ||
            this.state.event.sportId == 1016 ||
            this.state.event.sportId == 1027 ||
            this.state.event.sportId == 1034 ||
            this.state.event.sportId == 1012 ||
            this.state.event.sportId == 1028 ||
            this.state.event.sportId == 1035 ||
            this.state.event.sportId == 1017 ||
            this.state.event.sportId == 1033 ||
            this.state.event.sportId == 1014
        ) {
            vidgit(this.state.event.betRadarOriginalId);
        }
        this.isUpdate = false;
    }
}

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events,
        marketsByNum: state.server.entities.marketsByNum,
        markets: state.server.entities.markets,
        newEvents: state.server.eventsAndLines.newEvents,
        userInfo: state.user.isAuthorize
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StatisticContainer);
