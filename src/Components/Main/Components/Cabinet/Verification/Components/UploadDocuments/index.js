import React, { Component } from "react";
import UploadDocument from "./UploadDocument";
import VerificationBlocked from "./VerificationBlocked";
import { isFileSizeValid } from "../../../../../../../Services/Shared";
import { getLocalStorageData } from "../../../../../../../Services/LocalStorage";
import { connect } from "react-redux";

class UploadDocuments extends Component {
    constructor(props) {
        super(props);
        this.validImgTypes = ["image/png", "image/jpeg", "image/jpg"];
        this.initialState = {
            passport1: {
                status: "NotLoaded", //NotChecked, Valid, Invalid, Loaded, Loading
                error: "",
                type: 1,
                typeName: "PassportFirstPage"
            },
            passport2: {
                status: "NotLoaded", //NotChecked, Valid, Invalid, Loaded, Loading
                error: "",
                type: 2,
                typeName: "PassportSecondPage"
            },
            selfie: {
                status: "NotLoaded", //NotChecked, Valid, Invalid, Loaded, Loading
                error: "",
                type: 5,
                typeName: "SelfieWithPassport"
            },
            inn: {
                status: "NotLoaded", //NotChecked, Valid, Invalid, Loaded, Loading
                error: "",
                type: 2,
                inputVal: "",
                isValid: true,
                name: "ИНН",
                typeName: "Inn"
            },
            snils: {
                status: "NotLoaded", //NotChecked, Valid, Invalid, Loaded, Loading
                error: "",
                type: 3,
                inputVal: "",
                isValid: true,
                name: "СНИЛС",
                typeName: "Snils"
            },
            active4Doc: "inn"
        };
        this.state = this.getCurState(this.initialState, props);
    }

    get isBlocked() {
        return (
            this.props.ident.bindingFailSource === "Unknown" ||
            this.props.ident.bindingFailSource === "Duplicate" ||
            this.props.ident.bindingFailSource === "Other"
        );
    }

    get textBlock() {
        switch (this.props.ident.bindingFailSource) {
            case "Unknown":
                return "Возникла ошибка. Свяжитесь со службой поддержки .";
            case "Duplicate":
            case "Other":
                return "Возникла ошибка. Свяжитесь со службой поддержки .";
            default:
                return "";
        }
    }

    isDocumentInLoaded(props, docType) {
        return props.documents.some(doc => {
            if (docType === "Inn" || docType === "Snils") {
                return doc.type === docType;
            }
            return doc.imgTypes.includes(docType);
        });
    }

    getCurState(state, props) {
        let isChanges = false;
        const newState = { ...state };
        for (let docKey in newState) {
            if (docKey === "active4Doc") continue;
            const document = newState[docKey];
            const status = this.getDocumentFiled(
                props,
                document.typeName,
                "state",
                "NotLoaded"
            );
            const error = this.getDocumentFiled(
                props,
                document.typeName,
                "comment"
            );
            if (status !== document.status) {
                document.status = status;
                isChanges = true;
            }
            if (error !== document.error) {
                document.error = error;
                isChanges = true;
            }
            newState.active4Doc =
                newState.snils.status === "Valid" ||
                newState.snils.status === "Loaded"
                    ? "snils"
                    : "inn";
        }
        if (!isChanges) return state;
        return newState;
    }

    getDocumentFiled(props, doc, filed, dfltVal = "") {
        if (!this.isDocumentInLoaded(props, doc)) return dfltVal;
        switch (doc) {
            case "PassportFirstPage":
            case "PassportSecondPage":
            case "SelfieWithPassport": {
                const validDoc = props.documents.find(
                    doc => doc.type === "Passport"
                );
                return validDoc[filed];
            }

            case "Inn": {
                const validDoc = props.documents.find(
                    doc => doc.type === "Inn"
                );
                return validDoc[filed];
            }

            case "Snils": {
                const validDoc = props.documents.find(
                    doc => doc.type === "Snils"
                );
                return validDoc[filed];
            }

            default:
                return dfltVal;
        }
    }

    isPhotoValid(photo) {
        if (!photo) return "Не удалось загрузить файл";
        const size = photo.size;
        if (!isFileSizeValid(size)) return "Размер файла превышает 5 Мб";
        const type = photo.type;
        if (!this.validImgTypes.includes(type))
            return "Некорректный формат документа";
        return "valid";
    }

    getErrorTextByEnum(status) {
        switch (status) {
            case 403:
                return "Срок действия токена истек. Обновите страницу";
            case 413:
                return "Слишком большой размер фото";
            case 500:
                return "Документ такого типа уже был загружен";
            case 400:
                return "Данный тип файла не поддерживается";
            case 999:
                return "Истекло время ожидания ответа от сервера. Попробуйте позже";
            default:
                return "Ошибка. Попробуйте еще раз";
        }
    }

    checkDigit(inn, coefficients) {
        let n = 0;
        for (let i in coefficients) {
            n += coefficients[i] * inn[i];
        }
        return parseInt((n % 11) % 10);
    }

    isInnValid(val) {
        const inn = val.replace(/ /g, "").replace(/[^0-9]/g, "");
        if (inn.length < 12) return false;
        const n11 = this.checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        const n12 = this.checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
            return true;
        }
        return false;
    }

    isSnilsValid(val) {
        const snils = val.replace(/ /g, "").replace(/[^0-9]/g, "");
        if (snils.length < 11) return false;
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(snils[i]) * (9 - i);
        }
        let checkDigit = 0;
        if (sum < 100) {
            checkDigit = sum;
        } else if (sum > 101) {
            checkDigit = parseInt(sum % 101);
            if (checkDigit === 100) {
                checkDigit = 0;
            }
        }
        if (checkDigit === parseInt(snils.slice(-2))) {
            return true;
        }
        return false;
    }

    uploadPhoto(docType, document) {
        const token = getLocalStorageData("Login");
        const type = this.state[docType].type;
        const data = new FormData();
        data.append("userfile", document);
        data.append("token", token);
        data.append("type", type);

        this.sendRequest(data, docType);
    }

    sendRequest(data, docType) {
        const request = new XMLHttpRequest();
        request.open("POST", "https://pay1.gbpremium.com/photoupload", true);
        request.send(data);
        const self = this;
        request.onload = e => {
            const status = e.currentTarget.status;
            const newState = { ...self.state };
            if (status === 200) {
                newState[docType].status = "Loaded";
            } else {
                newState[docType].status = "NotLoaded";
                newState[docType].error = self.getErrorTextByEnum(status);
            }
            self.setState(newState);
        };
        request.onerror = e => {
            const newState = { ...self.state };
            newState[docType].status = "NotLoaded";
            newState[docType].error = self.getErrorTextByEnum(999);
            self.setState(newState);
        };
    }

    changeDocument(docType, event) {
        if (event.target.files.length <= 0) return;
        const photo = event.target.files[0];
        const isValid = this.isPhotoValid(photo);
        if (isValid === "valid") {
            const newState = { ...this.state };
            newState[docType].status = "Loading";
            this.setState(newState);
            this.uploadPhoto(docType, photo);
        } else {
            const newState = { ...this.state };
            newState[docType].error = isValid;
            this.setState(newState);
        }
    }

    getErrorTextByInvalidVal(type) {
        switch (type) {
            case "inn":
                return (
                    <>
                        <p>Введенные данные ИНН не верные. </p>
                        <p>Попробуйте ввести данные вновь и корректно.</p>
                    </>
                );
            case "snils":
                return (
                    <>
                        <p>Введенные данные СНИЛС не верные. </p>
                        <p>Попробуйте ввести данные вновь и корректно.</p>
                    </>
                );
            default:
                return "";
        }
    }

    sendText() {
        const token = getLocalStorageData("Login");
        const doc = this.state[this.state.active4Doc];
        const value = doc.inputVal.replace(/ /g, "").replace(/[^0-9]/g, "");
        const type = this.state[this.state.active4Doc].type;
        const newState = { ...this.state };

        if (!this.isValidVal(value, this.state.active4Doc)) {
            newState[this.state.active4Doc].isValid = false;
            this.setState(newState);
            return;
        }

        if (!this.isUploadOtherDocumentValid(this.state.active4Doc, value)) {
            newState[this.state.active4Doc].isValid = false;
            newState[
                this.state.active4Doc
            ].error = this.getErrorTextByInvalidVal(this.state.active4Doc);
            this.setState(newState);
            return;
        }

        newState[this.state.active4Doc].status = "Loading";
        newState[this.state.active4Doc].error = "";
        newState[this.state.active4Doc].isValid = true;

        this.setState(newState);
        const data = new FormData();
        data.append(this.state.active4Doc, value);
        data.append("token", token);
        data.append("type", type);
        this.sendRequest(data, this.state.active4Doc);
    }

    isValidVal(val, type) {
        const value = val.replace(/ /g, "").replace(/[^0-9]/g, "");
        if (type === "inn") return value.length === 12;
        if (type === "snils") return value.length === 11;
        return true;
    }

    isUploadOtherDocumentValid(type, val) {
        switch (type) {
            case "inn":
                return this.isInnValid(val);
            case "snils":
                return this.isSnilsValid(val);
            default:
                return false;
        }
    }

    validateVal(val, type) {
        if (type === "inn") {
            return val
                .replace(/ /g, "")
                .replace(/[^0-9]/g, "")
                .substring(0, 12);
        }
        if (type === "snils") {
            let newVal = val.replace(/ /g, "").replace(/[^0-9]/g, "");
            if (newVal.length > 3) {
                newVal =
                    newVal.substring(0, 3) +
                    "-" +
                    newVal.substring(3, newVal.length);
            }
            if (newVal.length > 7) {
                newVal =
                    newVal.substring(0, 7) +
                    "-" +
                    newVal.substring(7, newVal.length);
            }
            if (newVal.length > 11) {
                newVal =
                    newVal.substring(0, 11) +
                    " " +
                    newVal.substring(11, newVal.length);
            }
            return newVal.substring(0, 14);
        }
        return val;
    }

    changeValInputActive4Doc(type, event) {
        const val = event.target.value;
        const validVal = this.validateVal(val, type);
        const isValid = this.isValidVal(validVal, type);
        const newState = { ...this.state };
        newState[type].inputVal = validVal;
        if (!newState[type].isValid && isValid) {
            newState[type].isValid = true;
        }
        this.setState(newState);
    }

    setActive4Doc(type) {
        this.setState({
            ...this.state,
            active4Doc: type
        });
    }

    getProps4Doc() {
        const type = this.state.active4Doc;
        const doc = this.state[this.state.active4Doc];
        return {
            type,
            ...doc,
            onClickButton: this.sendText.bind(this),
            onInputChange: this.changeValInputActive4Doc.bind(
                this,
                this.state.active4Doc
            ),
            setActive4Doc: this.setActive4Doc.bind(this)
        };
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.documents !== this.props.documents) {
            const newState = this.getCurState(this.state, nextProps);
            if (newState !== this.state) {
                this.setState(newState);
                return false;
            }
        }
        return true;
    }

    render() {
        const isBlocked = this.isBlocked;
        return (
            <div className="verification">
                <div className="verification__header">
                    <div className="verification__title">Верификация</div>
                    <div className="verification__description">
                        <span>
                            Чтобы пройти верификацию загрузите цветные
                            фотографии своих документов в формате
                            <b> jpeg</b> или <b>png</b> размером не более{" "}
                            <b>5 Мб</b>
                        </span>
                    </div>
                </div>
                {isBlocked ? (
                    <VerificationBlocked content={this.textBlock} />
                ) : (
                    ""
                )}
                <div className="verification__main">
                    <UploadDocument
                        onInputChange={this.changeDocument.bind(
                            this,
                            "passport1"
                        )}
                        lang={this.props.lang}
                        status={this.state.passport1.status}
                        text={<span>1. Разворота паспорта с фотографией"</span>}
                        error={this.state.passport1.error}
                    />

                    <UploadDocument
                        onInputChange={this.changeDocument.bind(
                            this,
                            "passport2"
                        )}
                        lang={this.props.lang}
                        status={this.state.passport2.status}
                        text={
                            <span>
                                2. Разворота паспорта с текущей регистрацией
                            </span>
                        }
                        error={this.state.passport2.error}
                    />

                    {/* <UploadDocument
            onInputChange={this.changeDocument.bind(this, "selfie")}
            status={this.state.selfie.status}
            text={
              <>
                <span>3.Селфи с паспортом в руках</span>
                <span className="verification__small">
                  (Должна быть отчетливо видна информация с первой страницы)
                </span>
              </>
            }
            error={this.state.selfie.error}
          /> */}

                    {/* <UploadText {...this.getProps4Doc()} /> */}

                    {/* <div className="verification__row error">
            <div className="verification__active">
              <div className="verification__left">
                <div className="verification__choice">
                  <span>4. ИНН</span>
                  <div className="verification__dropdown inactive">
                    <div>ИНН</div>
                    <div>СНИЛС</div>
                  </div>
                </div>
                <div className="verification__input">
                  <input type="text" />
                  <div className="verification__advice">11 цифр</div>
                </div>
              </div>
              <div className="verification__right">
                <div className="verification__button">
                  <div className="verification__text">Не принято</div>
                  <input type="file" className="verification__file" />
                </div>
              </div>
            </div>
          </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documents: state.verification.documents,
        ident: state.verification.ident,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadDocuments);
