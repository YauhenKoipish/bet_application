import React, { Component } from "react";
import { connect } from "react-redux";
// import "./style/modal.css";
import { closeModal } from "../../Actions/Components/Modal/";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    if (!this.props.modal.isShown) return "";

    const { data } = this.props.modal;
    return (
      <div className="modal">
        <div className="modal__popup">
          <div className="modal__close" onClick={this.closeModal} />
          {data.title ? <div className="modal__title">{data.title}</div> : ""}
          {data.text ? <div className="modal__text">{data.text}</div> : ""}
          {getButtons(data)}
        </div>
      </div>
    );
  }

  closeModal(event) {
    if (
      !event.target.closest(".modal__close") &&
      event.target.closest(".modal__popup")
    )
      return;
    this.props.closeModal();
  }

  componentDidUpdate(prevProps) {
    if (this.props.modal.isShown) {
      document
        .getElementById("root")
        .addEventListener("click", this.closeModal);
    } else if (prevProps.modal.isShown) {
      document
        .getElementById("root")
        .removeEventListener("click", this.closeModal);
    }
  }

  componentWillUnmount() {
    document
      .getElementById("root")
      .removeEventListener("click", this.closeModal);
  }
}

const mapStateToProps = state => {
  return {
    modal: state.modal
  };
};
const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

const getButtons = props => {
  const { buttons } = props;
  if (!buttons || buttons.length === 0) return "";
  return (
    <>
      {buttons.length < 2 ? (
        <div
          onClick={buttons[0].func}
          className={
            "modal__button " + (buttons[0].class ? buttons[0].class : "")
          }
        >
          {buttons[0].text}
        </div>
      ) : (
        <div className="modal__contacts">
          {buttons.map((btn, i) => (
            <div
              onClick={btn.func}
              key={i}
              className={btn.class ? btn.class : ""}
            >
              {btn.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
