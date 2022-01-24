import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./";

class HeaderContainer extends Component {
    render() {
        return <Route path="/" component={Header} />;
    }
}

export default HeaderContainer;
