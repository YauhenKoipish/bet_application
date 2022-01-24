import React, { Component } from "react";
import {
    getCoefInTrueFormat,
    getDateInFormat,
    getMarket,
    getMainScore,
    getFullTime,
    getUrlForRospis,
    getSportIcon
} from "../../Services/Shared";
import Modal from "./Modal";
import { connect } from "react-redux";
import { route } from "../../Actions/Components/Navigation/";

class Ordinar extends Component {
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

    getEventByGB(gbId) {
        const eventId = this.props.eventsByGB.get(gbId);
        if (!eventId) return null;
        const event = this.props.events.get(eventId);
        if (!event) return null;
        return event;
    }

    goToRospis() {
        const ordinarKey = [...this.props.bets.keys()][0];
        const ordinar = this.props.bets.get(ordinarKey);
        const url = getUrlForRospis(
            this.props.eventsByGB.get(ordinar.gbEventId)
        );
        if (!url) return;
        this.props.navigate(url);
    }

    render() {
        const ordinarKey = [...this.props.bets.keys()][0];
        const ordinar = this.props.bets.get(ordinarKey);
        const coef = this.props.isEdited
            ? ordinar.acceptedOdd
            : this.props.ticketCoef;
        if (this.props.isEdited) console.log(coef);
        const marketName = this.props.getMarketName(ordinar);
        const outcomeName = this.props.getOutcomeName(ordinar);
        const homeAwayName = this.props.getHomeAwayName(ordinar);

        return (
            <div className="bets__bet bet">
                <div className="bet__main">
                    <div className="bet__header">
                        <div
                            onClick={this.toggleModal.bind(this)}
                            className={
                                "bet__name " +
                                (this.props.isEdited ? "openable " : "")
                            }
                        >
                            {outcomeName}
                        </div>
                        <div className="bet__coef">
                            {getCoefInTrueFormat(coef)}
                        </div>
                        <Modal
                            isActive={this.state.isOpenModal}
                            activeOutcomeId={ordinar.outcomeId}
                            line={this.getLine(ordinar)}
                            pay={this.props.pay}
                            market={this.getMarket(ordinar)}
                            changeActiveOutcome={outcomeId =>
                                this.props.changeBetOutcome(
                                    ordinarKey,
                                    outcomeId
                                )
                            }
                        />
                    </div>

                    <div className="bet__description">
                        <div className="icon">
                            {getSportIcon(this.props.sportId)}
                        </div>
                        <div className="bet__left">
                            <div className="bet__type">{marketName}</div>
                            <div
                                className="bet__teams"
                                onClick={this.goToRospis.bind(this)}
                            >
                                {homeAwayName}
                            </div>
                        </div>

                        <div className="bet__right">
                            <div className="bet__additional">
                                {ordinar.eventStatus
                                    ? this.getScore(ordinar)
                                    : this.getDate(ordinar)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
}

const mapStateToProps = state => {
    return {
        eventsByGB: state.server.eventsAndLines.eventsByGB,
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
)(Ordinar);
