import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModalTest } from "../../Actions/Components/Modal";
import { saveEvents } from "../../Actions/Components/Server/Case2";

class RemoveEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: ""
    };
  }

  test() {
    this.props.closeModalTest();
    const event = this.props.events.get(this.state.eventId);
    if (!event) {
      console.log("-------------ТЕСТИРОВАНИЕ-------------");
      console.log("такой линии нет");
      return;
    }
    event.status = -1;
    this.props.saveEvents(
      new Map([[event.id, { ...event }]]),
      this.props.events
    );
  }

  changeEventId(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      eventId: val
    });
  }

  render() {
    return (
      <>
        <div className="caption-test">Event Id</div>
        <input
          className="input-test"
          value={this.state.eventId}
          onChange={this.changeEventId.bind(this)}
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

export default connect(mapStateToProps, mapDispatchToProps)(RemoveEvent);
