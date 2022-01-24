import React, { Component } from "react";
import { connect } from "react-redux";
import Ticket from "./Ticket";
import EmptyBlock from "../EmptyBlock/";

class Tickets extends Component {
  getValidTickets() {
    const {
      status = null,
      eventStatus = null,
      isLongTerm = null,
      timeStart = null,
      timeEnd = null
    } = this.props.filters;
    return [...this.props.tickets.values()].filter(t => {
      if (status !== null && status !== t.status) return false;
      if (
        eventStatus !== null &&
        ![...t.bets.values()].some(bet => bet.eventStatus === eventStatus)
      )
        return false;
      if (timeStart !== null && t.timestamp < timeStart) return false;
      if (timeEnd !== null && t.timestamp > timeEnd) return false;
      if (
        isLongTerm !== null &&
        this.isTicketValidByLongTermFilter(t, isLongTerm)
      )
        return false;
      return true;
    });
  }

  isTicketValidByLongTermFilter(t, isLongTerm) {
    if (!isLongTerm) {
      return (
        t.status === 0 &&
        [...t.bets.values()].some(
          bet =>
            bet.typeRadar === 2 ||
            bet.typeRadar === 3 ||
            bet.typeRadar === 4 ||
            bet.typeRadar === 6 ||
            bet.typeRadar === 9 ||
            bet.typeRadar === 10 ||
            bet.typeRadar === 15 ||
            bet.typeRadar === 16 ||
            bet.typeRadar === 17 ||
            bet.typeRadar === 18
        )
      );
    } else {
      return (
        t.status === 1 ||
        ![...t.bets.values()].some(
          bet =>
            bet.typeRadar === 2 ||
            bet.typeRadar === 3 ||
            bet.typeRadar === 4 ||
            bet.typeRadar === 6 ||
            bet.typeRadar === 9 ||
            bet.typeRadar === 10 ||
            bet.typeRadar === 15 ||
            bet.typeRadar === 16 ||
            bet.typeRadar === 17 ||
            bet.typeRadar === 18
        )
      );
    }
  }

  getKey(tId) {
    const key = Object.values(this.props.filters).join("-") + "-" + tId;
    return key;
  }

  render() {
    const validTickets = this.getValidTickets();
    if (validTickets.length === 0)
      return <EmptyBlock text={this.props.lang.notParam} />;
    return (
      <>
        <div className="bets__titles">
          <div>{this.props.lang.betsHistoryTable.data}</div>
          <div>{this.props.lang.betsHistoryTable.event}</div>
          <div>{this.props.lang.betsHistoryTable.bets}</div>
          <div>{this.props.lang.betsHistoryTable.repli}</div>
        </div>
        {validTickets
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((t, i) => (
            <Ticket
              key={this.getKey(t.ticketId)}
              {...t}
              filters={{ ...this.props.filters }}
              isFilterCashout={this.props.filters.isCashout}
            />
          ))}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.user.info.tickets,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tickets);
