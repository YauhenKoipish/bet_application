import React from "react";
import { connect } from "react-redux";

import Phone from "./Template//RecoverPsw/phone";
import PswArea from "./Template//RecoverPsw/psw";
import {
    smsCodeValid,
    successChangePsw,
    recoveryState,
    stepInputCode
} from "../../../Actions/Components/RecoverPsw/";

import { showModal } from "../../../Actions/Components/Modal/";

import { getKeyByValue } from "../../../Services/Shared";

import {
    recoverPassword,
    sendRegistrationsSMS,
    sendRecoverySMS,
    recoverClientPassword
} from "../../../Server/";
import { saveStateTimer } from "../../../Actions/Components/Timer/";
import { countdownTimer } from "../../../Services/CountdownTimer.js";
import {
    setLocalStorage,
    getLocalStorageData
} from "../../../Services/LocalStorage";

import { validateInfo } from "../../../Services/Validation";
import { pswValid } from "./codeErrorRegistration";

import { authorizeByLogin } from "../../../Server";

class RecoverPassword extends React.Component<any, any> {
    state: {
        errorPswConfirmText: string;
        errorPswNewText: string;
        errorPswNew: boolean;
        errorPswConfirm: boolean;
        phone: boolean;
        date: boolean;
        valueInputRef: string;
        code: string;
        sendCode: boolean;
        newPsw: string;
        confirmNewPsw: string;
        savePsw: boolean;
        birthday: {
            day: {
                open: boolean;
                value: string;
                array: [number | string];
            };
            munth: {
                open: boolean;
                value: string;
                array: [number | string];
            };
            year: {
                open: boolean;
                value: string;
                array: [number | string];
            };
        };
        errorTextDate: string;
    };
    inputRef: any;
    refCode: any;
    dateSetting: any;
    newPsw: any;
    confirmNewPsw: any;
    constructor(props) {
        super(props);
        this.dateSetting = this.setValueDataPicker();
        this.inputRef = React.createRef();
        this.refCode = React.createRef();
        this.newPsw = React.createRef();
        this.confirmNewPsw = React.createRef();
        this.state = {
            errorPswConfirmText: "",
            errorPswNewText: "",
            errorPswNew: false,
            errorPswConfirm: false,
            code: "",
            savePsw: false,
            phone:
                this.props.timerSms != 0 && getLocalStorageData("PhoneRecover")
                    ? true
                    : false,
            valueInputRef:
                this.props.timerSms != 0
                    ? this.validValueBirthdayt(
                          getLocalStorageData("PhoneRecover")
                      )
                    : "",
            sendCode: false,
            newPsw: "",
            confirmNewPsw: "",
            date: false,
            birthday: {
                day: {
                    open: false,
                    value: this.props.lang.header.registration.day,
                    array: this.dateSetting.day
                },
                munth: {
                    open: false,
                    value: this.props.lang.header.registration.month,
                    array: this.dateSetting.month
                },
                year: {
                    open: false,
                    value: this.props.lang.header.registration.year,
                    array: this.dateSetting.year
                }
            },
            errorTextDate: ""
        };
    }

    setValueDataPicker() {
        const day: number[] = [];
        const month: number[] = Object.values(this.props.lang.months);
        const year: number[] = [];
        for (let i = 1; i <= 31; i++) day.push(i);

        for (
            let i = new Date().getFullYear() - 18;
            i !== new Date().getFullYear() - 100;
            i--
        )
            year.push(i);
        return {
            dayConst: 31,
            monthConst: 12,
            yearConst: new Date().getFullYear() - 100,
            day,
            month,
            year
        };
    }

    validValueBirthdayt(value) {
        return value.toString().replace(/[^-0-9]/gim, "");
    }

    valiateField(...arg) {
        const newState = { ...this.state };
        newState.birthday[arg[5].validName].value = arg[5].item;
        // newState.date = true;
        if (
            this.validValueBirthdayt(newState.birthday.day.value).length != 0 &&
            this.validValueBirthdayt(newState.birthday.year.value).length != 0
        ) {
            const month = getKeyByValue(
                newState.birthday.munth.value,
                this.props.lang.months
            );

            if (month) {
                const callbackFunc = (value: {
                    isValid: boolean;
                    errors: number[];
                }) => {
                    if (!value.isValid) {
                        newState.errorTextDate = this.props.lang.header.registration.errors.invalidBirthday;
                        newState.date = false;
                    } else {
                        newState.date = true;
                        newState.errorTextDate = "";
                    }
                    return false;
                };

                validateInfo.composeValidation(
                    {
                        errorNameValidateValueDate: {
                            year: this.props.lang.header.registration.errors
                                .birthday,
                            uncrible: this.props.lang.header.registration.errors
                                .invalidBirthday
                        },
                        day: +newState.birthday.day.value,
                        month: +month,
                        year: +newState.birthday.year.value,
                        minAge: 18
                    },
                    callbackFunc,
                    validateInfo.validateValueDate
                );
            } else {
                newState.date = false;
            }
        } else {
            newState.date = false;
        }

        this.changeStatusModal(newState.birthday);
        this.setState({ ...newState });
    }

    openSelectCountry(name: string = "date", e: any) {
        e.preventDefault();
        const newState = { ...this.state };
        newState.date = !this.state.date;
        this.setState(newState);
        return;
    }

    changeStatusModal(obj) {
        for (let key in obj) {
            obj[key].open = false;
        }
    }

    openBirthday(nameArea, e) {
        e.preventDefault();
        const newState = { ...this.state };
        newState.birthday[nameArea].open = !newState.birthday[nameArea].open;

        this.setState(newState);
    }

    changePhone(e) {
        const newState = { ...this.state };
        newState.valueInputRef = this.validValueBirthdayt(e.target.value);
        if (newState.valueInputRef.length > 5) {
            newState.phone = true;
            this.setState(newState);
        } else if (newState.valueInputRef.length < 5 && this.state.phone) {
            newState.phone = false;
            this.setState(newState);
        } else {
            this.setState(newState);
        }
    }

    getCode() {
        recoverPassword({
            phone: "+" + this.state.valueInputRef,
            day: this.state.birthday.day.value,
            munth: getKeyByValue(
                this.state.birthday.munth.value,
                this.props.lang.months
            ),
            year: this.state.birthday.year.value
        });
    }

    setSmsCode(e) {
        this.refCode.current.value = e.target.value;
        this.state.code = this.refCode.current.value;
    }

    changePsw(num, e) {
        // 1 new ,0 - confirm
        const newState = { ...this.state };

        if (num) {
            newState.errorPswNew = false;
            newState.newPsw = e.target.value;
        } else {
            newState.errorPswConfirm = false;
            newState.confirmNewPsw = e.target.value;
        }
        const callbackFunc = (value: {
            isValid: boolean;
            errors: number[];
        }) => {
            //
            if (!value.isValid) {
                if (num) {
                    newState.errorPswNew = true;
                    newState.errorPswNewText = this.props.lang.header.registration.errors.passwordError;
                    this.newPsw.current.value = e.target.value;
                } else {
                    newState.errorPswConfirm = true;
                    newState.errorPswConfirmText = this.props.lang.header.registration.errors.passwordError;

                    this.confirmNewPsw.current.value = e.target.value;
                }
            }
            return false;
        };

        validateInfo.composeValidation(
            {
                errorNameValidateValueLength: this.props.lang.header
                    .registration.lengthSizePassword,
                errorNameValidateValueSpecificSymbol: this.props.lang.header
                    .registration.errors.passwordError,
                errorNameValidateValueSpace: this.props.lang.header.registration
                    .errors.passwordError,
                errorNameValidateValueLogin: this.props.lang.header.registration
                    .errors.passwordError,
                value: e.target.value,
                startLength: 8,
                endLength: 20,
                specificSymbol: pswValid
            },
            callbackFunc,
            validateInfo.validateValueLength,
            validateInfo.validateValueSpace,
            validateInfo.validateValueLogin,
            validateInfo.validateValueSpecificSymbol
        );

        if (!newState.errorPswNew && !newState.errorPswConfirm) {
            newState.savePsw = true;
        } else newState.savePsw = false;

        this.setState(newState);
    }

    setValueCalendar(stateCalendar) {
        if (stateCalendar.day && stateCalendar.month && stateCalendar.year) {
            const newState = { ...this.state };

            newState.date = false;
            newState.birthday.day = stateCalendar.day;
            newState.birthday.munth = stateCalendar.month;
            newState.birthday.year = stateCalendar.year;

            const callbackFunc = (value: {
                isValid: boolean;
                errors: number[];
            }) => {
                //
                if (!value.isValid) {
                    newState.errorTextDate = this.props.lang.header.registration.errors.invalidBirthday;
                } else {
                    newState.errorTextDate = "";
                }
                return false;
            };

            validateInfo.composeValidation(
                {
                    errorNameValidateValueDate: {
                        year: this.props.lang.header.registration.errors
                            .birthday,
                        uncrible: this.props.lang.header.registration.errors
                            .invalidBirthday
                    },
                    day: +newState.birthday.day,
                    month:
                        +this.dateSetting.month.indexOf(stateCalendar.month) +
                        1,
                    year: +newState.birthday.year,
                    minAge: 18
                },
                callbackFunc,
                validateInfo.validateValueDate
            );

            this.setState(newState);
        } else {
            //Не выбрали все данные не должно отрабатывать ИБо функции вызова не будет
        }
    }

    testCode() {
        sendRecoverySMS(this.state.code);
    }

    getTmpStep() {
        if (this.props.timerSms == 0)
            switch (this.props.recoverPSW.stepInputCode) {
                //stepInputCode
                case true:
                    return (
                        <>
                            <Phone
                                props={this.props}
                                stateMain={this.state}
                                valiateField={this.valiateField.bind(this)}
                                openBirthday={this.openBirthday.bind(this)}
                                changePhone={this.changePhone.bind(this)}
                                refEl={this.inputRef}
                                func={this.testCode.bind(this)}
                                refCode={this.refCode}
                                setSmsCode={this.setSmsCode.bind(this)}
                                value={this.state.valueInputRef}
                                reSendCode={this.reSendCode.bind(this)}
                                openSelectCountry={this.openSelectCountry.bind(
                                    this
                                )}
                                setValueCalendar={this.setValueCalendar.bind(
                                    this
                                )}
                            />
                        </>
                    );

                default:
                    return (
                        <Phone
                            props={this.props}
                            stateMain={this.state}
                            valiateField={this.valiateField.bind(this)}
                            openBirthday={this.openBirthday.bind(this)}
                            changePhone={this.changePhone.bind(this)}
                            refEl={this.inputRef}
                            func={this.getCode.bind(this)}
                            refCode={this.refCode}
                            openSelectCountry={this.openSelectCountry.bind(
                                this
                            )}
                            setValueCalendar={this.setValueCalendar.bind(this)}
                        />
                    );
            }
        else {
            const birthday = JSON.parse(getLocalStorageData("DateRecover"));
            this.state.birthday.day.value = birthday.day;
            this.state.birthday.munth.value = birthday.month;
            this.state.birthday.year.value = birthday.year;
            this.state.date = true;
            if (!this.props.recoverPSW.stepInputCode) {
                this.props.stepInputCode(true);
            }
            return (
                <Phone
                    props={this.props}
                    stateMain={this.state}
                    valiateField={this.valiateField.bind(this)}
                    openBirthday={this.openBirthday.bind(this)}
                    changePhone={this.changePhone.bind(this)}
                    refEl={this.inputRef}
                    func={this.testCode.bind(this)}
                    refCode={this.refCode}
                    setSmsCode={this.setSmsCode.bind(this)}
                    value={this.state.valueInputRef}
                    reSendCode={this.reSendCode.bind(this)}
                />
            );
        }
    }

    testAndSaveNewPsw() {
        recoverClientPassword(this.state.newPsw);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.recoverPSW.successChangePsw) {
            this.props.history.push("/");
            authorizeByLogin({
                Login: this.state.valueInputRef,
                Password: this.state.newPsw
            });
            this.props.recoveryState(false);
            this.props.modal(this.props.lang.header.recoverPas.secusse);
            return false;
        }
        if (
            nextProps.recoverPSW.stepInputCode !== this.state.sendCode &&
            nextProps.recoverPSW.stepInputCode
        ) {
            this.props.saveStateTimer(this.props.setting);
            setLocalStorage("Timer", this.props.setting);
            setLocalStorage("PhoneRecover", "+" + this.state.valueInputRef);
            setLocalStorage(
                "DateRecover",
                JSON.stringify({
                    day: this.state.birthday.day.value,
                    month: this.state.birthday.munth.value,
                    year: this.state.birthday.year.value
                })
            );
            countdownTimer.setTimer(
                this.props.setting,
                this.props.saveStateTimer
            );
            this.state.sendCode = nextProps.recoverPSW.stepInputCode;
        }

        return true;
    }

    resetState() {
        this.props.recoveryState(false);
    }

    reSendCode() {
        sendRegistrationsSMS("+" + this.state.valueInputRef);
        this.props.saveStateTimer(this.props.setting);
        setLocalStorage("Timer", this.props.setting);
        setLocalStorage("PhoneRecover", this.state.valueInputRef);
        countdownTimer.setTimer(this.props.setting, this.props.saveStateTimer);
    }

    render() {
        return (
            <>
                <div className="login__restore">
                    <div className="login__type">
                        {this.props.lang.header.recoverPas.title}
                    </div>

                    {this.props.recoverPSW.validSms ? (
                        <>
                            <PswArea
                                stateMain={this.state}
                                props={this.props}
                                refNewPsw={this.newPsw}
                                refConfirmNewPsw={this.confirmNewPsw}
                                changePsw={this.changePsw.bind(this)}
                                testAndSaveNewPsw={this.testAndSaveNewPsw.bind(
                                    this
                                )}
                            />
                        </>
                    ) : (
                        this.getTmpStep()
                    )}
                </div>
            </>
        );
    }

    componentWillUnmount() {
        this.props.recoveryState(false);
        // this.props.recoveryState()   сделать состояние где обнуляю все ошибки и ответы с сервера
    }
}

const mapStateToProps = state => {
    return {
        lang: state.user.language_user.dict,
        recoverPSW: state.recoverPSW,
        error_code_phone_registration:
            state.registration.error_code_phone_registration,
        timerSms: state.registration.timerSMS,
        setting: state.mainSetting.smsRecording
    };
};

const mapDispatchToProps = dispatch => {
    return {
        smsCodeValid: boolean => dispatch(smsCodeValid(boolean)),
        successChangePsw: boolean => dispatch(successChangePsw(boolean)),
        recoveryState: boolean => dispatch(recoveryState(boolean)),
        stepInputCode: boolean => dispatch(stepInputCode(boolean)),
        modal: text =>
            dispatch(
                showModal({
                    text: text
                })
            ),
        saveStateTimer: number => dispatch(saveStateTimer(number))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecoverPassword);
