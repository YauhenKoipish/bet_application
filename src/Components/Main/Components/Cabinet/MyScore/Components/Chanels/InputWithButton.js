import React, { Component } from "react";
import Loading from "../../../../../../Loading/";

export default class InputWithButton extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      isButtonActive: false
    };
    this.state = this.getCurState(this.initialState, props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) return true;
    const newState = this.getCurState(this.state, nextProps);
    if (newState !== this.state) {
      this.setState(newState);
      return false;
    }
    return true;
  }

  getCurState(state, props) {
    const value = +props.sum.replace(/ /g, "");
    const newIsButtonActive =
      value && value >= props.minSum && value <= props.maxSum;
    if (newIsButtonActive !== state.isButtonActive) {
      return {
        ...state,
        isButtonActive: newIsButtonActive
      };
    }
    return state;
  }

  handleClickButton() {
    if (!this.state.isButtonActive || this.props.isLoading) return;
    this.props.handleClickButton();
  }

  render() {
    return (
      <div className="user-replenishment__form">
        <label className="user-data__field">
          <span className="user-data__type">{this.props.lang.sum}</span>
          <input
            type="text"
            value={this.props.sum}
            onChange={this.props.handleChangeInput}
          />
          <span className="user-data__additional-info" />
        </label>
        <div
          className={
            "user-replenishment__button " +
            (!this.state.isButtonActive ? "opacity50" : "")
          }
        >
          <button onClick={this.handleClickButton.bind(this)}>
            {this.props.isLoading ? <Loading /> : this.props.buttonCaption}
          </button>
        </div>
      </div>
    );
  }
}
