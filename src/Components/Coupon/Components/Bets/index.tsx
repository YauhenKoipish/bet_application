import React, { Component } from "react";
import Tickets from "../../../Tickets";
// import "./style/bets.css";
import { connect } from "react-redux";
import EmptyBlock from "../../../EmptyBlock";

class Bets extends Component {
  props: any;
  getFilters() {
    return {
      status: 0
    };
  }

  render() {
    if (!this.props.isCanPlay) return <EmptyBlock text="  " />;
    return (
      <div className="bets">
        <div className="bets__main">
          {<Tickets filters={this.getFilters()} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCanPlay: state.verification.ident.isCanPlay
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Bets);
