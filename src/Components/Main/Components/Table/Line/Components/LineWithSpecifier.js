import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getLineType,
    getMarket,
    getCoefInTrueFormat,
    sortLinesBySpecifier,
    isLineBlocked
} from "../../../../../../Services/Shared";
import LineHandicap, { getLinesHandicap } from "./LineHandicap";
import LineTotal, { getLinesTotal } from "./LineTotal";
import { toggleOutcome } from "../../../../../../Actions/Components/Coupon/";
import { isLineInCoupon } from "../";

class LineWithSpecifier extends Component {
    constructor(props) {
        super(props);
        this.isUpdate = false;
        this.initialState = {
            isOpen: false,
            activeSpecifier: null
        };
        this.state = this.initialState;
        this.handleCloseDropdown = e => this.closeDropdown.call(this, e);
    }

    getLines() {
        const getLineType = getLineTypeFunc(
            this.props.markets,
            this.props.marketsByNum
        );
        switch (this.props.type) {
            case "handicap":
                return getLinesHandicap(this.props.event, getLineType);
            case "total":
                return getLinesTotal(this.props.event, getLineType);
            default:
                break;
        }
    }

    getActiveSpecIndex() {}

    closeDropdown(e) {
        if (!e.target.closest(".line__dropdowm")) {
            this.setState({
                ...this.state,
                isOpen: !this.state.isOpen
            });
            this.removeHandleClickCloseDropdown();
        }
    }

    addHandleClickCloseDropdown() {
        document
            .getElementById("root")
            .addEventListener("click", this.handleCloseDropdown);
    }

    removeHandleClickCloseDropdown() {
        document
            .getElementById("root")
            .removeEventListener("click", this.handleCloseDropdown);
    }

    toggleDropDown(line, lines) {
        if (isLineBlocked(line, this.props.event) || lines.length < 2) return;
        if (this.state.isOpen === false) {
            this.addHandleClickCloseDropdown();
        } else {
            this.removeHandleClickCloseDropdown();
        }
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        });
    }

    changeActiveSpecIndex(spec, event) {
        event.stopPropagation();
        if (spec !== this.state.activeSpecifier) {
            let newState;
            newState = {
                ...this.state,
                isOpen: false,
                activeSpecifier: spec
            };
            this.setState(newState);
            this.removeHandleClickCloseDropdown();
        }
    }

    getPropsForLines() {
        const {
            arrows,
            event,
            toggleOutcome,
            ordinars,
            markets,
            marketsByNum
        } = this.props;
        const { isOpen } = this.state;
        const lines = this.getLines();
        this.activeLine = lines.find(
            l => l.specifierValue[0] === this.state.activeSpecifier
        );
        if (!this.activeLine) {
            this.activeLine = lines[0];
            //костыль
            if (this.state.activeSpecifier) this.state.activeSpecifier = null;
        }

        const sortedLines = [...lines].sort((a, b) =>
            sortLinesBySpecifier(a, b)
        );
        const activeIndex = sortedLines.findIndex(
            l => l.id === this.activeLine.id
        );
        return {
            lines: sortedLines,
            arrows,
            activeSpecifier: this.activeLine,
            activeIndexSpec: activeIndex,
            isOpen,
            getCoef,
            toggleDropDown: this.toggleDropDown.bind(this),
            changeActiveSpecIndex: this.changeActiveSpecIndex.bind(this),
            event,
            toggleOutcome,
            ordinars,
            markets,
            marketsByNum
        };
    }

    isComponentMustBeUpdate(nextProps) {
        if (
            !isLineInCoupon(nextProps.ordinars, this.activeLine) &&
            !isLineInCoupon(this.props.ordinars, this.activeLine)
        )
            return false;
        return true;
    }

    shouldComponentUpdate(nextProps) {
        // if (this.activeLine && window.debugLine === this.activeLine.id) debugger;
        if (window.debugEvent === this.props.event.id) debugger;

        if (nextProps.ordinars !== this.props.ordinars)
            return this.isComponentMustBeUpdate(nextProps);
        return true;
    }

    render() {
        if (window.debugEvent === this.props.event.id) debugger;

        switch (this.props.type) {
            case "handicap":
                return <LineHandicap {...this.getPropsForLines()} />;
            case "total":
                return <LineTotal {...this.getPropsForLines()} />;
            default:
                return "";
        }
    }
}

const mapStateToProps = state => {
    return {
        ordinars: state.coupon.ordinars,
        markets: state.server.entities.markets,
        marketsByNum: state.server.entities.marketsByNum
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleOutcome: (line, outcomeId) => {
            dispatch(toggleOutcome(line, outcomeId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LineWithSpecifier);

const getCoef = (coefs, index) => {
    if (!coefs) return "-";
    return getCoefInTrueFormat(coefs[index]);
};

const getLineTypeFunc = (markets, marketsByNum) => {
    return line => {
        const market = getMarket(line, markets, marketsByNum);
        if (!market) return null;
        return getLineType(market, line);
    };
};
