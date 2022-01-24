import React, { Component } from "react";
import { connect } from "react-redux";

interface MyProps {
  setShowModal(params: boolean): void;
  component: any; // component
}

export class ModalBookmaker extends Component<MyProps> {
  render() {
    const { setShowModal, component } = this.props;
    return (
      <>
        <div
          className="bookmaker_modal_bg"
          onClick={() => setShowModal(false)}
        ></div>
        {component}
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBookmaker);
