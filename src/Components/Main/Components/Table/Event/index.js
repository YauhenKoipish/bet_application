import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style/line.css";
// import "./style/dropdown.css";
import { isArraysEqual } from "../../../../../Services/Shared";
import EventInf from "../EventInf/";
import Line from "../Line";

class Event extends Component {
    constructor(props) {
        super(props);
        this.isUpdate = false;
        this.initialState = {
            filters: props.view.tableFilter.filters,
            eventId: props.eventId
        };
        this.state = this.getCurState(this.initialState, props);
    }

    getCurState(state, props) {
        if (!isArraysEqual(state.filters, props.view.tableFilter.filters)) {
            return {
                ...state,
                filters: props.view.tableFilter.filters
            };
        }
        if (props.newEvents.has(state.eventId)) {
            return {
                ...state
            };
        }
        return state;
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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) return true;
        const newState = this.getCurState(this.state, nextProps);
        if (this.state !== newState) {
            this.setState(newState);
        }
        return false;
    }

    render() {
        const { eventId, handleRospis } = this.props;
        const event = this.props.events.get(eventId);
        if (!event) {
            return "";
        }
        return (
            <div className="main-table__line line" eventid={event.id}>
                {
                    <EventInf
                        event={event}
                        handleRospis={handleRospis}
                        sport={this.props.sports.get(event.sportId)}
                    />
                }
                {this.state.filters.map((f, i) => (
                    <Line
                        event={event}
                        filter={f}
                        key={i}
                        markets={this.props.markets}
                        marketsByNum={this.props.marketsByNum}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        newEvents: state.server.eventsAndLines.newEvents,
        sports: state.server.entities.sports,
        markets: state.server.entities.markets,
        marketsByNum: state.server.entities.marketsByNum,
        view: state.view
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Event);
