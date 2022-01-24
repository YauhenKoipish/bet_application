import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getSportByName,
    getEventIdsFromCurrentTickets
} from "../../../Services/Shared";
import {
    addEventToFav,
    removeEventFromFav
} from "../../../Actions/Components/Server/CurrentStates/";
import { route } from "../../../Actions/Components/Navigation/";
import { routsName } from "../../../Router/RouterList";
class Rospis extends Component {
    get favEvents() {
        const favGbEventsFromTickets = getEventIdsFromCurrentTickets();
        const favEventsFromTickets = [...favGbEventsFromTickets]
            .filter(gbId => this.props.eventsByGB.has(gbId))
            .map(gbId => this.props.eventsByGB.get(gbId));
        return [
            ...this.props.favEventsPrematch,
            ...this.props.favEventsLive,
            ...favEventsFromTickets
        ];
    }

    shouldComponentUpdate(nextProps) {
        if (
            this.props.favEventsPrematch !== nextProps.favEventsPrematch ||
            this.props.favEventsLive !== nextProps.favEventsLive ||
            this.props.tickets !== nextProps.tickets
        ) {
            return true;
        }
        return false;
    }

    render() {
        const { arrow, parentProps, sports, view } = this.props;
        const sport = getSportByName(sports, parentProps.match.params.sport);

        const goBackToSport = () => {
            this.props.navigate(
                "/" +
                    routsName.dict.categories +
                    "/" +
                    parentProps.match.params.sport
            );
        };

        return getComponentBackToTournament(this.props, this.favEvents);
    }
}

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        tickets: state.user.info.tickets,
        tournaments: state.server.entities.tournaments,
        favEventsPrematch: state.server.currentStates.favEventsPrematch,
        favEventsLive: state.server.currentStates.favEventsLive,
        history: state.history
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addEventToFav: (eventId, status) => {
            dispatch(addEventToFav(eventId, status));
        },
        removeEventFromFav: (eventId, status) =>
            dispatch(removeEventFromFav(eventId, status)),
        navigate: url => dispatch(route("push", url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rospis);

const getComponentBackToTournament = (props, favEvents) => {
    const { Arrow, parentProps, events, tournaments } = props;
    const event = events.get(parentProps.match.params.event);
    if (!event) return "";
    const tournament = tournaments.get(event.tournamentId);
    if (!tournament) return "";

    const getPrevUrl = () => {
        const url = [...props.history]
            .reverse()
            .find(item => !item.match(/rospis/g));
        if (!url)
            return event.status
                ? "/" + routsName.dict["live"]
                : "/" + routsName.dict["prematch"];
        return url;
    };

    const goBack = () => {
        const lastHistoryItem =
            props.history.length > 1
                ? getPrevUrl()
                : "/" + (event.status ? "live" : "prematch");
        props.navigate(lastHistoryItem);
    };
    return (
        <>
            <div className="top-nav__teams" onClick={goBack}>
                <div className="top-nav__back">
                    <Arrow />
                </div>
                <div className="top-nav__name">{tournament.name}</div>
            </div>
            <div className="top-nav__statistic">
                <div className="top-nav__bell">
                    <BellIcon />
                </div>
                <div
                    className="top-nav__star"
                    onClick={() =>
                        favEvents.includes(event.id)
                            ? props.removeEventFromFav(event.id, event.status)
                            : props.addEventToFav(event.id, event.status)
                    }
                >
                    <FavIcon isActive={favEvents.includes(event.id)} />
                </div>
            </div>
        </>
    );
};

const getComponentEventHomeAway = props => {
    const { events, parentProps } = props;
    const event = events.get(parentProps.match.params.event);

    return (
        <div className="top-nav__nav">
            <div className="top-nav__name">{event.homeName + " - "}</div>
            <div className="top-nav__name">{event.awayName}</div>
        </div>
    );
};

export const FavIcon = ({ isActive = false }) => {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill={isActive ? "white" : "none"}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.9025 4.79624L12.9025 4.79635L12.9115 4.79679C13.1898 4.81067 13.4618 5.00239 13.5767 5.39763L13.5788 5.40478L13.5811 5.41185C13.687 5.72855 13.5966 6.07506 13.3598 6.2954L10.6837 8.57344C10.4853 8.72451 10.435 8.97616 10.4884 9.16877L11.2958 12.619L11.2962 12.6206C11.3555 12.8692 11.2999 13.1216 11.1442 13.3367C10.993 13.5232 10.773 13.625 10.5668 13.625C10.4246 13.625 10.2891 13.5801 10.1856 13.4989L10.172 13.4881L10.1574 13.4787L7.25131 11.6027C7.17051 11.5479 7.06667 11.5055 6.94506 11.5055C6.82312 11.5055 6.71906 11.5481 6.63817 11.6031L3.75351 13.4794L3.75264 13.48C3.6366 13.5559 3.48878 13.6021 3.34525 13.6021C3.13236 13.6021 2.91322 13.4913 2.75578 13.2813C2.62151 13.0738 2.57469 12.8176 2.63735 12.5534L3.49036 9.1182L3.49038 9.1182L3.49116 9.11491C3.51321 9.02258 3.52081 8.91021 3.48374 8.79377C3.44784 8.681 3.37884 8.5923 3.29512 8.52849L0.663214 6.25099C0.399934 6.0052 0.312902 5.6777 0.419253 5.34057C0.529254 5.01461 0.799358 4.81119 1.08805 4.79679L1.08806 4.7969L1.09699 4.79624L4.50127 4.5449C4.71842 4.53734 4.91469 4.3943 4.98845 4.18504L6.29812 0.87105L6.29814 0.871059L6.29968 0.867049C6.42067 0.550336 6.67772 0.375 6.99977 0.375C7.30419 0.375 7.5804 0.554345 7.69986 0.867049L7.69984 0.867058L7.70142 0.87105L9.01109 4.18504C9.08485 4.3943 9.28112 4.53734 9.49827 4.5449L12.9025 4.79624Z"
                stroke="white"
                strokeWidth="0.75"
            />
        </svg>
    );
};

export const BellIcon = () => {
    return (
        <svg
            width="15"
            height="19"
            viewBox="0 0 15 19"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M15 16.3611L13.4 13.6167C12.8 12.5611 12.5 11.5056 12.5 10.2389V8.33889C12.5 6.12222 11.1 4.11667 9.3 3.37778V1.9C9.3 0.844444 8.5 0 7.5 0C6.5 0 5.7 0.844444 5.7 1.9V3.37778C3.8 4.22222 2.4 6.12222 2.4 8.33889V10.2389C2.4 11.4 2.1 12.5611 1.5 13.6167L0 16.3611H5.4C5.4 16.4667 5.4 16.5722 5.4 16.7833C5.4 18.05 6.3 19 7.5 19C8.7 19 9.8 18.05 9.8 16.7833C9.8 16.6778 9.8 16.5722 9.8 16.3611H15ZM6.4 1.9C6.4 1.26667 6.9 0.738889 7.5 0.738889C8.1 0.738889 8.6 1.26667 8.6 1.9V3.16667C8.2 3.06111 7.9 3.06111 7.5 3.06111C7.1 3.06111 6.8 3.06111 6.4 3.16667V1.9ZM1.3 15.6222L2.2 14.0389C2.8 12.8778 3.2 11.6111 3.2 10.3444V8.33889C3.2 5.80555 5.1 3.8 7.5 3.8C9.9 3.8 11.8 5.80555 11.8 8.33889V10.2389C11.8 11.5056 12.1 12.8778 12.8 13.9333L13.7 15.5167H9.4H5.6H1.3V15.6222ZM8.99308 16.7469C8.99308 17.5914 8.3 18.2611 7.5 18.2611C6.7 18.2611 6 17.5222 6 16.7833C6 16.6778 6 16.5722 6 16.3611H8.99308C8.99308 16.3611 8.99308 16.5358 8.99308 16.7469Z" />
        </svg>
    );
};
