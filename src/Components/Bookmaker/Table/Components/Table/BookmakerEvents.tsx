import React, { Component } from "react";
import { connect } from "react-redux";

import ButtonTest from "../../../../../Test/Components/Button";
import Test from "../../../../../Test";

class BookmakerEvents extends Component {
  state = {};

  render() {
    return (
      <>
        <ButtonTest />
        <Test />
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BookmakerEvents);
