import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModalTest } from "../../Actions/Components/Modal";
import { saveEvents } from "../../Actions/Components/Server/Case2";

class CoefInactive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineId: "",
      outcomeId: "",
      availableOutcomeIds: null,
      status: ""
    };
  }

  test() {
    this.props.closeModalTest();
    const line = this.props.lines.get(+this.state.lineId);
    if (!line) {
      console.log("-------------ТЕСТИРОВАНИЕ-------------");
      console.log("такой линии нет");
      return;
    }
    const event = this.props.events.get(line.eventId);
    if (!event) {
      console.log("-------------ТЕСТИРОВАНИЕ-------------");
      console.log("события из этой линии нет");
      return;
    }
    const indexOutcome = this.props.lines
      .get(line.id)
      .outcomeId.indexOf(+this.state.outcomeId);
    event.lines.get(line.id).outcomeActive[indexOutcome] = +this.state.status;
    this.props.lines.get(line.id).outcomeActive[indexOutcome] = +this.state
      .status;
    this.props.saveEvents(
      new Map([[event.id, { ...event }]]),
      this.props.events
    );
  }

  changeLineId(event) {
    const val = event.target.value;
    const line = this.props.lines.get(+val);
    let availableOutcomeIds = null;
    if (line) {
      availableOutcomeIds = line.outcomeId;
    }
    this.setState({
      ...this.state,
      lineId: val,
      availableOutcomeIds
    });
  }

  changeOutcomeId(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      outcomeId: val
    });
  }

  changeStatus(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      status: val
    });
  }

  render() {
    return (
      <>
        <div className="caption-test">Line Id</div>
        <input
          className="input-test"
          value={this.state.lineId}
          onChange={this.changeLineId.bind(this)}
        />
        {this.state.availableOutcomeIds &&
        this.state.availableOutcomeIds.length !== 0 ? (
          <>
            <div className="caption-test">Доступные оуткомы</div>
            <div className="caption-test">
              {this.state.availableOutcomeIds.join(", ")}
            </div>
          </>
        ) : (
          ""
        )}

        <div className="caption-test">Outcome Id</div>
        <input
          className="input-test"
          value={this.state.outcomeId}
          onChange={this.changeOutcomeId.bind(this)}
        />

        <div className="caption-test">
          Cостояние (0 - не активен, 1 - активен)
        </div>
        <input
          className="input-test"
          value={this.state.status}
          onChange={this.changeStatus.bind(this)}
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
    events: state.server.eventsAndLines.events,
    lines: state.server.eventsAndLines.lines
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModalTest: () => dispatch(closeModalTest()),
    saveEvents: (events, eventsMap) => dispatch(saveEvents(events, eventsMap))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoefInactive);
