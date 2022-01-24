import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCallMeResponseVerification } from "../../Actions/Components/Verification/";
import { closeModalTest } from "../../Actions/Components/Modal";

class VerCallMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.verCallMe !== null ? props.verCallMe : "null"
    };
  }

  test() {
    this.props.closeModalTest();
    const data = this.state.status === "null" ? null : this.state.status;
    // const data = !!+this.state.status;
    this.props.updateCallMeResponseVerification(data);
  }

  changeStatus(event) {
    let val = event.target.value;
    val = val === "true" ? true : val === "false" ? false : val;
    this.setState({
      ...this.state,
      status: val
    });
  }

  render() {
    return (
      <>
        <div className="caption-test">Call Me Response</div>
        <select
          className="input-test"
          onChange={this.changeStatus.bind(this)}
          value={this.state.status}
        >
          <option value="null">null</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <div className="coupon__accept test" onClick={this.test.bind(this)}>
          <button>Применить</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    verCallMe: state.verification.callMeResponse
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModalTest: () => dispatch(closeModalTest()),
    updateCallMeResponseVerification: data =>
      dispatch(updateCallMeResponseVerification(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerCallMe);
