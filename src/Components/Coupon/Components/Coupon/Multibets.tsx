import React, { Component } from "react";
import { connect } from "react-redux";
import MultibetsItem from "./MultibetsItem";
import BlockedBlock from "./BlockedBlock";
import {
    MAX_COUNT_ORDINARS_IN_COUPON,
    isBlockedOrdinars,
    isOrdinarsFromOneEvent
} from ".";
import {
    addMultibetsInfo,
    addSumInputExpress,
    addSumInputSystem
} from "../../../../Actions/Components/Coupon";

import TitleCoupion from "./TmpTitle/TitleCoupion";

class Multibets extends Component<any, any> {
    initialState: {
        isOrdinarsFromOneEvent: boolean;
        isBlocked: boolean;
        isOpen: boolean;
    };
    isLimitMaxOrdinarsExceed: any;
    constructor(props) {
        super(props);
        this.initialState = {
            isOrdinarsFromOneEvent: false,
            isBlocked: false,
            isOpen: true
        };
        this.state = this.getCurState(this.initialState, props, true);
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
        // debugger;
        const events = isReset ? props.events : props.newEvents;
        const deletedEventsMap = new Map();
        const ordinarsCompoundKeys = props.ordinars.map(or => or.compoundKey);
        if (props.deletedEvent) {
            deletedEventsMap.set(props.deletedEvent.id, props.deletedEvent);
        }

        if (
            !isReset &&
            this.props.ordinars === props.ordinars &&
            !this.isLinesInEvents(events, ordinarsCompoundKeys) &&
            !this.isLinesInEvents(deletedEventsMap, ordinarsCompoundKeys)
        )
            return state;

        const isBlocked =
            this.isLinesInEvents(deletedEventsMap, ordinarsCompoundKeys) ||
            isBlockedOrdinars(
                props.ordinars,
                props.lines,
                props.linesByCK,
                props.events
            );
        const isOrdinarsFromOneEventVal = isOrdinarsFromOneEvent(
            props.ordinars,
            props.lines,
            props.linesByCK
        );

        // if (
        //   isBlocked !== state.isBlocked ||
        //   isOrdinarsFromOneEventVal !== state.isOrdinarsFromOneEvent ||
        //   this.props.ordinars !== props.ordinars
        // )
        return {
            ...state,
            isBlocked,
            isOrdinarsFromOneEvent: isOrdinarsFromOneEventVal
        };
        // return state;
    }

    toggleMultiBets() {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) return true;
        const newState = this.getCurState(this.state, nextProps);
        if (newState !== this.state) {
            this.setState(newState);
        }
        return false;
    }

    render() {
        const { ordinars } = this.props;
        const { isBlocked, isOrdinarsFromOneEvent, isOpen } = this.state;
        this.isLimitMaxOrdinarsExceed =
            ordinars.length > MAX_COUNT_ORDINARS_IN_COUPON;
        const isNeedToBlock =
            this.isLimitMaxOrdinarsExceed ||
            isOrdinarsFromOneEvent ||
            isBlocked;
        return (
            <div className="coupon__multi">
                <TitleCoupion
                    toggle={this.toggleMultiBets.bind(this)}
                    name={this.props.lang.multiBets}
                    isOpen={this.state.isOpen}
                />
                {/* <div
          className="coupon__title"
          onClick={this.toggleMultiBets.bind(this)}
        >
          <div className="coupon__multibet">{this.props.lang.multiBets}</div>
          <div className={"coupon__open " + (!isOpen ? "transform" : "")}>
            {getSportIcon("arrow")}
          </div>
        </div> */}
                <div
                    className={
                        "coupon__multi-wrapper" + (!isOpen ? " inactive" : "")
                    }
                >
                    {this.isLimitMaxOrdinarsExceed ? (
                        <BlockedBlock text={this.props.lang.errorMultiBets} />
                    ) : isOrdinarsFromOneEvent ? (
                        <BlockedBlock text={this.props.lang.errorMultiBets1} />
                    ) : isBlocked ? (
                        <BlockedBlock text={this.props.lang.errorMultiBets2} />
                    ) : (
                        ""
                    )}
                    {ordinars.length > 2 ? (
                        <MultibetsItem
                            isExpress={true}
                            isSystem={true}
                            ordinars={ordinars}
                            isBlocked={isNeedToBlock}
                        />
                    ) : (
                        <MultibetsItem
                            isExpress={true}
                            isSystem={false}
                            ordinars={ordinars}
                            isBlocked={isNeedToBlock}
                        />
                    )}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        this.props.addMultibetsInfo({
            isBlocked: null,
            isOrdinarsFromOneEvent: null,
            isExceedMaxCount: null
        });
    }

    componentDidMount() {
        this.props.addMultibetsInfo({
            isBlocked: this.state.isBlocked,
            isOrdinarsFromOneEvent: this.state.isOrdinarsFromOneEvent,
            isExceedMaxCount: this.isLimitMaxOrdinarsExceed
        });
    }

    componentDidUpdate(prevProps) {
        this.props.addMultibetsInfo({
            isBlocked: this.state.isBlocked,
            isOrdinarsFromOneEvent: this.state.isOrdinarsFromOneEvent,
            isExceedMaxCount: this.isLimitMaxOrdinarsExceed
        });
    }
}

const mapStateToProps = state => {
    return {
        newEvents: state.server.eventsAndLines.newEvents,
        lines: state.server.eventsAndLines.lines,
        linesByCK: state.server.eventsAndLines.linesByCK,
        events: state.server.eventsAndLines.events,
        eventsByGB: state.server.eventsAndLines.eventsByGB,
        deletedEvent: state.server.eventsAndLines.deletedEvent,
        markets: state.server.entities.markets,
        marketsByNum: state.server.entities.marketsByNum,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addMultibetsInfo: data => dispatch(addMultibetsInfo(data)),
        addSumInputExpress: sum => dispatch(addSumInputExpress(sum)),
        addSumInputSystem: sum => dispatch(addSumInputSystem(sum))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Multibets);
