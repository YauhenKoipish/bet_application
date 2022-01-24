import React, { Component } from "react";
import { getIcon } from "../../../../../Services/Shared";
import { validateInfo } from "../../../../../Services/Validation";
import { arrayValid } from "../../codeErrorRegistration";

interface MyState {
  country: string;
  countryId: number | null;
  firstName: string;
  lastName: string;
  listCountry: string[];
  birthDay: string;
  birthDayInfo: {
    day: number | null;
    month: number;
    year: number;
  };
  confirmCheckBoxOld: boolean;
  confirmCheckBoxMsg: boolean;
  validDate: boolean;
  openCalendar: boolean;
}

export default class PersonalInfo extends Component<any, MyState> {
  nameValid: number | string;
  elemFirstName: any;
  elemLastName: any;
  elemBirthday: any;
  elemCountry: any;
  elemСonfirmCheckBoxMsg: any;
  elemСonfirmCheckBoxOld: any;
  focusComponents: any;

  settingDate: {
    days: number[];
    month: number[];
    years: number[];
  };

  constructor(props) {
    super(props);
    this.nameValid = 0;
    this.elemFirstName = React.createRef();
    this.elemLastName = React.createRef();
    this.elemBirthday = React.createRef();
    this.elemCountry = React.createRef();
    this.elemСonfirmCheckBoxMsg = React.createRef();
    this.elemСonfirmCheckBoxOld = React.createRef();
    this.focusComponents;
    this.state = {
      country: "",
      openCalendar: false,
      countryId: null,
      listCountry: [],
      lastName: "",
      firstName: "",
      birthDay: "",
      birthDayInfo: {
        day: null,
        month: 0,
        year: 0
      },
      confirmCheckBoxOld: false,
      confirmCheckBoxMsg: true,
      validDate: false
    };

    this.settingDate = this.getObjectDate();
  }

  getObjectDate() {
    let days: number[] = [];
    let month: number[] = [];
    let years: number[] = [];
    for (let i = 1; i <= 31; i++) days.push(i);
    for (let i = 1; i <= 12; i++) month.push(i);

    const curDate = new Date().getFullYear();
    for (let i = 0; i <= 100; i++) years.push(curDate - i);

    return { days, month, years };
  }

  callbackFunc(value: { isValid: boolean; errors: number[] }) {
    const newState = { ...this.state };
    if (!value.isValid && this.nameValid !== 0) {
      newState[this.nameValid] = value.errors[value.errors.length - 1];
    } else {
      newState[this.nameValid] = "";
    }
    newState.validDate = this.checkInputAreaValue(newState);
    this.setState(newState);
  }

  acceptPage(e, name) {
    e.preventDefault();
    const newState = { ...this.state };
    newState[name] = !this.state[name];
    this.setState(newState);
  }

  checkInputAreaValue(state) {
    if (this.elemСonfirmCheckBoxOld.current.checked) {
      const elemValue =
        this.elemCountry.current.value &&
        this.elemBirthday.current.value &&
        this.elemLastName.current.value &&
        this.elemFirstName.current.value
          ? true
          : false;
      if (elemValue) {
        if (
          state.countryId &&
          !state.country &&
          !state.lastName &&
          !state.birthDay
        ) {
          return true;
        }
      }
    }
    return false;
  }

  changeInputValue(nameChangeInput: number | string) {
    this.nameValid = nameChangeInput;
    switch (nameChangeInput) {
      case "firstName":
        validateInfo.composeValidation(
          {
            errorNameValidateValueSpecificSymbol: this.props.lang.header
              .registration.errors.uncribleSymbol,
            specificSymbol: arrayValid,
            value: this.elemFirstName.current.value
          },
          this.callbackFunc.bind(this),
          validateInfo.validateValueSpecificSymbol
        );
        break;
      case "lastName":
        validateInfo.composeValidation(
          {
            errorNameValidateValueSpecificSymbol: this.props.lang.header
              .registration.errors.uncribleSymbol,
            specificSymbol: arrayValid,
            value: this.elemLastName.current.value
          },
          this.callbackFunc.bind(this),
          validateInfo.validateValueSpecificSymbol
        );

        break;
      case "birthDay":
        this.elemBirthday.current.value = validateInfo.replaceValueByMask({
          value: this.elemBirthday.current.value,
          mask: "XX.XX.XXXX"
        });

        const birthday = this.elemBirthday.current.value.split(".");

        if ((birthday.length = 3)) {
          this.state.birthDayInfo.day = +birthday[0];
          this.state.birthDayInfo.month = +birthday[1];
          this.state.birthDayInfo.year = +birthday[2];

          validateInfo.composeValidation(
            {
              errorNameValidateValueDate: {
                year: this.props.lang.header.registration.errors.birthday,
                uncrible: this.props.lang.header.registration.errors
                  .invalidBirthday
              },

              day: +birthday[0],
              month: +birthday[1],
              year: +birthday[2],
              minAge: 18
            },
            this.callbackFunc.bind(this),
            validateInfo.validateValueDate
          );
        }

        break;
      case "country":
        const listCountry = validateInfo.getArrayElementToObj({
          value: this.elemCountry.current.value,
          obj: this.props.lang.header.registration.countries
        });

        const value = this.elemCountry.current.value;

        if (
          value.length > 0 &&
          listCountry[0] &&
          value.toString().toLowerCase() === listCountry[0].toLowerCase()
        ) {
          this.setState({ ...this.state, country: "", listCountry: [] });
          return;
        }

        if (listCountry.length !== 0 && this.elemCountry.current.length !== 0) {
          this.setState({ ...this.state, listCountry });
        } else if (this.elemCountry.current.length === 0) {
          const country = "";
          const countryId = null;
          this.setState({
            ...this.state,
            country,
            countryId
          });
        }

      default:
        break;
    }
  }

  saveCountry(name) {
    const idCountry = validateInfo.searchElementToObj({
      value: name,
      obj: this.props.lang.header.registration.countries
    });
    const newState = { ...this.state };

    if (idCountry) {
      newState.listCountry = [];
      newState.countryId = +idCountry;
      this.elemCountry.current.value = name;
      newState.country = "";
      newState.validDate = this.checkInputAreaValue(newState);
    } else {
      newState.country = "ошибка"; // я выбрал страну но не нашел ее в списке выбора проверь валидацию где я обхект преобразовываю в Map со сменой ключей
    }
    this.setState(newState);
  }

  setFocus(activeElement = document.activeElement, e) {
    e.preventDefault();

    if (activeElement === this.elemCountry.current) {
      if (this.elemCountry.current.value.length > 0) {
        const listCountry = validateInfo.getArrayElementToObj({
          value: this.elemCountry.current.value,

          obj: this.props.lang.header.registration.countries
        });
        this.setState({
          ...this.state,
          listCountry,
          country: ""
        });
      }
      this.elemCountry.current.classList.add("focus");
      this.elemFirstName.current.classList.remove("focus");
      this.elemLastName.current.classList.remove("focus");
      this.elemBirthday.current.classList.remove("focus");
      return "";
    }
    if (this.elemCountry.current.value.length > 0) {
      const idCountry = validateInfo.searchElementToObj({
        value: this.elemCountry.current.value,
        obj: this.props.lang.header.registration.countries
      });
      if (!idCountry) {
        this.setState({
          ...this.state,
          country: this.props.lang.header.registration.selectCountryNotFound,
          listCountry: []
        });
      }
    }

    if (
      activeElement === this.elemBirthday.current &&
      !this.elemBirthday.current.classList.contains("focus")
    ) {
      // this.setState({ ...this.state, openCalendar: false });
      this.elemBirthday.current.classList.add("focus");
      this.elemFirstName.current.classList.remove("focus");
      this.elemLastName.current.classList.remove("focus");
      this.elemCountry.current.classList.remove("focus");
      return "";
    }

    if (activeElement === this.elemFirstName.current) {
      this.elemFirstName.current.classList.add("focus");
      this.elemLastName.current.classList.remove("focus");
      this.elemBirthday.current.classList.remove("focus");
      this.elemCountry.current.classList.remove("focus");
      return "";
    }
    if (activeElement === this.elemLastName.current) {
      this.elemLastName.current.classList.add("focus");
      this.elemFirstName.current.classList.remove("focus");
      this.elemBirthday.current.classList.remove("focus");
      this.elemCountry.current.classList.remove("focus");
      return "";
    }

    if (this.elemСonfirmCheckBoxOld === activeElement) {
      const newState = { ...this.state };

      this.elemСonfirmCheckBoxOld.current.checked = !this.elemСonfirmCheckBoxOld
        .current.checked;

      newState.validDate = this.checkInputAreaValue(newState);

      newState.confirmCheckBoxOld = !this.state.confirmCheckBoxOld;

      this.setState(newState);
    }
    if (this.elemСonfirmCheckBoxMsg === activeElement) {
      this.elemСonfirmCheckBoxMsg.current.checked = !this.elemСonfirmCheckBoxMsg
        .current.checked;
    }

    this.elemFirstName.current.classList.remove("focus");
    this.elemCountry.current.classList.remove("focus");
    this.elemLastName.current.classList.remove("focus");
    this.elemBirthday.current.classList.remove("focus");
    return "";
  }

  showDate() {
    const openCalendar = !this.state.openCalendar;
    if (!this.elemBirthday.current.value.split(".")[2]) {
      this.elemBirthday.current.value = openCalendar ? "01.01.2000" : "";
      this.state.birthDayInfo.day = 1;
      this.state.birthDayInfo.month = 1;
      this.state.birthDayInfo.year = 2000;
    } else {
      this.changeInputValue("birthDay");
    }

    this.setState({ ...this.state, openCalendar });
  }

  setDay(day) {
    const str = this.elemBirthday.current.value.split(".");
    if (day < 10) {
      str[0] = "0" + day;
      this.elemBirthday.current.value = str.join(".");
    } else {
      str[0] = day;
      this.elemBirthday.current.value = str.join(".");
    }
    this.changeInputValue("birthDay");
  }

  setMonth(month) {
    const str = this.elemBirthday.current.value.split(".");
    if (month < 10) {
      str[1] = "0" + month;
      this.elemBirthday.current.value = str.join(".");
    } else {
      str[1] = month;
      this.elemBirthday.current.value = str.join(".");
    }
    this.changeInputValue("birthDay");
  }

  setYear(year) {
    const str = this.elemBirthday.current.value.split(".");
    if (year < 10) {
      str[2] = "0" + year;
      this.elemBirthday.current.value = str.join(".");
    } else {
      str[2] = year;
      this.elemBirthday.current.value = str.join(".");
    }
    this.changeInputValue("birthDay");
  }

  render() {
    return (
      <>
        <div
          className="registration_personal_info"
          onClick={e => this.setFocus(document.activeElement, e)}
        >
          <div className="area_info_input">
            <div className={"input" + (this.state.firstName ? " error" : "")}>
              <div className=" relative">
                <input
                  type="text"
                  ref={this.elemFirstName}
                  placeholder={this.props.lang.header.registration.name}
                  onChange={() => this.changeInputValue("firstName")}
                />
                <span className="name_input">
                  {this.props.lang.header.registration.name}
                </span>
                <span className="error">{this.state.firstName}</span>
              </div>
            </div>
            <div className={"input" + (this.state.lastName ? " error" : "")}>
              <div className=" relative">
                <input
                  type="text"
                  ref={this.elemLastName}
                  placeholder={this.props.lang.header.registration.lastName}
                  onChange={() => this.changeInputValue("lastName")}
                />
                <span className="name_input">
                  {this.props.lang.header.registration.lastName}
                </span>
                <span className="error">{this.state.lastName}</span>
              </div>
            </div>
            <div className={"input" + (this.state.birthDay ? " error" : "")}>
              <div className=" relative">
                <input
                  type="code"
                  ref={this.elemBirthday}
                  placeholder={this.props.lang.header.registration.birthday}
                  onChange={() => this.changeInputValue("birthDay")}
                />
                <span className="name_input">
                  {this.props.lang.header.registration.birthday}
                </span>
                <span className="error">{this.state.birthDay}</span>
                <span className="icon calendar" onClick={() => this.showDate()}>
                  {getIcon("calendar-active")}
                </span>
              </div>
              {this.state.openCalendar ? (
                <div className="calendar_registration">
                  <div className="col">
                    {this.settingDate.days.map(day => (
                      <span
                        key={day}
                        className={
                          this.state.birthDayInfo.day == day ? "active" : ""
                        }
                        onClick={() => this.setDay(day)}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                  <div className="col">
                    {" "}
                    {this.settingDate.month.map(month => (
                      <span
                        key={month}
                        className={
                          this.state.birthDayInfo.month == month ? "active" : ""
                        }
                        onClick={() => this.setMonth(month)}
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                  <div className="col">
                    {" "}
                    {this.settingDate.years.map(year => (
                      <span
                        key={year}
                        className={
                          this.state.birthDayInfo.year == year ? "active" : ""
                        }
                        onClick={() => this.setYear(year)}
                      >
                        {year}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={"input" + (this.state.country ? " error" : "")}>
              <div className=" relative">
                <input
                  type="code"
                  ref={this.elemCountry}
                  placeholder={this.props.lang.header.registration.national}
                  onChange={() => this.changeInputValue("country")}
                />
                <span className="name_input">
                  {this.props.lang.header.registration.national}
                </span>
                <span className="error">{this.state.country}</span>
              </div>
              <div className="listCountry">
                {this.state.listCountry.map((country, index) => {
                  return (
                    <div
                      className="country_item"
                      key={index}
                      onClick={() => this.saveCountry(country)}
                    >
                      {country}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="page">
            <div className="page__toggle">
              <label
                className="toggle"
                onClick={e => this.setFocus(this.elemСonfirmCheckBoxOld, e)}
              >
                <input
                  className="toggle__input"
                  type="checkbox"
                  ref={this.elemСonfirmCheckBoxOld}
                />
                <span className="toggle__label">
                  <span className="toggle__text">
                    {this.props.lang.header.registration.acceptRegulation}
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="page">
            <div className="page__toggle">
              <label
                className="toggle"
                onClick={e => this.setFocus(this.elemСonfirmCheckBoxMsg, e)}
              >
                <input
                  className="toggle__input"
                  type="checkbox"
                  ref={this.elemСonfirmCheckBoxMsg}
                  // checked={this.state.confirmCheckBoxMsg ? true : false}
                />
                <span className="toggle__label">
                  <span className="toggle__text">
                    {this.props.lang.header.registration.acceptGetNews}
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div
          className={
            "button_next_step yellow" + (this.state.validDate ? " active" : "")
          }
          onClick={
            this.state.validDate
              ? () =>
                  this.props.addState(
                    {
                      firstname: this.elemFirstName.current.value,
                      lastName: this.elemLastName.current.value,
                      country: this.elemCountry.current.value,
                      countryid: this.state.countryId,
                      birthday: {
                        day: this.state.birthDayInfo.day, //this.elemBirthday.split(".")[0],
                        month: this.state.birthDayInfo.month, //this.elemBirthday.split(".")[1],
                        year: this.state.birthDayInfo.year, //this.elemBirthday.split(".")[2],
                        acceptOld: true,
                        acceptMsg: this.elemСonfirmCheckBoxMsg.current.checked
                      }
                    },
                    "personalInfo"
                  )
              : f => f
          }
        >
          {this.props.lang.header.registration.registration}
        </div>
      </>
    );
  }

  componentDidMount() {
    this.elemСonfirmCheckBoxMsg.current.checked = this.state.confirmCheckBoxMsg
      ? true
      : false;
    this.elemСonfirmCheckBoxOld.current.checked = this.state.confirmCheckBoxOld
      ? true
      : false;
  }
}
