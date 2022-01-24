import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../../Router/History";
import TopNav from "./";

import { routsName } from "../../Router/RouterList";
class TopNavContainer extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path={"/currentRates/:component"}>
            <></>
          </Route>
          <Route
            path={routsName.getRoutsUrl(
              ":component/:sport/:category/:tournament/:event"
            )}
            component={TopNav}
          />
          <Route
            path={routsName.getRoutsUrl(":component/:sport/:category")}
            component={TopNav}
          />
          <Route
            path={routsName.getRoutsUrl(":component/:sport")}
            component={TopNav}
          />
          <Route
            path={routsName.getRoutsUrl(":component")}
            component={TopNav}
          />
        </Switch>
      </Router>
    );
  }
}

export default TopNavContainer;
