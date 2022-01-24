import React, { Component } from "react";
import { connect } from "react-redux";
import Bookmaker_filters from "./Bookmaker_filters";
import Bookmaker_block_market from "./Bookmaker_block_market";

interface MyState {
  events: string[];
}

class Bookmaker_table extends Component<any, MyState> {
  constructor(props) {
    super(props);
    const initEventId = this.props.match.params.event;
    this.state = {
      events: [initEventId]
    };
  }

  addEventToFilters(id) {
    const { events } = this.state;
    events.push(id);
    this.setState({ events });
  }

  render() {
    const { events } = this.state;
    return (
      <div>
        <Bookmaker_filters
          addEventToFilters={this.addEventToFilters.bind(this)}
        />
        <div className="container_painting">
          {events.map(eventId => (
            <Bookmaker_block_market key={eventId} eventId={eventId} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmaker_table);
