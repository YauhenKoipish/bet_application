import React, { Component } from "react";
import {
  sortCallbackBySortIdAndName,
  getSportIcon
} from "../../../../Services/Shared";
import SingleSport from "../../../Menu/Components/Live/SingleSportLive";
import { connect } from "react-redux";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closedSports: []
    };
  }

  toggleSport(sportId) {
    const closedSports = [...this.state.closedSports];
    if (closedSports.includes(sportId)) {
      const index = closedSports.indexOf(sportId);
      closedSports.splice(index, 1);
    } else closedSports.push(sportId);
    this.setState({
      closedSports
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) return true;
    if (nextProps.search !== this.props.search) return true;
    return false;
  }

  render() {
    const data = this.props.search;
    return (
      <div className="left-menu__main search" id="search_container">
        {data
          ? [...data.keys()]
              .map(sId => this.props.sports.get(sId))
              .sort((a, b) => sortCallbackBySortIdAndName(a, b))
              .map((sport, i) => SingleSport(this.getSportProps(sport, i)))
          : ""}
      </div>
    );
  }

  getSportProps(sport, key) {
    return {
      name: sport.name + " (" + this.props.search.get(sport.id).length + ")",
      icon: getSportIcon(sport.id),
      isOpen: !this.state.closedSports.includes(sport.id),
      toggleSport: this.toggleSport.bind(this, sport.id),
      events: this.props.search
        .get(sport.id)
        .map(ev => this.props.events.get(ev)),
      favEvents: [],
      key,
      isFav: false
    };
  }

  getEvents(sport, eventsBySports) {
    const events = eventsBySports.get(sport.id);
    return events.map(ev => this.props.events.get(ev));
  }
}
const mapStateToProps = state => {
  return {
    events: state.server.eventsAndLines.events,
    sports: state.server.entities.sports
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
