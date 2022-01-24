import React, { Component } from "react";

export default class Coef extends Component {
  constructor(props) {
    super(props);
    this.elem = React.createRef();
    this.coef = null;
  }

  get coefClass() {
    if (!this.coef || this.coef === "-" || !this.prevCoef) return "";
    if (this.prevCoef === "-" && this.coef) return "green_rose";
    if (+this.coef < +this.prevCoef) return "red_fell";
    if (+this.coef > +this.prevCoef) return "green_rose";
    return this.currentCoefClass;
  }

  setTimer() {
    this.timer = setTimeout(this.removeCoefClass.bind(this), 4000);
  }

  shouldComponentUpdate(nextProps) {
    this.isToggleOutcome = nextProps.isActive !== this.props.isActive;
    return true;
  }

  render() {
    this.prevCoef = this.coef;
    const { toggleOutcome = f => f, isActive = false, coef } = this.props;
    this.coef = coef;
    this.currentCoefClass = this.coefClass;
    const composeClass = "line__coef " + (isActive ? " active" : "");
    return (
      <div ref={this.elem} onClick={toggleOutcome} className={composeClass}>
        <span>{coef}</span>
      </div>
    );
  }

  removeCoefClass() {
    this.elem.current.classList.remove("red_fell");
    this.elem.current.classList.remove("green_rose");
    this.currentCoefClass = "";
  }

  componentDidMount() {
    if (this.currentCoefClass && !this.isToggleOutcome) {
      this.setTimer();
    }
  }

  componentDidUpdate() {
    if (
      this.currentCoefClass &&
      !this.elem.current.classList.contains(this.currentCoefClass)
    ) {
      this.elem.current.classList.remove("red_fell");
      this.elem.current.classList.remove("green_rose");
      this.elem.current.classList.add(this.currentCoefClass);
    }
    if (this.currentCoefClass && !this.isToggleOutcome) {
      clearTimeout(this.timer);
      this.setTimer();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
}

const getCoefElem = (elem, toggleOutcome, composeClass, coef) => {
  return (
    <div ref={elem} onClick={toggleOutcome} className={composeClass}>
      <span>{coef}</span>
    </div>
  );
};
