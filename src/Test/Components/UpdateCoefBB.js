import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModalTest } from "../../Actions/Components/Modal";
import { saveCoefbuilder } from "../../Actions/Components/Server/Case15/";

class UpdateCoefBB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coef: ""
    };
  }

  test() {
    this.props.closeModalTest();
    this.props.saveCoefbuilder(this.state.coef);
  }

  changeCoef(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      coef: val
    });
  }

  render() {
    return (
      <>
        <div className="caption-test">Введите коэф в BB </div>
        <input
          className="input-test"
          value={this.state.coef}
          onChange={this.changeCoef.bind(this)}
        />
        <div className="coupon__accept test" onClick={() => this.test()}>
          <button>Применить</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    closeModalTest: () => dispatch(closeModalTest()),
    saveCoefbuilder: coef => dispatch(saveCoefbuilder(coef))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCoefBB);
