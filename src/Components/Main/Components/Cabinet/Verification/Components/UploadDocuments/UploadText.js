import React, { Component } from "react";
import Loading from "../../../../../../Loading/";

export default class UploadDocument extends Component {
  constructor(props) {
    super(props);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.state = {
      isOpenDropdown: false
    };
  }

  addHandlerDocClickToggleDropdown() {
    document.addEventListener("click", this.toggleDropdown);
  }

  removeHandlerDocClickToggleDropdown() {
    document.removeEventListener("click", this.toggleDropdown);
  }

  toggleDropdown() {
    if (this.props.status === "NotLoaded" || this.props.status === "Invalid") {
      if (!this.state.isOpenDropdown) {
        this.addHandlerDocClickToggleDropdown();
      } else {
        this.removeHandlerDocClickToggleDropdown();
      }
      this.setState({
        ...this.state,
        isOpenDropdown: !this.state.isOpenDropdown
      });
    }
  }

  //   shouldComponentUpdate(nextProps) {
  //     if (this.props.type !== nextProps.type && this.state.isOpenDropdown) {
  //       this.setState({
  //         ...this.state,
  //         isOpenDropdown: false
  //       });
  //       return false;
  //     }
  //     return true;
  //   }

  render() {
    return (
      <>
        <div
          className={"verification__row " + getClassByStatus(this.props.status)}
        >
          <div className="verification__active">
            <div className="verification__left">
              <div className="verification__choice">
                <span onClick={this.toggleDropdown}>3. {this.props.name}</span>
                <div
                  className={
                    "verification__dropdown " +
                    (!this.state.isOpenDropdown ? "inactive" : "")
                  }
                >
                  <div onClick={() => this.props.setActive4Doc("inn")}>ИНН</div>
                  <div onClick={() => this.props.setActive4Doc("snils")}>
                    СНИЛС
                  </div>
                </div>
              </div>
              <div className="verification__input">
                <input
                  className={!this.props.isValid ? "error-border" : ""}
                  type="text"
                  onChange={this.props.onInputChange}
                  value={this.props.inputVal}
                />
                <div className="verification__advice">
                  {this.props.type === 2 ? 12 : 11} цифр
                </div>
              </div>
            </div>
            <div className="verification__right">
              <div
                className="verification__button"
                onClick={this.props.onClickButton}
              >
                <div className="verification__text">
                  {this.props.status === "NotLoaded" ? (
                    "Сохранить"
                  ) : this.props.status === "Loading" ? (
                    <Loading />
                  ) : this.props.status === "Loaded" ? (
                    "Сохранено"
                  ) : this.props.status === "NotChecked" ? (
                    "В обработке"
                  ) : this.props.status === "Valid" ? (
                    "Принято"
                  ) : this.props.status === "Invalid" ? (
                    "Не принято"
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          {this.props.error ? (
            <div className="verification__mistake">{this.props.error}</div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

const getClassByStatus = status => {
  switch (status) {
    case "Loading":
      return "loading";
    case "Valid":
    case "Loaded":
      return "done";
    case "Invalid":
      return "error";
    case "NotChecked":
      return "checking";
    default:
      return "";
  }
};
