import React, { Component } from "react";
import { connect } from "react-redux";
import { route } from "../../../../../../Actions/Components/Navigation/";
import FilterCurrent from "../../BetHistory/Components/FilterCurrent";
import { routsName } from "../../../../../../Router/RouterList";
class Filters extends Component {
    getActiveTab() {
        return this.props.location.pathname.split("/")[3];
    }

    render() {
        const activeTab = this.getActiveTab();
        return (
            <div className="user-account__filters">
                <div className="user-account__main-filter">
                    <FilterCurrent
                        name={this.props.lang.personalInfo}
                        handleClick={() =>
                            this.props.navigate(routsName.dict.informacziya)
                        }
                        isActive={activeTab === routsName.dict.informacziya}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lang: state.user.language_user.dict
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: url =>
            dispatch(
                route(
                    "push",
                    routsName.getRoutsUrl(
                        routsName.dict.kabinet,
                        routsName.dict.moj_akkaunt,
                        url
                    )
                )
            )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);
