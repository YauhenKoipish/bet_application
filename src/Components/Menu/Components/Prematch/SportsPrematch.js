import React, { Component } from "react";
import SingleSport from "./SingleSportPrematch";
import {
  getSportIcon,
  sortCallbackBySortIdAndName,
  getMenuContainerHeight
} from "../../../../Services/Shared";

class Sports extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.handleSetContainerHeight = this.setContainerHeight.bind(this);
  }

  render() {
    //тут передавать еще активный компонент выбранный чтобы вешать класс
    const { favSports = [] } = this.props;
    const isSportInFav = isSportInFavFunc(favSports);
    return (
      <div className="left-menu__main" ref={this.container}>
        {this.props.sports
          ? this.props.sports
              .sort((a, b) => sortCallbackBySortIdAndName(a, b))
              .map((sport, i) => {
                return !isSportInFav(sport.id)
                  ? SingleSport(getSportProps(this.props, sport, isSportInFav))
                  : "";
              })
          : ""}
      </div>
    );
  }

  setContainerHeight() {
    this.container.current.style.height = getMenuContainerHeight() + "px";
  }

  componentDidMount() {
    this.setContainerHeight();
    window.addEventListener("resize", this.handleSetContainerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleSetContainerHeight);
  }

  componentDidUpdate() {
    this.setContainerHeight();
  }
}

const getSportProps = (props, sport, isSportInFav) => {
  return {
    name: sport.name,
    icon: getSportIcon(sport.id),
    MinusOrPlus: isSportInFav(sport.id) ? "minus" : "plus",
    key: sport.id,
    clickFunc: isSportInFav(sport.id)
      ? props.onMinus.bind(this, sport.id)
      : props.onPlus.bind(this, sport.id),
    route: props.navigate.bind(this, sport.name),
    activeLink: props.activeLink //props.propsRoute.location.pathname.split("/")[2]
  };
};

export const isSportInFavFunc = sports => {
  const reducer = (accum, cur) => [...accum, cur.id];
  const favSports = sports.reduce(reducer, []);
  return sport => favSports.includes(sport);
};

export default Sports;
