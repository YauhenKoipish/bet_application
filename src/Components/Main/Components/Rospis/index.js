import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import StatisticContainer from "./StatisticContainer";
import Table from "./Components/";

import { routsName } from "../../../../Router/RouterList";
import { Redirect } from "react-router-dom";
const index = props => {
    return (
        <div
            className="main__painting"
            style={{ display: "flex", flexDirection: "column" }}
        >
            {props.events.get(props.match.params.event) ? (
                <React.Fragment>
                    <StatisticContainer
                        {...props}
                        key={props.match.params.event}
                    />
                    <Route
                        path={routsName.getRoutsUrl(
                            routsName.dict.rospis,
                            ":sport/:category/:tournament/:event/:tab"
                        )}
                        component={props => (
                            <Table key={props.match.params.event} {...props} />
                        )}
                    />
                </React.Fragment>
            ) : (
                <Redirect to={routsName.getRoutsUrl(routsName.dict.prematch)} />
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        events: state.server.eventsAndLines.events
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(index);
