import React, { Component } from "react";
import { connect } from "react-redux";
import { saveEvents } from "../../Actions/Components/Server/Case2/";
import { closeModalTest } from "../../Actions/Components/Modal/";
import { betStop } from "../../Actions/Components/Server/Case9/";

class BetStop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: "",
      isBetStop: ""
    };
  }

  test() {
    this.props.closeModalTest();
    const data = {
      providerId: +this.state.provider,
      isBetStop: +this.state.isBetStop
    };
    this.props.betStop(data);
  }

  changeProvider(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      provider: val
    });
  }

  changeIsBetStop(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      isBetStop: val
    });
  }

  render() {
    return (
      <>
        <div className="caption-test">
          Provider (1 - BetRadar, 2 - SSLN, 3 - BetGenius)
        </div>
        <input
          className="input-test"
          value={this.state.provider}
          onChange={this.changeProvider.bind(this)}
        />
        <div className="caption-test">isBetStop (0 - отменить, 1 - начать)</div>
        <input
          className="input-test"
          value={this.state.isBetStop}
          onChange={this.changeIsBetStop.bind(this)}
        />
        <div className="coupon__accept test" onClick={this.test.bind(this)}>
          <button>Применить</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.server.eventsAndLines.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEvent: events => dispatch(saveEvents(events)),
    closeModalTest: () => dispatch(closeModalTest()),
    betStop: data => dispatch(betStop(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BetStop);
