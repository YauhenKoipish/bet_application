import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModalTest } from "../../Actions/Components/Modal/";
import { deleteOrPauseEvent } from "../../Actions/Components/Server/Case8/";

class BlockEventLines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: ""
    };
  }

  test() {
    this.props.closeModalTest();
    const data = this.state.eventId;
    this.props.deleteOrPauseEvent(data);
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
    events: state.server.eventsAndLines.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModalTest: () => dispatch(closeModalTest()),
    deleteOrPauseEvent: data => dispatch(deleteOrPauseEvent(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockEventLines);
