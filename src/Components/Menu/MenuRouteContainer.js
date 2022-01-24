import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./";
//import MenuContainer from './MenuContainer'

import BookmakerMenu from "../Bookmaker/Menu/";

class MenuRouteContainer extends Component {
  render() {
    return (
      <Switch>
        <Route path="/currentRates/:component" component={BookmakerMenu} />
        <Route path="/:component" component={Menu} />;
      </Switch>
    );

    // if (this.props.isBookmaker)
    //   return <Route path="/:component" component={BookmakerMenu} />;
    // else return <Route path="/:component" component={Menu} />;
  }
}

export default MenuRouteContainer;
