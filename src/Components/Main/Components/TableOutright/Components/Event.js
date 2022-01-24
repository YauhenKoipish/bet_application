import React, { Component } from "react";
import { connect } from "react-redux";
import Line from "./Line";
import HeadToHeadLines from "./H2HLines";

class Event extends Component {
    shouldComponentUpdate(nextProps) {
        if (
            nextProps.newEvents.has(this.props.eId) ||
            (nextProps.deletedEvent &&
                nextProps.deletedEvent.id === this.props.eId)
        ) {
            return true;
        }
        return false;
    }

    render() {
        const event = this.props.events.get(this.props.eId);
        if (!event) {
            return "";
        }
        const lines = [...event.lines.values()];
        const h2hLines = [...lines].filter(l => l.marketId === 539);
        const otherLines = [...lines].filter(l => l.marketId !== 539);
        return (
            <>
                {h2hLines.length > 0 ? (
                    <HeadToHeadLines
                        lines={lines}
                        seasonName={this.props.seasonName}
                        sportId={this.props.sportId}
                    />
                ) : (
                    ""
                )}
                {otherLines
                    .sort((a, b) => a.name - b.name)
                    .map((line, i) => (
                        <Line
                            line={line}
                            sportId={this.props.sportId}
                            key={line.compoundKey}
                            seasonName={this.props.seasonName}
                            event={event}
                        />
                    ))}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events,
        newEvents: state.server.eventsAndLines.newEvents,
        deletedEvent: state.server.eventsAndLines.deletedEvent,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        lines: state.server.eventsAndLines.lines,
        linesByCK: state.server.eventsAndLines.linesByCK
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Event);
