import React, { Component } from "react";
import { connect } from "react-redux";

// interface MyProps {
//   eventId: string;
// }
interface MyState {
  marketsId: any;
}

class Bookmaker_block_market extends Component<any, MyState> {
  constructor(props) {
    super(props);
    this.state = this.getCurState();
  }

  getCurState() {
    const set = new Set();
    const { eventId } = this.props;

    this.props.events.get(eventId).lines.forEach(line => {
      set.add(line.marketId.toString());
    });

    const marketsId = Array.from(set);

    return {
      marketsId
    };
  }

  render() {
    const { marketsId } = this.state;
    const { markets, eventId, events } = this.props;

    return (
      <div style={{ background: "gray", margin: 10 }}>
        {`${events.get(eventId).homeName} _ ${events.get(eventId).awayName}`}
        <div className="container_elemtn">
          {marketsId.map((marketId, index) => {
            const market = markets.get(marketId.toString());

            return (
              <div className="flex" key={marketId}>
                <div>{market.name}</div>
                <div>{market.id}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.server.eventsAndLines.events,
  lines: state.server.eventsAndLines.lines,
  markets: state.server.entities.markets
});

export default connect(mapStateToProps, null)(Bookmaker_block_market);
