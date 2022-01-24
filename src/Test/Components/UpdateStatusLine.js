import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModalTest } from "../../Actions/Components/Modal";
import { saveEvents } from "../../Actions/Components/Server/Case2";

class UpdateStatusLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineId: "",
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
    event.lines.get(line.id).status = +this.state.status;
    this.props.lines.get(line.id).status = +this.state.status;
    this.props.saveEvents(
      new Map([[event.id, { ...event }]]),
      this.props.events
    );
  }

  changeLineId(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      lineId: val
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
        <div className="caption-test">
          Status (0 - удалить, 1 - сделать активной, -1 - заблокировать)
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStatusLine);
