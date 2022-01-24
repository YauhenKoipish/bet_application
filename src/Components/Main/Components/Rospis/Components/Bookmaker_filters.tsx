import React, { Component } from "react";
import { connect } from "react-redux";

interface MyState {
  showListEvents: boolean;
}

class Bookmaker_filters extends Component<any, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      showListEvents: false
    };
  }
  render() {
    const { showListEvents } = this.state;
    const { events, addEventToFilters } = this.props;
    return (
      <div className="flex fl-d-c" style={{ flexDirection: "column" }}>
        <button
          onClick={() => this.setState({ showListEvents: !showListEvents })}
        >
          select event
        </button>
        {showListEvents ? (
          <ul>
            {[...events.values()].map(event => (
              <li
                key={event.id}
                onClick={() => {
                  this.setState({ showListEvents: !showListEvents });
                  addEventToFilters(event.id);
                }}
              >
                {event.id}
              </li>
            ))}
            <li>1</li>
          </ul>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.server.eventsAndLines.events
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmaker_filters);
