import React, { Component } from "react";
import { connect } from "react-redux";
import { getMarket, isLineBlocked } from "../../../../Services/Shared";
import Ordinar from "./Ordinar";
import Multibets from "./Multibets";
import Total from "./Total";
import {
    removeOrdinarFromCoupon,
    acceptChanges,
    addSumInputExpress,
    addSumInputSystem
} from "../../../../Actions/Components/Coupon";
import Builder from "./Builder";
import EmptyBlock from "../../../EmptyBlock";

import TitleCoupion from "./TmpTitle/TitleCoupion";
import { changeViewSingleBet } from "../../../../Actions/Components/View/TableFilter";
class Coupon extends Component<any, any> {
    initialState: any;
    // props: any;
    constructor(props: any) {
        super(props);

        this.initialState = {
            isOpen: false
        };

        this.state = this.initialState;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.editingTicket && !this.props.editingTicket) {
            this.props.changeActiveComponent("bets");
            return false;
        }
        if (nextProps.ordinars !== this.props.ordinars) {
            return true;
        }
        if (nextProps.builder !== this.props.builder) return true;
        if (nextProps.isAuthorize !== this.props.isAuthorize) return true;
        if (nextProps.viewSingleBet !== this.props.viewSingleBet) return true;
        if (nextState !== this.state) return true;

        return false;
    }

    isChangesCoef(coef1, coef2) {
        if (!coef1 || coef1 === "-" || !coef2) return;
        const settings = this.props.settings;
        switch (settings.changingCoefs) {
            case 2: // принимать повышенные
                if (coef1 < coef2 && this.props.isAcceptedChanges)
                    this.props.acceptChanges(false);
                break;
            case 1: // принимать все
                break;
            case 0: // никакие не принимать
                if (coef1 != coef2 && this.props.isAcceptedChanges)
                    this.props.acceptChanges(false);
            default:
                break;
        }
    }

    getLine(compoundKey) {
        if (!compoundKey) return null;
        const lineId = this.props.linesByCK.get(compoundKey);
        if (!lineId) return null;
        const line = this.props.lines.get(lineId);
        if (!line) return null;
        return line;
    }

    getEvent(line) {
        if (!line) return null;
        const event = this.props.events.get(line.eventId);
        if (!event) return null;
        return event;
    }

    getMarket(line) {
        return getMarket(line, this.props.markets, this.props.marketsByNum);
    }

    acceptChanges() {
        this.props.acceptChanges(true);
    }

    toggleSingleBEts() {
        this.props.changeViewSingleBet(!this.props.viewSingleBet);
    }

    render() {
        const { ordinars, removeOrdinar, builder } = this.props;
        return (
            <div
                className={"coupon open " + (this.state.isOpen ? "border" : "")}
            >
                {ordinars.length !== 0 && !builder ? (
                    <TitleCoupion
                        toggle={this.toggleSingleBEts.bind(this)}
                        name={this.props.lang.singlbets}
                        isOpen={this.state.isOpen}
                        sizeValue={ordinars.length}
                        show={this.props.viewSingleBet}
                    />
                ) : (
                    ""
                )}
                {ordinars.length === 0 && !builder ? (
                    <EmptyBlock text={this.props.lang.selectEventToMakeBets} />
                ) : (
                    <>
                        {[...ordinars].reverse().map(or => {
                            const line = this.getLine(or.compoundKey);
                            const event = this.getEvent(line);
                            const market = this.getMarket(line);
                            return (
                                <Ordinar
                                    removeOrdinar={() =>
                                        removeOrdinar(
                                            or.compoundKey,
                                            or.outcomeId
                                        )
                                    }
                                    isOpen={this.state.isOpen}
                                    compoundKey={or.compoundKey}
                                    ordinarInfo={this.props.ordinarsInfo.get(
                                        or.compoundKey
                                    )}
                                    outcomeId={or.outcomeId}
                                    event={event}
                                    market={market}
                                    key={or.compoundKey + "-" + or.outcomeId}
                                    isChangesCoef={this.isChangesCoef.bind(
                                        this
                                    )}
                                />
                            );
                        })}

                        {ordinars.length > 1 ? (
                            <Multibets ordinars={ordinars} />
                        ) : (
                            ""
                        )}
                        {builder ? <Builder {...builder} /> : ""}
                        {ordinars.length > 0 || builder ? (
                            <Total
                                acceptChanges={this.acceptChanges.bind(this)}
                                showTotalStake={
                                    ordinars.length > 1 ? true : false
                                }
                            />
                        ) : (
                            ""
                        )}
                    </>
                )}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.ordinars.length === 3 &&
            this.props.ordinars.length === 2
        ) {
            setTimeout(() => this.props.addSumInputSystem(null), 0);
        }
        if (
            prevProps.ordinars.length === 2 &&
            this.props.ordinars.length === 1
        ) {
            setTimeout(() => this.props.addSumInputExpress(null), 0);
        }
    }
}

const mapStateToProps = state => {
    return {
        lang: state.user.language_user.dict,
        ordinars: state.coupon.ordinars,
        ordinarsInfo: state.coupon.ordinarsInfo,
        lines: state.server.eventsAndLines.lines,
        linesByCK: state.server.eventsAndLines.linesByCK,
        events: state.server.eventsAndLines.events,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        markets: state.server.entities.markets,
        marketsByNum: state.server.entities.marketsByNum,
        settings: state.coupon.settings,
        isAcceptedChanges: state.coupon.isAcceptedChanges,
        builder: state.coupon.couponBuilder,
        editingTicket: state.tickets.editingTicket,
        viewSingleBet: state.viewSingleBet,
        isAuthorize: state.isAuthorize
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeOrdinar: (compoundKey, outcomeId) =>
            dispatch(removeOrdinarFromCoupon(compoundKey, outcomeId)),
        acceptChanges: val => {
            dispatch(acceptChanges(val));
        },
        addSumInputExpress: val => dispatch(addSumInputExpress(val)),
        addSumInputSystem: val => dispatch(addSumInputSystem(val)),
        changeViewSingleBet: boolean => dispatch(changeViewSingleBet(boolean))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Coupon);

export const MAX_COUNT_ORDINARS_IN_COUPON = 20;
export const MIN_SUM_INPUT = 50;

export const isBlockedOrdinars = (
    ordinars: Array<any> = [],
    lines = new Map(),
    linesByCK = new Map(),
    events = new Map()
) => {
    return ordinars.some((ord: any) => {
        const lineId = linesByCK.get(ord.compoundKey);
        if (!lineId) return true;
        const line = lines.get(lineId);
        if (!line) return true;
        const event = events.get(line.eventId);
        if (!event) return true;
        return isLineBlocked(line, event);
    });
};

export const isOrdinarsFromOneEvent = (
    ordinars = [],
    lines = new Map(),
    linesByCK = new Map()
) => {
    const events: Array<any> = [];
    const result = ordinars.some((ord: any) => {
        const lineId = linesByCK.get(ord.compoundKey);
        if (!lineId) return false;
        const line = lines.get(lineId);
        if (!line) return false;
        if (events.includes(line.eventId)) return true;
        events.push(line.eventId);
        return false;
    });
    return result;
};
