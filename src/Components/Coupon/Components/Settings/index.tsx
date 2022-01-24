import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style/form.css";
// import "./style/settings.css";
import { setCouponSettings } from "../../../../Actions/Components/Coupon";
import { validateInput, splitRangNumber } from "../../../../Services/Shared";
import { MIN_SUM_INPUT } from "../Coupon";

class Settings extends Component<any, any> {
  inputElem: any;

  constructor(props) {
    super(props);
    this.inputElem = React.createRef();
    this.state = {
      ...props.settings,
      isButtonActive: false
    };
  }

  get inputValue() {
    let value = parseInt(this.inputElem.current.value.replace(/ /g, ""));
    if (isNaN(value)) value = 0;
    return value;
  }

  saveChanges() {
    if (!this.state.isButtonActive) return;
    this.props.setCouponSettings(
      this.state.changingCoefs,
      this.state.fastBet,
      this.state.changingMaxPay
    );
  }

  isButtonMustBeActive(fastBet: any, changingCoefs: any, changingMaxPay: any) {
    if (
      (fastBet !== this.props.settings.fastBet ||
        changingCoefs !== this.props.settings.changingCoefs ||
        changingMaxPay !== this.props.settings.changingMaxPay) &&
      (fastBet >= MIN_SUM_INPUT || fastBet === null)
    )
      return true;
    return false;
  }

  toggleFastBet() {
    const fastBet = this.state.fastBet === null ? MIN_SUM_INPUT : null;
    this.setState({
      ...this.state,
      fastBet,
      isButtonActive: this.isButtonMustBeActive(
        fastBet,
        this.state.changingCoefs,
        null
      )
    });
  }

  changeFastBet() {
    this.validateInput();
    const fastBet = this.inputValue;
    this.setState({
      ...this.state,
      fastBet,
      isButtonActive: this.isButtonMustBeActive(
        fastBet,
        this.state.changingCoefs,
        this.state.changingMaxPay
      )
    });
  }

  changeStateChangingCoefs(val) {
    if (val !== this.state.changingCoefs) {
      this.setState({
        ...this.state,
        changingCoefs: val,
        changingMaxPay: false,
        isButtonActive: this.isButtonMustBeActive(
          this.state.fastBet,
          val,
          false
        )
      });
    }
  }

  changeStateChangingMaxPay() {
    this.setState({
      ...this.state,
      changingMaxPay: !this.state.changingMaxPay,
      isButtonActive: this.isButtonMustBeActive(
        this.state.fastBet,
        this.state.changingCoefs,
        !this.state.changingMaxPay
      )
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.setState({
        ...nextProps.settings,
        isButtonActive: false
      });
      return false;
    }
    return true;
  }

  validateInput() {
    validateInput(this.inputElem.current, splitRangNumber);
    if (this.inputValue < MIN_SUM_INPUT) {
      this.inputElem.current.classList.add("error-border");
    } else this.inputElem.current.classList.remove("error-border");
  }

  render() {
    return (
      <div className="settings">
        <div className="settings__fieldset">
          <div className="settings__title">{this.props.lang.setting.title}</div>

          <div className="settings__form form">
            <div className="form__wrapper">
              <div
                className={
                  "form__label form__radio" +
                  (this.state.changingCoefs === 0 ? " active" : "")
                }
                onClick={this.changeStateChangingCoefs.bind(this, 0)}
              >
                <input type="radio" className="form__input" />
                <span className="form__description">
                  {this.props.lang.setting.none}
                </span>
              </div>
              <div
                className={
                  "form__label form__radio" +
                  (this.state.changingCoefs === 1 ? " active" : "")
                }
                onClick={this.changeStateChangingCoefs.bind(this, 1)}
              >
                <input type="radio" className="form__input" />
                <span className="form__description">
                  {this.props.lang.setting.any}
                </span>
              </div>
              {this.state.changingCoefs === 1 ? (
                <div
                  className={
                    "form__label form__checkbox form__label--sub" +
                    (this.state.changingMaxPay ? " active" : "")
                  }
                  onClick={this.changeStateChangingMaxPay.bind(this)}
                >
                  <input type="checkbox" className="form__input" />
                  <span className="form__description">
                    {this.props.lang.setting.auto}
                  </span>
                </div>
              ) : (
                ""
              )}

              <div
                className={
                  "form__label form__radio" +
                  (this.state.changingCoefs === 2 ? " active" : "")
                }
                onClick={this.changeStateChangingCoefs.bind(this, 2)}
              >
                <input type="radio" className="form__input" />
                <span className="form__description">
                  {" "}
                  {this.props.lang.setting.enlarged}
                </span>
              </div>
              {this.state.changingCoefs === 2 ? (
                <div
                  className={
                    "form__label form__checkbox form__label--sub" +
                    (this.state.changingMaxPay ? " active" : "")
                  }
                  onClick={this.changeStateChangingMaxPay.bind(this)}
                >
                  <input type="checkbox" className="form__input" />
                  <span className="form__description">
                    {this.props.lang.setting.auto}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* 
            <div className="form__wrapper">
              <div className="form__depend ">
                <label
                  className={
                    "form__label form__checkbox" +
                    (this.state.fastBet !== null ? " active" : "")
                  }
                  onChange={e => this.toggleFastBet.call(this, e)}
                >
                  <input type="checkbox" className="form__input" />
                  <span className="form__description">Быстрая ставка на</span>
                </label>
                <div className="form__type-in">
                  {this.state.fastBet !== null ? (
                    <input
                      ref={this.inputElem}
                      type="text"
                      className="form__text"
                      placeholder="Сумма"
                      defaultValue={this.state.fastBet}
                      onChange={this.changeFastBet.bind(this)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div> */}

            <div
              className={
                "form__button" +
                (!this.state.isButtonActive ? " opacity50" : "")
              }
              onClick={() => this.saveChanges.bind(this)}
            >
              <button>{this.props.lang.acceptBonus}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    settings: state.coupon.settings,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCouponSettings: (
      changingCoefs: any,
      fastBet: any,
      changingMaxPay: any
    ) => dispatch(setCouponSettings(changingCoefs, fastBet, changingMaxPay))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
