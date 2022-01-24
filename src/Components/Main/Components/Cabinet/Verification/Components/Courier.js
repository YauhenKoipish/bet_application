import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../../../../Loading/";
import { sendCallMe } from "../../../../../../Server/";
import { TIME_ZONE_OFFSET } from "../../../../../../Services/Shared";
import FilterCurrent from "../../BetHistory/Components/FilterCurrent";
import FilterDate from "../../BetHistory/Components/FilterDate";

class Courier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSendRequest: false,
            activeTime: this.isTodayCanBeCourier ? 0 : 1,
            selectedDateInCalendar: this.getToday()
        };
    }

    get isTodayCanBeCourier() {
        const now = new Date();
        return (
            now.getTime() <
            new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18)
        );
    }

    getToday() {
        const today = new Date();
        return new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).getTime();
    }

    getSelectedDate() {
        const today = this.getToday();
        const now = new Date();
        switch (this.state.activeTime) {
            case 0:
                return today - TIME_ZONE_OFFSET;
            case 1:
                return (
                    new Date(
                        now.getFullYear(),
                        now.getMonth(),
                        now.getDate() + 1
                    ).getTime() - TIME_ZONE_OFFSET
                );
            case 2:
                return this.state.selectedDateInCalendar - TIME_ZONE_OFFSET;
        }
    }

    sendCallMe() {
        if (this.state.isSendRequest) return;
        this.setState({
            ...this.state,
            isSendRequest: true
        });
        const contact = this.props.userInfo.phoneNumber;
        const timestamp = this.getSelectedDate();
        sendCallMe(new Date(timestamp));
    }

    getTmpAfterReg() {
        return (
            <>
                <p>Спасибо за регистрацию на нашем сайте!</p>
                <p>
                    Для прохождения верификации в ЦУПИС выберите желаемое время
                    для встречи с курьером для сверки документов:
                </p>
            </>
        );
    }

    getTmpAfterSendCallMe() {
        return (
            <>
                <p>Спасибо за заявку</p>
                <p>Наши операторы свяжутся с вами в ближайшее время.</p>
                <p>
                    Если этого не произошло, пожалуйста, позвоните по номеру 8
                    (800) 123-12-12
                </p>
            </>
        );
    }

    changeActiveTime(val) {
        if (this.state.activeTime === val) return;
        this.setState({
            ...this.state,
            activeTime: val
        });
    }

    setActiveDay(day) {
        this.setState({
            ...this.state,
            selectedDateInCalendar: day.getTime()
        });
    }

    getCalendarActiveDays() {
        const activeDays = [];
        const today = new Date(this.getToday());
        for (let i = 0; i < 8; i++) {
            activeDays[i] = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() + i
            ).getTime();
        }

        return activeDays;
    }

    showModalFail() {
        const modal = {
            text: this.props.lang.timeErrorThen //"Произошла ошибка. Попробуйте позже"
        };
        this.props.showModal(modal);
    }

    render() {
        const { verificationInfo } = this.props;
        const { isSendRequest, activeTime } = this.state;
        return (
            <div className="verification-courier">
                <div className="verification-courier__title">Верификация</div>
                <div className="verification-courier__main">
                    <div className="verification-courier__description">
                        {verificationInfo.personalDataStatus ||
                        verificationInfo.callMe
                            ? this.getTmpAfterSendCallMe()
                            : this.getTmpAfterReg()}
                    </div>
                    {!verificationInfo.personalDataStatus &&
                    !verificationInfo.callMe ? (
                        <div className="verification-courier__form">
                            {this.isTodayCanBeCourier ? (
                                <div
                                    className={
                                        "form__label form__radio " +
                                        (activeTime === 0 ? "active" : "")
                                    }
                                    onClick={this.changeActiveTime.bind(
                                        this,
                                        0
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        className=" form__input"
                                        name="coef"
                                    />
                                    <span className="form__description">
                                        Сегодня
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}
                            <div
                                className={
                                    "form__label form__radio " +
                                    (activeTime === 1 ? "active" : "")
                                }
                                onClick={this.changeActiveTime.bind(this, 1)}
                            >
                                <input
                                    type="checkbox"
                                    className=" form__input"
                                    name="coef"
                                />
                                <span className="form__description">
                                    Завтра
                                </span>
                            </div>
                            <div className="user-account__choice">
                                <FilterCurrent
                                    name={this.props.lang.selectData}
                                    handleClick={this.changeActiveTime.bind(
                                        this,
                                        2
                                    )}
                                    isActive={activeTime === 2}
                                />

                                {activeTime === 2 ? (
                                    <FilterDate
                                        activeDate={
                                            this.state.selectedDateInCalendar
                                        }
                                        activeDays={this.getCalendarActiveDays()}
                                        setActiveDay={this.setActiveDay.bind(
                                            this
                                        )}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>

                            <div className="verification-courier__button">
                                <button onClick={this.sendCallMe.bind(this)}>
                                    {isSendRequest ? <Loading /> : "Отправить"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.props.callMeResponse === false) {
            this.props.updateCallMeResponseVerification(null);
            this.setState({
                ...this.state,
                isSendRequest: false
            });
            this.showModalFail();
        }
    }
}

const mapStateToProps = state => {
    return {
        lang: state.user.language_user.dict
    };
};

export default connect(mapStateToProps)(Courier);
