import React, { Component } from "react";
import { connect } from "react-redux";
import { splitRangNumber } from "../../../../Services/Shared";
import { clearCoupon } from "../../../../Actions/Components/Coupon";
import { MIN_SUM_INPUT } from ".";
import { sendTicket } from "../../../../Actions/Components/Coupon";
import Loading from "../../../Loading";
import Changes from "./Changes";
import { isBlockedOrdinars } from ".";

class Total extends Component<any, any> {
    initialState: any;
    isBlockedSendButton: any;
    constructor(props) {
        super(props);
        this.initialState = {
            sum: 0,
            pay: 0,
            isSumValid: false
        };
        this.state = this.getCurState(this.initialState, props);
    }

    getSum(props) {
        const { ordinars, express, system, builder } = props.inputValues;
        const ordinarsSum = [...ordinars.values()].reduce(
            (accum, val) => accum + +val,
            0
        );
        return ordinarsSum + +express + +system + +builder;
    }

    isSumValid(props) {
        const inputValues = [...props.inputValues.ordinars.keys()].filter(key =>
            props.ordinars.find(
                ord => ord.compoundKey + "-" + ord.outcomeId === key
            )
        );
        const ordinars = inputValues.some(key => {
            const ordinar = props.ordinars.find(
                ord => ord.compoundKey + "-" + ord.outcomeId === key
            );
            const isBlockedOrdinar = ordinar
                ? isBlockedOrdinars(
                      [ordinar],
                      props.lines,
                      props.linesByCK,
                      props.events
                  )
                : false;

            return (
                !isBlockedOrdinar &&
                this.getMaxSum(
                    props.maxPay.ordinars.get(key),
                    props.coefs.ordinars.get(key)
                ) >= props.inputValues.ordinars.get(key) &&
                MIN_SUM_INPUT <= props.inputValues.ordinars.get(key)
            );
        });
        const express =
            this.getMaxSum(props.maxPay.express, props.coefs.express) <
                props.inputValues.express ||
            MIN_SUM_INPUT > props.inputValues.express;
        const system =
            this.getMaxSum(props.maxPay.system, props.coefs.system) <
                props.inputValues.system ||
            MIN_SUM_INPUT > props.inputValues.system;
        const builder =
            this.getMaxSum(props.maxPay.builder, props.builderCoef) <
                props.inputValues.builder ||
            MIN_SUM_INPUT > props.inputValues.builder;

        let result = inputValues.length > 0 ? +ordinars : 0;
        result += props.inputValues.express ? +!express : 0;
        result += props.inputValues.system ? +!system : 0;
        result += props.inputValues.builder ? +!builder : 0;
        return result > 0 ? true : false;
    }

    getMaxSum(maxPay, coef) {
        const maxSum = maxPay ? Math.floor(maxPay / (coef - 1)) : Infinity;
        return maxSum;
    }

    getPay(props) {
        const getPay = (value, coefArg, maxPay) => {
            if (value < MIN_SUM_INPUT) return 0;
            const coef = coefArg && coefArg !== "-" ? coefArg : 0;
            let pay = coef * value;
            const maxSum = this.getMaxSum(maxPay, coef);
            if (value > maxSum) pay = coef * maxSum;
            return Math.floor(pay);
        };

        const { inputValues, coefs, maxPay } = props;
        const ordinarsPay = [...inputValues.ordinars.keys()]
            .map(key =>
                getPay(
                    +inputValues.ordinars.get(key),
                    +coefs.ordinars.get(key),
                    maxPay.ordinars.get(key)
                )
            )
            .reduce((accum, val) => accum + val, 0);
        const expressPay = getPay(
            inputValues.express,
            +coefs.express,
            maxPay.express
        );
        const systemPay = getPay(
            inputValues.system,
            +coefs.system,
            maxPay.system
        );
        const builderPay = getPay(
            inputValues.builder,
            +props.builderCoef,
            maxPay.builder
        );
        return ordinarsPay + expressPay + systemPay + builderPay;
    }

    isLinesInEvents(events, compoundKeys) {
        if (!compoundKeys || compoundKeys.length === 0) return true;
        let isCompoundKeyInEvents = false;
        let iter = 0;
        const eventsArray = [...events.values()];
        const ordinarsLinesByIds = compoundKeys.map(l =>
            this.props.linesByCK.get(l)
        );
        while (!isCompoundKeyInEvents) {
            if (iter >= eventsArray.length) break;
            const event = eventsArray[iter];
            if (!event) debugger;
            const lines = event.lines;
            if (!lines) {
                iter++;
                continue;
            }
            const linesByIds = [...lines.keys()];
            if (ordinarsLinesByIds.some(l => linesByIds.includes(l))) {
                isCompoundKeyInEvents = true;
                break;
            }
            iter++;
        }
        return isCompoundKeyInEvents;
    }

    getCurState(state, props, isReset = false) {
        const events = props.newEvents;
        const deletedEventsMap = new Map();
        const ordinarsCompoundKeys = props.ordinars.map(or => or.compoundKey);
        if (props.deletedEvent) {
            deletedEventsMap.set(props.deletedEvent.id, props.deletedEvent);
        }

        if (
            !isReset &&
            this.props.ordinars === props.ordinars &&
            this.props.coefs === props.coefs &&
            this.props.inputValues === props.inputValues &&
            this.props.maxPay === props.maxPay &&
            !this.isLinesInEvents(events, ordinarsCompoundKeys) &&
            !this.isLinesInEvents(deletedEventsMap, ordinarsCompoundKeys)
        )
            return state;
        const prevSum = state.sum;
        const prevPay = state.pay;
        const prevIsSumValid = state.isSumValid;

        const sum = this.getSum(props);
        const pay = this.getPay(props);
        const isSumValid = this.isSumValid(props);

        if (prevSum !== sum || prevPay !== pay || prevIsSumValid !== isSumValid)
            return {
                ...state,
                sum,
                pay,
                isSumValid
            };
        return state;
    }

    sendTicket = () => {
        if (!this.isBlockedSendButton) this.props.sendTicket();
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.isAuthorize !== this.props.isAuthorize) return true;
        if (nextProps.isCanPlay !== this.props.isCanPlay) return true;
        if (nextProps.isAcceptedChanges !== this.props.isAcceptedChanges)
            return true;
        if (nextProps.sendingData !== this.props.sendingData) return true;
        if (nextState !== this.state) return true;
        const newState = this.getCurState(this.state, nextProps);
        if (newState !== this.state) {
            this.setState(newState);
        }
        if (nextProps.lang !== this.props.lang) {
            return true;
        }
        if (nextProps.ordinars !== this.props.ordinars) {
            return true;
        }
        return false;
    }

    render() {
        const { sum, pay, isSumValid } = this.state;
        const {
            isAcceptedChanges,
            acceptChanges,
            isAuthorize,
            isCanPlay
        } = this.props;
        this.isBlockedSendButton =
            !isAuthorize || !isCanPlay || !isSumValid || !pay;
        return (
            <div className="coupon__total">
                {!isAcceptedChanges && isAuthorize ? (
                    <Changes acceptChanges={acceptChanges} />
                ) : (
                    ""
                )}
                {this.props.ordinars.length > 1 ? (
                    <div className="coupon__sum-up">
                        <div className="coupon__sum">
                            <div className="coupon__text">
                                {this.props.lang.sumBets}
                            </div>
                            <div className="coupon__money">
                                {splitRangNumber(sum)}
                            </div>
                        </div>
                        <div className="coupon__sum">
                            <div className="coupon__text">
                                {this.props.lang.maxPayuot}
                            </div>
                            <div className="coupon__money">
                                {splitRangNumber(pay)}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div className="coupon__buttons">
                    <div
                        className={
                            "coupon__accept" +
                            (this.isBlockedSendButton ? " opacity50" : "")
                        }
                        onClick={this.sendTicket.bind(this)}
                    >
                        <button>
                            {this.props.sendingData ? (
                                <Loading />
                            ) : (
                                this.props.lang.sendbets
                            )}
                        </button>
                    </div>

                    <div
                        className="coupon__clear"
                        onClick={this.props.clearCoupon}
                    >
                        {this.props.lang.clearCoupon}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.user.language_user.dict,
        coefs: state.coupon.coefs,
        inputValues: state.coupon.inputValues,
        ordinars: state.coupon.ordinars,
        maxPay: state.coupon.maxPay,
        isAcceptedChanges: state.coupon.isAcceptedChanges,
        sendingData: state.coupon.sendingData,
        builderCoef: state.server.builderInfo.builderCoef,
        isAuthorize: state.user.isAuthorize,
        events: state.server.eventsAndLines.events,
        newEvents: state.server.eventsAndLines.newEvents,
        deletedEvent: state.server.eventsAndLines.deletedEvent,
        lines: state.server.eventsAndLines.lines,
        linesByCK: state.server.eventsAndLines.linesByCK,
        isCanPlay:
            state.verification.ident.isCanPlay ||
            (!state.user.isMainBalance &&
                (state.verification.ident.personalDataStatus === 3 ||
                    (state.verification.ident.scriptFlag === "OpenAccount" &&
                        state.verification.ident.identStatus !== "None")))
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearCoupon: () => dispatch(clearCoupon()),
        sendTicket: () => dispatch(sendTicket())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Total);
