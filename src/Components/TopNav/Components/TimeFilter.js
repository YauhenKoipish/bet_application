import React, { Component } from "react";
import { connect } from "react-redux";
import { changeActiveValueTimeFilter } from "../../../Actions/Components/Filters/";
import { getSportIcon } from "../../../Services/Shared";

class TimeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.filterVariants = this.getFilterVariants(this.props.lang);
        this.handleCloseDropdown = e => this.toggleFilter.call(this, e);
    }

    getFilterVariants(lang) {
        return [
            {
                name: lang.twoHour,
                val: 2 * 60 * 60 * 1000,
                activeText: "twoHour"
            },
            {
                name: lang.fourHour,
                val: 4 * 60 * 60 * 1000,
                activeText: "fourHour"
            },
            {
                name: lang.sixHour,
                val: 6 * 60 * 60 * 1000,
                activeText: "sixHour"
            },
            {
                name: lang.eightHour,
                val: 8 * 60 * 60 * 1000,
                activeText: "eightHour"
            },
            {
                name: lang.twelveHour,
                val: 12 * 60 * 60 * 1000,
                activeText: "twelveHour"
            },
            {
                name: lang.hourToday,
                val: 24 * 60 * 60 * 1000,
                activeText: "hourToday"
            },
            { name: lang.selectTime, val: Infinity, activeText: "selectTime" }
        ];
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

    toggleFilter(e) {
        if (!e.target.closest(".dropdown")) {
            if (this.state.isOpen) {
                this.removeHandleClickCloseDropdown();
            } else {
                this.addHandleClickCloseDropdown();
            }
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }

    changeFilter(e, val) {
        e.stopPropagation();
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.removeHandleClickCloseDropdown();
        this.props.changeActiveValueTimeFilter(val);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.lang !== nextProps.lang) {
            this.filterVariants = this.getFilterVariants(nextProps.lang);
            return true;
        }
        if (this.state.isOpen !== nextState.isOpen) {
            return true;
        }

        return false;
    }

    render() {
        const { isOpen } = this.state;
        const { active } = this.props.filter;
        return (
            <div
                className={"top-nav__nav" + (isOpen ? " open" : "")}
                onClick={e => this.toggleFilter.call(this, e)}
            >
                <div className="top-nav__name ">
                    {active.name ? active.name : this.props.lang.hourToday}
                </div>
                <div className="icon">{getSportIcon("tringle")}</div>
                <ul className="top-nav__dropdown dropdown">
                    {this.filterVariants.map((f, i) =>
                        f.val !== active.val ? (
                            <li
                                key={i}
                                className="dropdowm__elem"
                                onClick={e =>
                                    this.changeFilter.call(this, e, f)
                                }
                            >
                                {f.name}
                            </li>
                        ) : (
                            ""
                        )
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filter: state.filters.timeFilter,
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeActiveValueTimeFilter: val => {
            dispatch(changeActiveValueTimeFilter(val));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeFilter);
