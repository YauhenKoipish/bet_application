import React, { Component } from "react";
import { connect } from "react-redux";
import { closeModalTest } from "../Actions/Components/Modal/";
import UpdateCoefBB from "./Components/UpdateCoefBB";
import BetStop from "./Components/BetStop";
import BlockEventLines from "./Components/BlockEventLines";
import UpdateStatusLine from "./Components/UpdateStatusLine";
import UpdateCoefsLine from "./Components/UpdateCoefsLine";
import CoefInactive from "./Components/CoefInactive";
import RemoveEvent from "./Components/RemoveEvent";
import VerIdent from "./Components/VerIdent";
import VerCallMe from "./Components/VerCallMe";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: "main"
    };
  }

  getTitle() {
    switch (this.state.activeComponent) {
      case "main":
        return "Выберете что изменять";
      case "UpdateCoefBB":
        return "Обновление коэф";
      case "BetStop":
        return "Bet Stop";
      case "deleteOrPauseEvent":
        return "Блокировка или удаление события";
      case "DeleteOneLine":
        return "Удалить линию";
      case "BlockOneLine":
        return "Заблокировать линию";
      case "UpdateCoefsLine":
        return "Обновить коэффициенты линии";
      case "CoefInactive":
        return "Изменить состояние outcome";
      case "RemoveEvent":
        return "Удалить событие";
      case "VerIdent":
        return "Обновить информацию по верификации";
      case "VerCallMe":
        return "Обновить статус обратного звонка";
      default:
        return this.state.activeComponent;
    }
  }

  getTemplate() {
    switch (this.state.activeComponent) {
      case "main":
        return this.staticName();
      case "UpdateCoefBB":
        return <UpdateCoefBB />;
      case "BetStop":
        return <BetStop />;
      case "deleteOrPauseEvent":
        return <BlockEventLines />;
      case "UpdateStatusLine":
        return <UpdateStatusLine />;
      case "UpdateCoefsLine":
        return <UpdateCoefsLine />;
      case "CoefInactive":
        return <CoefInactive />;
      case "RemoveEvent":
        return <RemoveEvent />;
      case "VerIdent":
        return <VerIdent />;
      case "VerCallMe":
        return <VerCallMe />;

      default:
        break;
    }
  }

  staticName() {
    return (
      <ul className="modal-constructor__list test">
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("RemoveEvent")}
        >
          Удалить событие
        </li>
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("UpdateStatusLine")}
        >
          Обновить статус линии
        </li>
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("UpdateCoefsLine")}
        >
          Обновить коэффициенты линии
        </li>
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("BetStop")}
        >
          Бет стоп
        </li>
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("deleteOrPauseEvent")}
        >
          Блокировка или удаление события (case 8, если прематч - событие
          удалится, если лайв - заблокируется)
        </li>
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("CoefInactive")}
        >
          Изменить состояние outcome
        </li>
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("UpdateCoefBB")}
        >
          Обновить коэф бб
        </li>
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("VerIdent")}
        >
          Обновить информацию по верификации
        </li>
        <li
          className="SaveInformationBetsBuilder"
          onClick={() => this.changeActiveComponent("VerCallMe")}
        >
          Обновить статус обратного звонка
        </li>
      </ul>
    );
  }

  changeActiveComponent(name) {
    const newState = { ...this.state, activeComponent: name };
    this.setState(newState);
  }

  render() {
    return (
      <div
        className={
          "constructor__modal modal-constructor " +
          (this.props.modalTest.isShown ? "" : "inactive")
        }
      >
        <div
          className="modal-constructor__wrapper"
          onClick={() => {
            this.setState({ activeComponent: "main" });
            this.props.closeModal();
          }}
        />
        <div className="modal-constructor__main">
          <div className="modal-constructor__top">
            {this.state.activeComponent !== "main" ? (
              <div
                className="modal-constructor__back"
                onClick={() => this.changeActiveComponent("main")}
              />
            ) : (
              ""
            )}

            <div className="modal-constructor__name">{this.getTitle()}</div>
            <div
              className="modal-constructor__close"
              onClick={() => {
                this.setState({ activeComponent: "main" });
                this.props.closeModal();
              }}
            />
          </div>
          <div
            className={
              "modal-constructor__body" +
              (this.state.activeComponent !== "main"
                ? " modal-constructor__padding"
                : "")
            }
          >
            {this.getTemplate()}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // this.props.showModal();
  }
}

const mapStateToProps = state => {
  return {
    modalTest: state.modalTest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModalTest())
    // showModal: () => dispatch(showModalTest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
