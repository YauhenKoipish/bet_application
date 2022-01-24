import React, { Component } from "react";
import { connect } from "react-redux";
import { updateVerificationStatus } from "../../Actions/Components/Verification/";
import { closeModalTest } from "../../Actions/Components/Modal";

class VerStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }

  test() {
    this.props.closeModalTest();
    const data = +this.state.status;
    this.props.updateVerificationStatus(data);
  }

  changeStatus(event) {
    const val = event.target.value;
    this.setState({
      ...this.state,
      status: val
    });
  }

  render() {
    return (
      <>
        <div className="caption-test">
          Status (0 - Проверка документов, 1 - Курьер, 2 - Фото, 3 - Можно
          катать)
        </div>
        <input
          className="input-test"
          value={this.state.status}
          onChange={this.changeStatus.bind(this)}
        />
        <div className="coupon__accept test" onClick={this.test.bind(this)}>
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
    updateVerificationStatus: data => dispatch(updateVerificationStatus(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerStatus);
