import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModalTest } from "../../Actions/Components/Modal";
import { saveEvents } from "../../Actions/Components/Server/Case2";

class UpdateStatusLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineId: "",
      odds: ""
    };
  }

  test() {
    if (!this.state.odds) return;
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
    const newOdds = this.state.odds.split(", ").map(odd => parseFloat(odd));

    event.lines.get(line.id).outcomeOdds = newOdds;
    this.props.lines.get(line.id).outcomeOdds = newOdds;
    this.props.saveEvents(
      new Map([[event.id, { ...event }]]),
      this.props.events
    );
  }

  changeLineId(event) {
    const val = event.target.value;
    const line = this.props.lines.get(+val);
    let odds = null;
    if (line) {
      odds = line.outcomeOdds.join(", ");
    }
    this.setState({
      ...this.state,
      lineId: val,
      odds: odds ? odds : this.state.odds
    });
  }

  changeOdds(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      odds: val
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
        <div className="caption-test">Коээфициенты</div>
        <input
          className="input-test"
          value={this.state.odds}
          onChange={this.changeOdds.bind(this)}
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
