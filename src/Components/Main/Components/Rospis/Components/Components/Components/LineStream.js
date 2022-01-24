import React from "react";

import { connect } from "react-redux";

import Line from "../../../../../../Main/Components/Table/Line/";

class LineStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: props.event,
      markets: props.markets,
      marketsByNum: props.marketsByNum
    };
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

  getCurState(state = {}, props = null, eventUpdate) {
    // debugger;
    const event = eventUpdate ? props.events : props.newEvents;

    if (
      [...event.values()].find(ev => ev.gbEventId === state.event.gbEventId)
    ) {
      if (event.has(state.event.id)) {
        const newState = {
          ...state,
          event: event.get(state.event.id)
        };
        this.isUpdate = true;
        this.setState(newState);
      }
    } else {
    }

    return state;
  }

  shouldComponentUpdate(nextProps) {
    if (this.isUpdate) return true;

    const newState = this.getCurState(this.state, nextProps, true);
    if (newState != this.state) this.setState(newState);
    return false;
  }

  render() {
    return (
      <>
        <div className="stream__table">
          <div className="stream__row">
            <div className="stream__title">
              <div className="stream__name">{this.props.lang.exodus}</div>
            </div>
            {<Line {...this.state} coupon={[]} filter="1x2" />}
          </div>
          <div className="stream__row">
            <div className="stream__title">
              <div className="stream__name">{this.props.lang.totalFilt}</div>
            </div>
            {<Line {...this.state} coupon={[]} filter="total" />}
          </div>
          <div className="stream__row">
            <div className="stream__title">
              <div className="stream__name">{this.props.lang.fora}</div>
            </div>
            {<Line {...this.state} coupon={[]} filter="handicap" />}
          </div>
        </div>
      </>
    );
  }
  componentDidMount() {
    this.isUpdate = false;
  }
}

const mapStateToProps = state => {
  return {
    events: state.server.eventsAndLines.events,
    marketsByNum: state.server.entities.marketsByNum,
    markets: state.server.entities.markets,
    newEvents: state.server.eventsAndLines.newEvents,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineStream);
