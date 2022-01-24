import React, { Component } from "react";
import {
    getCoefInTrueFormat,
    getDateInFormat,
    getMarket,
    getMainScore,
    getFullTime,
    getUrlForRospis,
    getSportIcon,
    getIcon
} from "../../Services/Shared";
import Modal from "./Modal";
import { connect } from "react-redux";
import { route } from "../../Actions/Components/Navigation/";

class Bet extends Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = e => this.closeModal.call(this, e);
        this.state = {
            isOpenModal: false
        };
    }

    toggleModal() {
        if (!this.props.isEdited) return;
        this.setState({
            ...this.state,
            isOpenModal: !this.state.isOpenModal
        });
    }

    closeModal(e) {
        if (!e.target.closest(".modal-change")) {
            this.toggleModal();
            this.removeHandlerWindowClickOnCloseModal();
        }
    }

    getMarket(bet) {
        const line = this.getLine(bet);
        return getMarket(line, this.props.markets, this.props.marketsByNum);
    }

    getLine(bet) {
        const lineId = this.props.linesByCK.get(bet.compoundKey);
        if (!lineId) return null;
        const line = this.props.lines.get(lineId);
        return line;
    }

    addHandlerWindowClickOnCloseModal() {
        document
            .getElementById("root")
            .addEventListener("click", this.handleCloseModal);
    }

    removeHandlerWindowClickOnCloseModal() {
        document
            .getElementById("root")
            .removeEventListener("click", this.handleCloseModal);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isOpenModal && this.state.isOpenModal) {
            this.addHandlerWindowClickOnCloseModal();
        }
    }

    isTimeInSport(sportId) {
        if (
            sportId === 1023 ||
            sportId === 1028 ||
            sportId === 1019 ||
            sportId === 1021 ||
            sportId === 1016 ||
            sportId === 1027
        )
            return true;
        return false;
    }

    getDate(ordinar) {
        return (
            <>
                <div>
                    {getDateInFormat(
                        "day/month",
                        ordinar.eventStartTime * 1000,
                        true
                    )}
                </div>
                <div>
                    {getDateInFormat(
                        "hours:minutes",
                        ordinar.eventStartTime * 1000,
                        true
                    )}
                </div>
            </>
        );
    }

    getScore(ordinar) {
        const eventId = this.props.eventsByGB.get(ordinar.gbEventId);
        if (!eventId) return "";
        const event = this.props.events.get(eventId);
        if (!event) return "";
        const scoreObj = getMainScore(event);
        const score = scoreObj ? scoreObj.home + ":" + scoreObj.away : "";
        const recievedTime = getFullTime(event);
        const time =
            this.isTimeInSport(event.sportId) && recievedTime
                ? recievedTime
                : "";

        return (
            <>
                <div>{score}</div>
                <div>{time}</div>
            </>
        );
    }

    goToRospis() {
        const url = getUrlForRospis(
            this.props.eventsByGB.get(this.props.gbEventId)
        );
        if (!url) return;
        this.props.navigate(url);
    }

    render() {
        const marketName = this.props.getMarketName(this.props);
        const outcomeName = this.props.getOutcomeName(this.props);
        const homeAwayName = this.props.getHomeAwayName(this.props);

        const sportId = this.props.events.get(this.props.eventId)
            ? this.props.events.get(this.props.eventId).sportId
            : 1023;

        return (
            <div
                className={
                    "bet__ordinar " +
                    (this.props.status && !this.props.isUnconfirmed
                        ? this.props.settlementOdd
                            ? "good"
                            : "bad"
                        : this.props.isUnconfirmed
                        ? " new"
                        : "")
                }
            >
                {this.props.isUnconfirmed ? (
                    <>
                        <div className="bet__background" />
                        <div
                            className="bet__close"
                            onClick={this.props.deleteBet}
                        />
                    </>
                ) : (
                    ""
                )}
                <div className="bet__condition">
                    <div
                        onClick={this.toggleModal.bind(this)}
                        className={
                            "bet__text " +
                            (this.props.isEdited ? "openable " : "")
                        }
                    >
                        {outcomeName}
                        <span className="icon_arrows absl">
                            {getIcon("double_arrows")}
                        </span>
                    </div>
                    <Modal
                        isActive={this.state.isOpenModal}
                        activeOutcomeId={this.props.outcomeId}
                        line={this.getLine(this.props)}
                        pay={this.props.pay}
                        market={this.getMarket(this.props)}
                        changeActiveOutcome={this.props.changeActiveOutcome}
                    />
                    <div className="bet__mini-coef">
                        {getCoefInTrueFormat(this.props.acceptedOdd)}
                    </div>
                </div>
                <div className="bet__type">{marketName}</div>
                <div className="bet__description">
                    <div className="left">
                        <div className="icon">
                            {getSportIcon(
                                this.props.sportId,
                                "sport",
                                "#dadada"
                            )}
                        </div>
                        <div className="bet__left">
                            <div
                                className="bet__teams"
                                onClick={this.goToRospis.bind(this)}
                            >
                                {homeAwayName.map(item => (
                                    <div key={item}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bet__right">
                        <div className="bet__additional">
                            <div>
                                {this.props.eventStatus
                                    ? this.getScore(this.props)
                                    : this.getDate(this.props)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        events: state.server.eventsAndLines.events,
        lines: state.server.eventsAndLines.lines,
        linesByCK: state.server.eventsAndLines.linesByCK,
        markets: state.server.entities.markets,
        marketsByNum: state.server.entities.marketsByNum
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
)(Bet);
