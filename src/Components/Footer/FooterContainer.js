import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import history from "../../Router/History";
import Footer from "./";

class FooterContainer extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={Footer} />
            </Router>
        );
    }
}

export default FooterContainer;
