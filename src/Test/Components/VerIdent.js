import React, { Component } from "react";
import { connect } from "react-redux";
import { updateIndentComponentVerification } from "../../Actions/Components/Verification/";
import { closeModalTest } from "../../Actions/Components/Modal";

// bindingFailSource: null,
// identStatus: null,
// personalDataStatus: null,
// isCanPlay: null, // сделать null
// isCanTopup: null,
// isCanWithdraw: null,
// isIdentificationInitiated: null,
// scriptFlag: null,
// callMe: null

class VerIdent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bindingFailSource:
        props.verIdentInfo.bindingFailSource !== null
          ? props.verIdentInfo.bindingFailSource
          : "null",
      identStatus:
        props.verIdentInfo.identStatus !== null
          ? props.verIdentInfo.identStatus
          : "null",
      personalDataStatus:
        props.verIdentInfo.personalDataStatus !== null
          ? props.verIdentInfo.personalDataStatus
          : "null",
      isCanPlay:
        props.verIdentInfo.isCanPlay !== null
          ? props.verIdentInfo.isCanPlay
          : "null",
      isCanTopup:
        props.verIdentInfo.isCanTopup !== null
          ? props.verIdentInfo.isCanTopup
          : "null",
      isCanWithdraw:
        props.verIdentInfo.isCanWithdraw !== null
          ? props.verIdentInfo.isCanWithdraw
          : "null",
      isIdentificationInitiated:
        props.verIdentInfo.isIdentificationInitiated !== null
          ? props.verIdentInfo.isIdentificationInitiated
          : "null",
      scriptFlag:
        props.verIdentInfo.scriptFlag !== null
          ? props.verIdentInfo.scriptFlag
          : "null",
      callMe:
        props.verIdentInfo.callMe !== null ? props.verIdentInfo.callMe : "null"
    };
  }

  test() {
    this.props.closeModalTest();
    const data = {
      bindingFailSource:
        this.state.bindingFailSource === "null"
          ? null
          : this.state.bindingFailSource,
      identStatus:
        this.state.identStatus === "null" ? null : this.state.identStatus,
      personalDataStatus:
        this.state.personalDataStatus === "null"
          ? null
          : this.state.personalDataStatus,
      isCanPlay: this.state.isCanPlay === "null" ? null : this.state.isCanPlay,
      isCanTopup:
        this.state.isCanTopup === "null" ? null : this.state.isCanTopup,
      isCanWithdraw:
        this.state.isCanWithdraw === "null" ? null : this.state.isCanWithdraw,
      isIdentificationInitiated:
        this.state.isIdentificationInitiated === "null"
          ? null
          : this.state.isIdentificationInitiated,
      scriptFlag:
        this.state.scriptFlag === "null" ? null : this.state.scriptFlag,
      callMe: this.state.callMe === "null" ? null : this.state.callMe
    };
    // console.log(this.state);
    this.props.updateIndentComponentVerification(data);
  }

  changeBindingFailSource(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      bindingFailSource: val
    });
  }

  changeidentStatus(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      identStatus: val
    });
  }

  changeIsCanPlay(event) {
    let val = event.target.value;
    val = val === "true" ? true : val === "false" ? false : val;
    this.setState({
      ...this.state,
      isCanPlay: val
    });
  }

  changeIsCanTopup(event) {
    let val = event.target.value;
    val = val === "true" ? true : val === "false" ? false : val;
    this.setState({
      ...this.state,
      isCanTopup: val
    });
  }

  changeIsCanWithdraw(event) {
    let val = event.target.value;
    val = val === "true" ? true : val === "false" ? false : val;

    this.setState({
      ...this.state,
      isCanWithdraw: val
    });
  }

  changeIsIdentificationInitiated(event) {
    let val = event.target.value;
    val = val === "true" ? true : val === "false" ? false : val;

    this.setState({
      ...this.state,
      isIdentificationInitiated: val
    });
  }

  changePersonalDataStatus(event) {
    const val = +event.target.value;

    this.setState({
      ...this.state,
      personalDataStatus: val
    });
  }

  changeScriptFlag(event) {
    const val = event.target.value;

    this.setState({
      ...this.state,
      scriptFlag: val
    });
  }

  changeCallMe(event) {
    let val = event.target.value;
    val = val !== "null" ? { datetime: new Date().getTime() } : "null";
    this.setState({
      ...this.state,
      callMe: val
    });
  }

  render() {
    return (
      <>
        <div className="caption-test">binding Fail Source</div>
        <select
          className="input-test"
          onChange={this.changeBindingFailSource.bind(this)}
          value={this.state.bindingFailSource}
        >
          <option value="null">null</option>
          <option value="Unknown">Unknown</option>
          <option value="Duplicate">Duplicate</option>
          <option value="Other">Other</option>
        </select>

        <div className="caption-test">Ident Status</div>
        <select
          className="input-test"
          onChange={this.changeidentStatus.bind(this)}
          value={this.state.identStatus}
        >
          <option value="null">null</option>
          <option value="None">None</option>
          <option value="Limited">Limited</option>
          <option value="Full">Full</option>
        </select>

        <div className="caption-test">Personal Data Status</div>
        <select
          className="input-test"
          onChange={this.changePersonalDataStatus.bind(this)}
          value={this.state.personalDataStatus}
        >
          <option value="null">null</option>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>

        <div className="caption-test">is can play</div>
        <select
          className="input-test"
          onChange={this.changeIsCanPlay.bind(this)}
          value={this.state.isCanPlay}
        >
          <option value="null">null</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>

        <div className="caption-test">is can topup</div>
        <select
          className="input-test"
          onChange={this.changeIsCanTopup.bind(this)}
          value={this.state.isCanTopup}
        >
          <option value="null">null</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>

        <div className="caption-test">is can withdraw</div>
        <select
          className="input-test"
          onChange={this.changeIsCanWithdraw.bind(this)}
          value={this.state.isCanWithdraw}
        >
          <option value="null">null</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>

        <div className="caption-test">is Identification Initiated</div>
        <select
          className="input-test"
          onChange={this.changeIsIdentificationInitiated.bind(this)}
          value={this.state.isIdentificationInitiated}
        >
          <option value="null">null</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>

        <div className="caption-test">script Flag</div>
        <select
          className="input-test"
          onChange={this.changeScriptFlag.bind(this)}
          value={this.state.scriptFlag}
        >
          <option value="null">null</option>
          <option value="None">None</option>
          <option value="Courier">Courier</option>
          <option value="UploadDocs">UploadDocs</option>
          <option value="OpenAccount">OpenAccount</option>
        </select>

        <div className="caption-test">call me</div>
        <select
          className="input-test"
          onChange={this.changeCallMe.bind(this)}
          // value={this.state.callMe !== "null" ? "Есть обратный звонок" : "null"}
        >
          <option value="null">null</option>
          <option value={true}>Есть обратный звонок</option>
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
    verIdentInfo: state.verification.ident
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModalTest: () => dispatch(closeModalTest()),
    updateIndentComponentVerification: data =>
      dispatch(updateIndentComponentVerification(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerIdent);
