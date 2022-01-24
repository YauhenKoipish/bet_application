import React, { Component } from "react";
import { connect } from "react-redux";
import SliderInfo from "./SliderInfo";
import Slide from "./Slide";
import { splitRangNumber } from "../../../../../../Services/Shared";
import DvorovayaLeague from "../img/alfa-club/dvorovaya.png";
import LubitelskayaLeague from "../img/alfa-club/lubitelskaya.png";
import ProLeague from "../img/alfa-club/pro.png";
import PervayaLeague from "../img/alfa-club/pervaya.png";
import PremierLeague from "../img/alfa-club/premier.png";
import ChempionskayaLeague from "../img/alfa-club/chempionskaya.png";

class Slider extends Component {
  constructor(props) {
    super(props);

    this.sliderContainerElem = React.createRef();
    this.isTouchStartsOnContainer = false;
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.containerElem = React.createRef();
    this.handleSetTransform = () => this.setTransform.call(this);
    const currentLeagueId = props.userInfo.currentLeagueId
      ? props.userInfo.currentLeagueId
      : 0;
    this.cards = [];
    this.state = {
      startTouch: null,
      startTouchShift: null,
      active: props.isAuthorize ? currentLeagueId : 0,
      prevActive: props.isAuthorize ? currentLeagueId : 0,
      points: props.isAuthorize
        ? splitRangNumber(Math.floor(props.userInfo.points))
        : 0,
      currentLevel: props.isAuthorize ? props.userInfo.currentLeagueId : null,
      shift: 0,
      components: [
        {
          name: "Дворовая лига",
          svgComponent: DvorovayaLeague
        },
        {
          name: "Любительская лига",
          svgComponent: LubitelskayaLeague
        },
        {
          name: "Про лига",
          svgComponent: ProLeague
        },
        {
          name: "Первая лига",
          svgComponent: PervayaLeague
        },
        {
          name: "Премьер лига",
          svgComponent: PremierLeague
        },
        {
          name: "Чемпионская лига",
          svgComponent: ChempionskayaLeague
        }
      ]
    };
  }

  showNext() {
    this.setState({
      ...this.state,
      active: this.state.active + 1,
      prevActive: this.state.active
      //   shift: this.getTransformValueByCurrentLevel(this.state.active + 1)
    });
  }

  showPrev() {
    this.setState({
      ...this.state,
      active: this.state.active - 1,
      prevActive: this.state.active
      //   shift: this.getTransformValueByCurrentLevel(this.state.active - 1)
    });
  }

  setTransform(level = this.state.active) {
    const shift = this.getTransformValueByCurrentLevel(level);
    this.setState({ ...this.state, shift });
  }

  getCardWidth(elem) {
    const widthCard = elem.clientWidth;
    const nodeStyleCard = getComputedStyle(elem);
    const marginLeftCard = nodeStyleCard.getPropertyValue("margin-left");
    const marginRightCard = nodeStyleCard.getPropertyValue("margin-right");
    return widthCard + parseInt(marginLeftCard) + parseInt(marginRightCard);
  }

  getMarginLeft(elem) {
    const nodeStyleCard = getComputedStyle(elem);
    const marginLeftCard = nodeStyleCard.getPropertyValue("margin-left");
    return parseInt(marginLeftCard);
  }

  getShiflting(level) {
    const w = window.innerWidth;
    const widthElem = w > 599 ? 156 : 125;
    const widthMargin = w > 599 ? 135 : 60;
    const levelMargin = level - 1;
    return (
      level * widthElem + (levelMargin > 0 ? levelMargin * widthMargin : 0)
    );
  }

  getTransformValueByCurrentLevel(level) {
    const widthContainer = this.containerElem.current.clientWidth;
    // const widthSliderContainer = this.sliderContainerElem.current.clientWidth;
    const shifting = this.getShiflting(level);
    // const shifting = [...this.cards]
    //   .filter((card, i) => i < level)
    //   .reduce((accum, elem) => (accum += this.getCardWidth(elem.current)), 0);

    const marginLeftCard = this.getMarginLeft(this.cards[level].current);
    // level < this.state.currentLevel
    //   ? this.getMarginLeft(this.cards[level].current)
    //   : this.getMarginLeft(this.cards[level - 1].current);

    return widthContainer / 2 - shifting - marginLeftCard;
  }

  changeLevelByChangingProps(props) {
    if (
      this.state.currentLevel !== props.userInfo.currentLeagueId ||
      this.state.points !== splitRangNumber(Math.floor(props.userInfo.points))
    ) {
      this.setState({
        ...this.state,
        currentLevel: props.userInfo.currentLeagueId,
        active: props.userInfo.currentLeagueId,
        prevActive: this.state.active,
        points: splitRangNumber(Math.floor(props.userInfo.points))
      });
    }
  }

  changeStateByUserLogIn(props) {
    if (props.isAuthorize && !props.userInfo.hasOwnProperty("currentLeagueId"))
      return;
    this.setState({
      ...this.state,
      active: props.isAuthorize
        ? props.userInfo.currentLeagueId
        : this.state.active,
      prevActive: props.isAuthorize
        ? props.userInfo.currentLeagueId
        : this.state.active,
      points: props.isAuthorize
        ? splitRangNumber(Math.floor(props.userInfo.points))
        : 0,
      currentLevel: props.isAuthorize ? props.userInfo.currentLeagueId : null,
      shift: props.isAuthorize
        ? this.getTransformValueByCurrentLevel(props.userInfo.currentLeagueId)
        : this.getTransformValueByCurrentLevel(this.state.active)
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isAuthorize !== this.props.isAuthorize) {
      this.changeStateByUserLogIn(nextProps);
      return false;
    }
    if (nextProps.userInfo !== this.props.userInfo) {
      this.changeLevelByChangingProps(nextProps);
      return false;
    }
    return true;
  }

  isArrow(target) {
    if (
      target.closest(".alfa-club__toggle-right") ||
      target.closest(".alfa-club__toggle-left")
    )
      return true;
    return false;
  }

  getCoordTouch(e) {
    const touch = e.changedTouches[0];
    return {
      x: touch.clientX,
      y: touch.clientY
    };
  }

  handleTouchMove(event) {
    if (this.isArrow(event.target)) return;
    if (!this.isTouchStartsOnContainer) return;
    const coords = this.getCoordTouch(event);
    this.setState({
      ...this.state,
      shift: coords.x - this.state.startTouch + this.state.startTouchShift
    });
  }

  handleTouchStart(event) {
    if (this.isArrow(event.target)) return;
    this.isTouchStartsOnContainer = true;
    const coords = this.getCoordTouch(event);
    this.setState({
      ...this.state,
      startTouch: coords.x,
      startTouchShift: this.state.shift
    });
  }

  getSimilarShift(value, shifts) {
    let diffShift = Infinity;
    let resultShift = shifts[0];
    let resultShiftIndex = 0;
    shifts.forEach((shift, index) => {
      if (Math.abs(shift - value) < diffShift) {
        diffShift = Math.abs(shift - value);
        resultShift = shift;
        resultShiftIndex = index;
      }
    });
    return [resultShift, resultShiftIndex];
  }

  handleTouchEnd(event) {
    if (this.isArrow(event.target)) return;
    if (!this.isTouchStartsOnContainer) return;
    this.isTouchStartsOnContainer = false;
    const shiftArray = this.getSimilarShift(
      this.state.shift,
      [...this.state.components].map((c, i) =>
        this.getTransformValueByCurrentLevel(i)
      )
    );
    this.setState({
      ...this.state,
      startTouch: null,
      startTouchShift: null,
      shift: shiftArray[0],
      active: shiftArray[1],
      prevActive: this.state.active
    });
  }

  getStyle() {
    if (!this.state.startTouch)
      return {
        transform: `translateX(${this.state.shift}px)`,
        transition: "all 0.5s ease 0s"
      };
    return { transform: `translateX(${this.state.shift}px)` };
  }

  render() {
    const {
      active,
      components,
      currentLevel,
      points,
      shift,
      startTouch,
      prevActive
    } = this.state;
    return (
      <div className="alfa-club__top" ref={this.containerElem}>
        <div
          className="alfa-club__slider"
          ref={this.sliderContainerElem}
          style={this.getStyle()}
          //   style={{ left: shift + "px" }}
        >
          {components.map((component, i) => {
            this.cards.push(React.createRef());
            return (
              <Slide
                key={component.name}
                {...component}
                isActive={i === active}
                points={i === currentLevel ? points : 0}
                isCurrentLevel={i === currentLevel}
                elem={this.cards[i]}
                classes={
                  currentLevel === null
                    ? " locked"
                    : (i > currentLevel
                        ? " locked"
                        : i < currentLevel
                        ? " passed"
                        : "") +
                      (prevActive === i && prevActive !== active
                        ? " reduce-img"
                        : "")
                }
              />
            );
          })}
        </div>
        {active !== 0 ? (
          <div
            className="alfa-club__toggle-left"
            onClick={this.showPrev.bind(this)}
          />
        ) : (
          ""
        )}
        {active !== components.length - 1 ? (
          <div
            className="alfa-club__toggle-right"
            onClick={this.showNext.bind(this)}
          />
        ) : (
          ""
        )}

        <SliderInfo />
      </div>
    );
  }

  componentDidMount() {
    this.setTransform();
    window.addEventListener("resize", this.handleSetTransform);
    this.sliderContainerElem.current.addEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.sliderContainerElem.current.addEventListener(
      "touchend",
      this.handleTouchEnd,
      false
    );
    this.sliderContainerElem.current.addEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleSetTransform);
    this.sliderContainerElem.current.removeEventListener(
      "touchstart",
      this.handleTouchStart,
      false
    );
    this.sliderContainerElem.current.removeEventListener(
      "touchmove",
      this.handleTouchMove,
      false
    );
    this.sliderContainerElem.current.removeEventListener(
      "touchend",
      this.handleTouchEnd,
      false
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.active !== prevState.active) this.setTransform();
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.info.accountData,
    isAuthorize: state.user.isAuthorize
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);
