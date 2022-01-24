import React, { Component } from "react";
// import FavSports from "./FavSportsLive";
import Sports from "./SportsLive";
import SportsContainer from "./SportsContainerLive";

class Live extends Component {
  constructor(props) {
    super(props);
    this.mainSports = [1023, 1034, 1027, 1016, 1035];
    this.state = {
      closedSports: this.getClosedSports([...this.props.eventsBySports.keys()]),
      closedSportsFav: this.getClosedSports(props.favSports)
    };
  }

  getClosedSports(sportsArr = []) {
    return sportsArr.filter(s => !this.mainSports.includes(s));
  }

  toggleSport(sportId) {
    const { closedSports } = this.state;
    if (closedSports.includes(sportId)) {
      const index = closedSports.indexOf(sportId);
      closedSports.splice(index, 1);
      const state = {
        ...this.state,
        closedSports
      };
      this.setState(state);
    } else {
      this.setState({
        ...this.state,
        closedSports: [...closedSports, sportId]
      });
    }
  }

  toggleSportFav(sportId) {
    const { closedSportsFav } = this.state;
    if (closedSportsFav.includes(sportId)) {
      const index = closedSportsFav.indexOf(sportId);
      closedSportsFav.splice(index, 1);
      const state = {
        ...this.state,
        closedSportsFav
      };
      this.setState(state);
    } else {
      this.setState({
        ...this.state,
        closedSportsFav: [...closedSportsFav, sportId]
      });
    }
  }

  getFavSports() {
    return [...this.props.favSports].filter(s =>
      this.props.favEventsBySports.has(s.id)
    );
  }

  render() {
    const {
      sports,
      addSportToFav,
      removeSportFromFav,
      addEventToFav,
      removeEventFromFav,
      favSports,
      favEvents,
      navigate,
      route,
      eventsBySports,
      favEventsBySports,
      eventsMap
    } = this.props;
    const { closedSports, closedSportsFav } = this.state;
    return (
      <React.Fragment>
        {/* {
                    <FavSports route={route}>
                        <Sports
                            closedSports={closedSportsFav}
                            sports={this.getFavSports()}
                            eventsBySports={favEventsBySports}
                            eventsMap={eventsMap}
                            onPlus={addSportToFav}
                            onMinus={removeSportFromFav}
                            favSports={favSports}
                            navigate={navigate}
                            addEventToFav={addEventToFav}
                            removeEventFromFav={removeEventFromFav}
                            favEvents={favEvents}
                            toggleSport={this.toggleSportFav.bind(this)}
                        />
                    </FavSports>
                } */}
        {
          <SportsContainer>
            <Sports
              closedSports={closedSports}
              sports={sports}
              eventsBySports={eventsBySports}
              eventsMap={eventsMap}
              onPlus={addSportToFav}
              onMinus={removeSportFromFav}
              favSports={favSports}
              navigate={navigate}
              addEventToFav={addEventToFav}
              removeEventFromFav={removeEventFromFav}
              favEvents={favEvents}
              toggleSport={this.toggleSport.bind(this)}
            />
          </SportsContainer>
        }
      </React.Fragment>
    );
  }
}

export default Live;
