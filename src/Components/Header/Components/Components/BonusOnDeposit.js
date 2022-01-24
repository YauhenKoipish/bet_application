import React, { Component } from "react";
import question from "../../Image/bonus/question.svg";
import { connect } from "react-redux";
import { splitRangNumber } from "../../../../Services/Shared";
import TimeRemaining from "./Timer";
import Loading from "../../../Loading/";
import { requestPromotionFinish } from "../../../../Server/";
import { showModal, closeModal } from "../../../../Actions/Components/Modal/";
import startImg from "../../Image/bonus/start.png";
import { route } from "../../../../Actions/Components/Navigation/";
import { routsName } from "../../../../Router/RouterList";
class BonusOnDeposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  get progressWidth() {
    const { rolled, deposit } = this.props.balanceData;
    if (!rolled) return 0;
    return (rolled / deposit) * 100;
  }

  handleClickGet() {
    // if (!this.props.balanceData.rolled || this.state.isLoading) return;
    this.showConfirm();
  }

  isObjEmpty(object) {
    return JSON.stringify(object) === "{}";
  }

  confirmNo() {
    this.props.closeModal();
  }

  confirmYes() {
    this.setState({
      ...this.state,
      isLoading: true
    });
    requestPromotionFinish();
    this.props.closeModal();
  }

  showConfirm() {
    const modal = {
      text: this.props.lang.qestLogOuteMpney,
      buttons: [
        { text: this.props.lang.yes, func: this.confirmYes.bind(this) },
        { text: this.props.lang.no, func: this.confirmNo.bind(this) }
      ]
    };
    this.props.showModal(modal);
  }

  showModalOnResponsEnding(response) {
    switch (response) {
      case 0: {
        const modal = {
          text: this.props.lang.bonusAccept,
          title: this.props.lang.getBonus,
          buttons: [{ text: "ОК", func: this.props.closeModal }]
        };
        this.setState({
          ...this.state,
          isLoading: false
        });
        this.props.showModal(modal);
        this.props.removeDeposit();
        break;
      }
      case 1:
      case 2:
      case 3:
      case 4:
      case 5: {
        const modal = {
          title: this.props.lang.error,
          text: this.props.lang.errorOutMoney,
          buttons: [{ text: "ОК", func: this.props.closeModal }]
        };
        this.props.showModal(modal);
        this.setState({
          ...this.state,
          isLoading: false
        });
        break;
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.responseEndBonus !== this.props.responseEndBonus &&
      nextProps.responseEndBonus
    ) {
      this.showModalOnResponsEnding(nextProps.responseEndBonus.status);
    }
    return true;
  }

  getBonusOnDeposit() {
    const {
      rolled,
      deposit,
      bonusDepositRemainingTime
    } = this.props.balanceData;
    return (
      <div className="user-info__bonus bonus">
        <div className="bonus__title">Бонус на депозит</div>
        <div className="bonus__help">
          <img src={question} alt="" />
        </div>
        <div className="bonus__money">
          <span className="bonus__bonus">
            {splitRangNumber(Math.floor(rolled))}
          </span>
          <div className="bonus__sum">
            из <span>{splitRangNumber(Math.floor(deposit))}</span>
          </div>
        </div>

        <div className="bonus__line">
          <div
            className="bonus__grow"
            style={{ width: this.progressWidth + "%" }}
          />
        </div>

        <TimeRemaining
          onEnd={this.props.removeDeposit}
          remaining={bonusDepositRemainingTime}
        />

        <div className={"bonus__button " + (!rolled ? "opacity50" : "")}>
          <button onClick={this.handleClickGet.bind(this)}>
            {this.state.isLoading ? <Loading /> : "Получить"}
          </button>
        </div>
      </div>
    );
  }

  getEmptyBonusOnDeposit() {
    return (
      <div className="user-info__bonus bonus">
        <div className="bonus__cap" onClick={this.redirectToOffer.bind(this)}>
          <img src={startImg} alt="" />
        </div>
      </div>
    );
  }

  redirectToOffer() {
    this.props.toggleAccount();
    this.props.navigate(routsName.getRoutsUrl(routsName.dict.offer, "3"));
  }

  render() {
    if (this.isObjEmpty(this.props.balanceData)) return "";
    if (!this.props.isVerificated) return this.getEmptyBonusOnDeposit();
    return this.getBonusOnDeposit();
  }
}

const mapStateToProps = state => {
  return {
    balanceData: state.user.info.accountData,
    responseEndBonus: state.bonusOnDeposit.response,
    isVerificated: state.verification.ident.isCanTopup,
    lang: state.user.language_user.dict
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showModal: params => dispatch(showModal(params)),
    closeModal: () => dispatch(closeModal()),
    navigate: url => dispatch(route("push", url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BonusOnDeposit);
