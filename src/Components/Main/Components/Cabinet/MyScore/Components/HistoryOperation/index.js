import React, { Component } from "react";
import { connect } from "react-redux";
import SmallOperation from "./SmallTmp";
import BigOperation from "./BigTmp";
import OperationContainer from "./OperationContainer";
// import "../../../style/money-big.css";
// import "../../../style/money-small.css";
import { getOperationByDate } from "../../../../../../../Server/";

class HistoryOperation extends Component {
    constructor(props) {
        super(props);
        // this.requestOperations();
        this.requestedOperations = [];
        this.requestCurrentDate();
    }

    requestOperations() {
        this.props.operationsTimestamps.forEach(operation => {
            getOperationByDate(operation);
        });
    }

    isDateEqual(date1, date2) {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    requestCurrentDate(currentDate = this.props.currentDate) {
        if (!currentDate) return;
        const validDate = this.props.operationsTimestamps.find(timestamp =>
            this.isDateEqual(currentDate, new Date(timestamp))
        );
        if (!validDate || this.requestedOperations.includes(validDate)) return;
        this.requestedOperations.push(validDate);
        getOperationByDate(validDate);
    }

    getWalletSpecification(status) {
        switch (status) {
            case 1:
                return this.props.lang.bankCart;
            case 2:
                return this.props.lang.qiwi;
            case 3:
                return this.props.lang.yandexMoney;
            case 4:
                return this.props.lang.webMoney;
            case 5:
                return this.props.lang.coin;
            case 6:
                return this.props.lang.euroLan;
            case 7:
                return this.props.lang.sveznoi;
            case 8:
                return this.props.lang.megafon;
            case 9:
                return this.props.lang.MТС;
            case 10:
                return this.props.lang.bilain;
            case 11:
                return this.props.lang.tele2;
            case 12:
                return this.props.lang.webBankA;
            case 13:
                return this.props.lang.webBankC;
            case 14:
                return this.props.lang.bankScore;
            case 15:
                return this.props.lang.cipis;
            case 16:
                return this.props.lang.pushCyber;
            case 17:
                return this.props.lang.cyberT;
            case 18:
                return this.props.lang.cybersend;
            case 19:
                return this.props.lang.cyberRos;
            case 20:
                return this.props.lang.cyberSviznoi;
            case 21:
                return this.props.lang.cyberEuroLan;
            case 22:
                return this.props.lang.cash;
            case 23:
                return this.props.lang.nextLvl;
            case 24:
                return this.props.lang.Units;
            case 25:
                return this.props.lang.everyDayC;
            case 26:
                return this.props.lang.bonusF;
            case 27:
                return this.props.lang.handBonus;
            default:
                return " "; //"Нет данных";
        }
    }

    getStatusSpecification(status) {
        switch (status) {
            case 0:
                return this.props.lang.processing;
            case 1:
                return this.props.lang.good;
            default:
                return this.props.lang.bad;
        }
    }

    getClassByStatus(status) {
        switch (status) {
            case 0:
                return "yellow-link";
            case 1:
                return "good";
            default:
                return "bad";
        }
    }

    getPropsForOperation(operation) {
        const sum = operation.sum ? operation.sum : operation.freeSum;
        return {
            time: operation.creationDate,
            id: operation.id,
            type: this.getWalletSpecification(operation.operationType),
            sum,
            isBonus: operation.type,
            tax: operation.tax,
            total: (Math.abs(sum) - operation.tax) * (sum > 0 ? 1 : -1),
            status: this.getStatusSpecification(operation.status),
            statusClass: this.getClassByStatus(operation.status),
            link: operation.comment
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.currentDate !== this.props.currentDate) {
            this.requestCurrentDate(nextProps.currentDate);
        }
        return true;
    }

    getStartDayTime() {
        if (!this.props.currentDate) return Infinity;
        return new Date(
            this.props.currentDate.getFullYear(),
            this.props.currentDate.getMonth(),
            this.props.currentDate.getDate()
        ).getTime();
    }

    getEndDayTime() {
        if (!this.props.currentDate) return -Infinity;
        return new Date(
            this.props.currentDate.getFullYear(),
            this.props.currentDate.getMonth(),
            this.props.currentDate.getDate() + 1
        ).getTime();
    }

    render() {
        const validOperations = [...this.props.operations.values()].filter(
            operation =>
                operation.creationDate >= this.getStartDayTime() &&
                operation.creationDate < this.getEndDayTime()
        );
        if (validOperations.length < 1 || !this.props.currentDate) return "";
        return (
            <OperationContainer
                view={this.props.viewHistoryOperation}
                lang={this.props.lang}
            >
                {validOperations
                    .sort((a, b) => b.creationDate - a.creationDate)
                    .map(operation => {
                        if (this.props.viewHistoryOperation === "small")
                            return (
                                <SmallOperation
                                    key={operation.id}
                                    {...this.getPropsForOperation(operation)}
                                />
                            );
                        return (
                            <BigOperation
                                key={operation.id}
                                {...this.getPropsForOperation(operation)}
                            />
                        );
                    })}
            </OperationContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        viewHistoryOperation: state.view.historyOperation,
        operations: state.user.info.currentOperationsData,
        operationsTimestamps: state.user.info.operationsTimestamps,
        currentDate: state.user.info.currentDateHistoryOperations,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export const getViewHistoryOperations = () => {
    const w = window.innerWidth;
    if (w >= 768) {
        return "big";
    } else {
        return "small";
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryOperation);
