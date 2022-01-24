import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getCoef} from "../../../../Services/Shared";
import Express from "./Express";
import System from "./System";
// import { ordinarsInfo } from "../../../../Reducers/Components/Coupon";

class MultibetsItem extends Component<any, any> {
  initialState: {
    ordinars: Array<any>;
  };
  constructor(props) {
    super(props);
    this.initialState = {
      ordinars: []
    };
    this.state = this.getCurState(props, this.initialState);
  }

  getOrdinarCoefInState(ordinar, state) {
    return state.ordinars.find(ord => {
      if (
        ord.outcomeId === ordinar.outcomeId &&
        ord.compoundKey === ordinar.compoundKey
      )
        return true;
      return false;
    });
  }

  getStateOrdinars(ordinars, state) {
    return ordinars.map(ord => {
      const lineId = this.props.linesByCK.get(ord.compoundKey);
      const line = this.props.lines.get(lineId);
      const coef = getCoef(line, ord.outcomeId);
      return {
        ...ord,
        coef: coef
          ? coef
          : this.getOrdinarCoefInState(ord, state)
          ? this.getOrdinarCoefInState(ord, state)
          : 0
      };
    });
  }

  isLinesInEvents(events, compoundKeys) {
    if (!compoundKeys || compoundKeys.length === 0) return true;
    if (events.size === 0) return false;
    const allLines = [...events.values()].reduce(
      (accum, value) =>
        value ? [...accum, ...value.lines.keys()] : console.log(events),
      []
    );
    const linesById = compoundKeys.map(l => this.props.linesByCK.get(l));
    return linesById.some(l => allLines.includes(l));
  }

  isChangesCoefs(props, state) {
    return !state.ordinars.every(
      ord =>
        ord.coef ===
        getCoef(
          props.lines.get(props.linesByCK.get(ord.compoundKey)),
          ord.outcomeId
        )
    );
  }

  isShouldUpdateState(props, state) {
    if (props.ordinars.length !== state.ordinars.length) return true;
    if (props.isBlocked !== this.props.isBlocked) {
      return true;
    }
    if (
      this.isLinesInEvents(
        props.newEvents,
        state.ordinars.map(or => or.compoundKey)
      )
    ) {
      if (this.isChangesCoefs(props, state)) return true;
    }
    if (
      props.deletedEvent &&
      this.isLinesInEvents(
        [props.deletedEvent],
        state.ordinars.map(or => or.compoundKey)
      )
    )
      return true;
    return false;
  }

  getCurState(props, state) {
    if (!this.isShouldUpdateState(props, state)) return state;

    const ordinars = props.ordinars;
    const stateOrdinars = this.getStateOrdinars(ordinars, state);
    return {
      ...state,
      ordinars: stateOrdinars
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) return true;
    const newState = this.getCurState(nextProps, this.state);
    if (this.state !== newState) {
      this.setState(newState);
    }
    return false;
  }

  render() {
    const { isExpress, isSystem, isBlocked, ordinarsInfo } = this.props;
    const { ordinars } = this.state;
    return (
      <Fragment>
        {isExpress ? (
          <Express
            isBlocked={isBlocked}
            ordinars={ordinars}
            ordinarsInfo={ordinarsInfo}
          />
        ) : (
          ""
        )}
        {isSystem ? (
          <System
            isBlocked={isBlocked}
            ordinars={ordinars}
            ordinarsInfo={ordinarsInfo}
          />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.server.eventsAndLines.events,
    newEvents: state.server.eventsAndLines.newEvents,
    lines: state.server.eventsAndLines.lines,
    linesByCK: state.server.eventsAndLines.linesByCK,
    deletedEvent: state.server.eventsAndLines.deletedEvent,
    ordinarsInfo: state.coupon.ordinarsInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultibetsItem);
