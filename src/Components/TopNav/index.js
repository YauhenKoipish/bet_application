import React, { Component } from "react";
import { connect } from "react-redux";
import burger from "../../img/top-nav/burger.svg";
import { ReactComponent as Arrow } from "../../img/top-nav/arrow.svg";

import { getSportByName,getIcon} from "../../Services/Shared";
import { openMenu, closeMenu } from "../../Actions/Components/Menu/";
// import "./style/top-nav.css";
// import "./style/dropdown.css";
import TimeFilter from "./Components/TimeFilter";
import BackToSport from "./Components/BackToSport";
import Search from "./Components/Search";
import Sport from "./Components/Sport";
import Rospis from "./Components/Rospis";
import { routsName } from "../../Router/RouterList";

const getSportName = params => {
    return params.sport;
};

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.isName = false;
    }

    getName() {
        const sportName = getSportName(this.props.match.params);
        if (!sportName) return "";
        const sport = getSportByName(this.props.sports, sportName);
        if (sport) {
            this.isName = true;
            return sport.name;
        } else return "";
    }

    shouldComponentUpdate(nextProps) {
        if (
            JSON.stringify(this.props.match.params) !==
            JSON.stringify(nextProps.match.params)
        )
            return true;
        if (!this.isName) return true;

        return false;
    }

    getViewCentralComponent() {
        const params = this.props.match.params;
        if (
            (params.sport === routsName.dict["moi_matchi"] &&
                params.component === routsName.dict["prematch"]) ||
            params.component === routsName.dict["live"]
        )
            return "search";
        if (params.component === routsName.dict["prematch"])
            return "timeFilter";
        if (params.component === routsName.dict["categories"]) {
            if (params.category) return "backToSport";
            if (params.sport) return "sport";
        }
        if (params.component === routsName.dict["rospis"]) {
            return "rospis";
        }
        return "default";
    }

    getCentralComponent() {
        const view = this.getViewCentralComponent();
        switch (view) {
            case "timeFilter":
                return (
                    <>
                        <TimeFilter />
                        {<Search />}
                    </>
                );
            case "search":
                return <Search />;
            case "backToSport":
                return (
                    <>
                        <BackToSport
                            Arrow={Arrow}
                            parentProps={this.props}
                            sports={this.props.sports}
                        />
                        {<Search />}
                    </>
                );
            case "sport":
                return (
                    <>
                        <Sport
                            parentProps={this.props}
                            sports={this.props.sports}
                        />
                        {<Search />}
                    </>
                );
            case "rospis":
                return (
                    <Rospis
                        Arrow={Arrow}
                        parentProps={this.props}
                        sports={this.props.sports}
                    />
                );
            default:
                return "";
        }
    }

    togleTest() {
        // debugger;
        this.props.toggleMenu(true);
    }

    render() {
        return (
            <div className="top-nav">
                <div
                    className="top-nav__burger"
                    onClick={() => this.togleTest()}
                >
                    {getIcon('burger-menu')}
                    {/* <img src={burger} alt="" /> */}
                </div>
                {this.getCentralComponent()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        sports: state.server.entities.sports
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleMenu: isOpen => {
            isOpen ? dispatch(openMenu()) : dispatch(closeMenu());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopNav);
